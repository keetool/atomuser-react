import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {getPostsApi} from "../../apis/postApis";
import {getLastArr, isEmptyArr, messageError} from "../../helpers/utility";
import StorePost from "../../components/Post/Store";

class Store {
    @observable posts = [];
    @observable isLoading = false;
    @observable error = null;
    @observable isLoadMore = true;

    @action
    async getPosts(callbackFinished = null) {

        this.isLoading = true;
        this.error = null;
        const lastPost = getLastArr(this.posts);
        const lastPostID = lastPost ? lastPost.id : '';
        try {
            const res = await getPostsApi(lastPostID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                const posts = data.data;
                if (!isEmptyArr(posts)) {
                    this.posts = [...this.posts, ...this.createStorePosts(posts)];
                } else {
                    this.isLoadMore = false;
                }
            } else {
                this.error = messageHttpRequest();
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
        } finally {
            if (callbackFinished) {
                callbackFinished();
            }
            this.isLoading = false;
            if (!isEmptyArr(this.error)) {
                messageError(this.error);
            }
        }
    }

    @action addPost = (post) => {
        const newPost = this.createStorePost(post);
        this.posts = [newPost, ...this.posts];
    };

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
