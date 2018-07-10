import React from 'react';
// import PropTypes from 'prop-types';
import {Icon, Layout} from "antd";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import TooltipCustom from "../common/Tooltip";
import {translate} from "react-i18next";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {checkLink} from "../../helpers/utility";

const TABS = [
    {
        name: 'social.tooltip.tabbar.search',
        path: '/search',
        icon: 'search'
    },
    {
        name: 'social.tooltip.tabbar.mark',
        path: '/mark',
        icon: 'star-o'
    },
    {
        name: 'social.tooltip.tabbar.home',
        path: '/',
        icon: 'appstore-o'
    },
    {
        name: 'social.tooltip.tabbar.notification',
        path: '/notification',
        icon: 'heart-o'
    },
    {
        name: 'social.tooltip.tabbar.profile',
        path: '/profile',
        icon: 'user'
    },

];


let cx = classNamesBind.bind(styles);
const IconTab = ({type}) => {
    return (
        <Icon type={type} style={{marginRight: 0, fontSize: 18, color: "rgba(0,0,0,.5)"}}/>
    );
};

const tabbarItemWidth = '20%';

class GlobalTab extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
    }


    render() {
        const {t} = this.props;
        const {location} = this.props;
        const {pathname} = location;
        return (
            <Layout.Footer className={cx({
                "layout-tabbar": true,
                "tabbar-fixed-bottom": true
            })}>
                <div className={cx({
                    "tabbar": true
                })}>
                    {
                        TABS.map((tab, index) => {
                            return (
                                <TooltipCustom
                                    placement={"top"}
                                    title={t(tab.name)}
                                    key={index}
                                >
                                    <Link
                                        to={tab.path}
                                        style={{width: tabbarItemWidth}}
                                    >
                                        <div className={cx({
                                            "tabbar-item": true,
                                            "active": checkLink(pathname, tab.path)
                                        })}
                                        >
                                            <IconTab type={tab.icon}/>
                                        </div>
                                    </Link>
                                </TooltipCustom>
                            );
                        })
                    }
                </div>
            </Layout.Footer>
        );
    }
}

GlobalTab.propTypes = {};

export default withRouter(translate(props => props.namespaces)(GlobalTab));