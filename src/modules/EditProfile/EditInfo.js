import React from "react";
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import Form from '../../components/common/Form';
import FormInput from "../../components/common/FormInput";
import FormButton from "../../components/common/FormButton";
import {Alert} from "antd";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import {observer} from "mobx-react";
import Icon from "../../components/common/Icon";

let cx = classNamesBind.bind(styles);

@observer
class EditInfo extends React.Component {
    componentDidMount() {
    }

    updateProfileSuccess = (data) => {
        const {account} = this.props;
        account.updateAccount({...account, ...data});
    };

    handleSubmit = (data) => {
        const {store, account} = this.props;
        store.editInfoProfile({...account, ...data}, this.updateProfileSuccess);

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
        const {t, prefixCls, store, account} = this.props;
        const {isUploading, errorUpload} = store;
        const {name, username, phone, email} = account;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: t("social.edit_profile.form.please_input_your_name")
                            }
                        ]}
                        defaultValue={name}
                        prefix={<Icon type="solution"/>}
                        suffix={<Icon type="close-circle"/>}
                        suffixClear
                        placeholder={t("social.edit_profile.form.placeholder_name")}
                    />
                    <FormInput
                        name="username"
                        prefix={<Icon type="user"/>}
                        suffix={<Icon type="close-circle"/>}
                        suffixClear
                        defaultValue={username}
                        placeholder={t("social.edit_profile.form.placeholder_username")}
                    />
                    <FormInput
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: t("social.edit_profile.form.email_invalid"),
                            }
                        ]}
                        prefix={<Icon type="mail"/>}
                        suffix={<Icon type="close-circle"/>}
                        suffixClear
                        type="email"
                        defaultValue={email}
                        placeholder={t("social.edit_profile.form.placeholder_email")}
                    />
                    <FormInput
                        name="phone"
                        prefix={<Icon type="phone"/>}
                        suffix={<Icon type="close-circle"/>}
                        suffixClear
                        defaultValue={phone}
                        placeholder={t("social.edit_profile.form.placeholder_phone")}
                    />

                    {
                        !isUploading &&
                        errorUpload &&
                        this.renderMessageError(errorUpload)
                    }

                    <FormButton
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className={cx(`${prefixCls}-info-submit`)}
                        loading={isUploading}
                    >
                        {t("social.edit_profile.form.submit")}
                    </FormButton>
                </Form>
            </div>
        );
    }
}

EditInfo.defaultProps = {
    prefixCls: 'module-edit-profile'
};

EditInfo.propTypes = {
    store: PropTypes.object.isRequired
};

export default translate(props => props.namespaces)(EditInfo);
