import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function profileApi() {
    let url = MERCHANT_API_URL + `v1/user`;
    return axios.get(url);
}

export function editInfoUserApi({name, username, email, avatar_url, phone}) {
    let url = MERCHANT_API_URL + `v1/user/`;
    return axios.put(url, {
            name: name,
            username: username,
            email: email,
            avatar_url: avatar_url,
            phone: phone,
        }
    );
}

export function joinMerchantApi() {
    let url = MERCHANT_API_URL + `v1/user/join-merchant`;
    return axios.put(url);
}
