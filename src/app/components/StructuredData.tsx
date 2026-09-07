import { BOOKING_URL, site } from '../lib/site';

/**
 * Schema.org markup describing the condo, so search engines can treat it as a
 * lodging listing rather than an unclassified page.
 *
 * Everything here is claimed elsewhere on the site: the guest maximum comes
 * from the house rules, the pool count from the "2 + 5 + 2" section. Nothing
 * is asserted that a guest could arrive and find untrue.
 */
export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: site.fullName,
    description: site.description,
    url: site.url,
    image: new URL('/og-image.jpg', site.url).toString(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1700 N Ocean Blvd, Unit 252',
      addressLocality: 'Myrtle Beach',
      addressRegion: 'SC',
      postalCode: '29577',
      addressCountry: 'US',
    },
    containsPlace: {
      '@type': 'Accommodation',
      numberOfBedrooms: 2,
      occupancy: { '@type': 'QuantitativeValue', maxValue: 6 },
      amenityFeature: [
        'Oceanfront',
        'Two balconies with ocean views',
        'Indoor pool',
        'Lazy river',
        'Jacuzzi',
        "Children's pool",
        'Beach access',
      ].map((name) => ({
        '@type': 'LocationFeatureSpecification',
        name,
        value: true,
      })),
    },
    petsAllowed: false,
    smokingAllowed: false,
    potentialAction: {
      '@type': 'ReserveAction',
      target: BOOKING_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      // The object is ours, not user input; escaping < guards against a stray
      // closing tag ending the script block early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
