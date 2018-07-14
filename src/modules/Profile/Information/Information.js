import React from "react";
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import Loading from "./Loading";
import {observer} from "mobx-react";
import Avatar from "../../../components/Avatar";
import {getValueObjectFromStringKey} from "../../../helpers/utility";
import {LOGO} from "../../../constants";
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {Button} from "antd";

let cx = classNamesBind.bind(styles);

@observer
class Information extends React.Component {

    constructor(props) {
        super(props);
    }

    renderAnalytics = () => {
        const {prefixCls, t, store} = this.props;
        const {comments_count, posts_count, votes_count} = store;
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
        const {prefixCls, t, store} = this.props;
        const {isLoading, info} = store;

        if (isLoading) {
            return (<Loading/>);
        }

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

                        <div className={cx(`${prefixCls}-layout-info-info-edit`)}>
                            <Button icon={"form"}>{t('social.profile.info.edit')}</Button>
                        </div>
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

export default translate(props => props.namespaces)(Information);
