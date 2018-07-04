import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {translate} from "react-i18next";
import {observer} from "mobx-react";
import {Button} from "antd";
import InputFile from "../common/InputFile";

let cx = classNamesBind.bind(styles);

@observer
class Action extends React.Component {

    onSelectImage = (e) => {
        const {onSelectImageToUpload} = this.props;
        onSelectImageToUpload(e.target.files);
    };

    render() {
        const {t} = this.props;
        return (
            <div className={cx('layout-action')}>
                <div className={cx('action-photo')}>
                    <Button icon="picture">
                        {t('social.editor.action.photo')}
                        <InputFile type={".jpg,.png,.gif"} multiple onChange={this.onSelectImage}/>
                    </Button>
                </div>
                <div className={cx('action-file')}>
                    <Button icon="paper-clip">{t('social.editor.action.file')}</Button>
                </div>
            </div>
        );
    }
}

Action.propTypes = {
    onSelectImageToUpload: PropTypes.func.isRequired,
};

export default translate(props => props.namespaces)(Action);