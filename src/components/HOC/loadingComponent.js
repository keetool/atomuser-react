import React, {Component} from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

const loadingComponent = () => {
    return WrappedComponent => {
        class ComponentLoading extends Component {
            render() {
                return (
                    <div className={"show-loading-animation"}>
                        <ReactPlaceholder
                            ready={false}
                            type={"text"}
                            customPlaceholder={<WrappedComponent/>}
                        >
                            <div/>
                        </ReactPlaceholder>
                    </div>

                );
            }
        }

        return ComponentLoading;
    };
};

export default loadingComponent;
