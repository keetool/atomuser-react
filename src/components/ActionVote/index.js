import React from 'react';
import PropTypes from 'prop-types';
import {translateI18n} from "../../languages/i18n";
import {Icon} from "antd";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Tooltip from "../common/Tooltip";

let cx = classNamesBind.bind(styles);

const ActionVote = ({horizontal, upvote, downvote, vote, actionUpVote, actionDownVote, disabled, prefixCls}) => {
    const voteNumber = !isNaN(upvote - downvote) ? upvote - downvote : 0;

    return (

        <div className={cx(
            `${prefixCls}-action-vote`, {
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-action-vote-horizontal`]: horizontal,

            })}>
            <Tooltip placement="topLeft" title={`${upvote} ` + translateI18n('social.home.post_item.upvote')}>
                <Icon
                    type="caret-up"
                    className={cx({
                        [`${prefixCls}-voted`]: vote == 1
                    })}
                    onClick={disabled ? null : actionUpVote}
                />
            </Tooltip>
            <div className={cx(`${prefixCls}-text-vote`)}>
                {voteNumber}
            </div>
            <Tooltip placement="top" title={`${downvote} ` + translateI18n('social.home.post_item.downvote')}>
                <Icon type="caret-down"
                      className={cx({
                          [`${prefixCls}-voted`]: vote == -1
                      })}
                      onClick={disabled ? null : actionDownVote}
                />
            </Tooltip>
        </div>
    );
};

ActionVote.defaultProps = {
    prefixCls: 'action-vote',
    upvote: 0,
    downvote: 0,
};


ActionVote.propTypes = {
    upvote: PropTypes.number,
    downvote: PropTypes.number,
    actionUpVote: PropTypes.func,
    actionDownVote: PropTypes.func,
    disabled: PropTypes.bool,
    vote: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ActionVote;