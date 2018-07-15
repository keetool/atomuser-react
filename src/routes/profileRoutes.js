import asyncComponent from "../helpers/AsyncFunc";

export default [
    {
        title: 'social.page.edit_profile.title',
        path: "/profile/edit",
        needSignIn: true,
        exact: true,
        component: asyncComponent(() => import("../modules/EditProfile"))
    },
    {
        title: 'social.page.profile.title',
        path: "/profile/:userID",
        needSignIn: false,
        component: asyncComponent(() => import("../modules/Profile"))
    },

]
;
