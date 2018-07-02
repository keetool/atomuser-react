import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);

const Avatar = ({url = '', size = 30, style = {}}) => {
    return (
        <div className={cx({
            "avatar": true
        })}
             style={{
                 backgroundImage: `url(${url})`,
                 width: size,
                 height: size,
                 ...style
             }}
        />
    );
};


Avatar.propTypes = {
    url: PropTypes.string.isRequired,
    size: PropTypes.number,
    style: PropTypes.object,
};

export default Avatar;