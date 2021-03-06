import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {observer} from "mobx-react";
import {translateI18n} from "../../languages/i18n";
import ActionVote from "../ActionVote/index";
import Tooltip from "../common/Tooltip";
import {translate} from "react-i18next";
import {withAccount} from "../context/AccountContext";

let cx = classNamesBind.bind(styles);

const ActionComment = ({totalComments = 0, disabled, prefixCls}) => {
    return (
        <div className={cx(`${prefixCls}-action-comment`, {
            [`${prefixCls}-disabled`]: disabled
        })}>
            <div className={cx(`${prefixCls}-text-comment`)}>
                {totalComments}
            </div>
            {
                translateI18n('social.home.post_item.comment')
            }
        </div>
    );
};

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
        const {post, prefixCls, t, handleMark, account} = this.props;
        const disabled = !account.acceptAction;
        return (
            <div className={cx(`${prefixCls}-layout-action`)}>
                <div className={cx(`${prefixCls}-action-left`)}>
                    <ActionVote
                        upvote={post.upvote}
                        downvote={post.downvote}
                        vote={post.vote}
                        actionUpVote={this.handleUpVote}
                        actionDownVote={this.handleDownVote}
                        disabled={disabled}
                    />
                    <div className={cx(`${prefixCls}-divider`, `${prefixCls}-vertical`)}/>
                    <ActionComment
                        totalComments={post.num_comments}
                        disabled={disabled}
                    />
                </div>
                <div className={cx(`${prefixCls}-action-right`, {[`${prefixCls}-disabled`]: disabled})}>
                    <Tooltip title={t('social.home.post_item.mark')}>
                        <Icon type="star" className={cx({
                            [`${prefixCls}-active-mark`]: post.isBookmarked
                        })} onClick={disabled ? null : handleMark}/>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

Action.defaultProps = {
    prefixCls: 'post'
};

ActionComment.defaultProps = {
    prefixCls: 'post'
};

Action.propTypes = {
    post: PropTypes.object,
    store: PropTypes.object,
    handleMark: PropTypes.func,
};

ActionComment.propTypes = {
    totalComments: PropTypes.number,
};

export default translate(props => props.namespaces)(withAccount(Action));