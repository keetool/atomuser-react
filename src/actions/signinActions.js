import {signinApi, signinFBApi} from "../apis/signinApis";
import history from "../helpers/history";
import {saveToken, saveRefreshToken, redirectSignedIn} from "../helpers/auth";
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
            setState({isLoggingFB: false});
            if (httpSuccess(res.status)) {
                console.log(res.data.access_token);
                saveToken(res.data.access_token, res.data.expires_in);
                saveRefreshToken(res.data.refresh_token, res.data.expires_in);
                redirectSignedIn(merchantSubDomain);
            }
        })
        .catch(error => {
            const messageError = messageHttpRequestSignIn(error);
            setState({isLoggingFB: false, messageError});
        });
}
