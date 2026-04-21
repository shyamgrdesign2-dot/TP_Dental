import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
