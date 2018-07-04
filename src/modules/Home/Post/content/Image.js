import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import {isEmptyArr} from "../../../../helpers/utility";

let cx = classNamesBind.bind(styles);

@observer
class Content extends React.Component {
    render() {
        const {images} = this.props;
        if (isEmptyArr(images)) {
            return <div/>;
        } else {
            return (
                <div className={cx('layout-image')}>
                    {
                        images.map((image, index) => {
                            return (
                                <img key={index} src={image.url} width="100%"/>
                            );
                        })
                    }
                </div>
            );
        }
    }
}

Content.propTypes = {
    images: PropTypes.array.isRequired
};

export default Content;