import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Action from "./Action";
import EditorComment from "../../../components/EditorComment";
// import _ from "lodash";
// import store from "../store";
import {observer} from "mobx-react";

let cx = classNamesBind.bind(styles);

@observer
class Post extends React.Component {
    render() {
        const {post} = this.props;
        console.log("render post");
        return (
            <div className={cx("layout-post")}>
                <Header creator={post.creator}/>
                <Content post={post}/>
                <Action post={post}/>
                <Footer createdAt={post.created_at}/>
                <EditorComment style={{marginTop: '10px'}}/>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object
};

export default Post;