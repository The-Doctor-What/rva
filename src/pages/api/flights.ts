import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const flights = await fetch(`http://79.137.196.119/flights`)
    const result = await flights.json()

    res.status(200).json(result)
}