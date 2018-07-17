import React from "react";
import PropTypes from 'prop-types';
import classNamesBind from "classnames/bind";
import styles from './styles.less';
import {LOGO} from "../../../constants";
import {getValueObjectFromStringKey, linkRoute} from "../../../helpers/utility";
import Avatar from "../../../components/Avatar";
import {fullRelativeTime} from "../../../helpers/time";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

let cx = classNamesBind.bind(styles);

@observer
class NewUser extends React.Component {
    componentDidMount() {
    }

    render() {
        const {prefixCls, user} = this.props;
        const avatarUrl = getValueObjectFromStringKey(user, "avatar_url") ? user.avatar_url : LOGO;

        const name = getValueObjectFromStringKey(user, "name");
        const created_at = getValueObjectFromStringKey(user, "created_at");
        const userID = getValueObjectFromStringKey(user, "id");

        const linkProfile = linkRoute("/profile/:userID", {userID: userID});

        return (
            <div className={cx(`${prefixCls}-user`)}
                 style={{width: "100%"}}
            >
                <Avatar url={avatarUrl}/>
                <div className={cx(`${prefixCls}-user-content`)}>
                    <Link to={linkProfile}>
                        <div
                            className={cx(`${prefixCls}-user-content-name`)}
                        >
                            {name}
                        </div>
                    </Link>
                    <div
                        className={cx(`${prefixCls}-user-content-text-time`)}
                    >
                        {fullRelativeTime(created_at)}
                    </div>
                </div>
            </div>
        );
    }
}


NewUser.defaultProps = {
    prefixCls: 'app-list-new-atom'
};

NewUser.propTypes = {
    user: PropTypes.object.isRequired
};

export default NewUser;
