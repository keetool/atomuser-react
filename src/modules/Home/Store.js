import {observable, action, computed, runInAction} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {getPostsApi} from "../../apis/postApis";
import {getLastArr, isEmpty, isEmptyArr} from "../../helpers/utility";
import StorePost from "../../components/Post/Store";
import {messageError} from "../../helpers/message";
import {concat2Array} from "../../helpers/entity/array";

class Store {
    @observable posts = [];
    @observable isLoading = false;
    @observable error = null;
    @observable pagination = {};

    @action
    async getPosts() {

        if (this.isLoading) return;

        this.isLoading = true;
        this.error = null;
        const lastPost = getLastArr(this.posts);
        const lastPostID = lastPost ? lastPost.post.id : '';
        try {
            const res = await getPostsApi(lastPostID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                const posts = data.data;
                runInAction(() => {
                    this.posts = concat2Array(this.posts, this.createStorePosts(posts));
                    data.meta.remain_total = data.meta.total - posts.length;
                    this.pagination = data.meta;
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
            if (!isEmpty(this.error)) {
                messageError(this.error);
            }
        }
    }

    @action addPost = (post) => {
        const newPost = this.createStorePost(post);
        this.posts = [newPost, ...this.posts];
    };

    @action handleDeletePost = (postID) => {
        this.posts = this.posts.filter(postStore => postStore.post.id !== postID);
    };

    createStorePosts(posts) {
        return posts.map((post) => {
            return this.createStorePost(post);
        });
    }

    createStorePost(post) {
        return new StorePost(post, {handleDelete: this.handleDeletePost});
    }

    @computed get isEmpty() {
        return !this.isLoading && !this.error && isEmptyArr(this.posts);
    }

    @computed get isLoadMore() {
        return this.pagination.remain_total > 0;
    }
}


export default Store;
