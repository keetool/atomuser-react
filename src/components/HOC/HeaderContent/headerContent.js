import React, {Component} from "react";
import styles from './styles.less';
import classNamesBind from "classnames/bind";

let cx = classNamesBind.bind(styles);

const headerContent = () => {
    return WrappedComponent => {
        class Header extends Component {
            render() {
                const prefixCls = 'header-content';

                return (
                    <div className={cx({
                        [`${prefixCls}-header`]: true,
                        [`${prefixCls}-fixed-top`]: this.props.fixed
                    })} style={this.props.style}>
                        <div className={cx(`${prefixCls}-content`)}>
                            <WrappedComponent {...this.props}/>
                        </div>
                    </div>
                );
            }
        }

        return Header;
    };
};


export default headerContent;
