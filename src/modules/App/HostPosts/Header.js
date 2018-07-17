import React from "react";
//import PropTypes from 'prop-types';

import {translate} from "react-i18next";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import {Icon} from "antd";

let cx = classNamesBind.bind(styles);

class Header extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls, t} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout-header`)}>
                <div className={cx(`${prefixCls}-layout-header-icon`)}>
                    <Icon type="bar-chart"/>
                </div>

                <div className={cx(`${prefixCls}-layout-header-text`)}>
                    {t('social.list_hot_post.header.title')}
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
