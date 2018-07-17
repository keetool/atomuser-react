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
import {AccountProvider} from "../../components/context/AccountContext";
import GlobalTab from "../../components/GlobalTab";
import {isLoggedIn} from "../../helpers/auth";
import {withRouter} from "react-router";
import {DeviceProvider} from "../../components/context/DeviceContext";
import withTitle from "../../components/HOC/withTitle";
import {observer} from "mobx-react";
import store from './store';
import ListNewAtom from "./ListNewAtom/ListNewAtom";
import HostPosts from "./HostPosts/HostPosts";

let cx = classNamesBind.bind(styles);

const QUERY_SCREEN_MOBILE = 'screen and (max-width:576px)';

let isMobile;
enquireScreen(b => {
    isMobile = b;
}, QUERY_SCREEN_MOBILE);

@observer
class AppContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        if (isLoggedIn()) {
            setHeaderToken();
        }
    }

    state = {
        isMobile: isMobile,
    };

    componentDidMount() {

        if (isLoggedIn()) {
            store.getAccount();
        }

        this.enquireHandler = enquireScreen(mobile => {
            if (mobile) {
                this.setState({
                    isMobile: mobile,
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

    updateAccount = (data) => {
        store.updateAccount(data);
    };

    joinMerchant = () => {
        store.joinMerchant();
    };

    render() {
        const {account, isLoadingAccount, isJoiningMerchant} = store;

        const {prefixCls} = this.props;
        const {isMobile} = this.state;
        const FIXED_HEADER = true;
        const hasTabbar = isLoggedIn();
        const device = {
            isMobile
        };
        const accountData = {
            ...account,
            isLoading: isLoadingAccount,
            isJoining: isJoiningMerchant,
            updateAccount: this.updateAccount,
            onJoin: this.joinMerchant
        };

        const layout = (
                <Layout>
                    <GlobalHeader
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
                                    <div className={cx(`${prefixCls}-content-left`)}>
                                        <HostPosts/>
                                    </div>
                                    <div className={cx(`${prefixCls}-content-app`)}>
                                        <AppRoutes/>
                                    </div>
                                    <div className={cx(`${prefixCls}-content-right`)}>
                                        <ListNewAtom/>
                                    </div>
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
            <AccountProvider value={accountData}>
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
