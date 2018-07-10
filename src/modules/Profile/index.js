import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import withTitle from "../../components/HOC/withTitle";

class profile extends React.Component {
    componentDidMount() {
    }

    render() {
        //const { t } = this.props;
        return <h1>Hello profile</h1>;
    }
}

profile.propTypes = {};

export default translate(props => props.namespaces)(withTitle()(profile));
