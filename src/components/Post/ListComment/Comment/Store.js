import {observable, action, computed} from "mobx";
import {downVoteApi, upVoteApi} from "../../../../apis/commentApis";
import {httpSuccess} from "../../../../helpers/httpRequest";
import {isViewMore, overLineNumber, splitStrToViewMore} from "../../../../helpers/editor";

class Store {
    @observable comment = {};
    @observable isVoting = false;
    @observable isViewMore = true;

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

    @computed get content() {
        if (this.viewMore) {
            return splitStrToViewMore(this.comment.value);
        } else {
            return this.comment.value;
        }
    }

    @action disableViewMore() {
        this.isViewMore = false;
    }

    @computed get viewMore() {
        return (isViewMore(this.comment.value)
            || overLineNumber(this.comment.value)) && this.isViewMore;
    }
}


export default Store;
