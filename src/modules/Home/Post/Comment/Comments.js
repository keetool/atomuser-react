import React from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import Store from "./Store";
import EditorComment from "../../../../components/EditorComment";
import ListComment from "./ListComment";

@observer
class Comments extends React.Component {

    store = new Store(this.props.post);

    addComment = (comment) => {
        this.store.addComment(comment);
        this.props.incNumberComment();
    };

    render() {
        const {post, isShowComments} = this.props;
        return (
            <div>
                {isShowComments && <ListComment store={this.store}/>}
                <EditorComment style={{marginTop: '10px'}} post={post} addComment={this.addComment}/>
            </div>

        );
    }
}

Comments.propTypes = {
    post: PropTypes.object.isRequired,
    isShowComments: PropTypes.bool,
};

export default Comments;