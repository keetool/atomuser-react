import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";

class Search extends React.Component {
    componentDidMount() {
    }

    render() {
        //const { t } = this.props;
        return <h1>Hello Search</h1>;
    }
}

Search.propTypes = {};

export default translate(props => props.namespaces)(Search);
