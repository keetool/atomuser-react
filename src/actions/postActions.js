import {addPostApi, getPostsApi} from "../apis/postApis";
import progress from '../helpers/progress';
import {httpSuccess, messageHttpRequest} from "../helpers/httpRequest";

export function addPost(setState, data, callback) {
    setState({isUploading: true, error: null});
    progress.init(setState, 'percentUpload', {
        trickleRate: 0.1,
        trickleSpeed: 500,
    });
    progress.set(0);
    progress.start();
    addPostApi(data)
        .then(res => {
            if (httpSuccess(res.status)) {
                setState({isUploading: false});
                callback(res.data.data);
            } else {
                setState({isUploading: false, error: messageHttpRequest()});
            }
        })
        .catch((error) => {
            const messageError = messageHttpRequest(error);
            setState({isUploading: false, error: messageError});
        });
}

export function getPosts(setState, page) {
    setState({isLoading: true, error: null});
    getPostsApi(page)
        .then(res => {
            if (httpSuccess(res.status)) {
                setState({isLoading: false, posts: res.data.data});
            } else {
                setState({isLoading: false, error: messageHttpRequest()});
            }
        })
        .catch((error) => {
            const messageError = messageHttpRequest(error);
            setState({isLoading: false, error: messageError});
        });
}
