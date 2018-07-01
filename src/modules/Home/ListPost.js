import React from 'react';
import PropTypes from 'prop-types';
import Post from "./Post/Post";
import Loading from "./Post/Loading";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import store from "./store";
import {Divider} from "antd";

let cx = classNamesBind.bind(styles);

@observer
class ListPost extends React.Component {
    componentDidMount() {
        this.addEventScroll();
    }

    addEventScroll = () => {
        document.addEventListener('scroll', this.trackScrolling);
    };

    getPostFinished = () => {
        this.addEventScroll();
    };

    getPosts = () => {
        if (store.isLoadData) {
            store.incPage();
            store.getPosts(this.getPostFinished());
        }
    };

    trackScrolling = () => {
        const wrappedElement = document.getElementById('list-post');
        if (this.isBottom(wrappedElement)) {
            this.getPosts();
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    isBottom = (el) => {
        return el.getBoundingClientRect().bottom - 500 <= window.innerHeight;
    };


    render() {
        const {posts, isLoading} = this.props;
        return (
            <div
                id={"list-post"}
                className={cx({
                    "layout-posts": true
                })}
            >
                {
                    posts && posts.length > 0 ?
                        (
                            posts.map((post, index) => {
                                    return (
                                        <div>
                                            <Post post={post} key={index}/>
                                            <Divider/>
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
    posts: PropTypes.array,
    isLoading: PropTypes.bool,
};

export default ListPost;