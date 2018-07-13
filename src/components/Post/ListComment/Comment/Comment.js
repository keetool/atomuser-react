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
        const {store, prefixCls} = this.props;
        const {comment} = store;
        const creator = comment.user ? comment.user : {avatar_url: LOGO};
        return (
            <div className={cx(`${prefixCls}-layout-content`)}>
                <Avatar url={creator.avatar_url}/>
                <div className={cx(`${prefixCls}-content`)}>
                    <div className={cx(`${prefixCls}-comment`)}>
                        <div className={cx(`${prefixCls}-name`)}>{creator.name}</div>
                        <div className={cx(`${prefixCls}-content-comment`)}
                             dangerouslySetInnerHTML={{__html: comment.value}}/>
                    </div>
                    <Action comment={comment} store={store}/>
                </div>
            </div>
        );
    }
}

Comment.defaultProps = {
    prefixCls: 'post-comment'
};

Comment.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Comment;