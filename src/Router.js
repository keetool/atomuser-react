import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import asyncComponent from "./helpers/AsyncFunc";
import AppContainer from "./modules/App/index";
import history from "./helpers/history";
import {LocaleProvider} from "antd";
import getLocale from "./languages/i18nAntd";
import i18n from "./languages/i18n";

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
                    <Route path="/" render={() => <AppContainer/>}/>
                </Switch>
            </Router>
        </LocaleProvider>
    );
};



export default Routes;
