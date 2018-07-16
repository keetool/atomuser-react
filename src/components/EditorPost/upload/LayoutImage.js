import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {translate} from "react-i18next";
import {observer} from "mobx-react";
import UploadImage from "./UploadImage";
import {Icon} from "antd";
import InputFile from "../../common/InputFile";

let cx = classNamesBind.bind(styles);

@observer
class LayoutImage extends React.Component {

    onSelectImage = (e) => {
        const {onSelectImageToUpload} = this.props;
        onSelectImageToUpload(e.target.files);
    };

    removeImage = (image) => {
        const {store} = this.props;
        store.removeImage(image);
    };

    renderAddImage = () => {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-container-image`)}>
                <InputFile type={".jpg,.png,.gif"} multiple onChange={this.onSelectImage}>
                    <div className={cx(`${prefixCls}-image-add`)}>
                        <Icon type="plus-circle-o"/>
                    </div>
                </InputFile>
            </div>
        );
    };

    render() {
        const {store, images, prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout-image`)}>
                <div className={cx(`${prefixCls}-scrollable`)}>
                    {images.map((image, index) => {
                        return (
                            <UploadImage key={index} store={store} image={image} removeImage={this.removeImage}/>
                        );
                    })}
                    {this.renderAddImage()}
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
    images: PropTypes.array.isRequired,
    onSelectImageToUpload: PropTypes.func,
};

export default translate(props => props.namespaces)(LayoutImage);