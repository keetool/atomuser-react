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
import {getValueObjectFromStringKey, linkRoute} from "../../helpers/utility";

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
        const {store, prefixCls} = this.props;
        const {post, storeComment, storeEditorComment, config} = store;
        const linkDetailPost = linkRoute("/post/:postID", {postID: post.id});
        const linkProfile = linkRoute("/profile/:userID", {userID: getValueObjectFromStringKey(post, 'creator.id')});

        return (
            <div className={cx(`${prefixCls}-layout-post`)}>
                <Header post={post} linkDetail={linkDetailPost} linkProfile={linkProfile}/>
                <Content post={post} store={store}/>
                <Action post={post} store={store}/>

                <div className={cx(`${prefixCls}-layout-comment`)}>
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

Post.defaultProps = {
    prefixCls: 'post'
};

Post.propTypes = {
    store: PropTypes.object
};

export default Post;