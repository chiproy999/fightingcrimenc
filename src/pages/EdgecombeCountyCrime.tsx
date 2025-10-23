import SEOHead from "@/components/SEOHead";
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
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2 text-center">Edgecombe County Crime News</h1>
          <p className="text-center text-muted-foreground mb-8">
            Latest crime news and police reports for Edgecombe County, North Carolina
          </p>
          <RSSFeed feedUrl="https://rss.app/feeds/tOQKMyt76roLN49z.xml" showViewAllButton={false} />
        </div>
      </main>
    </>
  );
}
