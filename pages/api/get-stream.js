import prisma from "../../utils/prisma";

export default async function handle(req, res) {
    if (req.method !== "GET") return res.status(405).send("Method not allowed")

    const currentStream = await prisma.stream.findFirst({
        where: {
            liveNow: true
        }
    })

    return res.status(200).send(currentStream)
}