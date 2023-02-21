/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: 'http://127.0.0.1:4001',
    frontendURL: 'http://localhost:3000'
  }
}

module.exports = nextConfig
