import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Configuration
const DOMAIN = 'https://desireconsultancy.in';
const PUBLIC_DIR = path.join(rootDir, 'public');
const DIST_DIR = path.join(rootDir, 'dist');

// Define static pages and their priorities/change frequencies
const pages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/services/fssai', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/bis-certification', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/packaged-drinking-water', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/ro-solutions', priority: '0.9', changefreq: 'weekly' },
  { path: '/trademark-registration', priority: '0.9', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.4', changefreq: 'yearly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
];

// Helper to extract dynamic blog slugs from BlogPage.tsx
function getDynamicBlogSlugs() {
  const blogPagePath = path.join(rootDir, 'src', 'pages', 'BlogPage.tsx');
  if (!fs.existsSync(blogPagePath)) {
    console.warn(`[Sitemap Generator] Warning: BlogPage.tsx not found at ${blogPagePath}`);
    return [];
  }

  const content = fs.readFileSync(blogPagePath, 'utf8');
  // Match patterns like: slug: 'some-blog-slug'
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  const slugs = [];
  let match;

  while ((match = slugRegex.exec(content)) !== null) {
    const slug = match[1];
    if (!slugs.includes(slug)) {
      slugs.push(slug);
    }
  }

  console.log(`[Sitemap Generator] Detected ${slugs.length} dynamic blog post(s):`, slugs);
  return slugs;
}

function generateSitemap() {
  console.log('[Sitemap Generator] Starting sitemap generation...');
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Add static pages
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add pages
  const allUrls = [...pages];
  
  // Append dynamic blog urls
  const blogSlugs = getDynamicBlogSlugs();
  blogSlugs.forEach(slug => {
    allUrls.push({
      path: `/blog/${slug}`,
      priority: '0.8',
      changefreq: 'weekly'
    });
  });

  allUrls.forEach(page => {
    // Clean trailing slash issues: ensure uniform handling
    const urlPath = page.path === '/' ? '' : page.path;
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${urlPath}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';

  // Save to public/
  const publicSitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xml, 'utf8');
  console.log(`[Sitemap Generator] Successfully wrote sitemap to ${publicSitemapPath}`);

  // Save to dist/ if it exists (i.e. running post-build)
  if (fs.existsSync(DIST_DIR)) {
    const distSitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, xml, 'utf8');
    console.log(`[Sitemap Generator] Successfully wrote sitemap to ${distSitemapPath}`);
  }
}

try {
  generateSitemap();
} catch (err) {
  console.error('[Sitemap Generator] Failed to generate sitemap:', err);
  process.exit(1);
}
