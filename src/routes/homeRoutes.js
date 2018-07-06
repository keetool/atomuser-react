import asyncComponent from "../helpers/AsyncFunc";

export default [
    {
        title: 'social.home.title',
        path: "/",
        exact: true,
        component: asyncComponent(() => import("../modules/Home"))
    }
];
