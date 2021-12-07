import axios from "axios";
import { GetSensorResponse, GetSensorsResponse, SensorName } from "../types";

// Client side calls need a base URL, server side calls in getInitialProps will pass their own
function buildDefaultBaseUrl() {
    return `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
}

export async function getAllSensors(
    baseUrl = buildDefaultBaseUrl()
): Promise<GetSensorsResponse> {
    const result = await axios.get<GetSensorsResponse>(
        `${baseUrl}/api/sensors`
    );
    if (result.status >= 400) {
        throw new Error(`Error in getAllSensors, code: ${result.status}`);
    }
    return result.data;
}

export async function getSensor(
    sensorName: SensorName,
    host = buildDefaultBaseUrl()
): Promise<GetSensorResponse | undefined> {
    try {
        const result = await axios.get<GetSensorResponse>(
            `${host}/api/sensors/${sensorName}`
        );
        if (result.status >= 400) {
            console.error(`Error in getSensorGraph, code: ${result.status}`);
        }
        return result.data;
    } catch (e) {
        console.error("caught", e);
    }
}
