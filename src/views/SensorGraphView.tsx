import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { getSensorGraph } from "../service/pi-sensor-service";
import { DataPoint, SensorName } from "../types";
import { Spinner } from "react-bootstrap";

interface SensorGraphViewProps {
    sensorName: SensorName;
}

const SensorGraphView: FunctionComponent<
    RouteComponentProps<SensorGraphViewProps>
> = ({ match: { params } }) => {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>();
    const [fetchPending, setFetchPending] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const resultGraphData = await getSensorGraph(params.sensorName);
                setDataPoints(resultGraphData.dataPoints);
            } finally {
                setFetchPending(false);
            }
        }
        fetchData();
    });

    if (fetchPending) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation={"border"} />
            </div>
        );
    } else if (dataPoints) {
        return <SensorGraph data={dataPoints} />;
    } else {
        return <div>No data available</div>;
    }
};

interface SensorGraphProps {
    data: DataPoint[];
}

const SensorGraph: FunctionComponent<SensorGraphProps> = ({ data }) => {
    return (
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid />
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Legend />
            <Line dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default SensorGraphView;
