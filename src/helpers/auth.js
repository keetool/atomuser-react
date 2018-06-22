import history from "./history";
import {redirectURL} from "./utility";
import {TOKEN_EXPIRED_TIME} from "../constants";
import {DOMAIN, IS_PRODUCTION, PROTOCOL, PROTOCOL_DOMAIN, SUBDOMAIN} from "../constants/env";
import {deleteCookie, getCookie, setCookie} from "./cookie";

export function getToken() {
    const token = getCookie("atomuser_token");
    if (token) {
        return token;
    }
    redirectSignedOut();
}

export function isLoggedIn() {
    const token = getCookie("atomuser_token");
    if (token) {
        return true;
    }
    return false;
}

export function saveToken(token, expires_in = TOKEN_EXPIRED_TIME) {
    if (IS_PRODUCTION) {
        setCookie("atomuser_token", token, expires_in, '.' + DOMAIN, true);
    } else {
        setCookie("atomuser_token", token, expires_in);
    }

}

export function clearToken() {
    if (IS_PRODUCTION) {
        deleteCookie("atomuser_token", '.' + DOMAIN);
    } else {
        deleteCookie("atomuser_token");
    }
}

export function getRefreshToken() {
    const token = getCookie("atomuser_refresh_token");
    if (token) {
        return token;
    }
    return null;
}

export function saveRefreshToken(token, expires_in = TOKEN_EXPIRED_TIME) {
    if (IS_PRODUCTION) {
        setCookie("atomuser_refresh_token", token, expires_in, '.' + DOMAIN, true);
    } else {
        setCookie("atomuser_refresh_token", token, expires_in);
    }
}

export function clearRefreshToken() {
    if (IS_PRODUCTION) {
        deleteCookie("atomuser_refresh_token", '.' + DOMAIN);
    } else {
        deleteCookie("atomuser_refresh_token");
    }
}

export function signout() {
    clearToken();
    clearRefreshToken();
    redirectSignedOut();
}

export function signInFB(callback) {
    if (IS_PRODUCTION) {
        /*eslint-disable*/
        FB.login((response) => {
            if (response && response.authResponse) {
                callback(response.authResponse);
            }
        }, {scope: 'public_profile,email'});
        /*eslint-disable*/
    } else {
        const account = {
            accessToken: "EAAceU4B1yBEBAEeGOSCp5Mm8q4ZBvw7f0gDbdhDZAhKznvMODK9XJgq03DmZCz5udtGzriyHTZAQ7kdg7mjgLntbFwiHgZC3QENz8a5jTjCVoZCcB8FcNwZBNXzBZBodF7ZAoQHZAhnWCKKTbg85fDQAEmiLowxt7l01V37BrDq0u6FDV5bCAEXWCVgc5cUl94uQD3EiVZCvRSpdAZDZD",
            userID: "622242781443804"
        };
        callback(account);
    }
}

export function redirectSignedIn(merchantSubDomain) {
    if (IS_PRODUCTION) {
        const domainMerchant = `${PROTOCOL}${merchantSubDomain}.${DOMAIN}`;
        redirectURL(domainMerchant + 'manage');
    } else {
        history.push('/');
    }
}

export function redirectSignedOut() {
    if (IS_PRODUCTION) {
        const url = `${PROTOCOL_DOMAIN}signin?merchant=${SUBDOMAIN}`;
        redirectURL(url);
    } else {
        redirectURL("/signin?merchant=" + SUBDOMAIN);
    }
}
