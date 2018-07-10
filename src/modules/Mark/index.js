import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";

class Mark extends React.Component {
    componentDidMount() {
    }

    render() {
        //const { t } = this.props;
        return <h1>Hello Mark</h1>;
    }
}

Mark.propTypes = {};

export default translate(props => props.namespaces)(Mark);
