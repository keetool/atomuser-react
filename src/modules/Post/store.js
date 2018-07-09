import {observable, action} from "mobx";
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
                this.storePost = new StorePost(post);
            } else {
                this.error = messageHttpRequest();
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
        } finally {
            this.isLoading = false;
        }
    }
}

const store = new Store();

export default store;
