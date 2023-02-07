import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {
        name,
        age,
        aircraft,
        hours,
        simulator,
        others,
        vk
    } = req.query

    if (!name || !age || !aircraft || !hours || !simulator || !others || !vk) {
        return res.send({status: "error", message: "Не все поля заполнены"})
    }

    const response = await fetch(`${process.env.API_URL}register?name=${name}&age=${age}&aircraft=${aircraft}&hours=${hours}&simulator=${simulator}&others=${others}&vk=${vk}`)
    const result = await response.json()

    res.status(200).json({message: result.message})
}