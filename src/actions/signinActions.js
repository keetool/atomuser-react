import {signinApi, signinFBApi, signinGoogleApi} from "../apis/signinApis";
import history from "../helpers/history";
import {saveToken, saveRefreshToken, redirectSignedIn, saveAccountID} from "../helpers/auth";
import {httpSuccess, messageHttpRequestSignIn} from "../helpers/httpRequest";

export function signin(account, setState) {
    setState({isLoading: true, messageError: null});
    signinApi(account)
        .then(res => {
            setState({isLoading: false});
            if (httpSuccess(res.status)) {
                saveToken(res.data.access_token, res.data.expires_in);
                saveRefreshToken(res.data.refresh_token, res.data.expires_in);
                history.push("/");
            }
        })
        .catch(error => {
            const messageError = messageHttpRequestSignIn(error);
            setState({isLoading: false, messageError});
        });
}

export function signinFB(account, merchantSubDomain, setState) {

    setState({isLoggingFB: true, messageError: null});
    signinFBApi(account, merchantSubDomain)
        .then(res => {

            if (httpSuccess(res.status)) {
                saveToken(res.data.access_token, res.data.expires_in);
                saveRefreshToken(res.data.refresh_token, res.data.expires_in);
                saveAccountID(res.data.user_id, res.data.expires_in);
                redirectSignedIn(merchantSubDomain);
            } else {
                setState({isLoggingFB: false});
            }
        })
        .catch(error => {
            const messageError = messageHttpRequestSignIn(error);
            setState({isLoggingFB: false, messageError});
        });
}

export function signinGoogle(account, merchantSubDomain, setState) {

    setState({isLoggingGoogle: true, messageError: null});
    signinGoogleApi(account, merchantSubDomain)
        .then(res => {

            if (httpSuccess(res.status)) {
                saveToken(res.data.access_token, res.data.expires_in);
                saveRefreshToken(res.data.refresh_token, res.data.expires_in);
                saveAccountID(res.data.user_id, res.data.expires_in);
                redirectSignedIn(merchantSubDomain);
            } else {
                setState({isLoggingGoogle: false});
            }
        })
        .catch(error => {
            const messageError = messageHttpRequestSignIn(error);
            setState({isLoggingGoogle: false, messageError});
        });
}
