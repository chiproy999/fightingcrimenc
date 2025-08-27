import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, MapPin } from "lucide-react";
import { RSSItem } from "@/hooks/useRSSFeed";

interface RSSCardProps {
  item: RSSItem;
  getCategoryColor: (category: string) => string;
  formatTimeAgo: (dateString: string) => string;
}

const RSSCard = ({ item, getCategoryColor, formatTimeAgo }: RSSCardProps) => {
  const handleReadMore = () => {
    // Open external link in new tab with security attributes
    window.open(item.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="hover:shadow-crime transition-all duration-300 bg-card/50 backdrop-blur-sm h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex flex-wrap gap-2 mb-2">
          {item.category && (
            <Badge variant={getCategoryColor(item.category) as any} className="text-xs">
              {item.category}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {item.source}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight hover:text-primary transition-colors line-clamp-2">
          {item.title}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{formatTimeAgo(item.pubDate)}</span>
          </div>
          {item.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-sm line-clamp-3">
          {item.description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="flex-shrink-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full sm:w-auto"
          onClick={handleReadMore}
          aria-label={`Read full story: ${item.title}`}
        >
          Read Full Story
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RSSCard;