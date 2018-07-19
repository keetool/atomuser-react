import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import Header from "./Header";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import Loading from "./Loading";
// import LoadMore from "./LoadMore";
import Store from "./Store";
import Channel from "./Channel";
import {observer} from "mobx-react";

let cx = classNamesBind.bind(styles);

@observer
class ListSuggestChannel extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new Store();
    }

    componentDidMount() {
        this.store.getSuggestChannels();
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
        const {yourChannels, isLoading} = this.store;
        return (
            <div className={cx(`${prefixCls}-layout`)}>
                <Header/>
                {this.renderLoading()}
                {
                    !isLoading && yourChannels && yourChannels.length > 0 &&
                    yourChannels.map((channel, index) => {
                        return (
                            <Channel channel={{...channel}} key={index}/>
                        );
                    })
                }
                {/*<LoadMore/>*/}
            </div>
        );
    }
}

ListSuggestChannel.defaultProps = {
    prefixCls: 'app-list-suggest-channel'
};

ListSuggestChannel.propTypes = {};

export default translate(props => props.namespaces)(ListSuggestChannel);
