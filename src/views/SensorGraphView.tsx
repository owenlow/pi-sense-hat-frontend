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

const SensorGraphView: FunctionComponent<
    RouteComponentProps<{ sensorName: SensorName }>
> = ({ match: { params } }) => {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>();

    useEffect(() => {
        async function fetchData() {
            const resultGraphData = await getSensorGraph(params.sensorName);
            setDataPoints(resultGraphData.dataPoints);
        }
        fetchData();
    });

    return dataPoints ? (
        <SensorGraph data={dataPoints} />
    ) : (
        <div>No data available</div>
    );
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
