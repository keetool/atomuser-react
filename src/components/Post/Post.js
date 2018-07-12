import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Header from "./Header";
import Content from "./Body/Content";
// import Footer from "./Footer";
import Action from "./Action";
import {observer} from "mobx-react";

import Comments from "./Comments";
import {linkRoute} from "../../helpers/utility";

let cx = classNamesBind.bind(styles);

@observer
class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    incNumberComment = () => {
        const {store} = this.props;
        store.incComment();
    };

    render() {
        const {store} = this.props;
        const {post, storeComment, storeEditorComment, config} = store;
        const linkDetailPost = linkRoute("/post/:postID", {postID: post.id});

        return (
            <div className={cx("layout-post")}>
                <Header post={post} linkDetail={linkDetailPost}/>
                <Content post={post}/>
                <Action post={post} store={store}/>

                <div className={cx("layout-comment")}>
                    <Comments
                        hideComment={config.hideListComment}
                        hideEditorComment={config.hideEditorComment}
                        post={post}
                        incNumberComment={this.incNumberComment}
                        storeComment={storeComment}
                        storeEditorComment={storeEditorComment}
                    />
                </div>
                {/*<Footer*/}
                {/*post={post}*/}
                {/*/>*/}

            </div>
        );
    }
}

Post.propTypes = {
    store: PropTypes.object
};

export default Post;