import React from "react";
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import {observer} from "mobx-react";
import {Input} from "antd";

let cx = classNamesBind.bind(styles);


@observer
class Header extends React.Component {
    componentDidMount() {
    }

    handleSearch = (value) => {
        const {store} = this.props;
        store.searchPosts(value);
    };

    render() {
        const {t, prefixCls, store} = this.props;
        const {isLoading, numberResult, isEmpty} = store;
        return (
            <div className={cx(`${prefixCls}-header`)}>
                <div className={cx(`${prefixCls}-header-search`)}>
                    <Input.Search
                        placeholder={t('social.search.header.search_placeholder')}
                        onSearch={this.handleSearch}
                    />
                </div>
                {!isLoading && !isEmpty &&
                <div className={cx(`${prefixCls}-header-text`)}>
                    {t('social.search.header.number_result', {number_result: numberResult})}
                </div>}

            </div>
        );
    }
}

Header.defaultProps = {
    prefixCls: 'module-search'
};

Header.propTypes = {
    store: PropTypes.object.isRequired
};

export default translate(props => props.namespaces)(Header);
