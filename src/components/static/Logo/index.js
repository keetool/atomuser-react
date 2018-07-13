import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);

const Logo = ({isContrast, size = 80, style = {}}) => {
    return (
        <div className={cx({
            'atomuser-logo': true,
            'atomuser-icon-contrast': isContrast
        })}
             style={{width: size + 'px', height: size + 'px', ...style}}
        >
            <div className={cx('atomuser-icon')}>
                <div className={cx('atomuser-icon-dot')}>
                </div>
            </div>
        </div>
    );
};

Logo.propTypes = {
    isContrast: PropTypes.bool,
    size: PropTypes.number,
    style: PropTypes.object,
};

export default Logo;