/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizePackageImports: ["@/components", "@/lib", "@/utils"],
  },
  compress: true,
  images: {
    formats: ["image/webp", "image/avif"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async rewrites() {
    const backend = process.env.API_INTERNAL_URL || "http://localhost:8000";
    return [
      { source: "/auth/:path*", destination: `${backend}/auth/:path*` },
      { source: "/memories/:path*", destination: `${backend}/memories/:path*` },
      { source: "/memories", destination: `${backend}/memories` },
      { source: "/entities/:path*", destination: `${backend}/entities/:path*` },
      { source: "/entities", destination: `${backend}/entities` },
      { source: "/api-keys/:path*", destination: `${backend}/api-keys/:path*` },
      { source: "/api-keys", destination: `${backend}/api-keys` },
      { source: "/configure/:path*", destination: `${backend}/configure/:path*` },
      { source: "/configure", destination: `${backend}/configure` },
      { source: "/generate-instructions", destination: `${backend}/generate-instructions` },
      { source: "/search", destination: `${backend}/search` },
      { source: "/requests", destination: `${backend}/requests` },
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/settings",
        destination: "/dashboard/settings",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
"expect eof"