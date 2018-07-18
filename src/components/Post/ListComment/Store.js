import {observable, action, computed,runInAction} from "mobx";
import {getCommentsApi} from "../../../apis/commentApis";
import {httpSuccess, messageHttpRequest} from "../../../helpers/httpRequest";
import {getFirstArr, isEmpty, isExistArray} from "../../../helpers/utility";
import StoreComment from "./Comment/Store";
import {messageError} from "../../../helpers/message";

import {concat2Array} from "../../../helpers/entity/array";

class Store {
    post = null;
    @observable comments = [];
    @observable isLoading = false;
    @observable error = null;
    @observable pagination = {};

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
            const lastCommentID = lastComment ? lastComment.comment.id : '';
            const res = await getCommentsApi(postID, lastCommentID, limit);
            const data = res.data;

            if (httpSuccess(res.status)) {
                let comments = data.data;
                comments = this.createStoreComments(comments);

                runInAction(() => {
                    this.comments = concat2Array(comments.reverse(), this.comments);
                    data.meta.remain_total = data.meta.total - comments.length;
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

    @action addComment = (comment) => {
        this.comments = [...this.comments, this.createStoreComment(comment)];
    };

    isExistedComment = (comment) => {
        return isExistArray(this.comments, comment, 'id', (data) => {
            return data.comment.id == comment.id;
        });
    };

    createStoreComments(comments) {
        return comments.map((comment) => {
            return this.createStoreComment(comment);
        });
    }

    createStoreComment(comment) {
        return new StoreComment(comment);
    }

    @computed get isLoadMore() {
        return this.pagination.remain_total > 0;
    }
}


export default Store;
