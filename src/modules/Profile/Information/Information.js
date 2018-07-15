import React from "react";
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import Loading from "./Loading";
import {observer} from "mobx-react";
import Avatar from "../../../components/Avatar";
import {checkLink, getValueObjectFromStringKey, linkRoute} from "../../../helpers/utility";
import {LOGO} from "../../../constants";
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {Button} from "antd";
import {withAccount} from "../../../components/context/AccountContext";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

let cx = classNamesBind.bind(styles);

@observer
class Information extends React.Component {

    constructor(props) {
        super(props);
    }

    renderAnalytics = () => {
        const {prefixCls, t, store} = this.props;
        const {comments_count, posts_count, votes_count} = store.info;
        return (
            <div className={cx(`${prefixCls}-layout-info-info-analytics`)}>
                <div className={cx(`${prefixCls}-layout-info-info-analytics-post`)}>
                    <div className={cx(`${prefixCls}-layout-info-info-analytics-post-number`)}>
                        {posts_count}
                    </div>
                    <div className={cx(`${prefixCls}-layout-info-info-analytics-comment-text`)}>
                        {t('social.profile.info.post')}
                    </div>
                </div>
                <div className={cx(`${prefixCls}-divider`, `${prefixCls}-vertical`)}/>
                <div className={cx(`${prefixCls}-layout-info-info-analytics-vote`)}>
                    <div className={cx(`${prefixCls}-layout-info-info-analytics-vote-number`)}>
                        {votes_count}
                    </div>
                    <div className={cx(`${prefixCls}-layout-info-info-analytics-comment-text`)}>
                        {t('social.profile.info.vote')}
                    </div>
                </div>
                <div className={cx(`${prefixCls}-divider`, `${prefixCls}-vertical`)}/>
                <div className={cx(`${prefixCls}-layout-info-info-analytics-comment`)}>
                    <div className={cx(`${prefixCls}-layout-info-info-analytics-comment-number`)}>
                        {comments_count}
                    </div>
                    <div className={cx(`${prefixCls}-layout-info-info-analytics-comment-text`)}>
                        {t('social.profile.info.comment')}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {prefixCls, t, store, account, history} = this.props;
        const {isLoading, info} = store;
        const {location} = history;
        const {pathname} = location;

        if (isLoading) {
            return (<Loading/>);
        }

        const linkProfile = linkRoute("/profile/:userID", {userID: getValueObjectFromStringKey(account, 'id')});

        const isShowEdit = checkLink(pathname, linkProfile);

        const avatarUrl = getValueObjectFromStringKey(info, "avatar_url") ? info.avatar_url : LOGO;

        return (
            <div className={cx(`${prefixCls}-layout-info`)}>
                <div className={cx(`${prefixCls}-layout-info-container`)}>
                    <div className={cx(`${prefixCls}-layout-info-info-avatar`)}>
                        <Avatar url={avatarUrl} size={100}/>
                    </div>
                    <div className={cx(`${prefixCls}-layout-info-container-info`)}>
                        <div className={cx(`${prefixCls}-layout-info-info-name`)}>
                            {info.name}
                        </div>

                        {this.renderAnalytics()}

                        {
                            isShowEdit &&
                            <div className={cx(`${prefixCls}-layout-info-info-edit`)}>
                                <Link to={'/profile/edit'}>
                                    <Button icon={"form"}>{t('social.profile.info.edit')}</Button>
                                </Link>

                            </div>
                        }

                    </div>
                </div>
            </div>
        );

    }
}

Information.defaultProps = {
    prefixCls: 'module-profile'
};

Information.propTypes = {
    store: PropTypes.object.isRequired
};

export default translate(props => props.namespaces)(withAccount(withRouter(Information)));
