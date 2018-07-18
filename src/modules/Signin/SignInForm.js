import React from "react";
import {Alert} from "antd";
import styles from "./styles.less";
import {translate} from "react-i18next";
import {signinFB, signinGoogle} from "../../actions/signinActions";
import SignInFB from "./SignInFB";
import SignInGoogle from "./SignInGoogle";
import {withRouter} from "react-router";
import {getQueryParamsUrl, isEmpty} from "../../helpers/utility";
import {IS_PRODUCTION} from "../../constants/env";
import {redirectSignedOut} from "../../helpers/auth";

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.setData = this.setState.bind(this);
    }

    state = {
        isLoading: false,
        isLoggingFB: false,
        isLoggingGoogle: false,
        messageError: false,
        messageMerchant: null,
    };

    // handleSubmit = values => {
    //     signin(values, this.setData);
    // };

    signInFB = (account) => {
        signinFB(account, this.getMerchantSubdomain(), this.setData);
    };

    signinGoogle = (account) => {
        signinGoogle(account, this.getMerchantSubdomain(), this.setData);
    };

    renderMessageError = content => {
        return (
            <Alert
                style={{marginBottom: 24}}
                message={content}
                type="error"
                showIcon
            />
        );
    };

    getMerchantSubdomain = () => {
        const subdomain = getQueryParamsUrl(this.props.location, 'merchant');
        if (!IS_PRODUCTION && isEmpty(subdomain)) {
            redirectSignedOut();
        }
        return subdomain;
    };


    render() {
        const {messageMerchant, messageError, isLoggingFB, isLoggingGoogle} = this.state;
        const disableButton = messageMerchant || isLoggingFB || isLoggingGoogle;
        return (
            <div className={styles.login}>
                {messageMerchant && this.renderMessageError(messageMerchant)}
                {messageError && this.renderMessageError(messageError)}
                <SignInFB disable={disableButton} signIn={this.signInFB} isLogging={isLoggingFB}/>
                <SignInGoogle disable={disableButton} signIn={this.signinGoogle} isLogging={isLoggingGoogle}/>
            </div>
        );
    }
}

export default withRouter(translate(props => props.namespaces)(SignInForm));
