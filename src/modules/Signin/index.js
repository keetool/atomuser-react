import React from "react";
import SignInForm from "./SignInForm";
import styles from "./styles.less";
import Logo from '../../components/static/Logo';
import {translate} from "react-i18next";
import LogoText from "../../components/static/LogoText";
import {capitalizeFirstLetter} from "../../helpers/utility";
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);

class SignInContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {t, prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-container`)}>
                <div className={cx(`${prefixCls}-content`)}>
                    <div className={cx(`${prefixCls}-top`)}>
                        <div className={cx(`${prefixCls}-header`)}>
                            <Logo isContrast size={80}/>
                            <LogoText isContrast size={50}/>
                        </div>
                        <div className={cx(`${prefixCls}-desc`)}>{
                            capitalizeFirstLetter(t("social.login.form.description"))}
                        </div>
                    </div>
                    <div className={cx(`${prefixCls}-main`)}>
                        <SignInForm/>
                    </div>
                </div>
                <div className={cx(`${prefixCls}-footer`)}>
                    <div className={cx(`${prefixCls}-text-forgot`)}>
                        <div>Forgot password</div>
                        &emsp; &middot; &emsp;
                        <div>New account</div>
                    </div>

                    <div>English</div>
                </div>
            </div>
        );
    }
}

SignInContainer.defaultProps = {
    prefixCls: 'module-signin'
};

SignInContainer.propTypes = {};

export default translate(props => props.namespaces)(SignInContainer);
