import React from "react";
import ROUTES, { RenderRoutes } from "../Routes";
import { Menu } from "../Menu";
import './App.css';

function App() {
    return (
        <div className={'main'}>
            <Menu routes={ROUTES}/>
            <div className={'page-container'}>
                <RenderRoutes routes={ROUTES} />
            </div>
        </div>
    );
}

export default App;

