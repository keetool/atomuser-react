import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {observer} from "mobx-react";
import {translateI18n} from "../../languages/i18n";
import ActionVote from "../ActionVote/index";
import {isLoggedIn} from "../../helpers/auth";

let cx = classNamesBind.bind(styles);

const ActionComment = ({totalComments = 0, disabled}) => {
    return (
        <div className={cx({
            "action-comment": true,
            "disabled": disabled
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
        const {store} = this.props;
        store.upVote();

    };

    handleDownVote = () => {
        const {store} = this.props;
        store.downVote();
    };

    handleMark = () => {
        const {store, post} = this.props;
        if (post.isBookmarked) {
            store.deleteMarkPost();
        } else {
            store.addMarkPost();
        }
    };

    render() {
        const {post} = this.props;
        const disabled = !isLoggedIn();
        return (
            <div className={cx("layout-action")}>
                <div className={cx("action-left")}>
                    <ActionVote
                        upvote={post.upvote}
                        downvote={post.downvote}
                        vote={post.vote}
                        actionUpVote={this.handleUpVote}
                        actionDownVote={this.handleDownVote}
                        disabled={disabled}
                    />
                    <div className={cx("divider", "vertical")}/>
                    <ActionComment
                        totalComments={post.num_comments}
                        disabled={disabled}
                    />
                </div>
                <div className={cx("action-right", {"disabled": disabled})}>
                    <Icon type="star" className={cx({
                        "active-mark": post.isBookmarked
                    })} onClick={this.handleMark}/>
                </div>
            </div>
        );
    }
}

Action.propTypes = {
    post: PropTypes.object,
    store: PropTypes.object,
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