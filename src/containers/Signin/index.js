import React from "react";
import SignInForm from "./SignInForm";
import styles from "./styles.less";
import Logo from '../../components/static/Logo';
import {translate} from "react-i18next";
import LogoText from "../../components/static/LogoText";
import {capitalizeFirstLetter} from "../../helpers/utility";

class SignInContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {t} = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Logo isContrast size={80}/>
                            <LogoText isContrast size={50}/>
                        </div>
                        <div className={styles.desc}>{
                            capitalizeFirstLetter(t("social.login.form.description"))}
                        </div>
                    </div>
                    <div className={styles.main}>
                        <SignInForm/>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles['text-forgot']}>
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

SignInContainer.propTypes = {};

export default translate(props => props.namespaces)(SignInContainer);
