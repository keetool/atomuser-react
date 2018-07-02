import React from 'react';
import classNamesBind from "classnames/bind";
import loadingComponent from "../../../../components/HOC/loadingComponent";
import {RoundShape, TextBlock} from "react-placeholder/lib/placeholders";
import styles from './styles.less';

let cx = classNamesBind.bind(styles);

const Loading = () => {
    return (
        <div>
            <div className={cx({
                "layout-content": true
            })}>
                <RoundShape color='#E0E0E0' style={{width: 30, height: 30}}/>
                <div className={cx({
                    "content": true
                })}>
                    <div className={cx({
                        "comment": true
                    })}>
                        <TextBlock rows={2} color='#E0E0E0'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default loadingComponent()(Loading);