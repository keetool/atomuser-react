import i18n from "../../languages/i18n";
import {capitalizeFirstLetter} from "../utility";
import {convertTypeNotiToKey, getContentNotiWithData} from "./notification";

function parseUser(data, userID) {
    if (data.id == userID) {
        return {
            ...data,
            message: i18n.t("social.global.you")
        };
    } else {
        return {
            ...data,
            message: data.name,
            url: `/profile/${data.id}`
        };
    }
}

function parsePostCreator(data, userID) {
    if (data.id == userID) {
        return {
            ...data,
            message: i18n.t("social.global.your")
        };
    } else {
        return {
            ...data,
            message: data.name,
            url: `/profile/${data.id}`
        };
    }
}

function parse(key, data, userID) {
    switch (key) {
        case "user":
            return parseUser(data, userID);
        case "post_creator":
            return parsePostCreator(data, userID);
        default:
            return data;
    }
}

function convert(data) {
    let result = '';

    if (data.url) {
        result += `<a href="${data.url}">${data.message}</a>`;
        return result;
    }

    if (data.message) {
        result += data.message;
        return result;
    }

}

export default function parseNotification(notification, userID) {

    const dataInput = notification.data;
    const type = notification.type;

    let dataOutput = {};

    Object.keys(dataInput).forEach((key) => {
        const data = parse(key, dataInput[key], userID);

        dataOutput[key] = convert(data);
    });

    const keyLanguage = convertTypeNotiToKey(type);

    const contentNoti = getContentNotiWithData(keyLanguage, dataOutput);

    return capitalizeFirstLetter(contentNoti);
}