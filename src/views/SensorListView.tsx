import React, { FunctionComponent, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { generatePath } from "react-router-dom";
import { getAllSensors } from "../service/pi-sensor-service";
import { SensorData } from "../types";
import { sensorGraphView } from "../constants/paths";

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
                Object.entries(sensorData).map(([sensorName, sensorValue]) =>
                    // For now, only supporting graphing of number values
                    typeof sensorValue === "number" ? (
                        <ListGroup.Item
                            action
                            href={generatePath(sensorGraphView, {
                                sensorName
                            })}
                        >
                            {sensorName} - {JSON.stringify(sensorValue)}
                        </ListGroup.Item>
                    ) : (
                        <ListGroup.Item disabled key={sensorName}>
                            {sensorName} - {JSON.stringify(sensorValue)}
                        </ListGroup.Item>
                    )
                )}
        </ListGroup>
    );
};

export default SensorListView;
