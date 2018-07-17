import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Header from "./Header";
import Content from "./Body/Content";
// import Footer from "./Footer";
import Action from "./Action";
import {observer} from "mobx-react";
import EditorPost from "../../components/EditorPost";
import Comments from "./Comments";
import {getValueObjectFromStringKey, linkRoute} from "../../helpers/utility";
import {showDeleteConfirm, showWarningConfirm} from "../../helpers/confirm";
import {translate} from "react-i18next";
import {Modal, Spin} from "antd";

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

    handleMark = () => {
        const {store} = this.props;
        const {post} = store;
        if (post.isBookmarked) {
            store.deleteMarkPost();
        } else {
            store.addMarkPost();
        }
    };

    handleDelete = () => {
        const {store, t} = this.props;
        const titleConfirm = t('social.home.post_item.are_you_sure_delete_this_post?');
        showDeleteConfirm(titleConfirm, '', store.deletePost);
    };

    handleEdit = () => {
        const {store} = this.props;
        store.changeStatusModal(true);
    };

    closeModalEdit = () => {
        const {store} = this.props;
        store.changeStatusModal(false);
    };

    handleCloseModalEdit = () => {
        const {t} = this.props;
        const titleConfirm = t('social.home.post_item.are_you_sure_close_edit_this_post');
        const contentConfirm = t('social.home.post_item.close_modal_lost_content');

        showWarningConfirm(titleConfirm, contentConfirm, this.closeModalEdit);
    };

    handleEditPostSuccess = (data) => {
        const {store} = this.props;
        store.changeDataPost(data);
        this.closeModalEdit();
    };

    render() {
        const {store, prefixCls, t} = this.props;
        const {post, storeComment, storeEditorComment, config, isDeleting, showModalEdit} = store;
        const linkDetailPost = linkRoute("/post/:postID", {postID: post.id});
        const linkProfile = linkRoute("/profile/:userID", {userID: getValueObjectFromStringKey(post, 'creator.id')});
        const loading = isDeleting;

        return (
            <div>
                <Spin spinning={loading} size="large">
                    <div className={cx(`${prefixCls}-layout-post`)}>

                        <Header
                            post={post}
                            linkDetail={linkDetailPost}
                            linkProfile={linkProfile}
                            handleMark={this.handleMark}
                            handleDelete={this.handleDelete}
                            handleEdit={this.handleEdit}
                        />
                        <Content post={post} store={store}/>
                        <Action post={post} store={store} handleMark={this.handleMark}/>

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
                    {
                        showModalEdit &&
                        <Modal
                            title={t('social.home.post_item.modal_edit_post_title')}
                            visible={true}
                            bodyStyle={{padding: 0}}
                            footer={null}
                            maskClosable={false}
                            onCancel={this.handleCloseModalEdit}
                        >
                            <EditorPost post={{...post}} editPost={this.handleEditPostSuccess}/>
                        </Modal>
                    }

                </Spin>

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

export default translate(props => props.namespaces)(Post);