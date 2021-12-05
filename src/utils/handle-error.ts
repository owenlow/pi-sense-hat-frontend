import { NextApiResponse } from "next";

export const handleError = (response: NextApiResponse, error: any) => {
    console.error(`Error handler reached, reason: ${error}`);
    response.status(500).send({ error: true });
};
