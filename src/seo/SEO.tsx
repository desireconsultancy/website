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
  title = "Packaged Drinking Water Plant Setup Consultant India | BIS, FSSAI & Water Plant Project | Desire Consultancy",
  description = "India's premier packaged drinking water plant setup consultancy. Turnkey solutions for mineral water bottling plants, BIS IS 14543 ISI mark, Central FSSAI licensing, CGWA borewell NOC, DPR project reports, and RO plant installation.",
  keywords = "packaged drinking water plant setup consultant, water plant consultancy, water bottling plant setup cost in India, BIS certification requirements for packaged drinking water, FSSAI licence for packaged drinking water plant, mineral water plant project report, 1000 LPH packaged drinking water plant, 20 litre water jar plant, turnkey water plant project consultant, Desire Consultancy",
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
      <meta name="geo.placename" content="Mumbai" />
      <meta name="geo.position" content="19.0760;72.8777" />
      <meta name="ICBM" content="19.0760, 72.8777" />

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

