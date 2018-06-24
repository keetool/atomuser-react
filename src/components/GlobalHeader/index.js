import React from "react";
import PropTypes from "prop-types";
import {
    Layout,
} from "antd";
import styles from "./styles.less";
import classNamesBind from "classnames/bind";
import {URL_add_parameter, reload_url} from "../../helpers/utility";
import {withAccount} from "../context/AccountContext";
import Logo from "../static/Logo";
import LogoText from "../static/LogoText";
// import classNames from 'classnames';

let cx = classNamesBind.bind(styles);

class GlobalHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleChangeLanguage(value) {
        reload_url(URL_add_parameter("lang", value));
    }

    render() {
        const {
            fixed,
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
                    <div className={cx({
                        "logo": true,
                    })}>
                        <Logo size={18} isContrast/>
                        <LogoText size={15} isContrast style={{paddingLeft: '2px'}}/>
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

export default withAccount(GlobalHeader);
