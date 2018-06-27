import React from 'react';
import PropTypes from 'prop-types';
import Post from "./post/Post";
import Loading from "./post/Loading";
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);

class ListPost extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setData = this.setState.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('list-post');
        if (this.isBottom(wrappedElement)) {
            console.log('header bottom reached');
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    isBottom(el) {
        return el.getBoundingClientRect().bottom - 500 <= window.innerHeight;
    }


    render() {
        const {posts, isLoading} = this.props;
        return (
            <div className={cx({
                "layout-posts": true
            })} id={"list-post"}>
                {
                    posts && posts.length > 0 ?
                        (
                            posts.map((post, index) => {
                                    return (
                                        <Post post={post} key={index}/>
                                    );
                                }
                            )
                        )
                        :
                        (
                            <Loading/>
                        )

                }
                {
                    isLoading && <Loading/>
                }
            </div>

        );
    }
}

ListPost.propTypes = {
    posts: PropTypes.array
};

export default ListPost;