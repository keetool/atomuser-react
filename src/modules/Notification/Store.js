import {observable, action, computed, runInAction} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {getLastArr, isEmpty, isEmptyArr} from "../../helpers/utility";
import StoreNotification from "./Noti/Store";
import {getNotificationsByMerchantApi} from "../../apis/notificationApis";
import {messageError} from "../../helpers/message";

import {concat2Array} from "../../helpers/entity/array";

class Store {
    @observable notifications = [];
    @observable isLoading = false;
    @observable error = null;
    @observable pagination = {};

    @action
    async getNotifications() {

        if (this.isLoading) return;

        this.isLoading = true;
        this.error = null;
        const lastNoti = getLastArr(this.notifications);
        const lastNotiID = lastNoti ? lastNoti.notification.id : '';
        try {
            const res = await getNotificationsByMerchantApi(lastNotiID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                const notifications = data.data;
                runInAction(() => {
                    this.notifications = concat2Array(this.notifications, this.createStoreNotifications(notifications));
                    data.meta.remain_total = data.meta.total - notifications.length;
                    this.pagination = data.meta;
                });

            } else {
                runInAction(() => {
                    this.error = messageHttpRequest();
                });
            }
        } catch (error) {

            runInAction(() => {
                this.error = messageHttpRequest(error);
            });

        } finally {

            runInAction(() => {
                this.isLoading = false;
            });

            if (!isEmpty(this.error)) {
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

    @computed get isLoadMore() {
        return this.pagination.remain_total > 0;
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