import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";

class Notification extends React.Component {
    componentDidMount() {
    }

    render() {
        const {t} = this.props;
        return <h1>Hello Notification</h1>;
    }
}

Notification.propTypes = {};

export default translate(props => props.namespaces)(Notification);
