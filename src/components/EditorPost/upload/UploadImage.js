import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import {Icon, Modal, Progress} from "antd";
import {convertUrlImageBackground, isEmpty} from "../../../helpers/utility";

let cx = classNamesBind.bind(styles);

@observer
class UploadImage extends React.Component {
    state = {
        isReview: false,
        reviewImage: ''
    };

    componentDidMount() {
        const {image, store} = this.props;
        if (isEmpty(image.url)) {
            store.uploadImage(image);
        }
    }

    handleCancel = () => {
        this.setState({isReview: false});
    };

    handleReviewImage = (url) => {
        this.setState({reviewImage: url, isReview: true});
    };

    renderAction = () => {
        const {image, prefixCls, removeImage} = this.props;
        const url = isEmpty(image.url) ? '' : image.url;
        return (
            <div className={cx(`${prefixCls}-image-action`)}>
                <div className={cx(`${prefixCls}-image-action-view`)} onClick={() => this.handleReviewImage(url)}>
                    <Icon type="eye-o"/>
                </div>
                <div className={cx(`${prefixCls}-image-action-remove`)} onClick={() => removeImage(image)}>
                    <Icon type="delete"/>
                </div>
            </div>
        );
    };

    render() {
        const {image, prefixCls} = this.props;
        const {isReview, reviewImage} = this.state;
        const url = isEmpty(image.url) ? '' : image.url;
        return (
            <div className={cx(`${prefixCls}-container-image`)}>
                <div
                    className={cx(`${prefixCls}-image`)}
                    style={{
                        background: convertUrlImageBackground(url)
                    }}
                >
                    {this.renderAction()}
                </div>
                {
                    image.isUploading &&
                    <div className={cx(`${prefixCls}-loading`)}>
                        <Progress percent={image.percentComplete} size="small" status="active" showInfo={false}/>
                    </div>
                }
                <Modal visible={isReview} footer={null} onCancel={this.handleCancel} bodyStyle={{padding: 0}}
                       width={800}
                >
                    <img style={{width: '100%'}} src={reviewImage}/>
                </Modal>
            </div>
        );
    }
}

UploadImage.defaultProps = {
    prefixCls: 'editor-post'
};

UploadImage.propTypes = {
    store: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
    removeImage: PropTypes.func,
};

export default UploadImage;