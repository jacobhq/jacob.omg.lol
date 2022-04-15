import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../utils/prisma"

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
    let data = await prisma.sign.findFirst({
        orderBy: {
            createdAt: "desc"
        }
    })

    return res.status(200).json(data)
}