import React from 'react';
import PropTypes from 'prop-types';
// import Avatar from "../../../components/Avatar";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {relativeTime} from "../../../helpers/time";
import {translate} from "react-i18next";

let cx = classNamesBind.bind(styles);

class Footer extends React.Component {
    render() {
        const {createdAt, totalComments, t} = this.props;
        return (
            <div className={cx("footer")}>
                <div className={cx("text-comment")}>{t('social.home.post_item.view_all_comment', {total_comments: totalComments})}</div>
                <div className={cx("text-time")}>{relativeTime(createdAt)}</div>

            </div>
        );
    }
}

Footer.propTypes = {
    createdAt: PropTypes.number.isRequired,
    totalComments: PropTypes.number.isRequired,
};

export default translate(props => props.namespaces)(Footer);