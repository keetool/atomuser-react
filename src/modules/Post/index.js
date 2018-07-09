import React from 'react';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import store from "./store";
import withTitle from "../../components/HOC/withTitle";
import Loading from "../../components/Post/Loading";
import Post from "../../components/Post/Post";
import {isEmpty} from "../../helpers/utility";

let cx = classNamesBind.bind(styles);

// const HEADER_FIXED_TOP = true;
@observer
class SinglePost extends React.Component {

    componentDidMount() {
        const {postID} = this.props.match.params;
        store.getPost(postID);
    }

    render() {
        const {storePost, isLoading} = store;
        const {prefixCls} = this.props;
        if (isLoading) {
            return (
                <div className={cx(`${prefixCls}-layout`)}>
                    <Loading/>
                </div>

            );
        } else {
            return (
                <div className={cx(`${prefixCls}-layout`)}>
                    {
                        !isEmpty(storePost) && <Post store={storePost}/>
                    }
                </div>
            );
        }
    }
}

SinglePost.defaultProps = {
    prefixCls: "module-post"
};

export default withTitle()(SinglePost);