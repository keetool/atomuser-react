import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function getNotificationsApi(notiID = '') {
    let url = MERCHANT_API_URL + `v1/user/notification/after/${notiID}`;

    return axios.get(url);
}

export function getNotificationsByMerchantApi(notiID = '') {
    let url = MERCHANT_API_URL + `v1/user/notification/merchant/after/${notiID}`;

    return axios.get(url);
}

export function clickedNotificationApi(notiID) {
    let url = MERCHANT_API_URL + `v1/user/notification/${notiID}/click`;

    return axios.put(url);
}
