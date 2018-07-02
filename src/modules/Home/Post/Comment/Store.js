import {observable, action, computed} from "mobx";
import {getCommentsApi} from "../../../../apis/commentApis";
import {httpSuccess, messageHttpRequest} from "../../../../helpers/httpRequest";

class Store {
    post = null;
    @observable comments = [];
    @observable isLoading = false;
    @observable pagination = {
        current_page: 1,
        last_page: 1
    };
    @observable error = null;

    constructor(post) {
        this.post = post;
    }

    @action
    async getComments() {
        const postID = this.post.id;

        this.isLoading = true;
        this.error = null;

        try {
            const res = await getCommentsApi(postID, this.pagination.current_page);
            const data = res.data;
            if (httpSuccess(res.status)) {
                this.comments = [...data.data, ...this.comments];
                this.pagination = data.meta;
            } else {
                this.error = messageHttpRequest();
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
        } finally {
            this.isLoading = false;
        }
    }

    @action addComment = (comment) => {
        this.pagination.total++;
        this.comments.shift();
        this.comments = [...this.comments, comment];
    };

    @action incPage() {
        this.pagination.current_page++;
    }

    @computed
    get isLoadMore() {
        return this.pagination.current_page < this.pagination.last_page;
    }
}


export default Store;
