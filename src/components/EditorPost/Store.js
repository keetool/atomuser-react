import {observable, action, computed} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {addPostApi} from "../../apis/postApis";
import progress from "../../helpers/progress";
import {translateI18n} from "../../languages/i18n";
import {uploadImageApi} from "../../apis/imageApis";
import {messageSuccess, messageWarning} from "../../helpers/message";
import {convertDataEditor, overLineNumber, overMaxString} from "../../helpers/editor";

class Store {
    @observable percentUpload = 0;
    @observable isUploading = false;
    @observable error = null;
    @observable isFocus = false;
    @observable images = [];
    @observable content = "";
    @observable lineNumber = 0;

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
                    messageSuccess(translateI18n('social.home.post.upload_success'));
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

            const imageName = image.file ? image.file.name : '';

            messageWarning(translateI18n('social.editor.Noti.upload_image_error', {image_name: imageName}));

            this.removeImage(image);

        };

        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            this.changeDataImages(oldImage, {isUploading: false, ...data.data});
        };

        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
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

    @action removeImage(image) {
        this.images.splice(this.getIndexImagesByFile(image.file), 1);

    }

    @action reset() {
        this.percentUpload = 0;
        this.isUploading = false;
        this.error = null;
        this.isFocus = false;
        this.images = [];
        this.content = '';
    }

    @action setContent(value) {
        this.content = convertDataEditor(value);
    }

    @action setLineNumber(value) {
        this.lineNumber = value;
    }

    @computed get isZoomText() {
        return !overMaxString(this.content) && !overLineNumber(this.content);
    }


}

export default Store;
