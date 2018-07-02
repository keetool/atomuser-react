import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {observer} from "mobx-react";
import store from "../store";
import {translateI18n} from "../../../languages/i18n";
import ActionVote from "../../../components/ActionVote";

let cx = classNamesBind.bind(styles);

const ActionComment = ({totalComments = 0}) => {
    return (
        <div className={cx({
            "action-comment": true
        })}>
            <div className={cx({
                "text-comment": true
            })}>
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
        const {post} = this.props;
        store.upVote(post);

    };

    handleDownVote = () => {
        const {post} = this.props;
        store.downVote(post);
    };

    render() {
        const {post} = this.props;
        return (
            <div className={cx("layout-action")}>
                <div className={cx("action-left")}>
                    <ActionVote
                        upvote={post.upvote}
                        downvote={post.downvote}
                        vote={post.vote}
                        actionUpVote={this.handleUpVote}
                        actionDownVote={this.handleDownVote}
                    />
                    <div className={cx("divider", "vertical")}/>
                    <ActionComment
                        totalComments={post.num_comments}
                    />
                </div>
                <div className={cx("action-right")}>
                    <Icon type="star" className={cx({
                        "active-mark": true
                    })}/>
                </div>
            </div>
        );
    }
}

Action.propTypes = {
    post: PropTypes.object,
};

ActionVote.propTypes = {
    upvote: PropTypes.number,
    downvote: PropTypes.number,
    actionUpVote: PropTypes.func,
    actionDownVote: PropTypes.func,
};

ActionComment.propTypes = {
    totalComments: PropTypes.number,
};

export default Action;