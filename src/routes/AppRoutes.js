import React from "react";
import {Route, Switch} from "react-router-dom";
import homeRoutes from "./homeRoutes";

const routes = [...homeRoutes];

const renderRoutes = (routes, parentPath = "") => {
    return (
        <Switch>
            {routes.map(route => {
                if (route.children) {
                    return (
                        <Route
                            key={`key_${parentPath}${route.path}`}
                            exact={route.exact}
                            path={parentPath + route.path}
                            render={({match: {url}}) => {
                                return renderRoutes(route.children, url);
                            }}
                        />
                    );
                } else {
                    const Component = route.component;
                    return (
                        <Route
                            key={`key_${parentPath}${route.path}`}
                            exact={route.exact}
                            path={parentPath + route.path}
                            render={({props}) => (<Component title={route.title} {...props}/>)}
                        />
                    );
                }
            })}
        </Switch>
    );
};

class AppRoutes extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return renderRoutes(routes);
    }
}

AppRoutes.propTypes = {};

export default AppRoutes;
