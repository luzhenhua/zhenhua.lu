import { MetadataRoute } from 'next'
import { DATA } from '@/data/resume'

// Required so `output: "export"` prerenders this metadata route.
export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      }
    ],
    sitemap: `${DATA.url}/sitemap.xml`,
    host: DATA.url,
  }
}
