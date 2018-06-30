import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import asyncComponent from "./helpers/AsyncFunc";
import {isLoggedIn} from "./helpers/auth";
import AppContainer from "./modules/App/index";
import PropTypes from "prop-types";
import history from "./helpers/history";
import {LocaleProvider} from "antd";
import getLocale from "./languages/i18nAntd";
import i18n from "./languages/i18n";
import {IS_PRODUCTION, PROTOCOL_DOMAIN, SUBDOMAIN} from "./constants/env";
import {redirectURL} from "./helpers/utility";

const redirectSignIn = () => {
    if (IS_PRODUCTION) {
        const url = PROTOCOL_DOMAIN + 'signin?merchant=' + SUBDOMAIN;
        redirectURL(url);
    } else {
        redirectURL('/signin?merchant=' + SUBDOMAIN);
    }
};

const RestrictedRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn() ? <Component {...props} /> : redirectSignIn()
        }
    />
);

const Routes = () => {
    return (

        <LocaleProvider locale={getLocale(i18n.language)}>{/* config language for ant design*/}
            <Router history={history}>
                <Switch>
                    <Route
                        exact
                        path={"/signin"}
                        component={asyncComponent(() =>
                            import("./modules/Signin/index")
                        )}
                    />
                    <RestrictedRoute path="/" component={AppContainer}/>
                </Switch>
            </Router>
        </LocaleProvider>
    );
};

RestrictedRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
    path: PropTypes.string.isRequired
};

export default Routes;
