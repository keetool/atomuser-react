import React from 'react';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import Store from "./Store";
import withTitle from "../../components/HOC/withTitle";
import Loading from "../../components/Post/Loading";
import Post from "../../components/Post/Post";
import {isEmpty} from "../../helpers/utility";
import {withRouter} from "react-router";

let cx = classNamesBind.bind(styles);

// const HEADER_FIXED_TOP = true;
@observer
class SinglePost extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        postID: '',
        store: new Store()
    };

    static getDerivedStateFromProps(props, state) {
        const {postID} = props.match.params;
        if (state.postID != postID) {
            state.store.getPost(postID);
            return {postID: postID};
        }

        return null;
    }

    render() {
        const {storePost, isLoading} = this.state.store;
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

export default withTitle()(withRouter(SinglePost));