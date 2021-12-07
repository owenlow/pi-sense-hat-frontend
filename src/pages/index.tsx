import React from "react";
import { ListGroup } from "react-bootstrap";
import { getAllSensors } from "../service/pi-sensor-service";
import { SensorData } from "../types";
import BasicLayout from "../components/BasicLayout";
import { NextPage } from "next";

interface Props {
    sensors?: SensorData;
}

const Index: NextPage<Props> = ({ sensors }) => {
    // const [sensorData, setSensorData] = useState<SensorData | undefined>(
    //     sensors
    // );
    // useEffect(() => {
    //     async function fetchData() {
    //         const result = await getAllSensors();
    //         setSensorData(result.data);
    //     }
    //     fetchData();
    // }, []);

    return (
        <BasicLayout>
            <ListGroup>
                {sensors &&
                    Object.entries(sensors).map(([sensorName, sensorValue]) =>
                        // For now, only supporting graphing of number values
                        typeof sensorValue === "number" ? (
                            <ListGroup.Item
                                action
                                href={`/sensor/${sensorName}`}
                                key={sensorName}
                            >
                                {sensorName} - {JSON.stringify(sensorValue)}
                            </ListGroup.Item>
                        ) : (
                            <ListGroup.Item disabled key={sensorName}>
                                {sensorName} - {JSON.stringify(sensorValue)}
                            </ListGroup.Item>
                        )
                    )}
            </ListGroup>
        </BasicLayout>
    );
};

Index.getInitialProps = async ({ req }): Promise<Props> => {
    if (req) {
        const url = `${req.headers["x-forwarded-proto"]}://${req.headers.host}`;
        const result = await getAllSensors(url);
        return { sensors: result.data };
    }
    return {};
};

export default Index;
