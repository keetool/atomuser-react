import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../../helpers/httpRequest";
import {messageError} from "../../../helpers/message";
import {newUsersApi} from "../../../apis/userApis";

class Store {
    @observable users = [];
    @observable isLoading = false;
    @observable error = null;

    @action
    async getListNewUser() {

        this.isLoading = true;
        this.error = null;

        try {
            const res = await newUsersApi();
            const data = res.data;

            if (httpSuccess(res.status)) {
                const users = data.data.users;
                console.log(users);
                this.users = [...this.users, ...users];
            } else {
                this.error = messageHttpRequest();
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
        } finally {
            this.isLoading = false;
            if (this.error) {
                messageError(this.error);
            }
        }
    }
}

export default Store;