import React from "react";
import ROUTES, { RenderRoutes } from "../Routes";
import { Menu } from "../Menu"

function App() {
    return (
        <div style={{ display: "flex", height: "100vh", alignItems: "stretch" }}>
            <div style={{ flex: 0.3, backgroundColor: "#f2f2f2" }}>
                <Menu routes={ROUTES}/>
            </div>
            <div>
                <RenderRoutes routes={ROUTES} />
            </div>
        </div>
    );
}

export default App;

