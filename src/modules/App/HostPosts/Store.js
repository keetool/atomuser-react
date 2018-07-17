import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../../helpers/httpRequest";
import {messageError} from "../../../helpers/message";
import {getHotPostsApi} from "../../../apis/postApis";

class Store {
    @observable posts = [];
    @observable isLoading = false;
    @observable error = null;

    @action
    async getHotPosts() {

        this.isLoading = true;
        this.error = null;

        try {
            const res = await getHotPostsApi();
            const data = res.data;

            if (httpSuccess(res.status)) {
                const posts = data.data;
                this.posts = [...this.posts, ...posts];
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