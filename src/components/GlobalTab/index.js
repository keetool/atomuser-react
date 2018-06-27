import React from 'react';
// import PropTypes from 'prop-types';
import {Icon, Layout} from "antd";
import classNamesBind from "classnames/bind";
import styles from './styles.less';

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
        return (
            <Layout.Footer className={cx({
                "layout-tabbar": true,
                "tabbar-fixed-bottom": true
            })}>
                <div className={cx({
                    "tabbar": true
                })}>
                    <div className={cx({
                        "tabbar-item": true
                    })} style={{width: tabbarItemWidth}}>
                        <IconTab type='search'/>
                    </div>
                    <div className={cx({
                        "tabbar-item": true
                    })} style={{width: tabbarItemWidth}}>
                        <IconTab type='star-o'/>
                    </div>
                    <div className={cx({
                        "tabbar-item": true,
                        "active": true
                    })} style={{width: tabbarItemWidth}}>
                        <IconTab type='appstore-o'/>
                    </div>
                    <div className={cx({
                        "tabbar-item": true
                    })} style={{width: tabbarItemWidth}}>
                        <IconTab type="heart-o"/>
                    </div>
                    <div className={cx({
                        "tabbar-item": true
                    })} style={{width: tabbarItemWidth}}>
                        <IconTab type="user"/>
                    </div>
                </div>
            </Layout.Footer>
        );
    }
}

GlobalTab.propTypes = {};

export default GlobalTab;