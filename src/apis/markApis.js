import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function addMarkPostApi(postID) {
    let url = MERCHANT_API_URL + `v1/user/bookmark/post/${postID}`;
    return axios.post(url);
}

export function deleteMarkPostApi(postID) {
    let url = MERCHANT_API_URL + `v1/user/bookmark/post/${postID}`;
    return axios.delete(url);
}

export function getMarkPostsBySubdomain() {
    let url = MERCHANT_API_URL + `v1/user/bookmark/by-sub-domain`;
    return axios.get(url);
}

export function getAllMarkPosts() {
    let url = MERCHANT_API_URL + `v1/user/bookmark`;
    return axios.get(url);
}
