import {observable, action, runInAction} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {getPostApi} from "../../apis/postApis";
import StorePost from "../../components/Post/Store";

class Store {
    @observable storePost = null;
    @observable isLoading = false;
    @observable error = null;

    @action
    async getPost(postID) {

        this.isLoading = true;
        this.error = null;
        try {
            const res = await getPostApi(postID);
            const data = res.data;

            if (httpSuccess(res.status)) {

                const post = data.data;
                runInAction(() => {
                    this.storePost = new StorePost(post);
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
        }
    }
}

export default Store;
