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
        const {t, prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-layout-action`)}>
                <div className={cx(`${prefixCls}-action-photo`)}>
                    <InputFile type={".jpg,.png,.gif"} multiple onChange={this.onSelectImage}>
                        <Button icon="picture">
                            {t('social.editor.action.photo')}
                        </Button>
                    </InputFile>
                </div>
                {/*<div className={cx(`${prefixCls}-action-file`)}>*/}
                {/*<Button icon="paper-clip">{t('social.editor.action.file')}</Button>*/}
                {/*</div>*/}
            </div>
        );
    }
}


Action.defaultProps = {
    prefixCls: 'editor-post'
};


Action.propTypes = {
    onSelectImageToUpload: PropTypes.func.isRequired,
};

export default translate(props => props.namespaces)(Action);