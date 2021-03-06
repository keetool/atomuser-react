import asyncComponent from "../helpers/AsyncFunc";

export default [
    {
        title: 'social.page.search.title',
        path: "/search",
        exact: true,
        needSignIn: true,
        component: asyncComponent(() => import("../modules/Search"))
    }
]
;
