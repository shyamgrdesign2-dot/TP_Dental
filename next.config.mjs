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
  async headers() {
    return [
      {
        // 3D models + DRACO decoder are content-hashed by filename and never
        // mutate; long-cache them so repeat visits don't re-download.
        source: '/:path(models|draco)/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
