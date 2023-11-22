import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
// const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = (modalFunc, toastFunc, popupsFunc) => {
  return [
    {
      path: "/",
      element: <FullLayout />,
      children: [
        { path: "/", element: <Navigate to="/products" /> },
        { path: "/revenue", element: <Starter data={{modalFunc, toastFunc}}/> },
        { path: "/alerts", element: <Alerts /> },
        { path: "/badges", element: <Badges /> },
        { path: "/buttons", element: <Buttons /> },
        { path: "/products", element: <Cards data={{modalFunc, toastFunc, popupsFunc}}/> },
        { path: "/grid", element: <Grid /> },
        { path: "/management", element: <Tables data={{modalFunc, toastFunc, popupsFunc}}/> },
        // { path: "/employee-register", element: <Forms data={{modalFunc, toastFunc}}/> },
        { path: "/breadcrumbs", element: <Breadcrumbs /> },
      ],
    },
  ];
}

export default ThemeRoutes;
