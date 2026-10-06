import react from '@vitejs/plugin-react'
import { loadEnv, type Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

const ROUTES = ['/'] as const

function readPort(value: string | undefined, fallback: number): number {
  const port = Number(value ?? String(fallback))
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Vite port environment values must be a valid TCP port.')
  }
  return port
}

function normalizeSiteUrl(value: string | undefined): string {
  const siteUrl = (value ?? 'http://127.0.0.1:2050').trim()
  try {
    return new URL(siteUrl).origin
  } catch {
    throw new Error(`VITE_SITE_URL must be an absolute URL. Received: ${siteUrl}`)
  }
}

/**
 * Keeps origin-dependent SEO output in sync with VITE_SITE_URL so no absolute
 * URL has to be hard-coded in a committed asset, and keeps non-production
 * builds out of search indexes.
 */
function seoPlugin(siteUrl: string, indexable: boolean): Plugin {
  return {
    name: 'ailab-seo',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'meta',
            attrs: { name: 'robots', content: indexable ? 'index, follow' : 'noindex, nofollow' },
            injectTo: 'head',
          },
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
        ],
      }
    },
    generateBundle() {
      const lastModified = new Date().toISOString().slice(0, 10)
      const urls = ROUTES.map(
        (route) =>
          `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`,
      ).join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: indexable
          ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
          : 'User-agent: *\nDisallow: /\n',
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')
  const siteUrl = normalizeSiteUrl(environment.VITE_SITE_URL)
  const indexable = mode === 'prod' && siteUrl.startsWith('https://')

  return {
    plugins: [react(), seoPlugin(siteUrl, indexable)],
    build: {
      target: 'es2022',
      sourcemap: mode !== 'prod',
    },
    server: {
      port: readPort(environment.VITE_DEV_SERVER_PORT, 2050),
      strictPort: true,
    },
    preview: {
      port: readPort(environment.VITE_PREVIEW_PORT, 2050),
      strictPort: true,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
    },
  }
})
