/**
 * Generates JSON-LD schema for the Organization as a Local Business.
 * Location: Nagpur, Maharashtra, India
 */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://desireconsultancy.in/#organization',
  'name': 'Desire Consultancy',
  'url': 'https://desireconsultancy.in',
  'logo': 'https://desireconsultancy.in/logo.png',
  'image': 'https://desireconsultancy.in/og-image.jpg',
  'description': 'Expert compliance and regulatory consultancy helping businesses with FSSAI licensing, BIS certification, packaged drinking water plants, and industrial RO solutions across India.',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Nagpur',
    'addressRegion': 'Maharashtra',
    'postalCode': '440001',
    'addressCountry': 'IN',
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '21.1458',
    'longitude': '79.0882',
  },
  'telephone': '+918421504028',
  'email': 'desireconsultancy37@gmail.com',
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

/** Local Business schema optimised for Nagpur / Maharashtra Local SEO */
export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://desireconsultancy.in/#localbusiness',
  'name': 'Desire Consultancy',
  'description': 'FSSAI licensing, BIS certification, packaged drinking water plant consultancy, and RO compliance experts based in Nagpur, Maharashtra.',
  'url': 'https://desireconsultancy.in',
  'telephone': '+918421504028',
  'email': 'desireconsultancy37@gmail.com',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Nagpur',
    'addressRegion': 'Maharashtra',
    'addressCountry': 'IN',
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '21.1458',
    'longitude': '79.0882',
  },
  'hasMap': 'https://maps.google.com/?q=Nagpur,Maharashtra,India',
  'areaServed': [
    { '@type': 'State', 'name': 'Maharashtra' },
    { '@type': 'Country', 'name': 'India' },
  ],
  'serviceArea': {
    '@type': 'GeoCircle',
    'geoMidpoint': { '@type': 'GeoCoordinates', 'latitude': '21.1458', 'longitude': '79.0882' },
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

/** Generates JSON-LD schema for FAQ Section. */
export const getFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'How long does the FSSAI licensing process take?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Timelines vary depending on the license type (Basic, State, or Central), documentation readiness, and government approval requirements. We assist throughout the process to ensure smooth and timely completion.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Do you provide BIS certification support?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes. We provide complete guidance, documentation assistance, compliance support, factory audit preparation, and test coordinate processes for BIS certification requirements.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Can you assist packaged drinking water plants?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes. We help businesses plan the plant layouts, prepare documentation, coordinate approvals, and navigate end-to-end regulatory compliance procedures for water plants.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Do you work with businesses across India?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes. We provide consultancy support to businesses across all Indian states and union territories via remote coordination and direct on-site guidance.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Do you provide inspection preparation support?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes. We help businesses prepare for third-party audits, governmental inspections, and compliance verification processes with complete audit mock-runs and documentation audits.',
      },
    },
  ],
});
