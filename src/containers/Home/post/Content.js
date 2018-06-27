import React from 'react';
import PropTypes from 'prop-types';
// import Avatar from "../../../components/Avatar";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
// import {Icon} from "antd";

let cx = classNamesBind.bind(styles);

const Content = ({post = {}}) => {
    return (
        <div className={cx({
            "content": true
        })}>
            <div dangerouslySetInnerHTML={{__html: post.body}}/>
        </div>

    );
};

Content.propTypes = {
    post: PropTypes.object.isRequired
};

export default Content;