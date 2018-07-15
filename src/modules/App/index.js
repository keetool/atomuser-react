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
import {DeviceProvider} from "../../components/context/DeviceContext";
import withTitle from "../../components/HOC/withTitle";

let cx = classNamesBind.bind(styles);

const QUERY_SCREEN_MOBILE = 'screen and (max-width:576px)';

let isMobile;
enquireScreen(b => {
    isMobile = b;
}, QUERY_SCREEN_MOBILE);


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
        }, QUERY_SCREEN_MOBILE);
    }

    componentWillUnmount() {
        unenquireScreen(this.enquireHandler);
    }

    handleMenuCollapse = collapsed => {
        this.setState({
            collapsed: collapsed ? collapsed : !this.state.collapsed
        });
    };

    updateAccount = (data) => {
        this.setState({
            account: {...this.state.account, ...data}
        });
    };

    render() {
        const {prefixCls} = this.props;
        const {collapsed, isMobile} = this.state;
        const FIXED_HEADER = true;
        const hasTabbar = isLoggedIn();
        const device = {
            isMobile
        };
        const account = {
            ...this.state.account,
            updateAccount: this.updateAccount
        };

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
            <AccountProvider value={account}>
                <DeviceProvider value={device}>
                    <ContainerQuery query={QUERY_SCREEN}>
                        {params => <div className={classNames(params)}>{layout}</div>}
                    </ContainerQuery>
                </DeviceProvider>
            </AccountProvider>
        );
    }
}

AppContainer.defaultProps = {
    prefixCls: 'app-container'
};

AppContainer.propTypes = {};

export default withRouter(withTitle()(AppContainer));
