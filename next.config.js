/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: 'https://nodesendbackend-production-7232.up.railway.app',
    frontendURL: 'https://node-send-lilac.vercel.app'
  }
}

module.exports = nextConfig
