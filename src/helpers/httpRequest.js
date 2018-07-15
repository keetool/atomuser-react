import i18n from "../languages/i18n";
import {signout} from "./auth";

export function httpSuccess(status) {
    return status == 200 || status == 201;
}

function getMessageBadRequest(error) {
    if ((typeof error) === "string") {
        return error;
    } else {
        let text = "";
        error.map((message) => {
            text += message + '\n';
        });

        text.substring(0, text.length - 3);
        return text;
    }
}

export function messageHttpRequest(error = {}) {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                signout();
                return;
            case 404:
                return 'not_found';
            case 400:
                return getMessageBadRequest(error.response.data);
            default:
                return i18n.t("manage.error.message.there_are_errors");
        }
    } else if (error.request) {
        return i18n.t("manage.error.message.please_check_network");
    } else {
        return i18n.t("manage.error.message.there_are_errors");
    }
}

export function messageHttpRequestSignIn(error) {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                return i18n.t("manage.login.form.please_check_info_account");
        }
    }

    return messageHttpRequest(error);
}
