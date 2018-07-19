import React from "react";
//import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import {Icon} from "antd";
import {translate} from "react-i18next";
import classNamesBind from "classnames/bind";
import styles from './styles.less';

let cx = classNamesBind.bind(styles);

@observer
class Header extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls, t} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout-header`)}>
                <div className={cx(`${prefixCls}-layout-header-icon`)}>
                    <Icon type="global" />
                </div>
                <div className={cx(`${prefixCls}-layout-header-text`)}>
                    {t('social.list_suggest_channel.header.title')}
                </div>
            </div>
        );
    }
}

Header.defaultProps = {
    prefixCls: 'app-list-suggest-channel'
};


Header.propTypes = {};

export default translate(props => props.namespaces)(Header);
