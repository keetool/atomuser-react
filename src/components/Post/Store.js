import {observable, action} from "mobx";
import {httpSuccess} from "../../helpers/httpRequest";
import {downVoteApi, upVoteApi} from "../../apis/postApis";
import StoreEditorComment from "../../components/EditorComment/Store";
import StoreComment from "./ListComment/Store";

class Store {
    @observable post = {};
    @observable isVoting = false;
    @observable storeEditorComment = {};
    @observable storeComment = {};

    constructor(post) {
        this.post = post;
        this.storeComment = new StoreComment(post);
        this.storeEditorComment = new StoreEditorComment(post);
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
            console.log(error);
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
            console.log(error);
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

    @action changeDataPost = (newPost) => {
        this.post = {...this.post, ...newPost};
    };


    @action incComment(amount = 1) {
        this.post.num_comments += amount;
    }
}

export default Store;