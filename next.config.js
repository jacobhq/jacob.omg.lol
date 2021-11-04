// Maybe this will work: https://github.com/interclip/interclip-next/commit/50785a15394345a97f1774e052cd2f32650dad1c
const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    runtimeCaching: true,
    buildExcludes: [/middleware-manifest.json$/],
  }
})
