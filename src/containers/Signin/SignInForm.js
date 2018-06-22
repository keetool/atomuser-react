import React from "react";
import {Alert} from "antd";
import styles from "./styles.less";
import {translate} from "react-i18next";
import {signin, signinFB} from "../../actions/signinActions";
import SignInFB from "./SignInFB";
import SignInGoogle from "./SignInGoogle";
import {withRouter} from "react-router";
import {getQueryParamsUrl, isEmpty} from "../../helpers/utility";
import {getMerchant} from "../../actions/merchantActions";
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
        messageError: false,
        messageMerchant: null,
        merchantSubDomain: ''
    };

    componentDidMount() {
        console.log(this.getMerchantSubdomain());
        this.setState({merchantSubDomain: this.getMerchantSubdomain()});
        // this.getMerchant();
    }

    handleSubmit = values => {
        signin(values, this.setData);
    };

    signInFB = (account) => {
        signinFB(account, this.state.merchantSubDomain, this.setData);
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

    getMerchant = () => {
        getMerchant(this.setData, this.getMerchantID());
    };


    render() {
        const {messageMerchant, messageError, isLoggingFB} = this.state;
        return (
            <div className={styles.login}>
                {messageMerchant && this.renderMessageError(messageMerchant)}
                {messageError && this.renderMessageError(messageError)}
                <SignInFB disable={messageMerchant || isLoggingFB} signIn={this.signInFB} isLogging={isLoggingFB}/>
                <SignInGoogle disable={messageMerchant || isLoggingFB}/>
            </div>
        );
    }
}

export default withRouter(translate(props => props.namespaces)(SignInForm));
