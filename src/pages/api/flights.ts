import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const flights = await fetch(`${process.env.API_URL}flights`)
    const result = await flights.json()

    res.status(200).json(result)
}