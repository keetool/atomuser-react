import React, {Component} from "react";
import PropTypes from "prop-types";

export default class InputFile extends Component {
    render() {
        const {type, multiple, onChange} = this.props;
        return (
            <input type="file"
                   accept={type}
                   onChange={onChange}
                   multiple={multiple}
                   style={{
                       cursor: 'pointer',
                       opacity: "0.0",
                       position: "absolute",
                       top: 0,
                       left: 0,
                       bottom: 0,
                       right: 0,
                       width: "100%",
                       height: "100%"
                   }}
            />
        );
    }
}

InputFile.propTypes = {
    type: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};


