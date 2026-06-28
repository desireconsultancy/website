import { Helmet } from 'react-helmet-async';
import {
  getOrganizationSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getLocalBusinessSchema,
} from './schema';

export function SEO() {
  return (
    <Helmet>
      {/* Title */}
      <title>Desire Consultancy | FSSAI, BIS & Compliance Experts — Nagpur, Maharashtra</title>

      {/* Meta tags */}
      <meta
        name="description"
        content="Expert regulatory compliance consultancy in Nagpur, Maharashtra. FSSAI licensing, BIS certification, packaged drinking water plant setup, and industrial RO compliance — pan India."
      />
      <meta
        name="keywords"
        content="FSSAI licensing Nagpur, BIS certification Maharashtra, water plant consultancy, industrial RO, regulatory compliance, Nagpur, Maharashtra, India, desire consultancy"
      />
      <meta name="author" content="Desire Consultancy" />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Nagpur" />
      <meta name="geo.position" content="21.1458;79.0882" />
      <meta name="ICBM" content="21.1458, 79.0882" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://desireconsultancy.com/" />
      <meta property="og:title" content="Desire Consultancy | FSSAI, BIS & Compliance Experts" />
      <meta property="og:description" content="Expert regulatory compliance consultancy — FSSAI licensing, BIS certification, packaged drinking water plants, and RO solutions across India." />
      <meta property="og:image" content="https://desireconsultancy.com/og-image.jpg" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://desireconsultancy.com/" />
      <meta name="twitter:title" content="Desire Consultancy | FSSAI, BIS & Compliance Experts" />
      <meta name="twitter:description" content="Expert regulatory compliance consultancy across India." />
      <meta name="twitter:image" content="https://desireconsultancy.com/og-image.jpg" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://desireconsultancy.com/" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(getOrganizationSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(getLocalBusinessSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(getServiceSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(getFAQSchema())}</script>
    </Helmet>
  );
}
