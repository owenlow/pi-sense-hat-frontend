import React, { FunctionComponent, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { getAllSensors } from "../service/pi-sensor-service";
import { SensorData } from "../types";
import BasicLayout from "../components/BasicLayout";

const Index: FunctionComponent = () => {
    const [sensorData, setSensorData] = useState<SensorData>();

    useEffect(() => {
        async function fetchData() {
            const result = await getAllSensors();
            setSensorData(result.data);
        }
        fetchData();
    }, []);

    return (
        <BasicLayout>
            <ListGroup>
                {sensorData &&
                    Object.entries(sensorData).map(
                        ([sensorName, sensorValue]) =>
                            // For now, only supporting graphing of number values
                            typeof sensorValue === "number" ? (
                                <ListGroup.Item
                                    action
                                    href={`/sensor/${sensorName}`}
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
        </BasicLayout>
    );
};

export default Index;
