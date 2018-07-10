import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import Avatar from "../../../Avatar/index";
import {LOGO} from "../../../../constants/index";
import Action from "./Action";

let cx = classNamesBind.bind(styles);

@observer
class Comment extends React.Component {
    render() {
        const {store} = this.props;
        const {comment} = store;
        const creator = comment.user ? comment.user : {avatar_url: LOGO};
        return (
            <div className={cx({
                "layout-content": true
            })}>
                <Avatar url={creator.avatar_url}/>
                <div className={cx({
                    "content": true
                })}>
                    <div className={cx({
                        "comment": true
                    })}>
                        <div className={cx("name")}>{creator.name}</div>
                        <div className={cx("content-comment")} dangerouslySetInnerHTML={{__html: comment.value}}/>
                    </div>
                    <Action comment={comment} store={store}/>
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Comment;