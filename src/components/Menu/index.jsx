import React from "react";
import { Link } from "react-router-dom";

/**
     * Render a single route as a list item link to the config's pathname
     */
 function SingleRoute(props) {
     const { route } = props;
    return (
        <li key={route.key}>
            <Link to={route.path}>
                {route.key} ({route.path})
            </Link>
        </li>
    );
}

/**
 * Render a nested hierarchy of route configs with unknown depth/breadth
 */
function Menu(props) {
    console.log(props)
    const { routes } = props;
    

    // loop through the array of routes and generate an unordered list
    return (
        <ul>
            {routes.map(route => {
                // if this route has sub-routes, then show the ROOT as a list item and recursively render a nested list of route links
                if (route.routes) {
                    return (
                        <React.Fragment key={route.key}>
                            <SingleRoute route={route} />
                            <Menu routes={route.routes} />
                        </React.Fragment>
                    );
                }

                // no nested routes, so just render a single route
                return <SingleRoute key={route.key} route={route} />;
            })}
        </ul>
    );
}

export { Menu }