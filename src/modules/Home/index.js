import React from 'react';
// import Header from "./Header";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import EditorPost from "../../components/EditorPost";
import Posts from "./ListPost";
import {observer} from "mobx-react";
import store from "./store";
import {Divider} from "antd";

let cx = classNamesBind.bind(styles);

// const HEADER_FIXED_TOP = true;
@observer
class Home extends React.Component {

    componentDidMount() {
        store.getPosts();

    }

    render() {
        console.log("render index");
        const {posts, isLoading} = store;
        return (
            <div>
                {/*<Header fixed={HEADER_FIXED_TOP}/>*/}
                <div className={cx({
                    "container": true,
                    // "header-fixed-top": HEADER_FIXED_TOP
                })}>
                    <EditorPost addPost={store.addPost}/>
                    <Divider/>
                    <Posts posts={posts} isLoading={isLoading}/>
                </div>
            </div>

        );
    }
}

export default Home;