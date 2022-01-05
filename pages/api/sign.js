import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import prisma from '../../utils/prisma';
var Filter = require('bad-words'),

filter = new Filter();

export default withApiAuthRequired(async function handler(req, res) {
    const session = getSession(req, res)

    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    if (req.body.msg === undefined) {
        return res.status(400).end()
    }

    const data = await prisma.message.create({
        data: {
            title: filter.clean(req.body.msg),
            author: req.body.author,
            published: true,
        }
    })

    console.log(req.body, data)

    return res.status(201).send(data)
})
