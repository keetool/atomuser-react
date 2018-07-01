import {observable, action, computed, toJS} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {downVoteApi, getPostsApi, upVoteApi} from "../../apis/postApis";

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


    @action
    async upVote(post) {
        const postID = post.id;

        let oldPost = toJS(post);

        if (post.vote === 1) {
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

        let oldPost = toJS(post);

        if (post.vote === -1) {
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
        if (oldPost.vote === 0) {
            oldPost.downvote++;
        } else if (oldPost.vote === 1) {
            oldPost.upvote--;
            oldPost.downvote++;
        }
        oldPost.vote = -1;
    };

    @action removeVotePost = (postID) => {
        let oldPost = this.getPostById(postID);
        if (oldPost.vote === 1) {
            oldPost.upvote--;
        } else if (oldPost.vote === -1) {
            oldPost.downvote--;
        }
        oldPost.vote = 0;
    };

    @action changeDataPost = (postID, newPost) => {
        let indexPost = this.getIndexPostById(postID);
        this.posts[indexPost] = newPost;
    };

    @action addPost = (post) => {
        this.posts = [post, ...this.posts.slice(0, this.posts.length - 1)];
    };

    @computed get isLoadData() {
        return this.pagination.current_page < this.pagination.last_page;
    }

    @action incPage() {
        this.pagination.current_page++;
    }

    getPostById = (postID) => {
        return this.posts.filter((post) => postID === post.id)[0];
    };

    getIndexPostById = (postID) => {
        return this.posts.indexOf(this.getPostById(postID));
    };
}

const store = new Store();

export default store;
