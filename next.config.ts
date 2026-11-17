/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  // Emit a static `out/` tree for nginx. No Node process is required to serve the site.
  // `headers()` and `redirects()` below are not applied to exported files;
  // the same rules live in deploy/nginx/zhenhua.lu.conf.
  output: "export",

  reactStrictMode: true,

  images: {
    // Disable Next.js Image Optimization on platforms that don't support it
    // so <Image> renders plain <img> tags and loads assets directly.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "q.qlogo.cn",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Compress outputs
  compress: true,

  // Enable experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Add redirect handling
  async redirects() {
    return [
      // Add any specific redirects here if needed
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Combine all headers
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
        {
          key: "X-Robots-Tag",
          value: "index, follow",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
      ],
    },
    // Long-term caching for Next.js build assets
    {
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    // Long-term caching for static assets
    {
      source: "/favicons/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/images/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/portfolio.png",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/:all*(mp4|webm|svg|jpg|jpeg|png|gif|webp|avif|ico)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;
