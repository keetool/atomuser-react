import {observable, action} from "mobx";
import {httpSuccess} from "../../helpers/httpRequest";
import {downVoteApi, upVoteApi} from "../../apis/postApis";
import StoreEditorComment from "../../components/EditorComment/Store";
import StoreComment from "./ListComment/Store";
import {addMarkPostApi, deleteMarkPostApi} from "../../apis/markApis";

class Store {
    @observable post = {};
    @observable isVoting = false;
    @observable isMarking = false;
    @observable errorVote = null;
    @observable storeEditorComment = {};
    @observable storeComment = {};
    @observable config = {
        hideListComment: false,
        hideEditorComment: false
    };

    constructor(post, config) {
        this.post = post;
        this.storeComment = new StoreComment(post);
        this.storeEditorComment = new StoreEditorComment(post);
        if (config) {
            this.config = {...this.config, ...config};
        }
    }

    @action
    async addMarkPost() {
        if (this.isMarking) return;

        this.isMarking = true;

        const post = this.post;
        const postID = post.id;

        let oldPost = {...post};

        this.addBookmarked();

        try {
            const res = await addMarkPostApi(postID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.changeDataPost(data.data);
            } else {
                this.changeDataPost(oldPost);
            }
        } catch (error) {
            this.changeDataPost(oldPost);
        } finally {
            this.isMarking = false;
        }
    }

    @action
    async deleteMarkPost() {
        if (this.isMarking) return;

        this.isMarking = true;

        const post = this.post;
        const postID = post.id;

        let oldPost = {...post};

        this.deleteBookmarked();

        try {
            const res = await deleteMarkPostApi(postID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.changeDataPost(data.data);
            } else {
                this.changeDataPost(oldPost);
            }
        } catch (error) {
            this.changeDataPost(oldPost);
        } finally {
            this.isMarking = false;
        }
    }

    @action
    async upVote() {
        if (this.isVoting) return;

        this.isVoting = true;

        const post = this.post;
        const postID = post.id;

        let oldPost = {...post};

        if (post.vote == 1) {
            this.removeVotePost();
        } else {
            this.addUpVotePost();
        }

        try {
            const res = await upVoteApi(postID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.changeDataPost(data.data);
            } else {
                this.changeDataPost(oldPost);
            }
        } catch (error) {
            this.changeDataPost(oldPost);
        } finally {
            this.isVoting = false;
        }
    }

    @action
    async downVote() {

        if (this.isVoting) return;

        this.isVoting = true;

        const post = this.post;

        const postID = post.id;

        let oldPost = {...post};

        if (post.vote == -1) {
            this.removeVotePost();
        } else {
            this.addDownVotePost();
        }

        try {
            const res = await downVoteApi(postID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.changeDataPost(data.data);
            } else {
                this.changeDataPost(oldPost);
            }
        } catch (error) {
            this.changeDataPost(oldPost);
        } finally {
            this.isVoting = false;
        }
    }

    @action addUpVotePost = () => {
        let oldPost = this.post;
        if (oldPost.vote == 0) {
            oldPost.upvote++;
        } else if (oldPost.vote == -1) {
            oldPost.upvote++;
            oldPost.downvote--;
        }
        oldPost.vote = 1;
    };

    @action addDownVotePost = () => {
        let oldPost = this.post;
        if (oldPost.vote == 0) {
            oldPost.downvote++;
        } else if (oldPost.vote == 1) {
            oldPost.upvote--;
            oldPost.downvote++;
        }
        oldPost.vote = -1;
    };

    @action removeVotePost = () => {
        let oldPost = this.post;
        if (oldPost.vote == 1) {
            oldPost.upvote--;
        } else if (oldPost.vote == -1) {
            oldPost.downvote--;
        }
        oldPost.vote = 0;
    };

    @action addBookmarked = () => {
        this.post.isBookmarked = 1;
    };

    @action deleteBookmarked = () => {
        this.post.isBookmarked = 0;
    };

    @action changeDataPost = (newPost) => {
        this.post = {...this.post, ...newPost};
    };


    @action incComment(amount = 1) {
        this.post.num_comments += amount;
    }
}

export default Store;