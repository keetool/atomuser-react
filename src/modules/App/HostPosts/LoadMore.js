import React from "react";
//import PropTypes from 'prop-types';
import {Icon} from "antd";
import {translate} from "react-i18next";
import classNamesBind from "classnames/bind";
import styles from './styles.less';

let cx = classNamesBind.bind(styles);

class Header extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout-load-more`)}>
                <div className={cx(`${prefixCls}-layout-load-more-icon`)}>
                    <Icon type="plus-circle" />
                </div>
                <div className={cx(`${prefixCls}-layout-load-more-text`)}>
                    Xem thêm
                </div>
            </div>
        );
    }
}

Header.defaultProps = {
    prefixCls: 'app-list-hot-post'
};


Header.propTypes = {};

export default translate(props => props.namespaces)(Header);
