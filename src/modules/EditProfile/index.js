import React from "react";
//import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import Loading from "./Loading";
import Store from './Store';
import {observer} from "mobx-react";
import Avatar from "../../components/Avatar";
import {LOGO} from "../../constants";
import {getValueObjectFromStringKey} from "../../helpers/utility";
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import EditInfo from "./EditInfo";
import {withAccount} from "../../components/context/AccountContext";

let cx = classNamesBind.bind(styles);

@observer
class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.store = new Store();
    }

    render() {
        const {prefixCls, account} = this.props;
        const {isLoading} = account;

        if (isLoading) {
            return (
                <Loading/>
            );
        }

        const avatarUrl = getValueObjectFromStringKey(account, "avatar_url") ? account.avatar_url : LOGO;

        return (
            <div className={cx(`${prefixCls}-layout`)}>
                <div className={cx(`${prefixCls}-layout-container`)}>
                    <div className={cx(`${prefixCls}-layout-container-avatar`)}>
                        <Avatar url={avatarUrl} size={100}/>
                    </div>
                    <div className={cx(`${prefixCls}-layout-container-info`)}>
                        <EditInfo account={account} store={this.store}/>
                    </div>
                </div>
            </div>
        );


    }
}

EditProfile.defaultProps = {
    prefixCls: 'module-edit-profile'
};

EditProfile.propTypes = {};

export default translate(props => props.namespaces)(withAccount(EditProfile));
