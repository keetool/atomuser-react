import {observable, action} from "mobx";
import {getCommentsApi, downVoteApi, upVoteApi} from "../../../apis/commentApis";
import {httpSuccess, messageHttpRequest} from "../../../helpers/httpRequest";
import {getFirstArr, isEmpty, isEmptyArr, isExistArray, messageError} from "../../../helpers/utility";

class Store {
    post = null;
    @observable comments = [];
    @observable isLoading = false;
    @observable error = null;
    @observable isLoadMore = true;

    constructor(post) {
        this.post = post;
    }

    @action
    async getComments(limit) {
        const postID = this.post.id;

        this.isLoading = true;
        this.error = null;

        try {
            const lastComment = getFirstArr(this.comments);
            const lastCommentID = lastComment ? lastComment.id : '';
            const res = await getCommentsApi(postID, lastCommentID, limit);
            const data = res.data;
            if (httpSuccess(res.status)) {
                const comments = data.data;
                if (!isEmptyArr(comments)) {
                    this.comments = [...comments.reverse(), ...this.comments];
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
            if (!isEmpty(this.error)) {
                messageError(this.error);
            }
        }
    }

    @action
    async upVote(comment) {
        const commentID = comment.id;

        let oldComment = {...comment};

        if (comment.vote == 1) {
            this.removeVoteComment(commentID);
        } else {
            this.addUpVoteComment(commentID);
        }

        try {
            const res = await upVoteApi(commentID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.changeDataComment(commentID, data.data);
            } else {
                this.changeDataComment(commentID, oldComment);
            }
        } catch (error) {
            console.log(error);
            this.changeDataComment(commentID, oldComment);
        }
    }

    @action
    async downVote(comment) {

        const commentID = comment.id;

        let oldComment = {...comment};

        if (comment.vote == -1) {
            this.removeVoteComment(commentID);
        } else {
            this.addDownVoteComment(commentID);
        }

        try {
            const res = await downVoteApi(commentID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.changeDataComment(commentID, data.data);
            } else {
                this.changeDataComment(commentID, oldComment);
            }
        } catch (error) {
            console.log(error);
            this.changeDataComment(commentID, oldComment);
        }
    }

    @action addUpVoteComment = (commentID) => {
        let oldComment = this.getCommentById(commentID);
        if (oldComment.vote === 0) {
            oldComment.upvote++;
        } else if (oldComment.vote === -1) {
            oldComment.upvote++;
            oldComment.downvote--;
        }
        oldComment.vote = 1;
    };

    @action addDownVoteComment = (commentID) => {
        let oldComment = this.getCommentById(commentID);
        if (oldComment.vote == 0) {
            oldComment.downvote++;
        } else if (oldComment.vote == 1) {
            oldComment.upvote--;
            oldComment.downvote++;
        }
        oldComment.vote = -1;
    };

    @action removeVoteComment = (commentID) => {
        let oldComment = this.getCommentById(commentID);
        if (oldComment.vote == 1) {
            oldComment.upvote--;
        } else if (oldComment.vote == -1) {
            oldComment.downvote--;
        }
        oldComment.vote = 0;
    };

    @action changeDataComment = (commentID, newComment) => {
        let indexComment = this.getIndexCommentById(commentID);
        console.log({newComment});
        this.comments[indexComment] = {
            ...this.comments[indexComment],
            ...newComment
        };
    };

    @action addComment = (comment) => {
        this.comments = [...this.comments, comment];
    };

    getCommentById = (commentID) => {
        return this.comments.filter((comment) => commentID === comment.id)[0];
    };

    getIndexCommentById = (commentID) => {
        return this.comments.indexOf(this.getCommentById(commentID));
    };

    isExistedComment = (comment) => {
        return isExistArray(this.comments, comment, 'id');
    };

    // @computed
    // get isLoadMore() {
    //     return this.comments.length < this.post.num_comments;
    // }
}


export default Store;
