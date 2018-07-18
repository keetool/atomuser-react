import {observable, action, computed, runInAction} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {getLastArr, isEmpty, isEmptyArr} from "../../helpers/utility";
import {messageError} from "../../helpers/message";
import {getMarkPostsBySubdomain} from "../../apis/markApis";
import StorePost from "../../components/Post/Store";

class Store {
    @observable marks = [];
    @observable isLoading = false;
    @observable error = null;
    @observable pagination = {};

    @action
    async getBookmarks() {

        if (this.isLoading) return;

        this.isLoading = true;
        this.error = null;
        const lastMark = getLastArr(this.marks);
        const lastMarkID = lastMark ? lastMark.id : '';

        try {
            const res = await getMarkPostsBySubdomain(lastMarkID);
            const data = res.data;

            if (httpSuccess(res.status)) {
                const marks = data.data;
                runInAction(() => {
                    this.marks = [...this.marks, ...this.createStorePosts(marks)];
                    data.meta.remain_total = data.meta.total - marks.length;
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

    @computed get isEmpty() {
        return !this.isLoading && !this.error && isEmptyArr(this.marks);
    }

    @action handleDeletePost = (postID) => {
        this.marks = this.marks.filter(mark => mark.postStore.post.id !== postID);
    };

    createStorePosts(marks) {
        return marks.map((mark) => {
            return {...mark, postStore: this.createStorePost(mark.post)};
        });
    }

    createStorePost(post) {
        return new StorePost(post, {handleDelete: this.handleDeletePost});
    }

    @computed get isLoadMore() {
        return this.pagination.remain_total > 0;
    }
}

export default Store;