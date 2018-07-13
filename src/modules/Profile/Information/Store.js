import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../../helpers/httpRequest";
import {isEmpty} from "../../../helpers/utility";
import {messageError} from "../../../helpers/message";
import {infoUserApi} from "../../../apis/profileApis";

class Store {
    @observable info = {};
    @observable isLoading = false;
    @observable error = null;
    @observable userID = '';

    @action addUserID = (userID) => {
        this.resetStore();
        this.userID = userID;
        this.getInfoUser();
    };

    @action resetStore = () => {
        this.info = {};
        this.isLoading = false;
        this.error = null;
        this.userID = '';
    };

    @action
    async getInfoUser() {

        this.isLoading = true;
        this.error = null;

        try {
            const res = await infoUserApi(this.userID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                const info = data.data;
                if (isEmpty(info)){
                    throw "null data";
                }
                this.info = info;

            } else {
                this.error = messageHttpRequest();
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
        } finally {
            this.isLoading = false;
            if (!isEmpty(this.error)) {
                messageError(this.error);
            }
        }
    }
}

export default Store;