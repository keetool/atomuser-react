import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {downVoteApi, getPostsApi, upVoteApi} from "../../apis/postApis";
import {getLastArr, isEmpty, isEmptyArr} from "../../helpers/utility";
import StoreEditorComment from "../../components/EditorComment/Store";
import StoreComment from "./Post/Comment/Store";

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
                    const posts = this.addDataPosts(data.data);
                    this.posts = [...this.posts, ...posts];
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
        }
    }


    @action
    async upVote(post) {
        const postID = post.id;

        let oldPost = {...post};

        if (post.vote == 1) {
            this.removeVotePost(postID);
        } else {
            this.addUpVotePost(postID);
        }

        try {
            const res = await upVoteApi(postID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.changeDataPost(postID, data.data);
            } else {
                this.changeDataPost(postID, oldPost);
            }
        } catch (error) {
            console.log(error);
            this.changeDataPost(postID, oldPost);
        }
    }

    @action
    async downVote(post) {

        const postID = post.id;

        let oldPost = {...post};

        if (post.vote == -1) {
            this.removeVotePost(postID);
        } else {
            this.addDownVotePost(postID);
        }

        try {
            const res = await downVoteApi(postID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.changeDataPost(postID, data.data);
            } else {
                this.changeDataPost(postID, oldPost);
            }
        } catch (error) {
            console.log(error);
            this.changeDataPost(postID, oldPost);
        }
    }

    @action addUpVotePost = (postID) => {
        let oldPost = this.getPostById(postID);
        if (oldPost.vote === 0) {
            oldPost.upvote++;
        } else if (oldPost.vote === -1) {
            oldPost.upvote++;
            oldPost.downvote--;
        }
        oldPost.vote = 1;
    };

    @action addDownVotePost = (postID) => {
        let oldPost = this.getPostById(postID);
        if (oldPost.vote == 0) {
            oldPost.downvote++;
        } else if (oldPost.vote == 1) {
            oldPost.upvote--;
            oldPost.downvote++;
        }
        oldPost.vote = -1;
    };

    @action removeVotePost = (postID) => {
        let oldPost = this.getPostById(postID);
        if (oldPost.vote == 1) {
            oldPost.upvote--;
        } else if (oldPost.vote == -1) {
            oldPost.downvote--;
        }
        oldPost.vote = 0;
    };

    @action changeDataPost = (postID, newPost) => {
        let indexPost = this.getIndexPostById(postID);
        console.log({newPost});
        this.posts[indexPost] = {
            ...this.posts[indexPost],
            ...newPost
        };
    };

    @action addPost = (post) => {
        const dataPost = this.addDataPost(post);
        this.posts = [dataPost, ...this.posts];
    };

    @action incComment(postID, amount = 1) {
        let post = this.getPostById(postID);
        post.num_comments += amount;
    }

    getPostById = (postID) => {
        return this.posts.filter((post) => postID === post.id)[0];
    };

    getIndexPostById = (postID) => {
        return this.posts.indexOf(this.getPostById(postID));
    };

    addStoreComment(post) {
        let store = new StoreComment({...post});
        return {
            ...post,
            storeComment: store
        };
    }

    addStoreEditorComment(post) {
        let store = new StoreEditorComment({...post});
        return {
            ...post,
            storeEditorComment: store
        };
    }

    /**
     * add data such as store,... before add to mobx
     * @param post
     * @returns {*}
     */
    addDataPost(post) {
        if (isEmpty(post.storeComment)) {
            post = this.addStoreComment(post);
        }

        if (isEmpty(post.storeEditorComment)) {
            post = this.addStoreEditorComment(post);
        }
        return post;
    }

    /**
     * add data such as store,... before add to mobx
     * @param posts
     * @returns {*}
     */
    addDataPosts(posts) {
        return posts.map((post) => {
            post = this.addDataPost(post);
            return post;
        });
    }
}

const store = new Store();

export default store;
