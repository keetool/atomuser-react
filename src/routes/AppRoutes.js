import React from "react";
import {isLoggedIn, redirectSignIn} from "../helpers/auth";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import homeRoutes from "./homeRoutes";
import searchRoutes from "./searchRoutes";
import notificationRoutes from "./notificationRoutes";
import markRoutes from "./markRoutes";
import profileRoutes from "./profileRoutes";


const routes = [...homeRoutes, ...searchRoutes, ...markRoutes, ...notificationRoutes, ...profileRoutes];


const RestrictedRoute = ({component: Component, title, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn() ? <Component {...props} title={title}/> : redirectSignIn()
        }
    />
);

RestrictedRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
    path: PropTypes.string.isRequired
};

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
                    if (route.needSignIn) {
                        return (
                            <RestrictedRoute key={`key_${parentPath}${route.path}`}
                                             exact={route.exact}
                                             path={parentPath + route.path}
                                             title={route.title}
                                             component={Component}
                            />
                        );
                    } else {
                        return (
                            <Route
                                key={`key_${parentPath}${route.path}`}
                                exact={route.exact}
                                path={parentPath + route.path}
                                render={(props) => (<Component {...props} title={route.title} />)}
                            />
                        );
                    }
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
