import SEOHead from "@/components/SEOHead";
import StructuredData from "@/lib/structuredData";
import RSSFeed from "@/components/RSSFeed";

export default function EdgecombeCountyCrime() {
  return (
    <>
      <SEOHead
        title="Edgecombe County NC Crime News | Fighting Crime NC"
        description="Latest crime news and police reports for Edgecombe County, North Carolina. Updated daily from local sources."
        canonicalUrl="/edgecombe-county"
        keywords="Edgecombe County crime, Edgecombe County police, North Carolina crime news"
      />
      <StructuredData
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Edgecombe County Crime News",
          "description": "Latest crime news for Edgecombe County, NC.",
          "publisher": { "@type": "Organization", "name": "Fighting Crime NC" }
        }}
      />
      <main>
        <h2>Edgecombe County Crime News</h2>
        <RSSFeed feedUrl="https://rss.app/feeds/tOQKMyt76roLN49z.xml" />
        {/* Add NAP if available */}
      </main>
    </>
  );
}
