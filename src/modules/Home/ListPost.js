import React from 'react';
import PropTypes from 'prop-types';
import Post from "../../components/Post/Post";
import Loading from "../../components/Post/Loading";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import ScrollView from "../../helpers/scrollView";

let cx = classNamesBind.bind(styles);

const listId = "list-post";

@observer
class ListPost extends React.Component {

    componentDidMount() {
        this.scrollView = new ScrollView(listId, this.getPosts);
        this.scrollView.addEventScroll();
    }


    getPostFinished = () => {
        this.scrollView.addEventScroll();
    };

    getPosts = () => {
        const {store} = this.props;
        if (store.isLoadMore) {
            store.getPosts(this.getPostFinished);
        }
    };

    render() {
        const {store} = this.props;
        const {posts, isLoading} = store;
        return (
            <div
                id={listId}
                className={cx({
                    "layout-posts": true
                })}
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
            </div>

        );
    }
}

ListPost.propTypes = {
    store: PropTypes.object.isRequired,
};

export default ListPost;