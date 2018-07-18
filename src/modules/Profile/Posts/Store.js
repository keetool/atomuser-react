import {observable, action, computed, runInAction} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../../helpers/httpRequest";
import {getPostsByUserApi} from "../../../apis/postApis";
import {getLastArr, isEmpty, isEmptyArr} from "../../../helpers/utility";
import StorePost from "../../../components/Post/Store";
import {messageError} from "../../../helpers/message";
import {concat2Array} from "../../../helpers/entity/array";

class Store {
    @observable posts = [];
    @observable isLoading = false;
    @observable error = null;
    @observable isLoadMore = true;
    @observable userID = '';

    @action addUserID = (userID) => {
        this.resetStore();
        this.userID = userID;
        this.getPosts();
    };

    @action resetStore = () => {
        this.posts = [];
        this.isLoading = false;
        this.error = null;
        this.isLoadMore = true;
        this.userID = '';
    };

    @action
    async getPosts() {

        if (this.isLoading) return;

        this.isLoading = true;
        this.error = null;
        const lastPost = getLastArr(this.posts);
        const lastPostID = lastPost ? lastPost.post.id : '';
        try {
            const res = await getPostsByUserApi(this.userID, lastPostID);
            const data = res.data;

            runInAction(() => {
                if (httpSuccess(res.status)) {
                    const posts = data.data;

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
}


export default Store;
