import React, {Component} from "react";
import {withRouter} from "react-router";

const scrollTopView = () => {
    return WrappedComponent => {
        class WebTitle extends Component {

            scrollTop = () => {
                window.scrollTo(0, 0);
            };

            render() {
                this.scrollTop();
                return (
                    <WrappedComponent {...this.props}/>
                );
            }
        }

        return withRouter(WebTitle);
    };
};

export default scrollTopView;
