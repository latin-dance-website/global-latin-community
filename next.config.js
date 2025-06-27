/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  }
  
  module.exports = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  }
};