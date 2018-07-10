import asyncComponent from "../helpers/AsyncFunc";

export default [
    {
        title: 'social.page.mark.title',
        path: "/mark",
        exact: true,
        component: asyncComponent(() => import("../modules/Mark"))
    }
]
;
