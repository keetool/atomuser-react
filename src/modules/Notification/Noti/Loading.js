import React from "react";
import loadingComponent from "../../../components/HOC/loadingComponent";
import {RoundShape, TextBlock} from "react-placeholder/lib/placeholders";
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);


class Loading extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-container`)}>
                <div className={cx(`${prefixCls}-avatar`)}>
                    <RoundShape color='#E0E0E0' style={{width: 30, height: 30}}/>
                </div>
                <div className={cx(`${prefixCls}-container-body`)}>
                    <div className={cx(`${prefixCls}-content-text`)}>
                        <TextBlock rows={2} color='#E0E0E0'/>
                    </div>
                    <div className={cx(`${prefixCls}-content-time`)} style={{width: '100px'}}>
                        <TextBlock rows={1} color='#E0E0E0'/>
                    </div>
                </div>
            </div>
        );
    }
}

Loading.defaultProps = {
    prefixCls: 'notification'
};

Loading.propTypes = {};

export default loadingComponent()(Loading);
