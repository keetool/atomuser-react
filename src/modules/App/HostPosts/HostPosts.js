import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import Header from "./Header";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Loading from "./Loading";
import Store from "./Store";
import Post from "./Post";
import {observer} from "mobx-react";
// import LoadMore from "./LoadMore";

let cx = classNamesBind.bind(styles);

@observer
class HostPosts extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new Store();
    }

    componentDidMount() {
        this.store.getHotPosts();
    }

    renderLoading() {
        const {isLoading} = this.store;
        if (isLoading)
            return (
                <div>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                </div>
            );
    }

    render() {
        const {prefixCls} = this.props;
        const {posts, isLoading} = this.store;
        console.log(posts);
        return (
            <div className={cx(`${prefixCls}-layout`)}>
                <Header/>
                {this.renderLoading()}
                {
                    !isLoading && posts && posts.length > 0 &&
                    posts.map((post, index) => {
                        console.log(post);
                        return (
                            <Post post={{...post}} key={index}/>
                        );
                    })
                }
                {/*<LoadMore/>*/}
            </div>
        );
    }
}

HostPosts.defaultProps = {
    prefixCls: 'app-list-hot-post'
};

HostPosts.propTypes = {};

export default translate(props => props.namespaces)(HostPosts);
