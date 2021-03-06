import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function infoUserApi(userID) {
    let url = MERCHANT_API_URL + `v1/user/${userID}/profile`;
    return axios.get(url);
}

