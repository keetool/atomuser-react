import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import Image from "./Image";
import {translate} from "react-i18next";

let cx = classNamesBind.bind(styles);

@observer
class Content extends React.Component {

    handleViewMore = () => {
        const {store} = this.props;
        store.disableViewMore();
    };



    render() {
        const {post, prefixCls, store, t} = this.props;
        const content = store.content;
        const isViewMore = store.viewMore;

        return (
            <div className={cx(`${prefixCls}-content`)}>
                <div
                    dangerouslySetInnerHTML={{__html: content}}
                    className={cx(`${prefixCls}-content-body`)}
                    ref={(ref) => {
                        this._ref = ref;
                    }}
                />
                {
                    isViewMore &&
                    <div
                        className={cx(`${prefixCls}-content-view-more`)}
                        onClick={this.handleViewMore}>
                        {t('social.home.post_item.view_more')}
                    </div>
                }
                <Image images={post.images}/>
            </div>
        );
    }
}

Content.defaultProps = {
    prefixCls: 'post'
};

Content.propTypes = {
    post: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

export default translate(props => props.namespaces)(Content);