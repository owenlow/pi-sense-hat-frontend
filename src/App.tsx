import React, { FunctionComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SensorListView, {
    path as sensorListViewPath,
} from "./views/SensorListView";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const App: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Container>
                <Navbar>
                    <Navbar.Brand>Pi Sensor Site</Navbar.Brand>
                </Navbar>
                <Switch>
                    <Route exact={true} path={sensorListViewPath}>
                        <SensorListView />
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;
