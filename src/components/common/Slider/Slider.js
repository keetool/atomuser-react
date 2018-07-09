import React from 'react';
import PropTypes from "prop-types";
import Slider from "react-slick";
import './slick.css';
import './slick-theme.css';
import {Icon} from "antd";

const NextArrow = (props) => {
    const {onClick} = props;
    return (
        <div className={"container-next"} >
            <div className={"next"} onClick={onClick}>
                <Icon type="right" style={{fontSize: '40px'}}/>
            </div>
        </div>
    );
};

const PrevArrow = (props) => {
    const {onClick} = props;
    return (
        <div className={"container-prev"}>
            <div className={"prev"}  onClick={onClick}>
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