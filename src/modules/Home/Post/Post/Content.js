import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import Image from "./Image";

let cx = classNamesBind.bind(styles);

@observer
class Content extends React.Component {
    render() {
        const {post} = this.props;
        return (
            <div className={cx({
                "content": true
            })}>
                <div dangerouslySetInnerHTML={{__html: post.body}} className={cx("content-body")}/>
                <Image images={post.images}/>
            </div>
        );
    }
}

Content.propTypes = {
    post: PropTypes.object.isRequired
};

export default Content;