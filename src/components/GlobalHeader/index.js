import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    Icon,
    Layout,
} from "antd";
import styles from "./styles.less";
import classNamesBind from "classnames/bind";
import {URL_add_parameter, reload_url, checkLink} from "../../helpers/utility";
import {withAccount} from "../context/AccountContext";
import Logo from "../static/Logo";
import LogoText from "../static/LogoText";
import {isLoggedIn, redirectSignIn, signout} from "../../helpers/auth";
import {translate} from "react-i18next";
import Tooltip from "../common/Tooltip";
import {withDevice} from "../context/DeviceContext";
import history from "../../helpers/history";
import {TABS} from "../../constants";

let cx = classNamesBind.bind(styles);

class GlobalHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleChangeLanguage(value) {
        reload_url(URL_add_parameter("lang", value));
    }

    handleSignOut = () => {
        signout(true);
    };

    handleClickLogo = () => {
        window.open('/', '_blank');
    };

    isShowBack = () => {
        const {device, account} = this.props;
        const {location} = history;
        const {pathname} = location;

        const isMenu = TABS(account.id).filter((tab) => checkLink(pathname, tab.path)).length > 0;

        return device.isMobile && !isMenu && account.id;
    };

    handleBack = () => {
        history.goBack();
    };

    render() {
        const {fixed, t, prefixCls, account} = this.props;

        const {joined, isJoining, onJoin} = account;

        return (
            <Layout.Header
                className={cx(
                    `${prefixCls}-layout-header`, {
                        [`${prefixCls}-header-fixed-top`]: fixed
                    })}
            >
                <div
                    className={cx(`${prefixCls}-header`)}
                >
                    {
                        this.isShowBack() ?
                            (
                                <div className={cx(`${prefixCls}-header-back`)} onClick={this.handleBack}>
                                    <div className={cx(`${prefixCls}-header-back-icon`)}>
                                        <Icon type="arrow-left"/>
                                    </div>
                                    <div className={cx(`${prefixCls}-header-back-text`)}>
                                        {t('social.header.back.text')}
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div
                                    className={cx(`${prefixCls}-logo`)}
                                    onClick={this.handleClickLogo}
                                >
                                    <Logo size={25} isContrast/>
                                    <LogoText size={20} bold={false} isContrast style={{paddingLeft: '2px'}}/>
                                </div>
                            )
                    }
                    <div className={cx(`${prefixCls}-right`)}>
                        {
                            isLoggedIn() && joined === false &&
                            <div className={cx(`${prefixCls}-right-join`)}>
                                <Button ghost
                                        loading={isJoining}
                                        onClick={isJoining ? null : onJoin}
                                >
                                    {t('social.header.button.join')}
                                </Button>
                            </div>

                        }
                        {
                            isLoggedIn() ?
                                (
                                    <Tooltip placement="bottomRight" title={t('social.tooltip.header.signout')}>
                                        <Icon type="logout" style={{fontSize: '18px'}} onClick={this.handleSignOut}/>
                                    </Tooltip>
                                )
                                :
                                (
                                    <Button ghost onClick={() => {
                                        redirectSignIn();
                                    }}
                                    >
                                        {t('social.global.signin')}
                                    </Button>
                                )
                        }

                    </div>
                </div>
            </Layout.Header>
        );
    }
}

GlobalHeader.defaultProps = {
    prefixCls: 'global-header'
};

GlobalHeader.propTypes = {
    isMobile: PropTypes.bool,
    fixedSider: PropTypes.bool,
    fixed: PropTypes.bool
};

export default translate(props => props.namespaces)(withAccount(withDevice(GlobalHeader)));
