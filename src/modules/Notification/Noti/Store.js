import {observable} from "mobx";
import {convertTypeNotiToKey, getContentNotiWithoutData, splitKeyData} from "../../../helpers/notification";

class Store {
    @observable notification = null;

    constructor(notification) {
        this.notification = notification;
        const key = convertTypeNotiToKey(notification.type);
        console.log({key});
        const data = getContentNotiWithoutData(key);
        const keyData = splitKeyData(data);
        console.log({data});
        console.log({keyData});
    }
}

export default Store;