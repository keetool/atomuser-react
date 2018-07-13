import {computed, observable, action} from "mobx";
import {
    getDataNotification
} from "../../../helpers/notification/notification";
import {httpSuccess, messageHttpRequest} from "../../../helpers/httpRequest";
import {seenNotificationApi} from "../../../apis/notificationApis";

class Store {
    @observable notification = null;
    @observable error = null;

    constructor(notification) {

        notification.data = getDataNotification(notification.detail, notification.type);

        this.notification = notification;
    }

    @action
    async seenNotification() {
        try {
            const notificationId = this.notification.id;
            const res = await seenNotificationApi(notificationId);
            // const data = res.data;

            if (!httpSuccess(res.status)) {
                this.error = messageHttpRequest();
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
        }
    }

    @computed get isUnseen() {
        return this.notification && this.notification.status == 'unseen';
    }
}

export default Store;