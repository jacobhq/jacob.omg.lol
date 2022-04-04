import axios from "axios"

export default async function handle (req, res) {
    const data = await axios.get("https://api.twitter.com/2/users/1283687941320118273/tweets", {
        headers: {
            Authorization: 'Bearer ' + process.env.TWITTER_BEARER
        }
    }).then((response) => {
        res.json(response.data)
    }).catch((err) => {
        res.send(err)
    })
}