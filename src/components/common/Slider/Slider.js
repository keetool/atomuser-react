import React from 'react';
import PropTypes from "prop-types";
import Slider from "react-slick";
import './slick.css';
import './slick-theme.css';
import {Icon} from "antd";
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);

const NextArrow = (props) => {
    const {onClick} = props;
    return (
        <div className={cx("container-next")} onClick={onClick}>
            <div className={cx("next")}>
                <Icon type="right" style={{fontSize: '40px'}}/>
            </div>
        </div>
    );
};

const PrevArrow = (props) => {
    const {onClick} = props;
    return (
        <div className={cx("container-prev")} onClick={onClick}>
            <div className={cx("prev")}>
                <Icon type="left" style={{fontSize: '40px'}}/>
            </div>
        </div>
    );
};


class SliderCustom extends React.Component {
    constructor(props, context) {
        super(props, context);

    }


    render() {
        return (
            <Slider nextArrow={<NextArrow/>} prevArrow={<PrevArrow/>} {...this.props.settings}>
                {this.props.children}
            </Slider>
        );
    }
}


SliderCustom.propTypes = {
    settings: PropTypes.object.isRequired
};

export default SliderCustom;