import { Helmet } from 'react-helmet-async';
import {
  getOrganizationSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getLocalBusinessSchema,
} from './schema';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  robots?: string;
}

export function SEO({
  title = "Desire Consultancy | FSSAI, BIS & Compliance Experts — Nagpur, Maharashtra",
  description = "Expert regulatory compliance consultancy in Nagpur, Maharashtra. FSSAI licensing, BIS certification, packaged drinking water plant setup, and industrial RO compliance — pan India.",
  keywords = "FSSAI licensing Nagpur, BIS certification Maharashtra, water plant consultancy, industrial RO, regulatory compliance, Nagpur, Maharashtra, India, desire consultancy",
  canonicalUrl = "https://desireconsultancy.in/",
  ogImage = "https://desireconsultancy.in/og-image.jpg",
  robots = "index, follow",
}: SEOProps) {
  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Meta tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Desire Consultancy" />
      <meta name="robots" content={robots} />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Nagpur" />
      <meta name="geo.position" content="21.1458;79.0882" />
      <meta name="ICBM" content="21.1458, 79.0882" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(getOrganizationSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(getLocalBusinessSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(getServiceSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(getFAQSchema())}</script>
    </Helmet>
  );
}

