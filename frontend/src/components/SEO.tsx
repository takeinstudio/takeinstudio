import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterHandle?: string;
  faqSchema?: {
    question: string;
    answer: string;
  }[];
}

export default function SEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "/og-image.jpg",
  twitterHandle = "@takeinstudio",
  faqSchema,
}: SEOProps) {
  const siteName = "TakeIN Studio";
  const fullTitle = `${siteName} | ${title}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      {/* FAQ Schema */}
      {faqSchema && faqSchema.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqSchema.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
              },
            })),
          })}
        </script>
      )}

      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "TakeIN Studio",
          "url": "https://takeinstudio.com",
          "logo": "https://takeinstudio.com/logo/logo.png",
          "sameAs": [
            "https://twitter.com/takeinstudio",
            "https://www.linkedin.com/company/takeinstudio",
            "https://www.instagram.com/takein_studio"
          ],
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+91-8908233590",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": "en"
            },
            {
              "@type": "ContactPoint",
              "telephone": "+91-9124442040",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": "en"
            }
          ]
        })}
      </script>
    </Helmet>
  );
}
