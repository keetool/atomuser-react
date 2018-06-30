import React from "react";
import {translate} from "react-i18next";
import styles from './styles.less';

import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {capitalizeFirstLetter} from "../../helpers/utility";
import PropTypes from "prop-types";

let cx = classNamesBind.bind(styles);

class SignInGoogle extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {t, disable, isLogging} = this.props;
        return (
            <div className={cx('btn', 'btn-google', {'disable': disable})}>
                <Icon type="google" style={{fontSize: 25, position: 'absolute'}}/>
                <div className={cx('text-login')}>{capitalizeFirstLetter(t(
                    isLogging ? 'social.login.form.is_logging' : 'social.login.form.text_login_google'))}</div>
            </div>
        );
    }
}

SignInGoogle.propTypes = {
    disable: PropTypes.bool,
    isLogging: PropTypes.bool,
};

export default translate(props => props.namespaces)(SignInGoogle);
