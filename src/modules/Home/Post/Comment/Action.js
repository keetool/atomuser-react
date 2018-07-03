import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import ActionVote from "../../../../components/ActionVote";
import {fullRelativeTime} from "../../../../helpers/time";
import {translate} from "react-i18next";

let cx = classNamesBind.bind(styles);

@observer
class Action extends React.Component {

    handleUpVote = () => {
        const {comment, store} = this.props;
        store.upVote(comment);

    };

    handleDownVote = () => {
        const {comment, store} = this.props;
        store.downVote(comment);
    };

    render() {
        const {comment, t} = this.props;
        return (
            <div className={cx("layout-action")}>
                <div className={cx("action-left")}>
                    <ActionVote
                        upvote={comment.upvote}
                        downvote={comment.downvote}
                        vote={comment.vote}
                        actionUpVote={this.handleUpVote}
                        actionDownVote={this.handleDownVote}
                    />
                    <div className={cx("divider", "vertical")}/>
                    <div className={cx("action-reply")}>{t('social.home.comment_item.reply')}</div>
                </div>
                <div className={cx("action-right")}>
                    <div className={cx("text-time")}>{fullRelativeTime(comment.created_at)}</div>
                </div>
            </div>
        );
    }
}

Action.propTypes = {
    comment: PropTypes.object,
    store: PropTypes.object.isRequired,
};

export default  translate(props => props.namespaces)(Action);