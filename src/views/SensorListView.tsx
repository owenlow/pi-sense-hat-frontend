import React, {FunctionComponent, useEffect, useState} from "react";
import {getAllSensors} from "../service/pi-sensor-service";
import {SensorData} from "../types";

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
        <ul>
            {sensorData && Object.entries(sensorData).map(([sensorName, sensorValue]) =>
                <li key={sensorName}>{sensorName} - {JSON.stringify(sensorValue)}</li>
            )}
        </ul>
    );
};

export default SensorListView;
