import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Action from "./Action";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import store from "../store";
import Comments from "./Comment/Comments";

let cx = classNamesBind.bind(styles);

@observer
class Post extends React.Component {
    state = {
        isShowComments: false
    };

    showComments = () => {
        this.setState({isShowComments: true});
    };

    incNumberComment = () => {
        const post = this.props.post;
        store.incComment(post.id);
    };

    render() {
        const {post} = this.props;
        const {isShowComments} = this.state;
        return (
            <div className={cx("layout-post")}>
                <Header creator={post.creator}/>
                <Content post={post}/>
                <Action post={post}/>
                <Footer
                    post={post}
                    showComments={this.showComments}
                    isShowComments={isShowComments}
                />
                <Comments
                    post={toJS(post)}
                    incNumberComment={this.incNumberComment}
                    isShowComments={isShowComments}
                />
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object
};

export default Post;