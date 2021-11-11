import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 401
        res.end('Unauthorized')
        return
    }

    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    if (req.body.msg === undefined || req.body.author === undefined) {
        return res.status(400).end()
    }

    const data = await prisma.message.create({
        data: {
            title: req.body.msg,
            authorId: req.body.author.id,
            published: true,
        }
    })

    return res.status(201)
}
