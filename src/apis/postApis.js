import axios from "axios";
import {MERCHANT_API_URL, PUBLIC_MERCHANT_API_URL} from "../constants/env";
import {isLoggedIn} from "../helpers/auth";

export function addPostApi({body, image_ids}) {
    let url = MERCHANT_API_URL + `v1/post`;
    return axios.post(url, {
        body: body,
        image_ids: image_ids
    });
}

export function editPostApi({body, image_ids, id}) {
    let url = MERCHANT_API_URL + `v1/post/${id}`;
    return axios.put(url, {
        body: body,
        image_ids: image_ids
    });
}

export function getPostsApi(postID) {
    let url;
    if (isLoggedIn()) {
        url = MERCHANT_API_URL + `v1/load-post`;
    } else {
        url = PUBLIC_MERCHANT_API_URL + `v1/load-post`;
    }
    return axios.get(url, {
            params: {
                post_id: postID
            }
        }
    );
}

export function getPostsByUserApi(userID, postID) {
    let url = MERCHANT_API_URL + `v1/user/${userID}/post`;
    return axios.get(url, {
            params: {
                post_id: postID
            }
        }
    );
}

export function getHotPostsApi() {
    let url = MERCHANT_API_URL + `v1/post/list/top`;
    return axios.get(url);
}

export function getPostApi(postID) {
    let url;
    if (isLoggedIn()) {
        url = MERCHANT_API_URL + `v1/post/${postID}`;
    } else {
        url = PUBLIC_MERCHANT_API_URL + `v1/post/${postID}`;
    }
    return axios.get(url);
}

export function upVoteApi(postID) {
    let url = MERCHANT_API_URL + `v1/post/${postID}/vote/up`;
    return axios.post(url);
}

export function downVoteApi(postID) {
    let url = MERCHANT_API_URL + `v1/post/${postID}/vote/down`;
    return axios.post(url);
}

export function deletePostApi(postID) {
    let url = MERCHANT_API_URL + `v1/post/${postID}/hide`;
    return axios.put(url);
}
