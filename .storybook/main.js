const securityHeaders = [{
  key: 'X-DNS-Prefetch-Control',
  value: 'on'
}, {
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains; preload'
},
{
  key: 'Referrer-Policy',
  value: 'same-origin'
}]




module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['www.xxx.com', 'xxx.com', 'cdn.xxx.com'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}