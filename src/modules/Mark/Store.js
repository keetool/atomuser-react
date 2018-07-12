import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {getLastArr, isEmptyArr} from "../../helpers/utility";
import {messageError} from "../../helpers/message";
import {getMarkPostsBySubdomain} from "../../apis/markApis";
import StorePost from "../../components/Post/Store";
import {computed} from "mobx/lib/mobx";

class Store {
    @observable marks = [];
    @observable isLoading = false;
    @observable error = null;
    @observable isLoadMore = true;

    @action
    async getBookmarks() {

        this.isLoading = true;
        this.error = null;
        const lastMark = getLastArr(this.marks);
        const lastPostID = lastMark ? lastMark.post.id : '';
        try {
            const res = await getMarkPostsBySubdomain(lastPostID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                const posts = data.data;
                if (!isEmptyArr(posts)) {
                    this.marks = [...this.marks, ...this.createStorePosts(posts)];
                } else {
                    this.isLoadMore = false;
                }
            } else {
                this.error = messageHttpRequest();
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
        } finally {
            this.isLoading = false;
            if (!isEmptyArr(this.error)) {
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
}

export default Store;