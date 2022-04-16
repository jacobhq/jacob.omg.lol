const { withContentlayer } = require("next-contentlayer");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson(withContentlayer(withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
  async redirects() {
    return [
      {
        source: "/posts",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/posts/:slug",
        permanent: true,
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: "/bee.js",
        destination: "https://cdn.splitbee.io/sb.js",
      },
      {
        source: "/_hive/:slug",
        destination: "https://hive.splitbee.io/:slug",
      },
      {
        source: "/coolsetup",
        destination: "http://coolsetup-dev.vercel.app/",
      },
      {
        source: "/matteblack",
        destination: "http://coolsetup-dev.vercel.app/",
      },
      {
        source: "/spacegrey",
        destination: "http://coolsetup-dev.vercel.app/",
      },
    ];
  },
})))
