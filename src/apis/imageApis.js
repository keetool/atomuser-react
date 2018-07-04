import {MERCHANT_API_URL} from "../constants/env";
import {getToken} from "../helpers/auth";

export function uploadImageApi(file, completeHandler, progressHandler, error) {
    let url = MERCHANT_API_URL + `v1/image`;

    let formData = new FormData();
    formData.append('image', file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    ajax.setRequestHeader('Authorization', 'Bearer ' + getToken());
    ajax.send(formData);
}
