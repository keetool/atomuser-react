import React, {Component} from "react";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import GlobalLoading from "../components/GlobalLoading";

export default function asyncComponent(importComponent) {
    class AsyncFunc extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
            Nprogress.configure({showSpinner: false});
        }

        async componentDidMount() {
            Nprogress.start();
            this.mounted = true;
            const {default: Component} = await importComponent();
            Nprogress.done();
            if (this.mounted) {
                /*eslint-disable react/no-did-mount-set-state*/
                this.setState({
                    component: <Component {...this.props} />
                });
            }
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        render() {
            const Component = this.state.component || <GlobalLoading/>;
            return (
                <div>
                    {Component}
                </div>

            );
        }
    }

    return AsyncFunc;
}
