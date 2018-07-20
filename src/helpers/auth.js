import {redirectURL} from "./utility";
import {FACEBOOK_ID, TOKEN_EXPIRED_TIME, TOKEN_FACEBOOK} from "../constants";
import {DOMAIN, IS_PRODUCTION, PROTOCOL, PROTOCOL_DOMAIN, SUBDOMAIN} from "../constants/env";
import {deleteCookie, getCookie, setCookie} from "./cookie";
import i18n from "../languages/i18n";

export function getToken() {
    const token = getCookie("atomuser_token");
    if (token) {
        return token;
    }
    redirectSignedOut();
}

export function getAccountID() {
    const accountID = getCookie("atomuser_account_id");
    if (accountID) {
        return accountID;
    }
    redirectSignedOut();
}

export function isLoggedIn() {
    return getCookie("atomuser_token") && getCookie("atomuser_account_id");
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

export function saveAccountID(account_id, expires_in = TOKEN_EXPIRED_TIME) {
    if (IS_PRODUCTION) {
        setCookie("atomuser_account_id", account_id, expires_in, '.' + DOMAIN, true);
    } else {
        setCookie("atomuser_account_id", account_id, expires_in);
    }

}

export function clearAccountID() {
    if (IS_PRODUCTION) {
        deleteCookie("atomuser_account_id", '.' + DOMAIN);
    } else {
        deleteCookie("atomuser_account_id");
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

export function signout(isRefresh) {
    clearToken();
    clearRefreshToken();
    if (isRefresh) {
        redirectSignedIn(SUBDOMAIN);
    } else {
        redirectSignedOut();
    }
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
            accessToken: TOKEN_FACEBOOK,
            userID: FACEBOOK_ID
        };
        callback(account);
    }
}

export async function signInGoogle(auth, callback) {

    let GoogleUser = await auth.signIn();
    console.log(GoogleUser.getAuthResponse().id_token);
    callback({id_token: GoogleUser.getAuthResponse().id_token});
}

export function redirectSignedIn(merchantSubDomain) {
    if (IS_PRODUCTION) {
        const domainMerchant = `${PROTOCOL}${merchantSubDomain}.${DOMAIN}?lang=${i18n.language}`;
        redirectURL(domainMerchant);
    } else {
        redirectURL(`/?lang=${i18n.language}`);
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

export function redirectSignIn() {
    redirectSignedOut();
};
