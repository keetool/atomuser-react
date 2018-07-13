import asyncComponent from "../helpers/AsyncFunc";

export default [
    {
        title: 'social.page.profile.title',
        path: "/profile/:userID",
        needSignIn: true,
        component: asyncComponent(() => import("../modules/Profile"))
    }
]
;
