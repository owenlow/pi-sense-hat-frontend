import { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "../../../utils/handle-error";
import { getDatapointsFromDataset } from "../../../data/sensors";
import { GetSensorResponse } from "../../../types";

// TODO: can next path variables be typed?
// interface GetSensorGraphParams {
//     sensorName: string;
// }

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse<GetSensorResponse>
): Promise<void> {
    const { sensorName } = request.query;

    try {
        const datapoints = await getDatapointsFromDataset(sensorName as string);
        const sanitizedDataPoints = datapoints.map(({ value, timestamp }) => ({
            value: value as number,
            timestamp: timestamp.getTime()
        }));
        response.send({ data: sanitizedDataPoints });
    } catch (error) {
        handleError(error, response);
    }
}
