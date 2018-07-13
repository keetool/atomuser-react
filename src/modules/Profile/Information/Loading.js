import React from "react";
import loadingComponent from "../../../components/HOC/loadingComponent";
import {RoundShape, TextBlock} from "react-placeholder/lib/placeholders";
import styles from '../styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);


class Loading extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout-info`)}>
                <div className={cx(`${prefixCls}-layout-info-container`)}>
                    <div className={cx(`${prefixCls}-layout-info-info-avatar`)}>
                        <RoundShape color="#E0E0E0" style={{width: 100, height: 100}}/>
                    </div>
                    <div className={cx(`${prefixCls}-layout-info-container-info`)}>
                        <div className={cx(`${prefixCls}-layout-info-info-name`)}>
                            <TextBlock rows={1} color="#E0E0E0"/>
                        </div>
                        <div className={cx(`${prefixCls}-layout-info-info-analytics`)} style={{paddingTop: '20px'}}>
                            <TextBlock rows={2} color="#E0E0E0"/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

Loading.defaultProps = {
    prefixCls: 'module-profile'
};

Loading.propTypes = {};

export default loadingComponent()(Loading);
