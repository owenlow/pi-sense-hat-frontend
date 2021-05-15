import {
    DataPoint,
    GetSensorGraphResult,
    SensorData,
    SensorName
} from "../types";

const SERVICE_BASE_URL = "http://eos:3000";

export async function getAllSensors(): Promise<SensorData> {
    const result = await fetch(`${SERVICE_BASE_URL}/sensors`);
    if (result.status >= 400) {
        console.error(`Error in getAllSensors, code: ${result.status}`);
        return {} as SensorData;
    } else {
        return (await result.json()) as SensorData;
    }
}

export async function getSensorGraph(
    sensorName: SensorName
): Promise<GetSensorGraphResult> {
    let dataPoints: DataPoint[] = [];
    const result = await fetch(`${SERVICE_BASE_URL}/sensors/${sensorName}`);
    if (result.status >= 400) {
        console.error(`Error in getSensorGraph, code: ${result.status}`);
    } else {
        dataPoints = (await result.json()) as DataPoint[];
    }
    return { dataPoints };
}
