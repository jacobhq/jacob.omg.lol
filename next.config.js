// Try fix from https://github.com/shadowwalker/next-pwa/issues/288#issuecomment-953799577

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/]
  },
});
