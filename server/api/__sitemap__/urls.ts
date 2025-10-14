import { defineEventHandler } from 'h3'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
  // Static list of all pages with their sitemap data
  const allPages = [
    // Main pages
    {
      loc: '/',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: '/about',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8
    },
    // Blog posts
    {
      loc: '/modern-frontend-architecture-complete-guide',
      lastmod: '2025-10-05',
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: '/architecture-notes-modular-monolith',
      lastmod: '2025-07-15',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/backend-performance-checklist',
      lastmod: '2025-10-25',
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: '/better-code-reviews',
      lastmod: '2025-07-20',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/building-teams-that-ship',
      lastmod: '2025-05-13',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/building-with-ai-partner',
      lastmod: '2025-06-06',
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: '/cloudflare-edge-patterns',
      lastmod: '2025-05-25',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/engineering-operating-system',
      lastmod: '2025-05-30',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/language-of-creation',
      lastmod: '2025-06-17',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/refactoring-in-the-open',
      lastmod: '2025-09-25',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/design-systems-that-age-well',
      lastmod: '2025-09-29',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/designing-ai-copilot-interfaces',
      lastmod: '2025-10-14',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/typography-for-focus',
      lastmod: '2025-10-10',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/visual-hierarchy-that-guides',
      lastmod: '2025-08-03',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/fin-2025-eye-on-the-south',
      lastmod: '2025-10-11',
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: '/startup-weekend-basra-2025',
      lastmod: '2025-01-15',
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: '/tafa3ul-hub-bootcamp-october-2024',
      lastmod: '2024-10-31',
      changefreq: 'monthly',
      priority: 0.7
    }
  ]
  
  return allPages.map(page => asSitemapUrl(page))
})
