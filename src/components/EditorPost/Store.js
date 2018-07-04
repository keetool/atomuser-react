import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {addPostApi} from "../../apis/postApis";
import progress from "../../helpers/progress";
import {messageSuccess} from "../../helpers/utility";
import {translateI18n} from "../../languages/i18n";
import {DISTANCE_TOP_MESSAGE_HOME} from "../../constants";
import {uploadImageApi} from "../../apis/imageApis";

class Store {
    @observable percentUpload = 0;
    @observable isUploading = false;
    @observable error = null;
    @observable isFocus = false;
    @observable images = [];

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


    @action uploadImage(image) {
        const oldImage = {...image};
        this.changeDataImages(oldImage, {isUploading: true});
        const error = () => {
            this.changeDataImages(image, {isUploading: false});
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            console.log(data.data);
            this.changeDataImages(oldImage, {isUploading: false, ...data.data});
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            console.log(percentComplete);
            this.changeDataImages(image, {percentComplete});
        };

        uploadImageApi(image.file, completeHandler, progressHandler, error);
    }


    @action addImages = (images) => {
        this.images = [...this.images, ...images];
    };

    @action changeDataImages = (image, data) => {
        let index = this.getIndexImagesByFile(image.file);
        this.images[index] = {
            ...this.images[index],
            ...data
        };
    };

    getImageByFile = (file) => {
        return this.images.filter((image) => file === image.file)[0];
    };


    getIndexImagesByFile = (file) => {
        return this.images.indexOf(this.getImageByFile(file));
    };

    getIdImages = () => {
        return this.images.map((image) => image.id);
    };

    @action reset() {
        this.percentUpload = 0;
        this.isUploading = false;
        this.error = null;
        this.isFocus = false;
        this.images = [];
    }
}

export default Store;
