import React from "react";

const DeviceContext = React.createContext();

export const DeviceProvider = DeviceContext.Provider;

export function withDevice(Component) {
    return function DeviceConsumer(props) {
        return (
            <DeviceContext.Consumer>
                {device => <Component {...props} device={device}/>}
            </DeviceContext.Consumer>
        );
    };
}
