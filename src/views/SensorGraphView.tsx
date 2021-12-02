import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { getSensorGraph } from "../service/pi-sensor-service";
import { DataPoint, SensorName } from "../types";
import { Spinner } from "react-bootstrap";

const AUTO_REFRESH_INTERVAL_MS = 1000 * 60;

interface SensorGraphViewProps {
    sensorName: SensorName;
}

const SensorGraphView: FunctionComponent<
    RouteComponentProps<SensorGraphViewProps>
> = ({
    match: {
        params: { sensorName }
    }
}) => {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>();
    const [fetchPending, setFetchPending] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const resultGraphData = await getSensorGraph(sensorName);
                setDataPoints(resultGraphData.dataPoints);
            } finally {
                setFetchPending(false);
            }
        }

        let timeout: any;
        (function periodicFetcher() {
            fetchData();
            timeout = setTimeout(periodicFetcher, AUTO_REFRESH_INTERVAL_MS);
        })();
        return () => clearTimeout(timeout);
    }, [sensorName]);

    if (fetchPending) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation={"border"} />
            </div>
        );
    } else if (dataPoints && dataPoints.length > 0) {
        return <SensorGraph data={dataPoints} sensorName={sensorName} />;
    } else {
        return <div>No data available</div>;
    }
};

interface SensorGraphProps {
    sensorName: SensorName;
    data: DataPoint[];
}

const SENSOR_Y_AXIS_LABELS: { [key: string]: string } = {
    temperature: "Temperature in C",
    tiltHeading: "Tilt heading",
    pressure: "Pressure",
    humidity: "Humidity"
};

const SensorGraph: FunctionComponent<SensorGraphProps> = ({
    data,
    sensorName
}) => {
    return (
        <ResponsiveContainer width={"100%"} height={300}>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 50,
                    bottom: 15
                }}
            >
                <CartesianGrid />
                <XAxis
                    label={{
                        value: "Time",
                        dy: 20
                    }}
                    dataKey="timestamp"
                    tickFormatter={(timestamp) => {
                        const d = new Date(timestamp);
                        return (
                            d.getHours().toString().padStart(2, "0") +
                            ":" +
                            d.getMinutes().toString().padStart(2, "0")
                        );
                    }}
                />
                <YAxis
                    label={{
                        value: SENSOR_Y_AXIS_LABELS[sensorName as string],
                        angle: -90,
                        dx: -40
                    }}
                    dataKey={"value"}
                    domain={["auto", "auto"]}
                />
                <Tooltip />
                <Line dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SensorGraphView;
