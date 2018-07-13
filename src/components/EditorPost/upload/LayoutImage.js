import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {translate} from "react-i18next";
import {observer} from "mobx-react";
import UploadImage from "./UploadImage";

let cx = classNamesBind.bind(styles);

@observer
class LayoutImage extends React.Component {
    render() {
        const {store, images, prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout-image`)}>
                <div className={cx('scrollable')}>
                    {images.map((image, index) => {
                        return (
                            <UploadImage key={index} store={store} image={image}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}

LayoutImage.defaultProps = {
    prefixCls: 'editor-post'
};

LayoutImage.propTypes = {
    store: PropTypes.object.isRequired,
    images: PropTypes.array.isRequired
};

export default translate(props => props.namespaces)(LayoutImage);