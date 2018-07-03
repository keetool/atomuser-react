import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {relativeTime} from "../../../helpers/time";
import {translate} from "react-i18next";
import {observer} from "mobx-react";
import {isEmptyArr} from "../../../helpers/utility";

let cx = classNamesBind.bind(styles);

@observer
class Footer extends React.Component {
    render() {
        const {post, t, loadComments} = this.props;
        return (
            <div className={cx("footer")}>
                <div className={cx("text-time")}>{relativeTime(post.created_at)}</div>
                {
                    isEmptyArr(post.storeComment.comments) &&
                    <div className={cx("text-comment")} onClick={loadComments}>
                        {t('social.home.post_item.view_all_comment')}
                    </div>
                }
            </div>
        );
    }
}

Footer.propTypes = {
    post: PropTypes.object.isRequired,
    loadComments: PropTypes.func,
};

export default translate(props => props.namespaces)(Footer);