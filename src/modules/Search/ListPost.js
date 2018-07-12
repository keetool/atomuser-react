import React from 'react';
import PropTypes from 'prop-types';
import Post from "../../components/Post/Post";
import Loading from "../../components/Post/Loading";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
// import ScrollView from "../../helpers/scrollView";
import {translate} from "react-i18next";
import {isEmpty as isEmptyStr} from "../../helpers/utility";

let cx = classNamesBind.bind(styles);

const listId = "list-search-post";

@observer
class ListPost extends React.Component {

    componentDidMount() {
        // this.scrollView = new ScrollView(listId, this.getPosts);
        // this.scrollView.addEventScroll();
    }


    // getPostFinished = () => {
    //     this.scrollView.addEventScroll();
    // };
    //
    // getPosts = () => {
    //     const {store} = this.props;
    //     if (store.isLoadMore) {
    //         store.search(store.textSearch, this.getPostFinished);
    //     }
    // };

    renderEmpty = () => {
        const {store, prefixCls, t} = this.props;
        const {isEmpty} = store;
        if (isEmpty && !isEmptyStr(store.textSearch)) {
            return (
                <div className={cx(`${prefixCls}-empty`)}>
                    <div className={cx(`${prefixCls}-empty-text`)}>
                        {t('social.search.noti.empty', {text_search: store.textSearch})}
                    </div>
                </div>
            );
        } else {
            return (
                <div/>
            );
        }
    };

    render() {
        const {store, prefixCls} = this.props;
        const {posts, isLoading} = store;
        return (
            <div
                id={listId}
                className={cx(`${prefixCls}-layout-posts`)}
            >
                {
                    posts && posts.length > 0 ?
                        (
                            posts.map((storePost, index) => {
                                    return (
                                        <div key={index}>
                                            <Post store={storePost} key={index}/>
                                        </div>
                                    );
                                }
                            )
                        )
                        :
                        (
                            isLoading &&
                            <div>
                                <Loading/>
                                <Loading/>
                            </div>
                        )

                }
                {
                    isLoading && <Loading/>
                }
                {
                    this.renderEmpty()
                }
            </div>

        );
    }
}

ListPost.defaultProps = {
    prefixCls: 'module-search'
};

ListPost.propTypes = {
    store: PropTypes.object.isRequired,
};

export default translate(props => props.namespaces)(ListPost);