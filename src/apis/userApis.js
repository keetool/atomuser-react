import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function newUsersApi() {
    let url = MERCHANT_API_URL + `v1/user/list/new`;
    return axios.get(url);
}
