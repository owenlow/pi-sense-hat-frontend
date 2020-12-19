import React, { FunctionComponent } from "react";
import SensorListView from "./views/SensorListView";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const App: FunctionComponent = () => {
    return (
        <Container>
            <Navbar>
                <Navbar.Brand>Pi Sensor Site</Navbar.Brand>
            </Navbar>
            <SensorListView />
        </Container>
    );
};

export default App;
