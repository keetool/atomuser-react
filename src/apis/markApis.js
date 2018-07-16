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

export function getMarkPostsBySubdomain(id) {
    let url = MERCHANT_API_URL + `v1/user/bookmark/by-sub-domain/after/${id}`;
    return axios.get(url);
}

export function getAllMarkPosts(id) {
    let url = MERCHANT_API_URL + `v1/user/bookmark/after/${id}`;
    return axios.get(url);
}
