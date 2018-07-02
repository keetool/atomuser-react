import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {relativeTime} from "../../../helpers/time";
import {translate} from "react-i18next";
import {observer} from "mobx-react";

let cx = classNamesBind.bind(styles);

@observer
class Footer extends React.Component {
    render() {
        const {post, t, showComments, isShowComments} = this.props;
        return (
            <div className={cx("footer")}>
                <div className={cx("text-time")}>{relativeTime(post.created_at)}</div>
                {
                    !isShowComments &&
                    <div className={cx("text-comment")} onClick={showComments}>
                        {t('social.home.post_item.view_all_comment')}
                    </div>
                }
            </div>
        );
    }
}

Footer.propTypes = {
    post: PropTypes.object.isRequired,
    isShowComments: PropTypes.bool,
    showComments: PropTypes.func,
};

export default translate(props => props.namespaces)(Footer);