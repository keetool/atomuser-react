import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);

const LogoText = ({isContrast, size = 50, style = {}, bold = true}) => {
    return (
        <div className={cx({
            'atomuser-logo-text': true,
            'atomuser-logo-text-contrast': isContrast
        })}
             style={{fontSize: size, ...style}}
        >
            <div className={cx({
                'atomuser-text-atom': true,
                'bold': bold
            })}>atom
            </div>
            <div className={styles["atomuser-text-user"]}>user</div>
        </div>
    );
};

LogoText.propTypes = {
    isContrast: PropTypes.bool,
    size: PropTypes.number,
    style: PropTypes.object,
    bold: PropTypes.bool
};

export default LogoText;