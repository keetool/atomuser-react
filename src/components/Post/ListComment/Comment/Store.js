import {observable, action} from "mobx";
import {downVoteApi, upVoteApi} from "../../../../apis/commentApis";
import {httpSuccess} from "../../../../helpers/httpRequest";

class Store {
    @observable comment = {};
    @observable isVoting = false;

    constructor(comment) {
        this.comment = comment;
    }


    @action
    async upVote() {
        if (this.isVoting) return;

        this.isVoting = true;

        const comment = this.comment;
        const commentID = comment.id;

        let oldComment = {...comment};

        if (comment.vote == 1) {
            this.removeVoteComment();
        } else {
            this.addUpVoteComment();
        }

        try {
            const res = await upVoteApi(commentID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.changeDataComment(data.data);
            } else {
                this.changeDataComment(oldComment);
            }
        } catch (error) {
            this.changeDataComment(oldComment);
        } finally {
            this.isVoting = false;
        }
    }

    @action
    async downVote() {
        if (this.isVoting) return;

        this.isVoting = true;

        const comment = this.comment;

        const commentID = comment.id;

        let oldComment = {...comment};

        if (comment.vote == -1) {
            this.removeVoteComment();
        } else {
            this.addDownVoteComment();
        }

        try {
            const res = await downVoteApi(commentID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                this.changeDataComment(data.data);
            } else {
                this.changeDataComment(oldComment);
            }
        } catch (error) {
            this.changeDataComment(oldComment);
        } finally {
            this.isVoting = false;
        }
    }

    @action addUpVoteComment = () => {
        let oldComment = this.comment;
        if (oldComment.vote === 0) {
            oldComment.upvote++;
        } else if (oldComment.vote === -1) {
            oldComment.upvote++;
            oldComment.downvote--;
        }
        oldComment.vote = 1;
    };

    @action addDownVoteComment = () => {
        let oldComment = this.comment;
        if (oldComment.vote == 0) {
            oldComment.downvote++;
        } else if (oldComment.vote == 1) {
            oldComment.upvote--;
            oldComment.downvote++;
        }
        oldComment.vote = -1;
    };

    @action removeVoteComment = () => {
        let oldComment = this.comment;
        if (oldComment.vote == 1) {
            oldComment.upvote--;
        } else if (oldComment.vote == -1) {
            oldComment.downvote--;
        }
        oldComment.vote = 0;
    };

    @action changeDataComment = (commentID, newComment) => {
        this.comment = {...this.comment, ...newComment};
    };
}


export default Store;
