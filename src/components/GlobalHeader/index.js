import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    Icon,
    Layout,
} from "antd";
import styles from "./styles.less";
import classNamesBind from "classnames/bind";
import {URL_add_parameter, reload_url} from "../../helpers/utility";
import {withAccount} from "../context/AccountContext";
import Logo from "../static/Logo";
import LogoText from "../static/LogoText";
import {isLoggedIn, redirectSignIn, signout} from "../../helpers/auth";
import {translate} from "react-i18next";
import Tooltip from "../common/Tooltip";
// import classNames from 'classnames';

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

    ren;

    render() {
        const {
            fixed,
            t
        } = this.props;
        return (
            <Layout.Header
                className={cx({
                    "layout-header": true,
                    "header-fixed-top": fixed
                })}
            >
                <div
                    className={cx({
                        "header": true,
                    })}
                >
                    <div
                        className={cx({
                            "logo": true,
                        })}
                        onClick={this.handleClickLogo}
                    >
                        <Logo size={25} isContrast/>
                        <LogoText size={20} bold={false} isContrast style={{paddingLeft: '2px'}}/>
                    </div>
                    <div className={cx({
                        "right": true,
                    })}>
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

GlobalHeader.propTypes = {
    onCollapse: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool,
    fixedSider: PropTypes.bool,
    fixed: PropTypes.bool
};

export default translate(props => props.namespaces)(withAccount(GlobalHeader));
