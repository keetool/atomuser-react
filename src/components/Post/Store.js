import {observable, action, computed, runInAction} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {deletePostApi, downVoteApi, upVoteApi} from "../../apis/postApis";
import StoreEditorComment from "../../components/EditorComment/Store";
import StoreComment from "./ListComment/Store";
import {addMarkPostApi, deleteMarkPostApi} from "../../apis/markApis";
import {isViewMore, overLineNumber, splitStrToViewMore} from "../../helpers/editor";
import {isEmpty} from "../../helpers/utility";
import {translateI18n} from "../../languages/i18n";
import {messageError, messageSuccess} from "../../helpers/message";

class Store {
    @observable post = {};
    @observable isVoting = false;
    @observable isMarking = false;
    @observable isDeleting = false;
    @observable errorVote = null;
    @observable errorDelete = null;
    @observable storeEditorComment = {};
    @observable storeComment = {};
    @observable showModalEdit = false;
    @observable config = {
        hideListComment: false,
        hideEditorComment: false,
        viewMore: true,
        handleDelete: null
    };

    constructor(post, config) {
        this.post = {...post};
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
                this.changeDataPost(data.data.post);
            } else {
                this.changeDataPost(oldPost);
            }
        } catch (error) {
            this.changeDataPost(oldPost);
        } finally {
            runInAction(() => {
                this.isMarking = false;
            });
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
            // const data = res.data;

            if (httpSuccess(res.status)) {
                // this.changeDataPost(data.data);
            } else {
                this.changeDataPost(oldPost);
            }
        } catch (error) {
            this.changeDataPost(oldPost);
        } finally {
            runInAction(() => {
                this.isMarking = false;
            });
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
            runInAction(() => {
                this.isVoting = false;
            });

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
            runInAction(() => {
                this.isVoting = false;
            });
        }
    }

    @action.bound
    async deletePost() {
        if (this.isDeleting) return;

        this.isDeleting = true;
        this.errorDelete = null;

        const post = this.post;
        const postID = post.id;

        try {
            const res = await deletePostApi(postID);

            if (httpSuccess(res.status)) {
                messageSuccess(translateI18n('social.home.post_item.delete_post_success'));
                if (this.config.handleDelete) {
                    this.config.handleDelete(postID);
                }
            } else {
                runInAction(() => {
                    this.errorDelete = messageHttpRequest();
                });

            }
        } catch (error) {
            runInAction(() => {
                this.errorDelete = messageHttpRequest(error);
            });

        } finally {
            runInAction(() => {
                this.isDeleting = false;
            });

            if (this.errorDelete) {
                messageError(this.errorDelete);
            }
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

    @computed get content() {
        if (this.viewMore) {
            return splitStrToViewMore(this.post.body);
        } else {
            return this.post.body;
        }
    }

    @action disableViewMore() {
        this.config.viewMore = false;
    }


    @computed get viewMore() {
        return !isEmpty(this.post.body) && (isViewMore(this.post.body)
            || overLineNumber(this.post.body))
            && this.config.viewMore;
    }

    @action changeStatusModal = (status) => {
        this.showModalEdit = status;
    };
}

export default Store;