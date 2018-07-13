import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import withTitle from "../../components/HOC/withTitle";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import Header from "./Header";
import ListMark from "./ListMark";
import {observer} from "mobx-react";
import Store from "./Store";

let cx = classNamesBind.bind(styles);

@observer
class Mark extends React.Component {

    constructor(props) {
        super(props);
        this.store = new Store();
    }

    componentDidMount() {
        this.store.getBookmarks();
    }

    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout`)}>
                <Header/>
                <ListMark store={this.store}/>
            </div>
        );
    }
}

Mark.defaultProps = {
    prefixCls: 'module-mark'
};

Mark.propTypes = {};

export default translate(props => props.namespaces)(withTitle()(Mark));
