/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: 'http://18.204.204.133:3001',
    frontendURL: 'http://18.204.204.133:3000'
  }
}

module.exports = nextConfig
