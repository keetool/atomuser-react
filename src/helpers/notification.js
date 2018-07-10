import i18n, {translateI18n} from '../languages/i18n';

const prefixKey = 'social.notification.type';

export function splitKeyData(str) {
    let re = /{{\S+}}/g;

    const arr = str.match(re);
    if (arr) {
        return str.match(re).map(function (data) {
            return data.replace(/{/g, "").replace(/}/g, "");
        });
    } else {
        return [];
    }


}

export function convertTypeNotiToKey(type) {
    return prefixKey + "." + type.replace(/\./g, "_");
}

export function getContentNotiWithoutData(key) {
    console.log(key);
    return i18n.t(key, {
        interpolation: {
            prefix: `__`, //i18n don't convert key data
            suffix: `__`,//i18n don't convert key data
        }
    });
}

export function getContentNotiWithData(key, data) {
    return translateI18n(key, data);
}