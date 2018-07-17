import React from "react";
import PropTypes from 'prop-types';
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import ActionVote from "../../../components/ActionVote";
import {LOGO} from "../../../constants";
import {getValueObjectFromStringKey, linkRoute} from "../../../helpers/utility";
import Avatar from "../../../components/Avatar";
import {observer} from "mobx-react";
import {fullRelativeTime} from "../../../helpers/time";
import {Link} from "react-router-dom";
import {splitStrToViewMore} from "../../../helpers/editor";

let cx = classNamesBind.bind(styles);

@observer
class Post extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls, post} = this.props;

        const avatarUrl = getValueObjectFromStringKey(post, "creator.avatar_url") ?
            getValueObjectFromStringKey(post, "creator.avatar_url") : LOGO;

        const nameCreator = getValueObjectFromStringKey(post, "creator.name");

        const created_at = getValueObjectFromStringKey(post, "created_at");
        const userID = getValueObjectFromStringKey(post, "creator.id");
        const postID = getValueObjectFromStringKey(post, "id");

        const linkDetailPost = linkRoute("/post/:postID", {postID: postID});
        const linkProfile = linkRoute("/profile/:userID", {userID: userID});

        let content = getValueObjectFromStringKey(post, "body");

        content = splitStrToViewMore(content, 1, 20);

        return (
            <div className={cx(`${prefixCls}-post`)}
                 style={{width: "100%"}}
            >
                <div className={cx(`${prefixCls}-post-action`)}>
                    <ActionVote
                        horizontal
                    />
                </div>

                <div className={cx(`${prefixCls}-post-content`)}>
                    <div className={cx(`${prefixCls}-post-content-creator`)}>
                        <div className={cx(`${prefixCls}-post-content-creator-avatar`)}>
                            <Avatar size={15} url={avatarUrl}/>
                        </div>
                        <Link to={linkProfile}>
                            <div className={cx(`${prefixCls}-post-content-creator-name`)}>
                                {nameCreator}
                            </div>
                        </Link>
                    </div>
                    <div className={cx(`${prefixCls}-post-content-post`)}>
                        <Link to={linkDetailPost}>
                            <div className={cx(`${prefixCls}-post-content-post-text-time`)}>
                                {fullRelativeTime(created_at)}
                            </div>
                        </Link>
                        <div
                            dangerouslySetInnerHTML={{__html: content}}
                            className={cx(`${prefixCls}-post-content-post-content`)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


Post.defaultProps = {
    prefixCls: 'app-list-hot-post'
};

Post.propTypes = {
    post: PropTypes.object.isRequired
};

export default Post;
