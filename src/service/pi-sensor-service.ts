import axios from "axios";
import {
    GetSensorResponse,
    GetSensorsResponse,
    SensorData,
    SensorName
} from "../types";

const SERVICE_BASE_URL = "http://localhost:3000/api";

export async function getAllSensors(): Promise<GetSensorsResponse> {
    const result = await axios.get<GetSensorsResponse>(
        `${SERVICE_BASE_URL}/sensors`
    );
    if (result.status >= 400) {
        throw new Error(`Error in getAllSensors, code: ${result.status}`);
    }
    return result.data;
}

export async function getSensor(
    sensorName: SensorName
): Promise<GetSensorResponse> {
    const result = await axios.get<GetSensorResponse>(
        `${SERVICE_BASE_URL}/sensors/${sensorName}`
    );
    if (result.status >= 400) {
        throw new Error(`Error in getSensorGraph, code: ${result.status}`);
    }
    return result.data;
}
