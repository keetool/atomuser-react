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


const RestrictedRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn() ? <Component {...props} title={rest.title}/> : redirectSignIn()
        }
    />
);

RestrictedRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
    path: PropTypes.string.isRequired
};

const renderRoutes = (routes, parentPath = "") => {
    console.log(routes);
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
                                render={(props) => (<Component title={route.title} {...props}/>)}
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
        console.log(renderRoutes(routes));
        return renderRoutes(routes);
    }
}

AppRoutes.propTypes = {};

export default AppRoutes;
