import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../../components/Avatar";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {relativeTime} from "../../../helpers/time";

let cx = classNamesBind.bind(styles);

const Header = ({post}) => {
    const {creator} = post;
    return (
        <div className={cx({
            "header": true
        })}>
            <div className={cx({
                "creator": true
            })}>
                <Avatar url={creator.avatar_url}/>
                <div className={cx({
                    "creator-content": true
                })}>
                    <div
                        className={cx({
                            "name": true
                        })}
                    >
                        {creator.name}
                    </div>
                    <div className={cx("text-time")}>{relativeTime(post.created_at)}</div>
                </div>

            </div>
            <div className={cx({
                "action": true
            })}>
                <Icon
                    type="ellipsis"
                    className={cx({
                        "action-icon": true
                    })}
                />
            </div>
        </div>
    );
};

Header.propTypes = {
    post: PropTypes.object.isRequired
};

export default Header;