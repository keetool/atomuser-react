import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function getNotificationsApi(notiID) {
    let url = MERCHANT_API_URL + `v1/user/notification`;

    return axios.get(url, {
            params: {
                noti_id: notiID,
            }
        }
    );
}

export function seenNotificationApi(notiID) {
    let url = MERCHANT_API_URL + `v1/user/notification/${notiID}/seen`;

    return axios.put(url);
}
