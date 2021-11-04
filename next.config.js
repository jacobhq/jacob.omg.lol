const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/]
  },
});