import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import Store from "./Store";
import Loading from "./Noti/Loading";
import withTitle from "../../components/HOC/withTitle";

let cx = classNamesBind.bind(styles);

class Notification extends React.Component {

    store = new Store();

    componentDidMount() {
        this.store.getNotifications();
    }

    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout`)}>
                <Loading/>
                <Loading/>
                <Loading/>
                <Loading/>
                <Loading/>
                <Loading/>
                <Loading/>
                <Loading/>
            </div>
        );
    }
}

Notification.defaultProps = {
    prefixCls: 'module-notification'
};

Notification.propTypes = {};

export default translate(props => props.namespaces)(withTitle()(Notification));
