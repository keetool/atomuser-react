import React from "react";
import {observer} from "mobx-react";
import {translate} from "react-i18next";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import Store from "./Store";
import Loading from "./Noti/Loading";
import withTitle from "../../components/HOC/withTitle";
import Notification from "./Noti/Notification";

let cx = classNamesBind.bind(styles);

@observer
class ListNotification extends React.Component {

    store = new Store();

    componentDidMount() {
        this.store.getNotifications();
    }

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

    render() {
        const {prefixCls} = this.props;
        const {notifications, isLoading} = this.store;
        return (
            <div className={cx(`${prefixCls}-layout`)}>
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
            </div>
        );
    }
}

ListNotification.defaultProps = {
    prefixCls: 'module-notification'
};

ListNotification.propTypes = {};

export default translate(props => props.namespaces)(withTitle()(ListNotification));
