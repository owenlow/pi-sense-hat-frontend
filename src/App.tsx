import React, { FunctionComponent } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Index from "./pages";
import SensorId from "./pages/sensor/[sensorName]";
import { sensorGraphView, sensorListView } from "./constants/paths";

const App: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Container>
                <Navbar>
                    <Navbar.Brand href={sensorListView}>
                        Pi Sensor Site
                    </Navbar.Brand>
                </Navbar>
                <Switch>
                    <Route
                        exact={true}
                        path={sensorListView}
                        component={Index}
                    />
                    <Route
                        exact={true}
                        path={sensorGraphView}
                        component={SensorId}
                    />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;
