import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import {observer} from "mobx-react";
import {Icon} from "antd";

let cx = classNamesBind.bind(styles);

@observer
class Header extends React.Component {
    componentDidMount() {
    }

    render() {
        const { t, prefixCls } = this.props;
        return (
            <div className={cx(`${prefixCls}-header`)}>
                <div className={cx(`${prefixCls}-header-icon`)}>
                    <Icon type="star" className={cx(`${prefixCls}-active-mark`)}/>
                </div>
                <div className={cx(`${prefixCls}-header-text`)}>
                    {t('social.mark.header.marked')}
                </div>
            </div>
        );
    }
}

Header.defaultProps = {
    prefixCls: 'module-mark'
};

Header.propTypes = {};

export default translate(props => props.namespaces)(Header);
