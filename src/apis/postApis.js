import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function addPostApi(data = {}) {
    let url = MERCHANT_API_URL + `v1/post`;
    return axios.post(url, {
        title: data.title,
        body: data.body
    });
}

export function getPostsApi(page = 1) {
    let url = MERCHANT_API_URL + `v1/post`;
    return axios.get(url, {
            params: {
                page: page
            }
        }
    );
}

export function upVoteApi(postID) {
    let url = MERCHANT_API_URL + `v1/post/${postID}/vote/up`;
    return axios.post(url);
}

export function downVoteApi(postID) {
    let url = MERCHANT_API_URL + `v1/post/${postID}/vote/down`;
    return axios.post(url);
}
