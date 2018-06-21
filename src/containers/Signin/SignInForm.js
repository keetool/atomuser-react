import React from "react";
import {Form, Alert} from "antd";
import styles from "./styles.less";
import {translate} from "react-i18next";
import {signin} from "../../actions/signinActions";
import SignInFB from "./SignInFB";
import SignInGoogle from "./SignInGoogle";

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.setData = this.setState.bind(this);
    }

    state = {
        isLoading: false,
        messageError: false
    };

    handleSubmit = values => {
        signin(values, this.setData);
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

    render() {
        return (
            <div className={styles.login}>
                <SignInFB/>
                <SignInGoogle/>
            </div>
        );
    }
}

export default translate(props => props.namespaces)(Form.create()(SignInForm));
