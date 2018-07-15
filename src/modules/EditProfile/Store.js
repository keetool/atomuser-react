import {observable, action} from "mobx";
import {httpSuccess, messageHttpRequest} from "../../helpers/httpRequest";
import {messageSuccess} from "../../helpers/message";
import {editInfoUserApi} from "../../apis/accountApis";
import {translateI18n} from "../../languages/i18n";

class Store {
    @observable isUploading = false;
    @observable errorUpload = null;

    @action
    async editInfoProfile(dataAccount, callbackSuccess) {

        this.isUploading = true;
        this.errorUpload = null;

        try {
            const res = await editInfoUserApi(dataAccount);
            const data = res.data;

            if (httpSuccess(res.status)) {
                const info = data.data;

                callbackSuccess(info);
                messageSuccess(translateI18n('social.edit_profile.noti.upload_success'));
            } else {
                this.errorUpload = messageHttpRequest();
            }
        } catch (error) {
            this.errorUpload = messageHttpRequest(error);
        } finally {
            this.isUploading = false;
        }
    }
}

export default Store;