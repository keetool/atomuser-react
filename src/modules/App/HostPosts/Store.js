import {observable, action,runInAction} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../../helpers/httpRequest";
import {messageError} from "../../../helpers/message";
import {getHotPostsApi} from "../../../apis/postApis";
import {concat2Array} from "../../../helpers/entity/array";

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
                runInAction(() => {
                    this.posts = concat2Array(this.posts, posts);
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
            if (this.error) {
                messageError(this.error);
            }
        }
    }
}

export default Store;