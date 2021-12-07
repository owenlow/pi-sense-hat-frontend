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
import { getSensor } from "../../service/pi-sensor-service";
import { DataPoint, SensorName } from "../../types";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import BasicLayout from "../../components/BasicLayout";
import { NextPage } from "next";

const AUTO_REFRESH_INTERVAL_MS = 1000 * 60;

// TODO: can the next path variable be typed?
interface SensorGraphViewProps {
    sensorName: SensorName;
}

const SensorGraphView: NextPage = () => {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>();
    const [fetchPending, setFetchPending] = useState<boolean>(true);
    const router = useRouter();
    //TODO: fix with dynamic query value
    const sensorName = "temperature";
    console.log(router.query);

    useEffect(() => {
        async function fetchData() {
            try {
                const resultGraphData = await getSensor(sensorName);
                setDataPoints(resultGraphData?.data);
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
    }, []);

    let content: JSX.Element;
    if (fetchPending) {
        content = (
            <div className="d-flex justify-content-center">
                <Spinner animation={"border"} />
            </div>
        );
    } else if (dataPoints && dataPoints.length > 0) {
        content = <SensorGraph data={dataPoints} sensorName={sensorName} />;
    } else {
        content = <div>No data available</div>;
    }
    return <BasicLayout>{content}</BasicLayout>;
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
