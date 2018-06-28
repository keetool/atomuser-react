import React from 'react';
import PropTypes from 'prop-types';
// import Avatar from "../../../components/Avatar";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Icon} from "antd";

let cx = classNamesBind.bind(styles);

const ActionVote = () => {
    return (
        <div className={cx({
            "action-vote": true
        })}>
            <Icon type="caret-up" className={cx({
                "active": true
            })}/>
            <div className={cx({
                "text-vote": true
            })}>
                12
            </div>
            <Icon type="caret-down"/>
            {/*{*/}
            {/*liked ?*/}
            {/*(*/}
            {/*<Icon type="heart" className={cx({*/}
            {/*"liked": true*/}
            {/*})}/>*/}
            {/*)*/}
            {/*:*/}
            {/*(*/}
            {/*<Icon type="heart-o"/>*/}
            {/*)*/}
            {/*}*/}

        </div>
    );
};

const ActionComment = () => {
    return (
        <div className={cx({
            "action-comment": true
        })}>
            <div className={cx({
                "text-comment": true
            })}>
                1002
            </div>
            <Icon type="message"/>
        </div>
    );
};


const Action = () => {
    return (
        <div className={cx("layout-action")}>
            <div className={cx("action-left")}>
                <ActionVote liked/>
                <div className={cx("divider", "vertical")}/>
                <ActionComment/>
            </div>
            <div className={cx("action-right")}>
                <Icon type="star" className={cx({
                    "active": true
                })}/>
            </div>
        </div>
    );
};

Action.propTypes = {
    post: PropTypes.object.isRequired
};

export default Action;