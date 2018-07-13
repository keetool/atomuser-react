import React from "react";
import {Spin} from "antd";
import styles from "./styles.less";
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);

class GlobalLoading extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-container-loading`)}>
                <Spin size="large"/>
            </div>
        );
    }
}

GlobalLoading.defaultProps = {
    prefixCls: 'global-loading'
};


export default GlobalLoading;
