import type { NextApiRequest, NextApiResponse } from "next";
import { GetSensorsResponse, SensorData } from "../../types";
import { getAllReadings } from "../../device";
import { handleError } from "../../utils/handle-error";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse<GetSensorsResponse>
): Promise<void> {
    try {
        const readings = await getAllReadings();
        response.send({ data: readings });
    } catch (error) {
        handleError(response, error);
    }
}
