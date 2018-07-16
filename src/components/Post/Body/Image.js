import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import {convertUrlImageBackground, isEmptyArr} from "../../../helpers/utility";
import Slider from "../../common/Slider/Slider";
import {Modal} from "antd";

let cx = classNamesBind.bind(styles);


@observer
class Image extends React.Component {

    state = {
        isReview: false,
        reviewImage: ''
    };

    numberClick = 0;

    handleCancel = () => {
        this.setState({isReview: false});
    };

    handleReviewImage = (url) => {
        this.setState({reviewImage: url, isReview: true});
    };

    onDoubleClick = (url) => {
        if (this.numberClick === 1) {
            this.handleReviewImage(url);
        } else {
            if (this.numberClick === 0) {
                this.numberClick = 1;
                setTimeout(() => {
                    this.numberClick = 0;
                }, 250);
            }
        }
    };


    render() {
        const {images, prefixCls} = this.props;
        if (isEmptyArr(images)) {
            return <div/>;
        } else {
            const settings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            };

            const {isReview, reviewImage} = this.state;

            return (
                <div className={cx(`${prefixCls}-layout-image`)} style={{marginBottom: images.length > 1 ? "40px" : 0}}>
                    <Slider settings={settings}>
                        {
                            images.map((image, index) => {
                                return (
                                    <div key={index}>
                                        <div className={cx(`${prefixCls}-image`)}
                                             onClick={() => this.onDoubleClick(image.url)}
                                             style={{background: convertUrlImageBackground(image.url)}}
                                        />
                                    </div>

                                );
                            })
                        }
                    </Slider>
                    <Modal visible={isReview} footer={null} onCancel={this.handleCancel} bodyStyle={{padding: 0}}
                           width={800}
                    >
                        <img style={{width: '100%'}} src={reviewImage}/>
                    </Modal>
                </div>
            );
        }
    }
}

Image.defaultProps = {
    prefixCls: 'post'
};

Image.propTypes = {
    images: PropTypes.array.isRequired
};

export default Image;