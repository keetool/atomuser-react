import React from "react";
import PropTypes from 'prop-types';
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import Avatar from "../../../components/Avatar";
import {observer} from "mobx-react";
import {getValuesFromKeys} from "../../../helpers/entity/object";
import {renderMerchantDomain} from "../../../constants/env";
import {translate} from "react-i18next";

let cx = classNamesBind.bind(styles);

@observer
class Channel extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls, channel, t} = this.props;
        const dataChannel = getValuesFromKeys(channel,
            ['avatar_url', 'name', 'num_users', "sub_domain"]);
        return (
            <a href={renderMerchantDomain(dataChannel['sub_domain'])} target="_blank">
                <div className={cx(`${prefixCls}-channel`)}
                     style={{width: "100%"}}
                >
                    <Avatar url={dataChannel['avatar_url']}/>
                    <div className={cx(`${prefixCls}-channel-content`)}>
                        <div
                            className={cx(`${prefixCls}-channel-content-name`)}
                        >
                            {dataChannel['name']}
                        </div>
                        <div
                            className={cx(`${prefixCls}-channel-content-text-time`)}
                        >
                            {`${dataChannel['num_users']} ${t('social.global.atom')}`}
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}


Channel.defaultProps = {
    prefixCls: 'app-list-suggest-channel'
};

Channel.propTypes = {
    channel: PropTypes.object.isRequired
};

export default translate(props => props.namespaces)(Channel);
