import {computed, observable, action, runInAction} from "mobx";
import {
    getDataNotification
} from "../../../helpers/notification/notification";
import {httpSuccess, messageHttpRequest} from "../../../helpers/httpRequest";
import {clickedNotificationApi} from "../../../apis/notificationApis";

class Store {
    @observable notification = null;
    @observable error = null;

    constructor(notification) {

        notification.data = getDataNotification(notification.detail, notification.type);

        this.notification = notification;
    }

    @action
    async clickNotification() {
        try {
            const notificationId = this.notification.id;
            const res = await clickedNotificationApi(notificationId);

            if (!httpSuccess(res.status)) {
                runInAction(() => {
                    this.error = messageHttpRequest();
                });
            }
        } catch (error) {
            runInAction(() => {
                this.error = messageHttpRequest(error);
            });
        }
    }

    @computed get isClicked() {
        return this.notification && this.notification.status == 'clicked';
    }
}

export default Store;