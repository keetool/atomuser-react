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
import {getValueObjectFromStringKey, isEmpty, isEmptyArr} from "../../helpers/utility";
import {isLoggedIn, redirectSignIn} from "../../helpers/auth";
import {messageWarning} from "../../helpers/message";
import {
    convertDataBeforeAddEditor,
    convertDataPastedEditor,
} from "../../helpers/editor";

let cx = classNamesBind.bind(styles);

@observer
class EditorPost extends React.Component {
    constructor(props) {
        super(props);
        this.store = new Store(props.post);
        if (props.post) {
            this.defaultValue = convertDataBeforeAddEditor(props.post.body);
            this._onFocus();
        } else {
            this.defaultValue = '';
        }

    }

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
        const {post} = this.props;

        this.clearData();
        this._onBlur();

        const isEditPost = !isEmpty(getValueObjectFromStringKey(post, 'id'));

        if (isEditPost) {
            this.props.editPost(data);
        } else {
            this.props.addPost(data);
        }
    };

    submitAddPost = () => {
        this.store.addPost(this.uploadPostSuccess);
    };

    submitEditPost = () => {
        this.store.editPost(this.uploadPostSuccess);
    };

    onSelectImageToUpload = (files) => {
        const {t} = this.props;
        const {images} = this.store;
        let imageFiles = Array.from(files);
        if (imageFiles.length + images.length > 10) {
            messageWarning(t('social.editor.noti.limit_file_upload'));
            imageFiles = imageFiles.slice(0, 10 - images.length);
        }

        if (imageFiles.length <= 0) return;

        imageFiles = imageFiles.map((image) => {
                return {file: image};
            }
        );
        this.store.addImages(imageFiles);
    };

    renderSubmit = () => {
        const {t, post} = this.props;
        const isEditPost = !isEmpty(getValueObjectFromStringKey(post, 'id'));

        if (isLoggedIn()) {
            if (isEditPost) {
                return (
                    <Button
                        type="primary"
                        onClick={this.submitEditPost}
                        style={{width: '100%'}}
                    >
                        {t('social.editor.form.button_edit_post')}
                    </Button>
                );
            }
            return (
                <Button
                    type="primary"
                    onClick={this.submitAddPost}
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

        this.setContent();
    };

    setContent = () => {
        setTimeout(() => {
            this.store.setContent(this._ref.innerHTML);
            this.store.setLineNumber(this._ref.childElementCount);
        }, 100);
    };

    onKeyPress = () => {
        this._checkEmpty();

        this.setContent();
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
                        dangerouslySetInnerHTML={{__html: this.defaultValue}}
                    />
                </div>

                {
                    !isEmptyArr(images) &&
                    <LayoutImage
                        images={images} store={this.store}
                        onSelectImageToUpload={this.onSelectImageToUpload}
                    />
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
    addPost: PropTypes.func,
    editPost: PropTypes.func,
    post: PropTypes.object,
};

export default translate(props => props.namespaces)(withAccount(EditorPost));