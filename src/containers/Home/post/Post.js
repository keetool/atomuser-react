import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Action from "./Action";
// import _ from "lodash";

let cx = classNamesBind.bind(styles);

class Post extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setData = this.setState.bind(this);
        this.state = {
            post: props.post
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     if (!_.isEqual(nextProps.post, this.props.post)) {
    //         this.setState({
    //             post: nextProps.post
    //         });
    //     }
    // }

    render() {
        const {post} = this.props;
        return (
            <div className={cx("layout-post")}>
                <Header creator={post.creator}/>
                <Content post={post}/>
                <Action/>
                <Footer createdAt={post.created_at}/>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object
};

export default Post;