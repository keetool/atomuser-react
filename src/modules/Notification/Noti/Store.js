import {observable} from "mobx";
import {
    getDataNotification
} from "../../../helpers/notification/notification";

class Store {
    @observable notification = null;

    constructor(notification) {

        notification.data = getDataNotification(notification.detail, notification.type);

        this.notification = notification;
    }

    isUnseen() {
        return this.notification && this.notification.status == 'unseen';
    }
}

export default Store;