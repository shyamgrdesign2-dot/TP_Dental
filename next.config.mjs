/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  /** Hides the dev-only route indicator; does not remove the portal used for error overlay. */
  devIndicators: false,
}

export default nextConfig
