export function setCookie(name, value, time, domain, secure, path) {

    let expires = null;
    if (time) {
        let date = new Date();
        date.setTime(date.getTime() + (time * 1000));
        expires = date.toUTCString();
    }

    const dataCookie = name + "=" + value +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain.replace(/\//g, '') : "") +
        ((secure) ? "; secure" : "");
    document.cookie = dataCookie;
}

export function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function deleteCookie(name, domain, path) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain.replace(/\//g, '') : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}