import {getMerchantApi} from "../apis/merchantApis";
import {httpSuccess, messageHttpRequest} from "../helpers/httpRequest";
import {translateI18n} from "../languages/i18n";

function messageNotFoundMerchant(error) {
    return messageHttpRequest(error) === 'not_found' ? translateI18n('social.login.form.merchant_unavailable') : messageHttpRequest(error);
}

export function getMerchant(setState, merchantID) {
    getMerchantApi(merchantID)
        .then(res => {
            if (httpSuccess(res.status)) {
                setState({
                    merchantSubDomain: res.data.sub_domain,
                });
            } else {
                setState({
                    messageMerchant: messageHttpRequest()
                });
            }
        })
        .catch(error => {
            const messageMerchant = messageNotFoundMerchant(error);
            setState({messageMerchant: messageMerchant});
        });
}
