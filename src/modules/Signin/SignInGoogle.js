import React from "react";
import {translate} from "react-i18next";
import styles from './styles.less';

import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {capitalizeFirstLetter} from "../../helpers/utility";
import PropTypes from "prop-types";
import {signInGoogle} from "../../helpers/auth";

let cx = classNamesBind.bind(styles);

class SignInGoogle extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    loginGoogle = () => {
        signInGoogle(data => {
            this.props.signIn(data);
        });
    };

    render() {
        const {t, disable, isLogging, prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-btn`, `${prefixCls}-btn-google`, {[`${prefixCls}-disable`]: disable})}
                 onClick={disable ? null : this.loginGoogle}
            >
                <Icon type="google" style={{fontSize: 25, position: 'absolute'}}/>
                <div className={cx(`${prefixCls}-text-login`)}>{capitalizeFirstLetter(t(
                    isLogging ? 'social.login.form.is_logging' : 'social.login.form.text_login_google'))}</div>
            </div>
        );
    }
}

SignInGoogle.defaultProps = {
    prefixCls: 'module-signin'
};

SignInGoogle.propTypes = {
    disable: PropTypes.bool,
    isLogging: PropTypes.bool,
    signIn: PropTypes.func,
};

export default translate(props => props.namespaces)(SignInGoogle);
