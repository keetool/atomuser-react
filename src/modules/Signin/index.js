import React from "react";
import SignInForm from "./SignInForm";
import styles from "./styles.less";
import Logo from '../../components/static/Logo';
import {translate} from "react-i18next";
import LogoText from "../../components/static/LogoText";
import {capitalizeFirstLetter, reload_url, URL_add_parameter} from "../../helpers/utility";
import classNamesBind from "classnames/bind";
import {Select} from "antd";
import {LANGUAGES} from "../../constants";
import i18n from "../../languages/i18n";

let cx = classNamesBind.bind(styles);

class SignInContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleChangeLanguage(value) {
        reload_url(URL_add_parameter("lang", value));
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
                    {/*<div className={cx(`${prefixCls}-text-forgot`)}>*/}
                    {/*<div>Forgot password</div>*/}
                    {/*&emsp; &middot; &emsp;*/}
                    {/*<div>New account</div>*/}
                    {/*</div>*/}

                    <Select
                        defaultValue={i18n.language}
                        className={styles["dropdown-language"]}
                        onChange={this.handleChangeLanguage}
                    >
                        {LANGUAGES.map((lang, index) => {
                            return (
                                <Select.Option key={index} value={lang.value}>
                                    {lang.label}
                                </Select.Option>
                            );
                        })}
                    </Select>
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
