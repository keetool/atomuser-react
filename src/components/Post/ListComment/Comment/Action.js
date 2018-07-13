import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import ActionVote from "../../../ActionVote/index";
import {fullRelativeTime} from "../../../../helpers/time";
import {translate} from "react-i18next";
import {isLoggedIn} from "../../../../helpers/auth";

let cx = classNamesBind.bind(styles);

@observer
class Action extends React.Component {

    handleUpVote = () => {
        const {store} = this.props;
        store.upVote();

    };

    handleDownVote = () => {
        const {store} = this.props;
        store.downVote();
    };

    render() {
        const {comment, prefixCls} = this.props;
        const disabled = !isLoggedIn();
        return (
            <div className={cx(`${prefixCls}-layout-action`)}>
                <div className={cx(`${prefixCls}-action-left`)}>
                    <ActionVote
                        upvote={comment.upvote}
                        downvote={comment.downvote}
                        vote={comment.vote}
                        actionUpVote={this.handleUpVote}
                        actionDownVote={this.handleDownVote}
                        disabled={disabled}
                    />
                    {/*<div className={cx("divider", "vertical")}/>*/}
                    {/*<div className={cx("action-reply")}>{t('social.home.comment_item.reply')}</div>*/}
                </div>
                <div className={cx(`${prefixCls}-action-right`)}>
                    <div className={cx(`${prefixCls}-text-time`)}>{fullRelativeTime(comment.created_at)}</div>
                </div>
            </div>
        );
    }
}

Action.defaultProps = {
    prefixCls: 'post-comment'
};

Action.propTypes = {
    comment: PropTypes.object,
    store: PropTypes.object.isRequired,
};

export default translate(props => props.namespaces)(Action);