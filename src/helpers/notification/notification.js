import i18n, {translateI18n} from '../../languages/i18n';
import {getValueObjectFromStringKey, linkRoute} from "../utility";

const prefixKey = 'social.notification.type';

// key of value language with key object data
const keyLanguageData = {
    "user": "user",
    "post_creator": "post.creator",
};

const linkWithNotificationType = {
    "post.vote.up.create": {
        link: '/post/:postID',
        action_web: 'postID'
    },
    "post.vote.down.create": {
        link: '/post/:postID',
        action_web: 'postID'
    },
    "post.comment.create": {
        link: '/post/:postID',
        action_web: 'postID'
    },
};

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
    return i18n.t(key, {
        interpolation: {
            prefix: `__`, //i18n don't convert key data
            suffix: `__`,//i18n don't convert key data
        }
    });
}

export function getContentNotiWithData(key, data) {

    const config = {
        interpolation: {
            escapeValue: false
        }
    };

    const dataLang = {...data, ...config};

    console.log({dataLang});

    return translateI18n(key, dataLang);
}

/**
 *
 * @param detail
 * "detail": [
 {
     "type": "user",
     "data": {
         "name": "Dat Vi Thanh",
     }
 }]
 *  => {user: {"name": "Dat Vi Thanh"}
 */
function convertDataDetailServer(detail) {
    let data = {};

    detail.forEach((itemDetail) => {
        data[itemDetail.type] = itemDetail.data;
    });

    return data;
}

function getDataLanguge(dataInput, keyData) {

    let data = {};

    keyData.forEach((key) => {

        const keyLanguage = keyLanguageData[key];

        data[key] = getValueObjectFromStringKey(dataInput, keyLanguage);

    });

    return data;
}

function convertNotiData(dataInput, type) {

    const key = convertTypeNotiToKey(type);
    const strLanguage = getContentNotiWithoutData(key);
    const keyData = splitKeyData(strLanguage);

    return getDataLanguge(dataInput, keyData);

}

export function getDataNotification(detail, type) {

    let data = convertDataDetailServer(detail);

    return convertNotiData(data, type);
}

export function linkNotification(type, data) {
    const route = linkWithNotificationType[type];
    return linkRoute(route.link, {[route.action_web]: data});
}