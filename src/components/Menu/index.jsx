import { faShoePrints } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import './Menu.css';
import { useLocation } from 'react-router-dom';

/**
     * Render a single route as a list item link to the config's pathname
     */
function SingleRoute(props) {
    const location = useLocation();

    const { route } = props;
    return (
        <Link key={route.key} to={route.path} className={location.pathname === route.path ? 'active' : ''  }>
            {route.key}
        </Link>
    );
}

/**
 * Render a nested hierarchy of route configs with unknown depth/breadth
 */
function Menu(props) {
    const { routes } = props;
    

    // loop through the array of routes and generate an unordered list
    return (
        <div className={'header'}>
            <div className={'logo'}>
                <FontAwesomeIcon icon={ faShoePrints }></FontAwesomeIcon>
                <h1>Sneaker City</h1>
            </div>
            <div className={'menu'}>
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

                    return (
                        <div className={'menu-link' } key={route.key}>
                            <SingleRoute route={route} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export { Menu }