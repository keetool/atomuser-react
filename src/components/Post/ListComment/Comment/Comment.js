import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import Avatar from "../../../Avatar/index";
import {LOGO} from "../../../../constants/index";
import Action from "./Action";
import {getValueObjectFromStringKey, linkRoute} from "../../../../helpers/utility";
import {Link} from "react-router-dom";
import {translate} from "react-i18next";

let cx = classNamesBind.bind(styles);

@observer
class Comment extends React.Component {
    handleViewMore = () => {
        const {store} = this.props;
        store.disableViewMore();
    };

    render() {
        const {store, prefixCls, t} = this.props;
        const {comment} = store;
        const creator = comment.user ? comment.user : {avatar_url: LOGO};
        const linkProfile = linkRoute("/profile/:userID", {userID: getValueObjectFromStringKey(comment, 'user.id')});
        const content = store.content;
        const isViewMore = store.viewMore;
        return (
            <div className={cx(`${prefixCls}-layout-content`)}>
                <Avatar url={creator.avatar_url}/>
                <div className={cx(`${prefixCls}-content`)}>
                    <div className={cx(`${prefixCls}-comment`)}>
                        <Link to={linkProfile}>
                            <div className={cx(`${prefixCls}-name`)}>{creator.name}</div>
                        </Link>
                        <div className={cx(`${prefixCls}-content-comment`)}
                             dangerouslySetInnerHTML={{__html: content}}/>
                        {
                            isViewMore &&
                            <div
                                className={cx(`${prefixCls}-content-view-more`)}
                                onClick={this.handleViewMore}>
                                {t('social.home.post_item.view_more')}
                            </div>
                        }
                    </div>
                    <Action comment={comment} store={store}/>
                </div>
            </div>
        );
    }
}

Comment.defaultProps = {
    prefixCls: 'post-comment'
};

Comment.propTypes = {
    store: PropTypes.object.isRequired,
};

export default translate(props => props.namespaces)(Comment);