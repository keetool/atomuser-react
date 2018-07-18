import {observable, action,runInAction} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {addCommentApi} from "../../apis/commentApis";
import {messageError} from "../../helpers/message";
import {convertDataEditor} from "../../helpers/editor";

class Store {
    post = null;
    @observable isUploading = false;
    @observable error = null;
    @observable isFocus = false;
    @observable content = '';

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
                this.isUploading = false;
            });
            if (this.error) {
                messageError(this.error);
            }
        }
    }

    @action setFocusEditor = (value) => {
        this.isFocus = value;
    };

    @action reset() {
        this.isUploading = false;
        this.error = null;
        this.isFocus = false;
        this.content = '';
    }

    @action setContent(value) {
        this.content = convertDataEditor(value);
    }

    @action setLineNumber(value) {
        this.lineNumber = value;
    }
}


export default Store;
