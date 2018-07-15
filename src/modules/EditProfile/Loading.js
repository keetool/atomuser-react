import React from "react";
//import PropTypes from 'prop-types';
import {RoundShape, TextBlock} from "react-placeholder/lib/placeholders";
import loadingComponent from "../../components/HOC/loadingComponent";
import classNamesBind from "classnames/bind";
import styles from './styles.less';

let cx = classNamesBind.bind(styles);

class Loading extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout`)}>
                <div className={cx(`${prefixCls}-layout-container`)}>
                    <div className={cx(`${prefixCls}-layout-container-avatar`)}>
                        <RoundShape color="#E0E0E0" style={{width: 100, height: 100}}/>
                    </div>
                    <div className={cx(`${prefixCls}-layout-container-info`)}>
                        <TextBlock rows={5} color="#E0E0E0"/>
                    </div>
                </div>
            </div>
        );
    }
}

Loading.defaultProps = {
    prefixCls: 'module-edit-profile'
};

Loading.propTypes = {};

export default loadingComponent()(Loading);
