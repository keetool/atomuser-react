import React from "react";
import {observer} from "mobx-react";
import {translate} from "react-i18next";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import Store from "./Store";
import Loading from "./Noti/Loading";
import withTitle from "../../components/HOC/withTitle";
import Notification from "./Noti/Notification";
import socket from "../../services/socketio";
import {CREATE_NOTIFICATION} from "../../services/socketEvent";
import {withAccount} from "../../components/context/AccountContext";
import {SUBDOMAIN} from "../../constants/env";
import {getValueObjectFromStringKey} from "../../helpers/utility";
import ScrollView from "../../entity/ScrollView";

let cx = classNamesBind.bind(styles);

const listId = "list-noti";

@observer
class ListNotification extends React.Component {

    constructor(props) {
        super(props);
        this.store = new Store();
        this.scrollView = new ScrollView(listId, this.getNotis);
    }

    static getDerivedStateFromProps(props) {
        const {unseen_notification, updateAccount} = props.account;
        if (unseen_notification > 0) {
            updateAccount({unseen_notification: 0});
            return null;
        }

        return null;
    }

    componentDidMount() {
        this.store.getNotifications();

        const channel = `${SUBDOMAIN}:${CREATE_NOTIFICATION}`;
        socket.on(channel, (data) => {
            const notification = data;
            const {account} = this.props;
            const receiverID = getValueObjectFromStringKey(notification, "receiver.id");
            if (receiverID == account.id) {
                this.store.addNotification(notification);
            }
        });
    }


    componentDidUpdate() {
        const {isLoading} = this.store;
        if (!isLoading) {
            this.scrollView.addEventScroll();
        }
    }


    getNotis = () => {
        const store = this.store;
        if (store.isLoadMore) {
            store.getNotifications();
        }
    };

    renderLoading = () => {
        return (
            <div>
                <Loading/>
                <Loading/>
                <Loading/>
                <Loading/>
                <Loading/>
                <Loading/>
                <Loading/>
            </div>
        );
    };

    renderEmptyNoti() {
        const {prefixCls, t} = this.props;
        const {isEmpty} = this.store;
        if (isEmpty) {
            return (
                <div className={cx(`${prefixCls}-layout-empty`)}>
                    <div className={cx(`${prefixCls}-layout-empty-text`)}>
                        {t('social.notification.noti.empty')}
                    </div>
                </div>
            );
        } else {
            return (<div/>);
        }
    }

    render() {
        const {prefixCls} = this.props;
        const {notifications, isLoading} = this.store;
        return (
            <div
                id={listId}
                className={cx(`${prefixCls}-layout`)}>
                {
                    notifications && notifications.length > 0 ?
                        (
                            notifications.map((storeNoti, index) => {
                                    return (
                                        <div key={index}>
                                            <Notification store={storeNoti} key={index}/>
                                        </div>
                                    );
                                }
                            )
                        )
                        :
                        (
                            isLoading && this.renderLoading()
                        )

                }
                {
                    isLoading && <Loading/>
                }
                {
                    this.renderEmptyNoti()
                }
            </div>
        );
    }
}

ListNotification.defaultProps = {
    prefixCls: 'module-notification'
};

ListNotification.propTypes = {};

export default translate(props => props.namespaces)(withTitle()(withAccount(ListNotification)));
