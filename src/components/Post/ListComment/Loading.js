import React from "react";
import classNamesBind from "classnames/bind";
import loadingComponent from "../../HOC/loadingComponent";
import {RoundShape, TextBlock} from "react-placeholder/lib/placeholders";
import styles from "./styles.less";

let cx = classNamesBind.bind(styles);

const Loading = ({prefixCls}) => {
    return (
        <div>
            <div className={cx(`${prefixCls}-layout-content`)}>
                <RoundShape color="#E0E0E0" style={{width: 30, height: 30}}/>
                <div className={cx(`${prefixCls}-content`)}>
                    <div className={cx(`${prefixCls}-comment`)}>
                        <TextBlock rows={2} color="#E0E0E0"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

Loading.defaultProps = {
    prefixCls: "post-comment"
};

export default loadingComponent()(Loading);