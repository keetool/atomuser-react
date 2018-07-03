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
        this._onBlur();
        this._ref.innerHTML = "";
        this.props.addComment(data);
    };

    onKeyPress = (e) => {
        const {store} = this.props;
        if (e.which === 13 && !e.shiftKey) {
            store.addComment(
                {
                    value: this._ref.innerHTML
                }
                , this.uploadSuccess);
            e.preventDefault();
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


    render() {
        const {account, t, style, store} = this.props;
        const {isFocus, isUploading} = store;
        const avatarUrl = account && account.avatar_url ? account.avatar_url : LOGO;
        return (
            <div
                className={cx({
                    "layout-editor": true,
                })}
                style={style}
            >
                <div
                    className={cx({
                        "container": true
                    })}
                >
                    <Avatar url={avatarUrl} style={{cursor: "pointer"}}/>
                    <div
                        className={cx({
                            "editor": true,
                            "focus": isFocus,
                            "border": isFocus || isUploading,
                            "uploading-comment": isUploading,
                            "disable": isUploading
                        })}
                        contentEditable={!isUploading}
                        onFocus={this._onFocus}
                        onBlur={this._onBlur}
                        ref={(ref) => {
                            this._ref = ref;
                        }}
                        placeholder={t('social.editor_comment.form.placeholder')}
                        onKeyUp={this._checkEmpty}
                        onKeyPress={this.onKeyPress}
                    >
                    </div>
                    {
                        isUploading &&
                        <div className={cx("uploading")}>
                            <Spin indicator={IconUpLoading}/>
                        </div>
                    }

                </div>
            </div>
        );
    }
}

EditorComment.propTypes = {
    addComment: PropTypes.func,
    store: PropTypes.object.isRequired,
    style: PropTypes.object
};

export default translate(props => props.namespaces)(withAccount(EditorComment));