import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function addCommentApi(postID, data = {}) {
    let url = MERCHANT_API_URL + `v1/post/${postID}/comment`;
    console.log(data);
    return axios.post(url, {
        value: data.value
    });
}

export function getCommentsApi(postID, page) {
    let url = MERCHANT_API_URL + `v1/post/${postID}/comment`;
    return axios.get(url, {
            params: {
                page: page
            }
        }
    );
}