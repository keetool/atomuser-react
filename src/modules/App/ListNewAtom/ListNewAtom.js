import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import Header from "./Header";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Loading from "./Loading";
// import LoadMore from "./LoadMore";
import Store from "./Store";
import NewUser from "./NewUser";
import {observer} from "mobx-react";

let cx = classNamesBind.bind(styles);

@observer
class ListNewAtom extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new Store();
    }

    componentDidMount() {
        this.store.getListNewUser();
    }

    renderLoading() {
        const {isLoading} = this.store;
        if (isLoading)
            return (
                <div>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                    <Loading/>
                </div>
            );
    }

    render() {
        const {prefixCls} = this.props;
        const {users, isLoading} = this.store;
        return (
            <div className={cx(`${prefixCls}-layout`)}>
                <Header/>
                {this.renderLoading()}
                {
                    !isLoading && users && users.length > 0 &&
                    users.map((user, index) => {
                        return (
                            <NewUser user={{...user}} key={index}/>
                        );
                    })
                }
                {/*<LoadMore/>*/}
            </div>
        );
    }
}

ListNewAtom.defaultProps = {
    prefixCls: 'app-list-new-atom'
};

ListNewAtom.propTypes = {};

export default translate(props => props.namespaces)(ListNewAtom);
