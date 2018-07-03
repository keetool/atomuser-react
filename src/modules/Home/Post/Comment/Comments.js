import React from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import EditorComment from "../../../../components/EditorComment";
import ListComment from "./ListComment";

@observer
class Comments extends React.Component {
    addComment = (comment) => {
        const {storeComment} = this.props;
        storeComment.addComment(comment);
        this.props.incNumberComment();
    };

    render() {
        const {storeComment, storeEditorComment} = this.props;
        return (
            <div>
                <ListComment store={storeComment}/>
                <EditorComment
                    style={{marginTop: '10px'}}
                    store={storeEditorComment}
                    addComment={this.addComment}
                />
            </div>

        );
    }
}

Comments.propTypes = {
    storeComment: PropTypes.object.isRequired,
    storeEditorComment: PropTypes.object.isRequired,
};

export default Comments;