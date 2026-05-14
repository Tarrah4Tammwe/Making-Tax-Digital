import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://makingtaxdigitalexplained.com'
  
  const routes = [
    '',
    '/what-is-mtd',
    '/do-i-comply',
    '/which-software',
    '/how-much-cost',
    '/deadlines-2026',
    '/what-records',
    '/mtd-amendments',
    '/mtd-penalties',
    '/director-mtd',
    '/limited-company-mtd',
    '/partnership-mtd',
    '/voluntary-mtd',
    '/employee-records',
    '/vat-records',
    '/calculator',
    '/premium-checklist',
    '/contact',
    '/privacy',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
