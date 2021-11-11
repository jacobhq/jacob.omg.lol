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

    const user = await prisma.user.findMany({
        where: {
            email: session.user.email
        }
    })

    if (!user) {
        await prisma.user.create({
            data: {
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
            }
        })
    }    

    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    if (req.body.msg === undefined) {
        return res.status(400).end()
    }

    const userId = await prisma.user.findMany({
        where: {
            email: session.user.email
        }
    })

    const data = await prisma.message.create({
        data: {
            title: req.body.msg,
            authorId: userId[0].id,
            published: true,
        }
    })

    return res.status(201)
}
