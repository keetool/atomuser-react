import React from 'react';
// import Header from "./Header";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import EditorPost from "../../components/EditorPost";
import Posts from "./ListPost";
import {observer} from "mobx-react";
import Store from "./Store";
import withTitle from "../../components/HOC/withTitle";

let cx = classNamesBind.bind(styles);

// const HEADER_FIXED_TOP = true;
@observer
class Home extends React.Component {

    store = new Store();

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.store.getPosts();
    }

    render() {


        return (
            <div>
                {/*<Header fixed={HEADER_FIXED_TOP}/>*/}
                <div className={cx({
                    "container": true,
                    // "header-fixed-top": HEADER_FIXED_TOP
                })}>
                    <EditorPost addPost={this.store.addPost}/>
                    <Posts store={this.store}/>
                </div>
            </div>
        );
    }
}

export default withTitle()(Home);