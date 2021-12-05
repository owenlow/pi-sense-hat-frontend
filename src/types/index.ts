type Vector = {
    x: number;
    y: number;
    z: number;
};

export type SensorName =
    | "timestamp"
    | "accel"
    | "gyro"
    | "compass"
    | "fusionPose"
    | "temperature"
    | "pressure"
    | "humidity"
    | "tiltHeading";

export type SensorData = {
    timestamp: Date;

    accel: Vector;
    gyro: Vector;
    compass: Vector;
    fusionPose: Vector;

    temperature: number;
    pressure: number;
    humidity: number;
    tiltHeading: number;
};

// Format used in Recharts graph, matches db schema
export type DataPoint = {
    timestamp: number;
    value: number;
};

export interface GetSensorsResponse {
    data: SensorData;
}

export interface GetSensorResponse {
    data: DataPoint[];
}
