import React from 'react';
import PropTypes from 'prop-types';
// import Avatar from "../../../components/Avatar";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Divider} from "antd";
import {relativeTime} from "../../../helpers/time";

let cx = classNamesBind.bind(styles);

const Footer = ({createdAt}) => {
    return (
        <div className={cx("footer")}>
            <div>View all 1002 comments</div>
            <div className={cx("text-time")}>{relativeTime(createdAt)}</div>
            <Divider/>
        </div>
    );
};

Footer.propTypes = {
    createdAt: PropTypes.number.isRequired
};

export default Footer;