import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import {Progress} from "antd";
import {convertUrlImageBackground, isEmpty} from "../../../helpers/utility";

let cx = classNamesBind.bind(styles);

@observer
class UploadImage extends React.Component {

    componentDidMount() {
        const {image, store} = this.props;
        if (isEmpty(image.url)) {
            store.uploadImage(image);
        }
    }

    render() {
        const {image} = this.props;
        console.log({image});
        const url = isEmpty(image.url) ? '' : image.url;
        return (
            <div className={cx('container-image')}>
                <div
                    className={cx('image')}
                    style={{
                        background: convertUrlImageBackground(url)
                    }}
                />
                {
                    image.isUploading &&
                    <div className={cx('loading')}>
                        <Progress percent={image.percentComplete} size="small" status="active" showInfo={false}/>
                    </div>
                }

            </div>
        );
    }
}

UploadImage.propTypes = {
    store: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
};

export default UploadImage;