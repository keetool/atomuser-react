import React, {Component} from "react";
import PropTypes from "prop-types";
import {Tooltip} from "antd";
import {isMobile} from "../../helpers/utility";

export default class TooltipCustom extends Component {

    renderTooltip() {
        const {placement, title} = this.props;
        return (
            <Tooltip placement={placement} title={title} {...this.props}>
                {this.props.children}
            </Tooltip>
        );
    }

    render() {
        if (this.props.disableMobile) {
            this.renderTooltip();
        }

        if (isMobile()) {
            return (this.props.children);
        }

        return this.renderTooltip();
    }
}

TooltipCustom.propTypes = {
    placement: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.element,
    disableMobile: PropTypes.bool,
};


