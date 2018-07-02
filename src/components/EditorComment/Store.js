import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {addCommentApi} from "../../apis/commentApis";
import {DISTANCE_TOP_MESSAGE_HOME} from "../../constants";
import {messageError} from "../../helpers/utility";

class Store {
    post = null;
    @observable isUploading = false;
    @observable error = null;
    @observable isFocus = false;

    constructor(post) {
        this.post = post;
    }

    @action
    async addComment(comment, callback = null) {
        const postID = this.post.id;

        this.isUploading = true;
        this.error = null;

        try {
            const res = await addCommentApi(postID, comment);
            const data = res.data;
            if (httpSuccess(res.status)) {
                if (callback) {
                    callback(data.data);
                }
            } else {
                this.error = messageHttpRequest();
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
        } finally {
            this.isUploading = false;
            if (this.error) {
                messageError(this.error, DISTANCE_TOP_MESSAGE_HOME);
            }
        }
    }

    @action setFocusEditor = (value) => {
        this.isFocus = value;
    };
}


export default Store;
