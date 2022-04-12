/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.VERCEL_ENV === 'production' ? 'https://jacob.omg.lol' : process.env.VERCEL_ENV === 'preview' ? process.env.VERCEL_URL : 'https://jacob.omg.lol',
    generateRobotsTxt: true, // (optional)
}