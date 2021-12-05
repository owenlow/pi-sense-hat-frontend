import { sensorListView } from "../constants/paths";
import React, { FunctionComponent, ReactNode } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

interface Props {
    children: ReactNode;
}

const BasicLayout = ({ children }: Props): JSX.Element => (
    <Container>
        <Navbar>
            <Navbar.Brand href={sensorListView}>Pi Sensor Site</Navbar.Brand>
        </Navbar>
        {children}
    </Container>
);

export default BasicLayout;
