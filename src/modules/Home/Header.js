import React from 'react';
import PropTypes from 'prop-types';
import headerContent from "../../components/HOC/HeaderContent/headerContent";
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);


class Header extends React.Component {
    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-header`)}>
                <div className={cx(`${prefixCls}-header-item`)}>
                    All threads
                </div>

            </div>
        );
    }
}

Header.defaultProps = {
    prefixCls: 'module-home'
};

Header.propTypes = {
    fixed: PropTypes.bool,
    style: PropTypes.object
};

export default headerContent()(Header);