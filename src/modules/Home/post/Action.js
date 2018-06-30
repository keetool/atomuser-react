import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {observer} from "mobx-react";

let cx = classNamesBind.bind(styles);

const ActionVote = ({upvote, downvote}) => {
    return (
        <div className={cx({
            "action-vote": true
        })}>
            <Icon
                type="caret-up"
                className={cx({
                    "active": true
                })}
                onClick={() => console.log("ok")}
            />
            <div className={cx({
                "text-vote": true
            })}>
                {upvote - downvote}
            </div>
            <Icon type="caret-down"/>
        </div>
    );
};

const ActionComment = () => {
    return (
        <div className={cx({
            "action-comment": true
        })}>
            <div className={cx({
                "text-comment": true
            })}>
                1002
            </div>
            <Icon type="message"/>
        </div>
    );
};

@observer
class Action extends React.Component {
    render() {
        const {post} = this.props;
        return (
            <div className={cx("layout-action")}>
                <div className={cx("action-left")}>
                    <ActionVote
                        upvote={post.upvote}
                        downvote={post.downvote}
                        action={() => {
                        }}
                    />
                    <div className={cx("divider", "vertical")}/>
                    <ActionComment/>
                </div>
                <div className={cx("action-right")}>
                    <Icon type="star" className={cx({
                        "active": true
                    })}/>
                </div>
            </div>
        );
    }
}

Action.propTypes = {
    post: PropTypes.object
};

ActionVote.propTypes = {
    upvote: PropTypes.number,
    downvote: PropTypes.number,
    action: PropTypes.func,
};

export default Action;