import {splitHostname} from "../helpers/utility";

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

const hostname = splitHostname();

let domain;
let fullDomain;
let subDomain;

let protocol;

if (IS_PRODUCTION) {
    protocol = location.protocol + '//';
    domain = `${hostname.domain}.${hostname.type}`;
    subDomain = `${hostname.subdomain}`;

} else {
    protocol = 'https://';
    domain = 'atomuser.com';
    subDomain = `k`;
}

fullDomain = `${subDomain}.${domain}`;

export const PROTOCOL = protocol;                                       // http://
export const SUBDOMAIN = subDomain;                                     // test
export const DOMAIN = domain + '/';                                     // atomuser.com/
export const DOMAIN_FULl = fullDomain + '/';                            // test.atomuer.com/
export const PROTOCOL_DOMAIN = PROTOCOL + DOMAIN;                       // https://atomuser.com/
export const PROTOCOL_DOMAIN_FULL = PROTOCOL + DOMAIN_FULl;             // https://test.atomuser.com/
export const API_URL = PROTOCOL_DOMAIN + 'api/';                        // https://atomuser.com/api/
export const MERCHANT_API_URL = PROTOCOL_DOMAIN_FULL + 'client-api/';   // https://test.atomuser.com/client-api/
export const SOCKET_HOST = 'https://atomuser.com';                      // https://atomuser.com/
export const SOCKET_PORT = '9000';                                      // 9000
