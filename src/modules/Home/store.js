import {observable, action, computed} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {getPostsApi} from "../../apis/postApis";

class Store {
    @observable posts = [];
    @observable isLoading = false;
    @observable pagination = {
        current_page: 1,
        last_page: 1
    };
    @observable error = null;

    @action
    async getPosts(callback = null) {

        this.isLoading = true;
        this.error = null;
        try {
            const res = await getPostsApi(this.pagination.current_page);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.posts = [...this.posts, ...data.data];
                this.pagination = data.meta;

            } else {
                this.error = messageHttpRequest();
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
        } finally {
            if (callback) {
                callback();
            }
            this.isLoading = false;
        }
    }

    @action addPost = (post) => {
        this.posts = [post, ...this.posts.slice(0, this.posts.length - 1)];
    }

    @computed get isLoadData() {
        return this.pagination.current_page < this.pagination.last_page;
    }

    @action incPage() {
        this.pagination.current_page++;
    }
}

const store = new Store();

export default store;
