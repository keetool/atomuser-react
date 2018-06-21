import React from "react";
import {translate} from "react-i18next";
import styles from './styles.less';

import classNamesBind from "classnames/bind";
import {Icon} from "antd";
import {capitalizeFirstLetter} from "../../helpers/utility";

let cx = classNamesBind.bind(styles);

class SignInFB extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    loginFacebook = () => {
        /*eslint-disable*/
        FB.login(function (response) {
            console.log(response);
        }, {scope: 'public_profile,email'});
        /*eslint-disable*/
    };

    render() {
        const {t} = this.props;
        return (
            <div className={cx('btn', 'btn-facebook')} onClick={this.loginFacebook}>
                <Icon type="facebook" style={{fontSize: 25, position: 'absolute'}}/>
                <div
                    className={cx('text-login')}>{capitalizeFirstLetter(t('social.login.form.text_login_facebook'))}</div>
            </div>
        );
    }
}

SignInFB.propTypes = {};

export default translate(props => props.namespaces)(SignInFB);
