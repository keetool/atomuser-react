import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {withAccount} from "../context/AccountContext";
import Avatar from "../Avatar";
import {LOGO} from "../../constants";
import {translate} from "react-i18next";
import {Alert} from "antd";
import Store from './Store';
import {observer} from "mobx-react";

let cx = classNamesBind.bind(styles);

@observer
class EditorComment extends React.Component {
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

    onKeyPress = (e) => {
        console.log(e.which);
        if (e.which === 13 && !e.shiftKey) {
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
        const {account, t, style} = this.props;
        const {isFocus, error, isUploading} = this.store;
        const avatarUrl = account && account.avatar_url ? account.avatar_url : LOGO;
        return (
            <div
                className={cx({
                    "layout-editor": true,
                    "disable": isUploading
                })}
                style={style}
            >
                <div
                    className={cx({
                        "container": true
                    })}
                >
                    <Avatar url={avatarUrl}/>
                    <div
                        className={cx({
                            "editor": true,
                            "focus": isFocus,
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
                </div>
                {error && this.renderMessageError(error)}
            </div>
        );
    }
}

EditorComment.propTypes = {
    addPost: PropTypes.func,
    style: PropTypes.object
};

export default translate(props => props.namespaces)(withAccount(EditorComment));