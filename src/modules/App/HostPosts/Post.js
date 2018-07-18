import React from "react";
import PropTypes from 'prop-types';
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import ActionVote from "../../../components/ActionVote";
import {LOGO} from "../../../constants";
import {linkRoute} from "../../../helpers/utility";
import Avatar from "../../../components/Avatar";
import {observer} from "mobx-react";
import {fullRelativeTime} from "../../../helpers/time";
import {Link} from "react-router-dom";
import {splitStrToViewMore} from "../../../helpers/editor";
import {
    getValuePrimary,
    getValuesFromKeys, removePropertyObjectWithKey, removePropertyObjectWithKeys
} from "../../../helpers/entity/object";
import {removeObservable} from "../../../helpers/entity/mobx";

let cx = classNamesBind.bind(styles);

@observer
class Post extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls, post} = this.props;

        const dataPost = getValuesFromKeys(post,
            ["creator.avatar_url", "creator.name", "created_at", "creator.id", "id", "body", "vote", "upvote", "downvote"]);

        const avatarUrl = getValuePrimary(dataPost['creator.avatar_url'], LOGO);

        const linkDetailPost = linkRoute("/post/:postID", {postID: dataPost['id']});
        const linkProfile = linkRoute("/profile/:userID", {userID: dataPost['creator.id']});

        const content = splitStrToViewMore(dataPost['body'], 1, 20);

        let data = removeObservable(post);

        console.log(removePropertyObjectWithKeys(data, ["creator.id", "merchant.id", 'body']));
        console.log({data});

        return (
            <div className={cx(`${prefixCls}-post`)}
                 style={{width: "100%"}}
            >
                <div className={cx(`${prefixCls}-post-action`)}>
                    <ActionVote
                        horizontal
                        vote={dataPost["vote"]}
                        upvote={dataPost["upvote"]}
                        downvote={dataPost["downvote"]}
                        disabled
                    />
                </div>

                <div className={cx(`${prefixCls}-post-content`)}>
                    <div className={cx(`${prefixCls}-post-content-creator`)}>
                        <div className={cx(`${prefixCls}-post-content-creator-avatar`)}>
                            <Avatar size={15} url={avatarUrl}/>
                        </div>
                        <Link to={linkProfile}>
                            <div className={cx(`${prefixCls}-post-content-creator-name`)}>
                                {dataPost['creator.name']}
                            </div>
                        </Link>
                    </div>
                    <div className={cx(`${prefixCls}-post-content-post`)}>
                        <Link to={linkDetailPost}>
                            <div className={cx(`${prefixCls}-post-content-post-text-time`)}>
                                {fullRelativeTime(dataPost['created_at'])}
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
