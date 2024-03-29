/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,prefer-destructuring */
const webpack = require('webpack')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

const HOST = new URL(NEXT_PUBLIC_API_URL ?? 'http://localhost:8000').host

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' cdn.jsdelivr.net unpkg.com ${HOST};
  style-src-elem 'self' 'unsafe-inline' cdn.jsdelivr.net unpkg.com fonts.googleapis.com ${HOST};
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.jsdelivr.net *.youtube.com *.twitter.com cdn.usefathom.com;
  child-src *.youtube.com *.google.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' data: fonts.gstatic.com;
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replaceAll('\n', ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: true,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  onDemandEntries: {
    // Make sure entries are not getting disposed.
    maxInactiveAge: 1000 * 60 * 60,
  },
  async rewrites() {
    if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === '1') return []
    return [
      {
        source: '/api/:path*',
        destination: `${NEXT_PUBLIC_API_URL}/:path*`,
      },
      {
        source: '/api/:path*/',
        destination: `${NEXT_PUBLIC_API_URL}/:path*/`,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/',
        headers: securityHeaders,
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
        __PREVIEW__: JSON.stringify(process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'),
        __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
      }),
    )

    return config
  },
}

/**
 * @type {import('next').NextConfig}
 */
module.exports = () => {
  const plugins = [withBundleAnalyzer].filter(Boolean)
  return plugins.reduce((acc, next) => {
    if (next.name === 'withSentryConfig') {
      return next(acc, { silent: true })
    }

    return next(acc)
  }, nextConfig)
}
