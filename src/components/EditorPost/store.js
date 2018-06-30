import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {addPostApi} from "../../apis/postApis";
import progress from "../../helpers/progress";

class Store {
    @observable percentUpload = 0;
    @observable isUploading = false;
    @observable error = null;
    @observable isFocus = false;

    @action
    async addPost(post, callback = null) {
        this.isUploading = true;
        this.error = null;

        progress.init((value) => {
            this.percentUpload = value;
        }, {
            trickleRate: 0.1,
            trickleSpeed: 500,
        });
        progress.set(0);
        progress.start();
        try {
            const res = await addPostApi(post);
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
            progress.done();
            this.isUploading = false;
        }
    }

    @action setFocusEditor = (value) => {
        this.isFocus = value;
    }
}

const store = new Store();

export default store;
