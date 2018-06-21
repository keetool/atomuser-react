import React from 'react';
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);

const Logo = ({isContrast, size = 80}) => {
    return (
        <div className={cx({
            'atomuser-logo': true,
            'contrast': isContrast
        })}
             style={{width: size + 'px', height: size + 'px'}}
        >
            <div className={styles['atomuser-icon']}>
                <div className={styles['atomuser-icon-dot']}>
                </div>
            </div>
        </div>
    );
};

export default Logo;