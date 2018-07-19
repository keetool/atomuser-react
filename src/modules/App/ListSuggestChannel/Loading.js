import React from "react";
//import PropTypes from 'prop-types';
import loadingComponent from "../../../components/HOC/loadingComponent";
import {RoundShape, TextBlock} from "react-placeholder/lib/placeholders";
import classNamesBind from "classnames/bind";
import styles from './styles.less';

let cx = classNamesBind.bind(styles);

class Loading extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-channel`)}
                 style={{width: "100%"}}
            >
                <RoundShape color="#E0E0E0" style={{width: 30, height: 30}}/>
                <div className={cx(`${prefixCls}-channel-content`)}>
                    <div
                        className={cx(`${prefixCls}-channel-content-name`)}
                    >
                        <TextBlock rows={2} color="#E0E0E0"/>
                    </div>
                </div>
            </div>
        );
    }
}


Loading.defaultProps = {
    prefixCls: 'app-list-suggest-channel'
};

Loading.propTypes = {};

export default loadingComponent()(Loading);
