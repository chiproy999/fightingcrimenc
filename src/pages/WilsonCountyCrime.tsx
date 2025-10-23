import SEOHead from "@/components/SEOHead";
import StructuredData from "@/lib/structuredData";
import RSSFeed from "@/components/RSSFeed";

export default function WilsonCountyCrime() {
  return (
    <>
      <SEOHead
        title="Wilson County NC Crime News | Fighting Crime NC"
        description="Latest crime news and police reports for Wilson County, North Carolina. Updated daily from local sources."
        canonicalUrl="/wilson-county"
        keywords="Wilson County crime, Wilson County police, North Carolina crime news"
      />
      <StructuredData
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Wilson County Crime News",
          "description": "Latest crime news for Wilson County, NC.",
          "publisher": { "@type": "Organization", "name": "Fighting Crime NC" }
        }}
      />
      <main>
        <h2>Wilson County Crime News</h2>
        <RSSFeed feedUrl="https://rss.app/feeds/t16jD7t544Kyum81.xml" />
        {/* Add NAP if available */}
      </main>
    </>
  );
}
