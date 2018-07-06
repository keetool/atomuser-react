import React, {Component} from "react";
import PropTypes from "prop-types";

export default class InputFile extends Component {
    _onClick = () => {
        this._ref.click();
        this._ref.value = '';
    };


    render() {
        const {type, multiple, onChange} = this.props;
        return (
            <span ref="file" onClick={this._onClick}>
                    <input
                        type="file"
                        accept={type}
                        ref={(ref) => {
                            this._ref = ref;
                        }}
                        onChange={onChange}
                        multiple={multiple}
                        style={{
                            display: 'none'
                        }}
                    />
                {this.props.children}
            </span>
        );
    }
}

InputFile.propTypes = {
    type: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};


