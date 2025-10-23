import SEOHead from "@/components/SEOHead";
import StructuredData from "@/lib/structuredData";
import RSSFeed from "@/components/RSSFeed";

export default function NashCountyCrime() {
  return (
    <>
      <SEOHead
        title="Nash County NC Crime News | Fighting Crime NC"
        description="Latest crime news and police reports for Nash County, North Carolina. Updated daily from local sources."
        canonicalUrl="/nash-county"
        keywords="Nash County crime, Nash County police, North Carolina crime news"
      />
      <StructuredData
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Nash County Crime News",
          "description": "Latest crime news for Nash County, NC.",
          "publisher": { "@type": "Organization", "name": "Fighting Crime NC" }
        }}
      />
      <main>
        <h2>Nash County Crime News</h2>
        <RSSFeed feedUrl="https://rss.app/feeds/t96LtdAzAj7QgM23.xml" />
        {/* Add NAP if available */}
      </main>
    </>
  );
}
