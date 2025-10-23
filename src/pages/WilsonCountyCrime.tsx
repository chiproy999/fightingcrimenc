import SEOHead from "@/components/SEOHead";
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
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2 text-center">Wilson County Crime News</h1>
          <p className="text-center text-muted-foreground mb-8">
            Latest crime news and police reports for Wilson County, North Carolina
          </p>
          <RSSFeed feedUrl="https://rss.app/feeds/t16jD7t544Kyum81.xml" showViewAllButton={false} />
        </div>
      </main>
    </>
  );
}
