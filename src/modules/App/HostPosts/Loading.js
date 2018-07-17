import React from "react";
//import PropTypes from 'prop-types';
import loadingComponent from "../../../components/HOC/loadingComponent";
import {RoundShape, TextBlock} from "react-placeholder/lib/placeholders";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import ActionVote from "../../../components/ActionVote";

let cx = classNamesBind.bind(styles);

class Loading extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls} = this.props;
        return (
            <div className={cx(`${prefixCls}-post`)}
                 style={{width: "100%"}}
            >
                <div className={cx(`${prefixCls}-post-action`)}>
                    <ActionVote
                        horizontal
                    />
                </div>

                <div className={cx(`${prefixCls}-post-content`)}>
                    <div className={cx(`${prefixCls}-post-content-creator`)}>
                        <div className={cx(`${prefixCls}-post-content-creator-avatar`)}>
                            <RoundShape color="#E0E0E0" style={{width: 15, height: 15}}/>
                        </div>
                        <div className={cx(`${prefixCls}-post-content-creator-name`)}>
                            <TextBlock rows={1} color="#E0E0E0"/>
                        </div>
                    </div>
                    <TextBlock rows={3} color="#E0E0E0" style={{marginTop: '10px'}}/>
                </div>
            </div>
        );
    }
}


Loading.defaultProps = {
    prefixCls: 'app-list-hot-post'
};

Loading.propTypes = {};

export default loadingComponent()(Loading);
