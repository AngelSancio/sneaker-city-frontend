import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProductList } from "../ProductList";
import { Home } from "../Home";
import { Cart } from "../Cart";

const ROUTES = [
    { path: "/", key: "Home", exact: true, component: Home },
    {
        path: "/products",
        key: "Store",
        exact: true,
        component: ProductList,
    },
    {
        path: "/cart",
        key: "Cart",
        exact: true,
        component: Cart,
    }
];

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => <route.component {...props} routes={route.routes} />}
        />
    );
}

export function RenderRoutes({ routes }) {
    return (
        <Switch>
            {routes.map((route, i) => {
                return <RouteWithSubRoutes key={route.key} {...route} />;
            })}
            <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
    );
}

export default ROUTES;