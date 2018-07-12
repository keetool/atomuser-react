import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import withTitle from "../../components/HOC/withTitle";
import Header from "./Header";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import Store from "./Store";
import ListPost from "./ListPost";

let cx = classNamesBind.bind(styles);

class Search extends React.Component {

    store = new Store();

    componentDidMount() {
    }

    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout`)}>
                <Header store={this.store}/>
                <ListPost store={this.store}/>
            </div>
        );
    }
}

Search.defaultProps = {
    prefixCls: 'module-search'
};

Search.propTypes = {};

export default translate(props => props.namespaces)(withTitle()(Search));
