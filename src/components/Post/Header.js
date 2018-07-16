import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../Avatar/index";
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {Dropdown, Icon, Menu} from "antd";
import {relativeTime} from "../../helpers/time";
import {Link} from "react-router-dom";
import {withAccount} from "../context/AccountContext";
import {observer} from "mobx-react";
import {randomStr} from "../../helpers/utility";
import {isLoggedIn} from "../../helpers/auth";
import {translate} from "react-i18next";

let cx = classNamesBind.bind(styles);

@observer
class Header extends React.Component {

    renderActionHeader = () => {
        const {t, post, handleMark, handleDelete, handleEdit, account} = this.props;
        const {creator} = post;

        const textMark = post.isBookmarked ? t('social.home.post_item.dropdown_remove_bookmark')
            : t('social.home.post_item.dropdown_add_bookmark');

        const isCreator = creator.id === account.id;

        return (
            <Menu>
                {
                    isCreator && <Menu.Item key="0" onClick={handleEdit}>
                        {t('social.home.post_item.dropdown_edit')}
                    </Menu.Item>
                }
                {
                    isCreator && <Menu.Item key="1" onClick={handleDelete}>
                        {t('social.home.post_item.dropdown_delete')}
                    </Menu.Item>
                }
                {
                    isCreator && <Menu.Divider/>
                }
                <Menu.Item key="3" onClick={handleMark}>
                    {textMark}
                </Menu.Item>
            </Menu>
        );
    };

    render() {
        const {post, linkDetail, linkProfile, prefixCls} = this.props;
        const {creator} = post;

        const dropdownID = randomStr();

        const disabled = !isLoggedIn();

        return (
            <div className={cx(`${prefixCls}-header`)}>
                <div className={cx(`${prefixCls}-creator`)}>
                    <Avatar url={creator.avatar_url}/>
                    <div className={cx(`${prefixCls}-creator-content`)}>
                        <Link to={linkProfile}>
                            <div
                                className={cx(`${prefixCls}-name`)}
                            >
                                {creator.name}
                            </div>
                        </Link>
                        <Link to={linkDetail}>
                            <div className={cx(`${prefixCls}-text-time`)}>
                                {relativeTime(post.created_at)}
                            </div>
                        </Link>
                    </div>

                </div>
                {
                    !disabled &&
                    <div className={cx(`${prefixCls}-action`)}>
                        <div className={cx(`${prefixCls}-action-dropdown`)} id={`dropdown-${dropdownID}`}>
                            <Dropdown overlay={this.renderActionHeader()} trigger={['click']} placement="bottomRight"
                                      getPopupContainer={() => document.getElementById(`dropdown-${dropdownID}`)}
                            >
                                <Icon
                                    type="ellipsis"
                                    className={cx(`${prefixCls}-action-icon`)}
                                />
                            </Dropdown>
                        </div>
                    </div>
                }

            </div>
        );
    }
}

Header.defaultProps = {
    prefixCls: 'post'
};

Header.propTypes = {
    post: PropTypes.object.isRequired,
    linkDetail: PropTypes.string.isRequired,
    linkProfile: PropTypes.string.isRequired,
    handleMark: PropTypes.func,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
};

export default translate(props => props.namespaces)(withAccount(Header));