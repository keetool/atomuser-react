import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {addPostApi} from "../../apis/postApis";
import progress from "../../helpers/progress";
import {messageSuccess} from "../../helpers/utility";
import {translateI18n} from "../../languages/i18n";
import {DISTANCE_TOP_MESSAGE_HOME} from "../../constants";

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
                setTimeout(() => {
                    this.isUploading = false;
                    messageSuccess(translateI18n('social.home.post.upload_success'), DISTANCE_TOP_MESSAGE_HOME);
                    if (callback) {
                        callback(data.data);
                    }
                }, 400);
            } else {
                this.error = messageHttpRequest();
                this.isUploading = false;
            }
        } catch (error) {
            this.error = messageHttpRequest(error);
            this.isUploading = false;
        } finally {
            progress.done();
        }
    }

    @action setFocusEditor = (value) => {
        this.isFocus = value;
    };
}

export default Store;
