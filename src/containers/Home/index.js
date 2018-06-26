import React from 'react';
// import PropTypes from 'prop-types';
import Header from "./Header";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import EditorPost from "../../components/EditorPost";
import {getPosts} from "../../actions/postActions";

let cx = classNamesBind.bind(styles);

const HEADER_FIXED_TOP = true;

class Home extends React.Component {

    state = {
        posts: []
    };

    constructor(props, context) {
        super(props, context);
        this.setData = this.setState.bind(this);
    }

    componentDidMount() {
        getPosts(this.setData);
    }

    addPost = (post) => {
        this.setState({
            posts: [post, ...this.state.posts]
        });
    };

    render() {
        const {posts} = this.state;
        return (
            <div>
                <Header fixed={HEADER_FIXED_TOP}/>
                <div className={cx({
                    "container": true,
                    "header-fixed-top": HEADER_FIXED_TOP
                })}>
                    <EditorPost addPost={this.addPost}/>
                    {posts.map((post) => {
                        return (
                            <div>
                                <div dangerouslySetInnerHTML={{__html: post.body}}/>
                                <hr/>
                            </div>
                        );
                    })}
                </div>
            </div>

        );
    }
}

Home.propTypes = {};

export default Home;