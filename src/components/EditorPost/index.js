import React from 'react';
// import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {withAccount} from "../context/AccountContext";
import Avatar from "../Avatar";
import {LOGO} from "../../constants";
import {translate} from "react-i18next";
import {Alert, Button, Progress} from "antd";
import progress from '../../helpers/progress';
import {addPost} from "../../actions/postActions";

let cx = classNamesBind.bind(styles);


class EditorPost extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setData = this.setState.bind(this);
    }

    state = {
        isFocus: false,
        percentUpload: 0,
        isUploading: false,
        error: null,
    };


    componentDidMount() {
        progress.init(this.setData, 'percentUpload', {
            trickleRate: 0.1,
            trickleSpeed: 500,
        });
        progress.start();
        setTimeout(function () {
            progress.done();
        }, 5000);
    }

    _onFocus = () => {
        this.setState({isFocus: true});
        console.log("focus");
    };

    _onBlur = () => {
        this.setState({isFocus: false});
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
        console.log("success");
        this.props.addPost(data);
        this._ref.innerHTML = '';
    };

    submitPost = () => {
        addPost(this.setData, {
            title: "title",
            body: this._ref.innerHTML
        }, this.uploadPostSuccess);
    };

    render() {
        const {account, t} = this.props;
        const {isFocus, percentUpload, error, isUploading} = this.state;
        const avatarUrl = account && account.avatar_url ? account.avatar_url : LOGO;
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

EditorPost.propTypes = {};

export default translate(props => props.namespaces)(withAccount(EditorPost));