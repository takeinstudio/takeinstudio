import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
  keywords?: string;
}

export default function SEO({ 
  title, 
  description, 
  name = "TakeIN Studio", 
  type = "website",
  url = "https://takeinstudio.com",
  image = "https://takeinstudio.com/logo/og-image.jpg",
  keywords = "web development, custom website design bhubaneswar, affordable web development agency, professional seo services bhubaneswar, UI/UX design, app development, digital agency, TakeIN Studio, takeinstudio, take in studio"
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content="@takeinstudio" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
