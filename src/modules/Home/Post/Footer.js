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
        // const {post} = this.props;
        return (
            <div className={cx("footer")}>
            </div>
        );
    }
}

Footer.propTypes = {
    post: PropTypes.object.isRequired,
    loadComments: PropTypes.func,
};

export default translate(props => props.namespaces)(Footer);