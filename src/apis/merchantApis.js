import axios from "axios";
import { PROTOCOL_DOMAIN} from "../constants/env";

export function getMerchantApi(merchantID) {
    let url = PROTOCOL_DOMAIN + `api/v1/merchant/` + merchantID;
    return axios.get(url);
}
