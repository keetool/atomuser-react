import React from "react";
import {Layout} from "antd";
import GlobalHeader from "../../components/GlobalHeader";
import {enquireScreen, unenquireScreen} from "enquire-js";
import {QUERY_SCREEN} from "../../constants/index";
import {ContainerQuery} from "react-container-query";
import classNamesBind from "classnames/bind";
import classNames from "classnames";
import styles from "./styles.less";
import AppRoutes from "../../routes/AppRoutes";
import {setHeaderToken} from "../../helpers/axios";
import {getAccount} from "../../actions/accoutActions";
import {AccountProvider} from "../../components/context/AccountContext";
import GlobalTab from "../../components/GlobalTab";
import {isLoggedIn} from "../../helpers/auth";
import {withRouter} from "react-router";

let cx = classNamesBind.bind(styles);

let isMobile;
enquireScreen(b => {
    isMobile = b;
});

class AppContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setData = this.setState.bind(this);
    }

    state = {
        collapsed: false,
        isMobile: isMobile,
        account: {
            isLoading: false
        }
    };

    componentDidMount() {

        if (isLoggedIn()) {
            setHeaderToken();
            getAccount(this.setData);
        }

        this.enquireHandler = enquireScreen(mobile => {
            if (mobile) {
                this.setState({
                    isMobile: mobile,
                    collapsed: true
                });
            } else {
                this.setState({
                    isMobile: false
                });
            }
        });
    }

    componentWillUnmount() {
        unenquireScreen(this.enquireHandler);
    }

    handleMenuCollapse = collapsed => {
        this.setState({
            collapsed: collapsed ? collapsed : !this.state.collapsed
        });
    };

    render() {
        const {prefixCls} = this.props;
        const {collapsed, isMobile} = this.state;
        const FIXED_HEADER = true;
        const hasTabbar = isLoggedIn();
        const layout = (
                <Layout>
                    <GlobalHeader
                        collapsed={collapsed}
                        onCollapse={this.handleMenuCollapse}
                        isMobile={isMobile}
                        fixed={FIXED_HEADER}
                    />
                    <Layout>
                        <div
                            className={cx(`${prefixCls}-layout-content`, {
                                    [`${prefixCls}-fixed-header-top`]: FIXED_HEADER,
                                }
                            )}
                        >
                            <Layout.Content>
                                <div className={cx(`${prefixCls}-content`, {
                                    [`${prefixCls}-has-tabbar`]: hasTabbar,
                                })}>
                                    <AppRoutes/>
                                </div>
                            </Layout.Content>
                        </div>
                    </Layout>
                    {
                        hasTabbar && <GlobalTab/>
                    }
                </Layout>
            )
        ;
        return (
            <AccountProvider value={this.state.account}>
                <ContainerQuery query={QUERY_SCREEN}>
                    {params => <div className={classNames(params)}>{layout}</div>}
                </ContainerQuery>
            </AccountProvider>
        );
    }
}

AppContainer.defaultProps = {
    prefixCls: 'app-container'
};

AppContainer.propTypes = {};

export default withRouter(AppContainer);
