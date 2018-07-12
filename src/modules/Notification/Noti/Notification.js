import React from "react";
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import {translate} from "react-i18next";
import {withAccount} from "../../../components/context/AccountContext";
import Avatar from "../../../components/Avatar";
import parseNotification from "../../../helpers/notification/parseNotification";
import {relativeTime} from "../../../helpers/time";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Link} from "react-router-dom";
import {linkNotification} from "../../../helpers/notification/notification";

let cx = classNamesBind.bind(styles);

@observer
class Notification extends React.Component {
    componentDidMount() {
    }

    handleClickNoti = () => {
        const {store} = this.props;
        store.seenNotification();
    };


    render() {
        const {prefixCls, account, store} = this.props;
        const {notification} = store;
        const notificationContent = parseNotification(notification, account.id);
        const linkNoti = linkNotification(notification.type, notification.action_web);
        const notificationUnseen = store.isUnseen;
        return (
            <Link to={linkNoti} onClick={this.handleClickNoti}>
                <div className={cx(`${prefixCls}-container`, {[`${prefixCls}-unseen`]: notificationUnseen})}>
                    <div className={cx(`${prefixCls}-avatar`)}>
                        <Avatar url={notification.image_url}/>
                    </div>
                    <div className={cx(`${prefixCls}-container-body`)}>
                        <div className={cx(`${prefixCls}-content-text`)}>
                            <div dangerouslySetInnerHTML={{__html: notificationContent}}/>
                        </div>
                        <div className={cx(`${prefixCls}-content-time`)}>
                            {relativeTime(notification.created_at)}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

Notification.defaultProps = {
    prefixCls: 'notification'
};

Notification.propTypes = {
    store: PropTypes.object.isRequired
};

export default translate(props => props.namespaces)(withAccount(Notification));
