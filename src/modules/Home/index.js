import React from 'react';
// import PropTypes from 'prop-types';
// import Header from "./Header";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import EditorPost from "../../components/EditorPost";
import Posts from "./ListPost";
import {observer} from "mobx-react";
import store from "./store";
import {Divider} from "antd";
// import {message} from "antd";

let cx = classNamesBind.bind(styles);

// const HEADER_FIXED_TOP = true;
@observer
class Home extends React.Component {

    componentDidMount() {
        store.getPosts();

    }

    // message = ()=>{
    //     // let t = message.info(<div>21321</div>, 0);
    //     // setTimeout(() => {
    //     //     message.destroy();
    //     // }, 5000);
    // }

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

Home.propTypes = {};

export default Home;