import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {withAccount} from "../context/AccountContext";
import Avatar from "../Avatar";
import {LOGO} from "../../constants";
import {translate} from "react-i18next";
import {Alert, Button, Progress} from "antd";
import store from './store';
import {observer} from "mobx-react";

let cx = classNamesBind.bind(styles);

@observer
class EditorPost extends React.Component {
    _onFocus = () => {
        store.setFocusEditor(true);
    };

    _onBlur = () => {
        store.setFocusEditor(false);
    };

    //empty editor when current content has <br>
    _checkEmpty = () => {
        if (this._ref.innerHTML == '<br>') {
            this._ref.innerHTML = '';
        }
    };

    renderMessageError = content => {
        return (
            <Alert
                style={{marginTop: 20, marginBottom: 20}}
                message={content}
                type="error"
                showIcon
            />
        );
    };

    uploadPostSuccess = (data) => {
        this.props.addPost(data);
        this._ref.innerHTML = '';
        this._onBlur();
    };

    submitPost = () => {
        store.addPost({
            title: "title",
            body: this._ref.innerHTML
        }, this.uploadPostSuccess);
    };

    render() {
        const {account, t} = this.props;
        const {isFocus, percentUpload, error, isUploading} = store;
        const avatarUrl = account && account.avatar_url ? account.avatar_url : LOGO;
        console.log("Render editor");
        return (
            <div
                className={cx({
                    "layout-editor": true,
                    "disable": isUploading
                })}
                onBlur={() => console.log("blur")}
            >
                <div
                    className={cx({
                        "container": true
                    })}
                >
                    <Avatar url={avatarUrl} size={40}/>
                    <div
                        className={cx({
                            "editor": true,
                            "focus": isFocus,
                        })}
                        contentEditable={!isUploading}
                        onFocus={this._onFocus}
                        ref={(ref) => {
                            this._ref = ref;
                        }}
                        placeholder={t('social.editor.form.placeholder')}
                        onKeyUp={this._checkEmpty}
                    >
                    </div>
                </div>
                {error && this.renderMessageError(error)}

                {
                    isFocus &&
                    (
                        <div className={cx({
                            "container-action": true
                        })}>
                            {isUploading ?
                                (
                                    <Progress percent={percentUpload * 100} status="active" showInfo={false}/>
                                )
                                :
                                (
                                    <Button
                                        type="primary"
                                        onClick={this.submitPost}
                                        style={{width: '100%'}}
                                    >
                                        {t('social.editor.form.button_post')}
                                    </Button>
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

EditorPost.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default translate(props => props.namespaces)(withAccount(EditorPost));