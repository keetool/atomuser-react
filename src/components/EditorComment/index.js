import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {withAccount} from "../context/AccountContext";
import Avatar from "../Avatar";
import {LOGO} from "../../constants";
import {translate} from "react-i18next";
import {Alert, Icon, Spin} from "antd";
import {observer} from "mobx-react";
import {isLoggedIn, redirectSignIn} from "../../helpers/auth";
import {convertDataPastedEditor} from "../../helpers/editor";

let cx = classNamesBind.bind(styles);

const IconUpLoading = <Icon type="loading" style={{fontSize: 24}} spin/>;

@observer
class EditorComment extends React.Component {

    _onFocus = () => {
        const {store} = this.props;
        store.setFocusEditor(true);
    };

    _onBlur = () => {
        const {store} = this.props;
        store.setFocusEditor(false);
    };

    //empty editor when current content has <br>
    _checkEmpty = () => {
        if (this._ref.innerHTML == '<br>') {
            this._ref.innerHTML = '';
        }
    };

    uploadSuccess = (data) => {
        const {store} = this.props;
        this._onBlur();
        this._ref.innerHTML = "";
        store.reset();
        this.props.addComment(data);
    };

    setContent = () => {
        const {store} = this.props;
        setTimeout(() => {
            store.setContent(this._ref.innerHTML);
            store.setLineNumber(this._ref.childElementCount);
        }, 100);
    };

    onKeyPress = (e) => {

        const {store} = this.props;
        if (e.which === 13 && !e.shiftKey) {
            store.addComment(
                {
                    value: store.content
                }
                , this.uploadSuccess);
            e.preventDefault();
        }

        this._checkEmpty();

        this.setContent();
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

    renderEditor = () => {
        const {t, store, prefixCls, account} = this.props;
        if (!isLoggedIn()) {
            return (
                <div className={cx(`${prefixCls}-signin-to-comment`)} onClick={() => {
                    redirectSignIn();
                }}>
                    {t('social.editor_comment.form.button_signin_to_comment')}
                </div>
            );
        }

        const {joined, isJoining, onJoin} = account;

        if (!joined) {
            return (
                <div
                    className={cx(`${prefixCls}-signin-to-comment`)}
                    onClick={isJoining ? null : onJoin}
                >
                    {t('social.editor_comment.form.button_join_to_comment')}
                </div>
            );
        }

        const {isFocus, isUploading} = store;
        return (
            <div
                className={cx({
                    [`${prefixCls}-editor`]: true,
                    [`${prefixCls}-focus`]: isFocus,
                    [`${prefixCls}-border`]: isFocus || isUploading,
                    [`${prefixCls}-uploading-comment`]: isUploading,
                    [`${prefixCls}-disable`]: isUploading
                })}
                contentEditable={!isUploading}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                ref={(ref) => {
                    this._ref = ref;
                }}
                placeholder={t('social.editor_comment.form.placeholder')}
                onKeyPress={this.onKeyPress}
                onPaste={this.handlePaste}
            />
        );
    };


    render() {
        const {account, style, store, prefixCls} = this.props;
        const {isUploading} = store;
        const avatarUrl = account && account.avatar_url ? account.avatar_url : LOGO;
        return (
            <div
                className={cx(`${prefixCls}-layout-editor`)}
                style={style}
            >
                <div
                    className={cx(`${prefixCls}-container`)}
                >
                    <Avatar url={avatarUrl} style={{cursor: "pointer"}}/>
                    {
                        this.renderEditor()
                    }
                    {
                        isUploading &&
                        <div className={cx(`${prefixCls}-uploading`)}>
                            <Spin indicator={IconUpLoading}/>
                        </div>
                    }

                </div>
            </div>
        );
    }
}

EditorComment.defaultProps = {
    prefixCls: 'editor-comment'
};

EditorComment.propTypes = {
    addComment: PropTypes.func,
    store: PropTypes.object.isRequired,
    style: PropTypes.object
};

export default translate(props => props.namespaces)(withAccount(EditorComment));