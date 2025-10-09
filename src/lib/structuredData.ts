/**
 * Structured Data (JSON-LD) Schema Generators for SEO
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ArticleData {
  headline: string;
  description: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  section?: string;
}

/**
 * Generate Organization Schema
 */
export const getOrganizationSchema = (baseUrl: string) => ({
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
  },
  "sameAs": [
    // Add social media links when available
  ]
});

/**
 * Generate WebSite Schema with Search Action
 */
export const getWebSiteSchema = (baseUrl: string, description: string) => ({
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
});

/**
 * Generate BreadcrumbList Schema
 */
export const getBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[], baseUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
  }))
});

/**
 * Generate NewsArticle Schema
 */
export const getNewsArticleSchema = (article: ArticleData, baseUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": article.headline,
  "description": article.description,
  "image": article.image || `${baseUrl}/images/og-crime-fighting-nc.jpg`,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "author": {
    "@type": "Organization",
    "name": article.author || "Fighting Crime NC Editorial Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Fighting Crime NC",
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`
    }
  },
  "url": article.url.startsWith('http') ? article.url : `${baseUrl}${article.url}`,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url.startsWith('http') ? article.url : `${baseUrl}${article.url}`
  },
  "articleSection": article.section || "Crime News",
  "inLanguage": "en-US",
  "isAccessibleForFree": true
});

/**
 * Generate NewsMediaOrganization Schema
 */
export const getNewsMediaOrganizationSchema = (baseUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "name": "Fighting Crime NC",
  "url": baseUrl,
  "logo": `${baseUrl}/logo.png`,
  "description": "North Carolina's premier source for crime news and public safety information",
  "sameAs": [],
  "ethicsPolicy": `${baseUrl}/policy`,
  "masthead": baseUrl,
  "foundingDate": "2024",
  "areaServed": {
    "@type": "State",
    "name": "North Carolina"
  }
});

/**
 * Generate CollectionPage Schema for listing pages
 */
export const getCollectionPageSchema = (
  title: string,
  description: string,
  url: string,
  baseUrl: string
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": title,
  "description": description,
  "url": url.startsWith('http') ? url : `${baseUrl}${url}`,
  "isPartOf": {
    "@type": "WebSite",
    "name": "Fighting Crime NC",
    "url": baseUrl
  },
  "about": {
    "@type": "Thing",
    "name": "Crime News"
  }
});

/**
 * Generate ItemList Schema for RSS feed items
 */
export const getItemListSchema = (
  items: Array<{ title: string; url: string; description: string }>,
  baseUrl: string
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "url": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    "name": item.title,
    "description": item.description
  }))
});
