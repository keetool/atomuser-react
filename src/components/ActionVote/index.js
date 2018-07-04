import React from 'react';
import {translateI18n} from "../../languages/i18n";
import {Icon} from "antd";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Tooltip from "../common/Tooltip";

let cx = classNamesBind.bind(styles);

const ActionVote = ({upvote, downvote, vote, actionUpVote, actionDownVote}) => {
    return (

        <div className={cx({
            "action-vote": true
        })}>
            <Tooltip placement="topLeft" title={`${upvote} ` + translateI18n('social.home.post_item.upvote')}>
                <Icon
                    type="caret-up"
                    className={cx({
                        "voted": vote == 1
                    })}
                    onClick={actionUpVote}
                />
            </Tooltip>
            <div className={cx({
                "text-vote": true
            })}>
                {upvote - downvote}
            </div>
            <Tooltip placement="top" title={`${downvote} ` + translateI18n('social.home.post_item.downvote')}>
                <Icon type="caret-down"
                      className={cx({
                          "voted": vote == -1
                      })}
                      onClick={actionDownVote}
                />
            </Tooltip>
        </div>
    );
};

export default ActionVote;