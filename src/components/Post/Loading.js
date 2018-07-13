import React from 'react';
import classNamesBind from "classnames/bind";
import loadingComponent from "../HOC/loadingComponent";
import {RoundShape, TextBlock} from "react-placeholder/lib/placeholders";
import styles from './styles.less';

let cx = classNamesBind.bind(styles);

const Loading = ({prefixCls}) => {
    return (
        <div>
            <div className={cx(`${prefixCls}-layout-post`)}>
                <div className={cx(`${prefixCls}-header`)}>
                    <div className={cx(`${prefixCls}-creator`)}
                         style={{width: '100%'}}
                    >
                        <RoundShape color='#E0E0E0' style={{width: 30, height: 30}}/>
                        <div className={cx(`${prefixCls}-creator-content`)}>
                            <div
                                className={cx(`${prefixCls}-name`)}
                            >
                                <TextBlock rows={2} color='#E0E0E0'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx(`${prefixCls}-content`)}
                     style={{paddingBottom: '100px', marginTop: '20px'}}
                >
                    <div className={cx(`${prefixCls}-content-body`)}>
                        <TextBlock rows={5} color='#E0E0E0'/>
                    </div>
                </div>

            </div>
        </div>


    );
};

Loading.defaultProps = {
    prefixCls: 'post'
};

export default loadingComponent()(Loading);