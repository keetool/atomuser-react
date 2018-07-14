import React from 'react';
import PropTypes from 'prop-types';
import Post from "../../../components/Post/Post";
import Loading from "../../../components/Post/Loading";
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import ScrollView from "../../../entity/ScrollView";
import {translate} from "react-i18next";

let cx = classNamesBind.bind(styles);

const listId = "list-post-user";

@observer
class ListPost extends React.Component {

    constructor(props) {
        super(props);
        this.scrollView = new ScrollView(listId, this.getPosts);
    }

    componentDidUpdate() {
        const {store} = this.props;
        const {isLoading} = store;
        if (!isLoading) {
            this.scrollView.addEventScroll();
        }
    }

    getPosts = () => {
        const {store} = this.props;
        if (store.isLoadMore) {
            store.getPosts();
        }
    };

    renderEmpty = () => {
        const {prefixCls, t, store} = this.props;
        const {isEmpty} = store;
        if (isEmpty) {
            return (
                <div className={cx(`${prefixCls}-empty`)}>
                    <div className={cx(`${prefixCls}-empty-text`)}>
                        {t('social.home.noti.empty')}
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
        const {prefixCls, store} = this.props;
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
    prefixCls: 'module-profile'
};

ListPost.propTypes = {
    store: PropTypes.object.isRequired
};


export default translate(props => props.namespaces)(ListPost);