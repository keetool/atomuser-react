import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNamesBind from "classnames/bind";
import {observer} from "mobx-react";
import Comment from "./Comment/Comment";
import Loading from "./Loading";
import {translate} from "react-i18next";
import {isEmptyArr} from "../../../helpers/utility";

let cx = classNamesBind.bind(styles);

@observer
class ListComment extends React.Component {

    componentDidMount() {
        this.props.store.getComments(2);
    }

    loadMore = () => {
        if (this.props.store.isLoadMore) {
            this.props.store.getComments();
        }
    };

    render() {
        const {comments, isLoading, isLoadMore} = this.props.store;
        const {t} = this.props;
        return (
            <div>
                <div className={cx("container-comment")}>
                    {
                        isLoadMore && !isEmptyArr(comments) &&
                        <div className={cx("text-load-more")}
                             onClick={this.loadMore}
                        >{t("social.home.post.comment_load_more")}</div>
                    }

                    {isLoading && <Loading/>}

                    {!isEmptyArr(comments) ?
                        comments.map((storeComment, index) => {
                            return (
                                <Comment store={storeComment} key={index}/>
                            );
                        })
                        :
                        (
                            isLoading &&
                            <div>
                                <Loading/>
                            </div>
                        )

                    }


                </div>
            </div>

        );
    }
}

ListComment.propTypes = {
    store: PropTypes.object.isRequired,
};

export default translate(props => props.namespaces)(ListComment);