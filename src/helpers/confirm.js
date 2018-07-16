import {Modal} from 'antd';
import {isEmpty} from "./utility";
import {translateI18n} from "../languages/i18n";

export function showDeleteConfirm(title, content = '', okFunc, cancelFun, okText, cancelText) {
    Modal.confirm({
        title: isEmpty(title) ? translateI18n('social.global.are_you_sure_delete') : title,
        content: content,
        okText: isEmpty(okText) ? translateI18n('social.global.yes') : okText,
        okType: 'danger',
        cancelText: isEmpty(cancelText) ? translateI18n('social.global.no') : cancelText,
        onOk: () => {
            console.log("ok");
            if (okFunc) {
                okFunc();
            }
        },
        onCancel: () => {
            if (cancelFun) {
                cancelFun();
            }
        },
    });
}

export function showWarningConfirm(title, content = '', okFunc, cancelFun, okText, cancelText) {
    Modal.confirm({
        title: isEmpty(title) ? translateI18n('social.global.are_you_sure') : title,
        content: content,
        okText: isEmpty(okText) ? translateI18n('social.global.yes') : okText,
        okType: 'danger',
        cancelText: isEmpty(cancelText) ? translateI18n('social.global.no') : cancelText,
        onOk: () => {
            console.log("ok");
            if (okFunc) {
                okFunc();
            }
        },
        onCancel: () => {
            if (cancelFun) {
                cancelFun();
            }
        },
    });
}