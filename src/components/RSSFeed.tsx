import { Button } from "@/components/ui/button";
import { useRSSFeed } from "@/hooks/useRSSFeed";
import RSSCard from "./RSSCard";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const RSSFeed = () => {
  const { rssItems, loading, error, getCategoryColor, formatTimeAgo, refetch } = useRSSFeed();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">LATEST NC CRIME UPDATES</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time updates from law enforcement agencies across North Carolina. 
            Stay informed about crime news, wanted persons, and public safety alerts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {rssItems.map((item) => (
            <RSSCard 
              key={item.id}
              item={item}
              getCategoryColor={getCategoryColor}
              formatTimeAgo={formatTimeAgo}
            />
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="default" 
            size="lg" 
            className="bg-gradient-police hover:opacity-90 transition-opacity"
            aria-label="View all North Carolina crime news"
          >
            View All NC Crime News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RSSFeed;