import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {translate} from "react-i18next";
import {observer} from "mobx-react";

let cx = classNamesBind.bind(styles);

@observer
class Footer extends React.Component {
    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-footer`)}>
            </div>
        );
    }
}

Footer.defaultProps = {
    prefixCls: 'post'
};

Footer.propTypes = {
    post: PropTypes.object,
};

export default translate(props => props.namespaces)(Footer);