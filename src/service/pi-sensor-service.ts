import {SensorData, SensorName} from "../types";

export async function getAllSensors(): Promise<SensorData> {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({
                temperature: 30.4,
                humidity: 90,
                accel: {x: 1, y: 1, z: 1},
                compass: {x: 1, y: 1, z: 1},
                fusionPose: {x: 1, y: 1, z: 1},
                gyro: {x: 1, y: 1, z: 1},
                pressure: 1,
                tiltHeading:  1,
                timestamp: new Date()
            });
        }, 1000)
    });
}

export async function getSensorGraph(sensorName: SensorName) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({
                temperature: 30.4,
                humidity: 90
            });
        }, 1000)
    });
}
