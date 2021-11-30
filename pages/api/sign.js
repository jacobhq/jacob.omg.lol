import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import prisma from '../../utils/prisma';

export default withApiAuthRequired(async function handler(req, res) {
    const session = getSession(req, res)

    const user = await prisma.user.findMany({
        where: {
            email: session.user.email
        }
    })

    console.log('user', user)

    if (user === []) {
        const createdUser = await prisma.user.create({
            data: {
                name: session.user.name,
                email: session.user.email,
                image: session.user.picture,
            }
        })

        console.log('createdUser', createdUser)
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

    console.log(userId)

    const data = await prisma.message.create({
        data: {
            title: req.body.msg,
            authorId: userId[0].id,
            published: true,
        }
    })

    return res.status(201)
})
