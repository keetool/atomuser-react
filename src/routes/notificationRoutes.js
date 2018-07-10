import asyncComponent from "../helpers/AsyncFunc";

export default [
    {
        title: 'social.page.notification.title',
        path: "/notification",
        exact: true,
        component: asyncComponent(() => import("../modules/Notification"))
    }
]
;
