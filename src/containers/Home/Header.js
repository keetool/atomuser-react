import React from 'react';
import PropTypes from 'prop-types';
import headerContent from "../../components/HOC/HeaderContent/headerContent";
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);


class Header extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={cx({
                "header": true
            })}>
                <div className={"header-item"}>
                    All threads
                </div>

            </div>
        );
    }
}

Header.propTypes = {
    fixed: PropTypes.bool,
    style: PropTypes.object
};

export default headerContent()(Header);