import React from "react";
import {translate} from "react-i18next";
import styles from './styles.less';

import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {capitalizeFirstLetter} from "../../helpers/utility";
import PropTypes from "prop-types";
import {signInGoogle} from "../../helpers/auth";
import {GOOGLE_ID} from "../../constants";

let cx = classNamesBind.bind(styles);

class SignInGoogle extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.loadAuth2();
    }

    loginGoogle = () => {
        signInGoogle(this.auth2, data => {
            this.props.signIn(data);
        });
    };

    loadAuth2 = () => {
        //es-lint-disable
        window.gapi.load('auth2', () => {
            this.auth2 = window.gapi.auth2.init({
                client_id: GOOGLE_ID,
                cookiepolicy: 'single_host_origin',
            });
        });
        //es-lint-enable
    };


    render() {
        const {t, disable, isLogging, prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-btn`, `${prefixCls}-btn-google`, {[`${prefixCls}-disable`]: disable})}
                 onClick={isLogging ? null : this.loginGoogle}
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
