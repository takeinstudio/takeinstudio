import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

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
  keywords = "web development, custom website design bhubaneswar, affordable web development agency, professional seo services bhubaneswar, UI/UX design, app development, digital agency, TakeIN Studio, TAKEINSTUDIO, takeinstudio, takein studio, Takein studio, Takeinstudio"
}: SEOProps) {
  const location = useLocation();
  const currentUrl = url !== "https://takeinstudio.com" 
    ? url 
    : `https://takeinstudio.com${location.pathname === '/' ? '' : location.pathname}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content="@takeinstudio" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
