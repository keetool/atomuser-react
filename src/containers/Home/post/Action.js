import React from 'react';
import PropTypes from 'prop-types';
// import Avatar from "../../../components/Avatar";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Icon} from "antd";

let cx = classNamesBind.bind(styles);

const ActionLike = ({liked}) => {
    return (
        <div className={cx({
            "action-like": true
        })}>
            {
                liked ?
                    (
                        <Icon type="heart" className={cx({
                            "liked": true
                        })}/>
                    )
                    :
                    (
                        <Icon type="heart-o"/>
                    )
            }

        </div>
    );
};

const Action = () => {
    return (
        <div className={cx({
            "layout-action": true
        })}>
            <div className={cx({
                "action-left": true
            })}>
                <ActionLike liked/>
                <Icon type="message"/>
                <Icon type="swap"/>
            </div>
            <div className={cx({
                "action-right": true
            })}>
                <Icon type="star"/>
            </div>
        </div>
    );
};

Action.propTypes = {
    post: PropTypes.object.isRequired
};

export default Action;