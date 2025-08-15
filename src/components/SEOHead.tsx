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
  title = "Fighting Crime NC - Crime News & Who's Wanted in North Carolina",
  description = "Fighting Crime NC provides real-time crime news, wanted persons information, and community safety resources to keep North Carolina communities safe. Report tips anonymously.",
  keywords = "North Carolina crime news, NC wanted persons, NC public safety, North Carolina law enforcement, crime tips NC, wanted suspects North Carolina, NC sheriff department, crime prevention NC",
  ogImage = "https://fightingcrimenc.com/images/og-crime-fighting-nc.jpg",
  canonicalUrl = "https://fightingcrimenc.com",
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor = "Fighting Crime NC",
  articleSection = "Crime News",
  schemaData
}: SEOHeadProps) => {
  const defaultSchemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://fightingcrimenc.com/#organization",
        "name": "Fighting Crime NC",
        "url": "https://fightingcrimenc.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fightingcrimenc.com/images/logo.png",
          "width": 400,
          "height": 400
        },
        "description": "North Carolina's premier crime news and public safety information resource",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "NC",
          "addressCountry": "US"
        },
        "areaServed": {
          "@type": "State",
          "name": "North Carolina"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "911",
          "contactType": "emergency"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://fightingcrimenc.com/#website",
        "url": "https://fightingcrimenc.com",
        "name": "Fighting Crime NC",
        "description": description,
        "publisher": {
          "@id": "https://fightingcrimenc.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://fightingcrimenc.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://fightingcrimenc.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://fightingcrimenc.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Crime News",
            "item": "https://fightingcrimenc.com/crime-news"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Who's Wanted",
            "item": "https://fightingcrimenc.com/wanted"
          }
        ]
      }
    ]
  };

  const finalSchemaData = schemaData || defaultSchemaData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={articleAuthor} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
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
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:site" content="@FightingCrimeNC" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1E40AF" />
      <meta name="msapplication-TileColor" content="#1E40AF" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Fighting Crime NC" />
      
      {/* Geographic Meta Tags for NC */}
      <meta name="geo.region" content="US-NC" />
      <meta name="geo.placename" content="North Carolina" />
      <meta name="ICBM" content="35.7796, -78.6382" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchemaData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;