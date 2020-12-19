import React, { FunctionComponent, useEffect, useState } from "react";
import { getAllSensors } from "../service/pi-sensor-service";
import { SensorData } from "../types";
import { ListGroup } from "react-bootstrap";

const SensorListView: FunctionComponent = () => {
    const [sensorData, setSensorData] = useState<SensorData>();

    useEffect(() => {
        async function fetchData() {
            const result = await getAllSensors();
            setSensorData(result);
        }
        fetchData();
    }, []);

    return (
        <ListGroup>
            {sensorData &&
                Object.entries(sensorData).map(([sensorName, sensorValue]) => (
                    <ListGroup.Item key={sensorName}>
                        {sensorName} - {JSON.stringify(sensorValue)}
                    </ListGroup.Item>
                ))}
        </ListGroup>
    );
};

export default SensorListView;
