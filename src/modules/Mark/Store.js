import {observable, action, computed} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {getLastArr, isEmpty, isEmptyArr} from "../../helpers/utility";
import {messageError} from "../../helpers/message";
import {getMarkPostsBySubdomain} from "../../apis/markApis";
import StorePost from "../../components/Post/Store";

class Store {
    @observable marks = [];
    @observable isLoading = false;
    @observable error = null;
    @observable pagination = {};

    @action
    async getBookmarks() {

        if (this.isLoading) return;

        this.isLoading = true;
        this.error = null;
        const lastMark = getLastArr(this.marks);
        const lastPostID = lastMark ? lastMark.post.id : '';
        try {
            const res = await getMarkPostsBySubdomain(lastPostID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                const posts = data.data;
                this.marks = [...this.marks, ...this.createStorePosts(posts)];
                data.meta.remain_total = data.meta.total - posts.length;
                this.pagination = data.meta;
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

    @computed get isEmpty() {
        return !this.isLoading && !this.error && isEmptyArr(this.marks);
    }

    createStorePosts(posts) {
        return posts.map((post) => {
            return this.createStorePost(post);
        });
    }

    createStorePost(post) {
        return new StorePost(post);
    }

    @computed get isLoadMore() {
        return this.pagination.remain_total > 0;
    }
}

export default Store;