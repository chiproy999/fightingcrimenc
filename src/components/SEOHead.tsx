
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
  keywords = "North Carolina crime news, NC crime, NC wanted persons, NC most wanted, NC arrests, NC sheriff, Wake County crime, Mecklenburg County crime, Durham County crime, Guilford County crime, Forsyth County crime, Cumberland County crime, Buncombe County crime, New Hanover County crime, Charlotte crime news, Raleigh crime news, Greensboro crime news, Durham crime news, Winston-Salem crime, Fayetteville crime, Asheville crime, Wilmington crime, NC missing persons, NC amber alert, NC silver alert, NC public safety, North Carolina law enforcement, crime tips NC, wanted suspects North Carolina, NC sheriff department, crime prevention NC, NC drug arrests, NC DUI arrests, NC gang crime, NC highway patrol, NC state police",
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

  // In development, keep the browser tab/omnibox title blank to avoid confusion
  // with unrelated feature work (e.g., Gmail/Facebook automation flows).
  // In production builds, use the provided SEO title as usual.
  const effectiveTitle = import.meta.env?.DEV ? '' : title;

  // Import structured data from helper (inline to avoid import issues)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fighting Crime NC",
    "alternateName": "FCNC",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "North Carolina's premier crime news and public safety information resource",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "NC",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "State",
      "name": "North Carolina"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fighting Crime NC",
    "url": baseUrl,
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{effectiveTitle}</title>
      <meta name="title" content={effectiveTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={articleAuthor} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={effectiveTitle} />
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
      <meta property="twitter:title" content={effectiveTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1E40AF" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Fighting Crime NC" />
      
      {/* Geographic Meta Tags for NC */}
      <meta name="geo.region" content="US-NC" />
      <meta name="geo.placename" content="North Carolina" />
      
      {/* Content Security Policy - Relaxed for development, tighten in production */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https: wss:; frame-src 'self' https:;" />
      
      {/* Permissions Policy */}
      <meta httpEquiv="Permissions-Policy" content="ambient-light-sensor=(), battery=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=*, geolocation=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(self), usb=(), web-share=(), xr-spatial-tracking=()" />
      
      {/* Schema.org JSON-LD with CSP-safe handling */}
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
