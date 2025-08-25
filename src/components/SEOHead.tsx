
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  schemaData?: object;
}

const SEOHead = ({
  title = "Fighting Crime NC - #1 North Carolina Crime News & Most Wanted Database",
  description = "Fighting Crime NC is North Carolina's premier crime news source. Get real-time NC crime alerts, wanted suspect information, missing persons updates, and anonymous tip reporting. Trusted by law enforcement and communities statewide.",
  keywords = "North Carolina crime news, NC wanted persons, NC public safety, North Carolina law enforcement, crime tips NC, wanted suspects North Carolina, NC sheriff department, crime prevention NC",
  ogImage = "/images/og-crime-fighting-nc.jpg",
  canonicalUrl,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor = "Fighting Crime NC Editorial Team",
  articleSection = "Crime News",
  schemaData
}: SEOHeadProps) => {
  // Robust schema data with error handling
  const safeStringify = (obj: object) => {
    try {
      return JSON.stringify(obj);
    } catch (error) {
      console.warn('Schema data serialization failed:', error);
      return '';
    }
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fightingcrimenc.com';
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : baseUrl);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fighting Crime NC",
    "url": baseUrl,
    "description": "North Carolina's premier crime news and public safety information resource"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fighting Crime NC",
    "url": baseUrl,
    "description": description
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={articleAuthor} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Fighting Crime NC" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific meta tags */}
      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1E40AF" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Fighting Crime NC" />
      
      {/* Geographic Meta Tags for NC */}
      <meta name="geo.region" content="US-NC" />
      <meta name="geo.placename" content="North Carolina" />
      
      {/* Schema.org JSON-LD with error handling */}
      {safeStringify(organizationSchema) && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeStringify(organizationSchema) }} />
      )}
      {safeStringify(websiteSchema) && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeStringify(websiteSchema) }} />
      )}
      {schemaData && safeStringify(schemaData) && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeStringify(schemaData) }} />
      )}
    </Helmet>
  );
};

export default SEOHead;
