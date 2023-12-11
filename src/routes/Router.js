import { lazy, useEffect, useState } from "react";
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
const Cart = lazy(() => import("../views/ui/Cart"));

/*****Routes******/


const ThemeRoutes = (modalFunc, toastFunc, popupsFunc) => {
  const [childData, setChildData] = useState({});
  const childDataFunc = (data) => {
    setChildData(data);
  }

  return [
    {
      path: "/",
      element: <FullLayout data={childData}/>,
      children: [
        { path: "/", element: <Navigate to="/products" /> },
        { path: "/revenue", element: <Starter data={{modalFunc, toastFunc}}/> },
        { path: "/alerts", element: <Alerts /> },
        { path: "/badges", element: <Badges /> },
        { path: "/buttons", element: <Buttons /> },
        { path: "/products", element: <Cards data={{modalFunc, toastFunc, popupsFunc, childDataFunc}}/> },
        { path: "/grid", element: <Grid /> },
        { path: "/management", element: <Tables data={{modalFunc, toastFunc, popupsFunc}}/> },
        { path: "/cart", element: <Cart data={{childDataFunc}}/> },
        { path: "/breadcrumbs", element: <Breadcrumbs /> },
      ],
    },
  ];
}

export default ThemeRoutes;
