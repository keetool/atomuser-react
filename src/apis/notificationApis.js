import axios from "axios";
import {MERCHANT_API_URL, PUBLIC_MERCHANT_API_URL} from "../constants/env";
import {isLoggedIn} from "../helpers/auth";

export function getNotificationsApi(notiID) {
    let url = MERCHANT_API_URL + `v1/user/notification`;

    return axios.get(url, {
            params: {
                noti_id: notiID,
            }
        }
    );
}
