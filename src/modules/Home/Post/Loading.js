import React from 'react';
import classNamesBind from "classnames/bind";
import loadingComponent from "../../../components/HOC/loadingComponent";
import {RoundShape, TextBlock} from "react-placeholder/lib/placeholders";
import styles from './styles.less';
import {Divider} from "antd";

let cx = classNamesBind.bind(styles);

const Loading = () => {
    return (
        <div>
            <div className={cx({
                "layout-post": true
            })}>
                <div className={cx({
                    "header": true
                })}>
                    <div className={cx({
                        "creator": true
                    })}
                         style={{width: '100%'}}
                    >
                        <RoundShape color='#E0E0E0' style={{width: 30, height: 30}}/>
                        <div className={cx({
                            "creator-content": true
                        })}>
                            <div
                                className={cx({
                                    "name": true
                                })}
                            >
                                <TextBlock rows={1} color='#E0E0E0'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx({
                    "content": true
                })}
                     style={{paddingBottom: '100px'}}
                >
                    <div className={cx("content-body")}>
                        <TextBlock rows={3} color='#E0E0E0'/>
                    </div>
                </div>

            </div>
            <Divider/>
        </div>


    );
};

export default loadingComponent()(Loading);