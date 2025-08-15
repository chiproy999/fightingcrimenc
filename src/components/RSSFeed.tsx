import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, MapPin } from "lucide-react";

interface RSSItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
  location?: string;
  source: string;
}

const RSSFeed = () => {
  const [rssItems, setRssItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock RSS data for demonstration - replace with actual RSS parser
  const mockRSSData: RSSItem[] = [
    {
      id: "1",
      title: "Breaking: Multi-County Drug Bust Nets 15 Arrests in Western NC",
      description: "A coordinated operation between multiple law enforcement agencies resulted in significant drug seizures and arrests across Buncombe and Henderson counties.",
      link: "https://ncfightingcrime.com/news/drug-bust-western-nc",
      pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      category: "Drug Crimes",
      location: "Buncombe County, NC",
      source: "NC Fighting Crime"
    },
    {
      id: "2",
      title: "Wanted: Armed Robbery Suspect from Charlotte Area",
      description: "Mecklenburg County Sheriff's Office seeks public assistance in locating suspect connected to multiple armed robberies.",
      link: "https://ncfightingcrime.com/wanted/charlotte-robbery-suspect",
      pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      category: "Wanted",
      location: "Charlotte, NC",
      source: "Mecklenburg County SO"
    },
    {
      id: "3",
      title: "Highway Patrol Increases Presence During Holiday Travel",
      description: "North Carolina State Highway Patrol announces enhanced enforcement measures for upcoming holiday weekend.",
      link: "https://ncfightingcrime.com/news/highway-patrol-holiday",
      pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      category: "Traffic Safety",
      location: "Statewide, NC",
      source: "NC State Highway Patrol"
    },
    {
      id: "4",
      title: "Missing Person Alert: Elderly Man from Raleigh",
      description: "Silver Alert issued for 72-year-old man missing from Raleigh. Last seen driving white Toyota Camry.",
      link: "https://ncfightingcrime.com/missing/raleigh-elderly",
      pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      category: "Missing Person",
      location: "Raleigh, NC",
      source: "Raleigh PD"
    }
  ];

  useEffect(() => {
    // Simulate RSS feed fetch
    const fetchRSSData = async () => {
      try {
        setLoading(true);
        // In production, implement actual RSS parsing here
        // const response = await fetch('/api/rss-proxy?url=https://ncfightingcrime.com/rss');
        // const rssData = await response.json();
        
        // For now, use mock data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        setRssItems(mockRSSData);
      } catch (err) {
        setError('Failed to load RSS feed');
        console.error('RSS fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRSSData();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'wanted':
        return 'destructive';
      case 'drug crimes':
        return 'secondary';
      case 'missing person':
        return 'outline';
      case 'traffic safety':
        return 'default';
      default:
        return 'outline';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Less than 1 hour ago';
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Loading Latest Updates...</h2>
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-card h-48 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-destructive">RSS Feed Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </section>
    );
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
            <Card key={item.id} className="hover:shadow-crime transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.category && (
                    <Badge variant={getCategoryColor(item.category)} className="text-xs">
                      {item.category}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {item.source}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(item.pubDate)}
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full sm:w-auto"
                  onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
                >
                  Read Full Story
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="default" size="lg" className="bg-gradient-police">
            View All NC Crime News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RSSFeed;