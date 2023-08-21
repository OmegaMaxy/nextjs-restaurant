/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  swcMinify: true,
  /*webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false
      }
    }

    return config;
  }*/
  env: {
    RABBITMQ_URL: '178.63.23.151:52110'
  }
}

module.exports = nextConfig
