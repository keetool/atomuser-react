import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Action from "./Action";
import {observer} from "mobx-react";
import store from "../store";

import Comments from "./Comment/Comments";

let cx = classNamesBind.bind(styles);

@observer
class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    loadComments = () => {
        const {post} = this.props;
        const {storeComment} = post;
        storeComment.getComments();
        console.log("get");
    };

    incNumberComment = () => {
        const post = this.props.post;
        store.incComment(post.id);
    };

    render() {
        const {post} = this.props;
        return (
            <div className={cx("layout-post")}>
                <Header creator={post.creator}/>
                <Content post={post}/>
                <Action post={post}/>
                <Footer
                    post={post}
                    loadComments={this.loadComments}
                />
                {
                    <Comments
                        post={post}
                        incNumberComment={this.incNumberComment}
                        storeComment={post.storeComment}
                        storeEditorComment={post.storeEditorComment}
                    />
                }
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object
};

export default Post;