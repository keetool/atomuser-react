import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function searchApi(search = '', postID = '') {
    let url = MERCHANT_API_URL + `v1/search`;
    return axios.get(url, {
        params: {
            search: search,
            postID: postID
        }
    });
}