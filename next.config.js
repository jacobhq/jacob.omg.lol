const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
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
});
