import React from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import EditorComment from "../EditorComment/index";
import ListComment from "./ListComment/ListComment";
import socket from "../../services/socketio";
import {CREATE_COMMENT} from "../../services/socketEvent";

@observer
class Comments extends React.Component {

    componentDidMount() {
        const {post} = this.props;
        const channel = `${post.merchant.sub_domain}:${CREATE_COMMENT}`;
        socket.on(channel, (data) => {
            const {comment} = data;
            if (comment.post_id == post.id) {
                this.addComment(comment);
            }
        });
    }

    addComment = (comment) => {
        const {storeComment} = this.props;
        if (!storeComment.isExistedComment(comment)) {
            storeComment.addComment(comment);
            this.props.incNumberComment();
        }
    };

    render() {
        const {storeComment, storeEditorComment, hideListComment, hideEditorComment} = this.props;
        return (
            <div>

                {!hideListComment && <ListComment store={storeComment}/>}

                {!hideEditorComment && <EditorComment
                    style={{marginTop: '10px'}}
                    store={storeEditorComment}
                    addComment={this.addComment}
                />}

            </div>

        );
    }
}

Comments.propTypes = {
    storeComment: PropTypes.object.isRequired,
    storeEditorComment: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    hideListComment: PropTypes.bool,
    hideEditorComment: PropTypes.bool
};

export default Comments;