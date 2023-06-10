const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  reactStrictMode: true,
  transpilePackages: ['@0xcard/lib'],
})
