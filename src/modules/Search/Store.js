import {observable, action, computed, runInAction} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {getLastArr, isEmpty, isEmptyArr} from "../../helpers/utility";
import {messageError} from "../../helpers/message";
import StorePost from "../../components/Post/Store";
import {searchApi} from "../../apis/searchApis";
import {concat2Array} from "../../helpers/entity/array";

class Store {
    @observable posts = [];
    @observable isLoading = false;
    @observable error = null;
    @observable isLoadMore = true;
    @observable textSearch = null;

    @action
    async searchPosts(value) {

        this.isLoading = true;
        this.error = null;

        if (this.textSearch != value) {
            this.posts = [];
        }

        this.textSearch = value;

        if (isEmpty(this.textSearch)) return;

        const lastPost = getLastArr(this.posts);
        const lastPostID = lastPost ? lastPost.post.id : '';
        try {
            const res = await searchApi(this.textSearch, lastPostID);
            const data = res.data;

            runInAction(() => {
                if (httpSuccess(res.status)) {

                    const posts = data.posts;
                    if (!isEmptyArr(posts)) {
                        this.posts = concat2Array(this.posts, this.createStorePosts(posts));
                    } else {
                        this.isLoadMore = false;
                    }

                } else {
                    this.error = messageHttpRequest();
                }
            });
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

    @computed get isEmpty() {
        return !this.isLoading && !this.error && isEmptyArr(this.posts);
    }

    @action handleDeletePost = (postID) => {
        this.posts = this.posts.filter(postStore => postStore.post.id !== postID);
    };

    createStorePosts(posts) {
        return posts.map((post) => {
            return this.createStorePost(post);
        });
    }

    createStorePost(post) {
        return new StorePost(post, {
            hideListComment: true,
            hideEditorComment: true,
            handleDelete: this.handleDeletePost
        });
    }

    @computed get numberResult() {
        if (!isEmptyArr(this.posts)) {
            return this.posts.length;
        }
        return 0;
    }
}

export default Store;