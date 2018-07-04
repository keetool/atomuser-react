import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function addPostApi(data = {}) {
    let url = MERCHANT_API_URL + `v1/post`;
    return axios.post(url, {
        body: data.body,
        image_ids: data.image_ids
    });
}

export function getPostsApi(postID) {
    let url = MERCHANT_API_URL + `v1/load-post`;
    return axios.get(url, {
            params: {
                post_id: postID
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
