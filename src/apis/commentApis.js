import axios from "axios";
import {MERCHANT_API_URL} from "../constants/env";

export function addCommentApi(postID, data = {}) {
    let url = MERCHANT_API_URL + `v1/post/${postID}/comment`;
    return axios.post(url, {
        value: data.value
    });
}

export function getCommentsApi(postID, commentID = '', limit = '') {
    let url = MERCHANT_API_URL + `v1/post/${postID}/load-comment`;
    return axios.get(url, {
            params: {
                comment_id: commentID,
                limit: limit
            }
        }
    );
}

export function upVoteApi(postID) {
    let url = MERCHANT_API_URL + `v1/comment/${postID}/vote/up`;
    return axios.post(url);
}

export function downVoteApi(postID) {
    let url = MERCHANT_API_URL + `v1/comment/${postID}/vote/down`;
    return axios.post(url);
}
