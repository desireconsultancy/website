/**
 * Generates JSON-LD schema for the Organization as a Local Business.
 * Location: Mumbai, Maharashtra, India
 */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://desireconsultancy.in/#organization',
  'name': 'Desire Consultancy',
  'url': 'https://desireconsultancy.in',
  'logo': 'https://desireconsultancy.in/logo.webp',
  'image': 'https://desireconsultancy.in/og-image.jpg',
  'description': 'Expert compliance and regulatory consultancy helping businesses with FSSAI licensing, BIS certification, packaged drinking water plants, and industrial RO solutions across India.',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Mumbai',
    'addressRegion': 'Maharashtra',
    'addressCountry': 'IN',
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '19.0760',
    'longitude': '72.8777',
  },
  'telephone': '+918421504028',
  'email': 'support@desireconsultancy.in',
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'opens': '09:00',
    'closes': '18:00',
  },
  'sameAs': [
    'https://www.linkedin.com/company/desire-consultancy',
  ],
  'priceRange': '₹₹',
  'areaServed': {
    '@type': 'Country',
    'name': 'India',
  },
});

/** Local Business schema optimised for Mumbai / Maharashtra Local SEO */
export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://desireconsultancy.in/#localbusiness',
  'name': 'Desire Consultancy',
  'description': 'FSSAI licensing, BIS certification, packaged drinking water plant consultancy, and RO compliance experts based in Mumbai, Maharashtra.',
  'url': 'https://desireconsultancy.in',
  'telephone': '+918421504028',
  'email': 'support@desireconsultancy.in',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Mumbai',
    'addressRegion': 'Maharashtra',
    'addressCountry': 'IN',
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '19.0760',
    'longitude': '72.8777',
  },
  'hasMap': 'https://maps.google.com/?q=Mumbai,Maharashtra,India',
  'areaServed': [
    { '@type': 'State', 'name': 'Maharashtra' },
    { '@type': 'Country', 'name': 'India' },
  ],
  'serviceArea': {
    '@type': 'GeoCircle',
    'geoMidpoint': { '@type': 'GeoCoordinates', 'latitude': '19.0760', 'longitude': '72.8777' },
    'geoRadius': '5000000', // pan-India
  },
});

/** Generates JSON-LD schema for the core compliance consultancy services. */
export const getServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': 'Desire Consultancy Services',
  'description': 'Compliance and regulatory licensing consultancy services.',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'item': {
        '@type': 'Service',
        'name': 'FSSAI Licensing',
        'url': 'https://desireconsultancy.in/fssai-certification',
        'description': 'Expert assistance with new licenses, renewals, modifications, state and central FSSAI licenses.',
        'provider': { '@type': 'LocalBusiness', 'name': 'Desire Consultancy' },
      },
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'item': {
        '@type': 'Service',
        'name': 'BIS Certification',
        'url': 'https://desireconsultancy.in/bis-certification',
        'description': 'Support for Bureau of Indian Standards (BIS) certification, compliance audits, documentation, and product approvals.',
        'provider': { '@type': 'LocalBusiness', 'name': 'Desire Consultancy' },
      },
    },
    {
      '@type': 'ListItem',
      'position': 3,
      'item': {
        '@type': 'Service',
        'name': 'Packaged Drinking Water Plants',
        'url': 'https://desireconsultancy.in/services/packaged-drinking-water',
        'description': 'Comprehensive consultancy for setting up packaged drinking water units including regulatory approvals, layouts, and audits.',
        'provider': { '@type': 'LocalBusiness', 'name': 'Desire Consultancy' },
      },
    },
    {
      '@type': 'ListItem',
      'position': 4,
      'item': {
        '@type': 'Service',
        'name': 'Industrial RO Solutions',
        'url': 'https://desireconsultancy.in/services/ro-solutions',
        'description': 'Consultancy and compliance guidance for commercial and industrial reverse osmosis (RO) water treatment systems.',
        'provider': { '@type': 'LocalBusiness', 'name': 'Desire Consultancy' },
      },
    },
  ],
});

/** Generates JSON-LD schema for the Breadcrumb navigation. */
export const getBreadcrumbSchema = (items?: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': (items ?? [{ name: 'Home', url: 'https://desireconsultancy.in' }]).map(
    (item, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': item.name,
      'item': item.url,
    }),
  ),
});

/** Generates JSON-LD schema for FAQ Section on Homepage. */
export const getFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'How do I start a packaged drinking water plant in India?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Starting a compliant packaged water bottling plant requires selecting an industrial site (2,000–5,000 sq. ft.), completing raw water chemical testing, securing CGWA borewell extraction NOC, installing multi-barrier RO/UV/Ozone machinery, setting up an on-site microbiology laboratory, and obtaining BIS IS 14543 ISI Mark certification and Central FSSAI licensing.',
      },
    },
    {
      '@type': 'Question',
      'name': 'What is the setup cost of a packaged drinking water plant in India?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Total capital investment typically ranges from ₹25 Lakhs to ₹75 Lakhs. A 1000 LPH or 20-litre jar plant starts around ₹25–35 Lakhs, while a semi-automatic or fully automatic 2000 to 5000 LPH bottling line with bottle blowing and in-house laboratory setup ranges between ₹45 Lakhs to ₹75 Lakhs.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Which FSSAI license is required for a water bottling factory?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'A Central FSSAI Manufacturing License (Category 14 - Beverages / Packaged Drinking Water) is legally mandatory for all commercial water bottling plants in India, regardless of annual turnover.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Is BIS ISI Mark certification mandatory for packaged drinking water?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes. Bureau of Indian Standards (BIS) certification under IS 14543 (for packaged drinking water) and IS 13428 (for natural mineral water) is legally compulsory before commercial sale or distribution anywhere in India.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Can Desire Consultancy prepare a project report (DPR) for a bank loan?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes. We prepare bankable Detailed Project Reports (DPR) with machinery quotations, civil cleanroom layouts, financial ROI projections, and break-even calculations for MSME, PMEGP, and nationalized bank term loans.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Do you provide turnkey consultancy support across all states in India?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes. Desire Consultancy provides pan-India on-site and remote turnkey project consultancy — assisting clients in Maharashtra, Gujarat, Madhya Pradesh, Karnataka, Delhi-NCR, Uttar Pradesh, and across all Indian states.',
      },
    },
  ],
});
