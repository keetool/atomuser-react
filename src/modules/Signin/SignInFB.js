import React from "react";
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import styles from './styles.less';

import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {capitalizeFirstLetter} from "../../helpers/utility";
import {signInFB} from "../../helpers/auth";

let cx = classNamesBind.bind(styles);

class SignInFB extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    loginFacebook = () => {
        signInFB((account) => {
            this.props.signIn(account);
        });
    };

    render() {
        const {t, disable, isLogging, prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-btn`, `${prefixCls}-btn-facebook`, {[`${prefixCls}-disable`]: disable})}
                 onClick={disable ? null : this.loginFacebook}>
                <Icon type="facebook" style={{fontSize: 25, position: 'absolute'}}/>
                <div
                    className={cx(`${prefixCls}-text-login`)}>{capitalizeFirstLetter(t(isLogging ? 'social.login.form.is_logging' : 'social.login.form.text_login_facebook'))}</div>
            </div>
        );
    }
}

SignInFB.defaultProps = {
    prefixCls: 'module-signin'
};

SignInFB.propTypes = {
    disable: PropTypes.bool,
    isLogging: PropTypes.bool,
    signIn: PropTypes.func,
};

export default translate(props => props.namespaces)(SignInFB);
