import {observable, action, computed} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {getLastArr, isEmptyArr} from "../../helpers/utility";
import StoreNotification from "./Noti/Store";
import {getNotificationsApi} from "../../apis/notificationApis";
import {messageError} from "../../helpers/message";

class Store {
    @observable notifications = [];
    @observable isLoading = false;
    @observable error = null;
    @observable isLoadMore = true;

    @action
    async getNotifications() {

        this.isLoading = true;
        this.error = null;
        const lastNoti = getLastArr(this.notifications);
        const lastNotiID = lastNoti ? lastNoti.notification.id : '';
        try {
            const res = await getNotificationsApi(lastNotiID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                const notifications = data.data;
                if (!isEmptyArr(notifications)) {
                    this.notifications = [...this.notifications, ...this.createStoreNotifications(notifications)];
                } else {
                    this.isLoadMore = false;
                }
            } else {
                this.error = messageHttpRequest();
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
        } finally {
            this.isLoading = false;
            if (!isEmptyArr(this.error)) {
                messageError(this.error);
            }
        }
    }

    @action addNotification(notification) {
        if (this.isLoading) return;

        const storeNotification = this.createStoreNotification(notification);

        this.notifications = [storeNotification, ...this.notifications];
    }

    @computed get isEmpty() {
        return !this.isLoading && !this.error && isEmptyArr(this.notifications);
    }

    createStoreNotifications(notifications) {
        return notifications.map((notification) => {
            return this.createStoreNotification(notification);
        });
    }

    createStoreNotification(notification) {
        return new StoreNotification(notification);
    }
}

export default Store;