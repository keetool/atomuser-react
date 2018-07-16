import axios from "axios";
import {DOMAIN, MERCHANT_API_URL, PROTOCOL} from "../constants/env";

export function signinApi(account) {
    let url = MERCHANT_API_URL + `v1/auth/signin`;
    return axios.post(url, {
        email: account.username,
        password: account.password
    });
}

export function signinFBApi(account = {}, merchantSubDomain) {
    const domainMerchant = `${PROTOCOL}${merchantSubDomain}.${DOMAIN}`;

    let url = domainMerchant + 'client-api/' + `v1/auth/facebook/token-signin`;
    return axios.post(url, {
        input_token: account.accessToken,
        facebook_id: account.userID
    });
}

export function signinGoogleApi(account = {}, merchantSubDomain) {
    const domainMerchant = `${PROTOCOL}${merchantSubDomain}.${DOMAIN}`;

    let url = domainMerchant + 'client-api/' + `v1/auth/google/token-signin`;
    return axios.post(url, {
        input_token: account.id_token,
    });
}
