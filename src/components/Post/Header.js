import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../Avatar/index";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {relativeTime} from "../../helpers/time";
import {Link} from "react-router-dom";

let cx = classNamesBind.bind(styles);

const Header = ({post, linkDetail, prefixCls}) => {
    const {creator} = post;

    return (
        <div className={cx(`${prefixCls}-header`)}>
            <div className={cx(`${prefixCls}-creator`)}>
                <Avatar url={creator.avatar_url}/>
                <div className={cx(`${prefixCls}-creator-content`)}>
                    <div
                        className={cx(`${prefixCls}-name`)}
                    >
                        {creator.name}
                    </div>
                    <Link to={linkDetail}>
                        <div className={cx(`${prefixCls}-text-time`)}>
                            {relativeTime(post.created_at)}
                        </div>
                    </Link>
                </div>

            </div>
            <div className={cx(`${prefixCls}-action`)}>
                <Icon
                    type="ellipsis"
                    className={cx(`${prefixCls}-action-icon`)}
                />
            </div>
        </div>
    );
};

Header.defaultProps = {
    prefixCls: 'post'
};

Header.propTypes = {
    post: PropTypes.object.isRequired,
    linkDetail: PropTypes.string.isRequired,
};

export default Header;