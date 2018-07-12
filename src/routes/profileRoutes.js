import asyncComponent from "../helpers/AsyncFunc";

export default [
    {
        title: 'social.page.profile.title',
        path: "/profile",
        exact: true,
        needSignIn: true,
        component: asyncComponent(() => import("../modules/Profile"))
    }
]
;
