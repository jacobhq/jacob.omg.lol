import prisma from "../../utils/prisma";

export default async function handle(req, res) {
    if (req.method !== "GET") return res.status(405).send("Method not allowed")

    const messages = await prisma.message.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        where: {
            published: true
        }
    });

    return res.status(200).send(messages)
}