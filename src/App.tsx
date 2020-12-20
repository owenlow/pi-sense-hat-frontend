import React, { FunctionComponent } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import SensorListView from "./views/SensorListView";
import SensorGraphView from "./views/SensorGraphView";
import { sensorGraphView, sensorListView } from "./constants/paths";

const App: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Container>
                <Navbar>
                    <Navbar.Brand>Pi Sensor Site</Navbar.Brand>
                </Navbar>
                <Switch>
                    <Route
                        exact={true}
                        path={sensorListView}
                        component={SensorListView}
                    />
                    <Route
                        exact={true}
                        path={sensorGraphView}
                        component={SensorGraphView}
                    />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;
