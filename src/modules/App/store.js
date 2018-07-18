import {observable, action, configure, runInAction} from "mobx";
import {joinMerchantApi, profileApi} from "../../apis/accountApis";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {messageError} from "../../helpers/message";

configure({enforceActions: true});

class Store {
    @observable account = {};
    @observable isLoadingAccount = false;
    @observable isJoiningMerchant = false;
    @observable errorAccount = null;
    @observable errorJoinMerchant = null;

    @action
    async getAccount() {

        this.isLoadingAccount = true;
        this.errorAccount = null;

        try {
            const res = await profileApi();
            const data = res.data;

            if (httpSuccess(res.status)) {
                const account = data.data;
                this.updateAccount(account);
            } else {
                runInAction(() => {
                    this.errorAccount = messageHttpRequest();
                });
            }
        } catch (error) {
            runInAction(() => {
                this.errorAccount = messageHttpRequest(error);
            });
        } finally {
            runInAction(() => {
                this.isLoadingAccount = false;
            });

        }
    }

    @action
    async joinMerchant() {

        this.isJoiningMerchant = true;
        this.errorJoinMerchant = null;

        try {
            const res = await joinMerchantApi();
            const data = res.data;

            if (httpSuccess(res.status)) {
                const account = data.data;
                this.updateAccount(account);
            } else {
                runInAction(() => {
                    this.errorJoinMerchant = messageHttpRequest();
                });
            }
        } catch (error) {
            runInAction(() => {
                this.errorJoinMerchant = messageHttpRequest(error);
            });
        } finally {
            runInAction(() => {
                this.isJoiningMerchant = false;
            });
            if (this.errorJoinMerchant) {
                messageError(this.errorJoinMerchant);
            }
        }
    }

    @action updateAccount(data) {
        this.account = {...this.account, ...data};
    }
}

export default new Store();