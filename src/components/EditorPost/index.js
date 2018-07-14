import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {withAccount} from "../context/AccountContext";
import Avatar from "../Avatar";
import {LOGO} from "../../constants";
import {translate} from "react-i18next";
import {Alert, Button, Progress} from "antd";
import Store from './Store';
import {observer} from "mobx-react";
import Action from "./Action";
import LayoutImage from "./upload/LayoutImage";
import {isEmptyArr} from "../../helpers/utility";
import {isLoggedIn, redirectSignIn} from "../../helpers/auth";
import {messageWarning} from "../../helpers/message";
import {
    convertDataPastedEditor,
} from "../../helpers/editor";

let cx = classNamesBind.bind(styles);

@observer
class EditorPost extends React.Component {

    store = new Store();

    _onFocus = () => {
        this.store.setFocusEditor(true);
    };

    _onBlur = () => {
        this.store.setFocusEditor(false);
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

    clearData = () => {
        this._ref.innerHTML = '';
        this.store.reset();
    };

    uploadPostSuccess = (data) => {
        this.props.addPost(data);
        this.clearData();
        this._onBlur();
    };

    submitPost = () => {
        this.store.addPost({
                body: this.store.content,
                image_ids: JSON.stringify(this.store.getIdImages())
            },
            this.uploadPostSuccess
        );
    };

    onSelectImageToUpload = (files) => {
        const {t} = this.props;
        let images = Array.from(files);
        if (images.length > 10) {
            messageWarning(t('social.editor.Noti.limit_file_upload'));
            images = images.slice(0, 10);
        }
        images = images.map((image) => {
                return {file: image};
            }
        );
        this.store.addImages(images);
    };

    renderSubmit = () => {
        const {t} = this.props;
        if (isLoggedIn()) {
            return (
                <Button
                    type="primary"
                    onClick={this.submitPost}
                    style={{width: '100%'}}
                >
                    {t('social.editor.form.button_post')}
                </Button>
            );
        } else {
            return (
                <Button
                    type="primary"
                    onClick={() => {
                        redirectSignIn();
                    }}
                    style={{width: '100%'}}
                >
                    {t('social.editor.form.button_signin_to_post')}
                </Button>
            );
        }
    };

    handlePaste = (e) => {
        e.stopPropagation();
        e.preventDefault();

        let clipboardData = e.clipboardData || window.clipboardData;
        let pastedData = clipboardData.getData('text/plain');

        pastedData = convertDataPastedEditor(pastedData);

        document.execCommand('insertHtml', false, pastedData);

        this.store.setContent(this._ref.innerHTML);
        this.store.setLineNumber(this._ref.childElementCount);
    };

    onKeyPress = () => {
        this._checkEmpty();

        this.store.setContent(this._ref.innerHTML);
        this.store.setLineNumber(this._ref.childElementCount);
    };

    render() {
        const {account, t, prefixCls} = this.props;
        const {isFocus, percentUpload, error, isUploading, images, isZoomText} = this.store;
        const avatarUrl = account && account.avatar_url ? account.avatar_url : LOGO;
        const placeHolderEditor = isLoggedIn() ? t('social.editor.form.placeholder') : t('social.editor.form.placeholder_need_signin');
        return (
            <div
                className={cx(
                    `${prefixCls}-layout-editor`, {
                        [`${prefixCls}-disable`]: isUploading
                    })}
            >
                <div
                    className={cx(`${prefixCls}-container`)}
                >
                    <Avatar url={avatarUrl} size={40}/>
                    <div
                        className={cx(`${prefixCls}-editor`, {
                            [`${prefixCls}-zoom-text`]: isFocus && isZoomText,
                        })}
                        contentEditable={!isUploading}
                        onFocus={this._onFocus}
                        ref={(ref) => {
                            this._ref = ref;
                        }}
                        onPaste={this.handlePaste}
                        placeholder={placeHolderEditor}
                        onKeyUp={this.onKeyPress}
                    />
                </div>

                {
                    !isEmptyArr(images) &&
                    <LayoutImage images={images} store={this.store}/>
                }
                {
                    isFocus && isLoggedIn() &&
                    <div>
                        <div className={cx(`${prefixCls}-divider`, `${prefixCls}-horizontal`)}/>
                        <Action onSelectImageToUpload={this.onSelectImageToUpload}/>
                    </div>

                }

                {error && this.renderMessageError(error)}

                {
                    isFocus &&
                    (
                        <div className={cx(`${prefixCls}-container-action`)}>
                            {isUploading ?
                                (
                                    <Progress percent={percentUpload * 100} status="active" showInfo={false}/>
                                )
                                :
                                (
                                    this.renderSubmit()
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

EditorPost.defaultProps = {
    prefixCls: 'editor-post'
};

EditorPost.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default translate(props => props.namespaces)(withAccount(EditorPost));