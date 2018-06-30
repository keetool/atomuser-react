import asyncComponent from "../helpers/AsyncFunc";

export default [
  {
    path: "/teaching",
    children: [
      {
        path: "/registers",
        component: asyncComponent(() => import("../modules/Teaching/Registers"))
      },
      {
        path: "/classes",
        component: asyncComponent(() => import("../modules/Teaching/Classes"))
      }
    ]
  }
];
