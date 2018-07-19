import axios from "axios";
import {PUBLIC_MERCHANT_API_URL} from "../constants/env";

export function newUsersApi() {
    let url = PUBLIC_MERCHANT_API_URL + `v1/user/list/new`;
    return axios.get(url);
}
