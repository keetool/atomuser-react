import React from "react";
//import PropTypes from 'prop-types';
import withTitle from "../../components/HOC/withTitle";
import Information from "./Information/Information";
import ListPost from "./Posts/ListPost";
import InfoStore from "./Information/Store";
import PostStore from "./Posts/Store";
import {withRouter} from "react-router";
import scrollTopView from "../../components/HOC/scrollTopView";

class Profile extends React.Component {


    state = {
        storeInfo: new InfoStore(),
        storePosts: new PostStore(),
        userID: ''
    };

    static getDerivedStateFromProps(props, state) {
        const {userID} = props.match.params;
        if (state.userID != userID) {
            state.storeInfo.addUserID(userID);
            state.storePosts.addUserID(userID);
            return {userID: userID};
        }

        return null;
    }

    componentDidMount() {
    }

    render() {
        const {storeInfo, storePosts} = this.state;
        return (
            <div>
                <Information store={storeInfo}/>
                <ListPost store={storePosts}/>
            </div>
        );
    }
}

Profile.propTypes = {};

export default withTitle()(withRouter(scrollTopView()(Profile)));
