import React from 'react';
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);

const LogoText = ({isContrast, size = 50}) => {
    return (
        <div className={cx({
            'atomuser-logo-text': true,
            'contrast': isContrast
        })}
             style={{fontSize: size}}
        >
            <div className={styles["atomuser-text-atom"]}>atom</div>
            <div className={styles["atomuser-text-user"]}>user</div>
        </div>
    );
};

export default LogoText;