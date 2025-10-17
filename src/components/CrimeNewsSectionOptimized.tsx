import { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, ExternalLink, TrendingUp, Users, Calendar } from "lucide-react";

// Enhanced crime news with better SEO and performance
const CrimeNewsSection = memo(() => {
  const crimeNews = [
    {
      id: "1",
      title: "Major Drug Trafficking Ring Dismantled in Charlotte Metro",
      excerpt: "Multi-agency operation leads to 23 arrests and seizure of $2.4M in narcotics across Mecklenburg and Gaston counties.",
      location: "Charlotte, NC",
      time: "2 hours ago",
      category: "Drug Crimes",
      severity: "high",
      readTime: "3 min read",
      viewCount: "1,247"
    },
    {
      id: "2", 
      title: "Armed Robbery Suspect Captured After Manhunt in Raleigh",
      excerpt: "Wake County Sheriff's Office apprehends suspect wanted in connection with three convenience store robberies.",
      location: "Raleigh, NC",
      time: "4 hours ago",
      category: "Violent Crime",
      severity: "high",
      readTime: "2 min read",
      viewCount: "892"
    },
    {
      id: "3",
      title: "Vehicle Theft Ring Targeting Luxury Cars in Greensboro",
      excerpt: "Guilford County police warn residents after spike in luxury vehicle thefts, including BMWs and Mercedes-Benz.",
      location: "Greensboro, NC",
      time: "6 hours ago", 
      category: "Property Crime",
      severity: "medium",
      readTime: "4 min read",
      viewCount: "634"
    },
    {
      id: "4",
      title: "Cybercrime Unit Busts Identity Theft Operation",
      excerpt: "State Bureau of Investigation arrests 8 individuals involved in sophisticated identity theft scheme affecting 500+ victims.",
      location: "Statewide, NC",
      time: "8 hours ago",
      category: "Cybercrime", 
      severity: "high",
      readTime: "5 min read",
      viewCount: "1,089"
    },
    {
      id: "5",
      title: "Highway Patrol Increases DUI Checkpoints for Holiday Weekend",
      excerpt: "NC State Highway Patrol announces enhanced enforcement measures across major highways during Memorial Day weekend.",
      location: "Statewide, NC",
      time: "12 hours ago",
      category: "Traffic Safety",
      severity: "low",
      readTime: "2 min read",
      viewCount: "456"
    },
    {
      id: "6",
      title: "Gang Violence Prevention Initiative Launched in Durham",
      excerpt: "Durham County implements new community-based program to reduce gang activity and support at-risk youth.",
      location: "Durham, NC", 
      time: "1 day ago",
      category: "Community Safety",
      severity: "medium",
      readTime: "6 min read",
      viewCount: "723"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary'; 
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'drug crimes': return '💊';
      case 'violent crime': return '⚠️';
      case 'property crime': return '🏠';
      case 'cybercrime': return '💻';
      case 'traffic safety': return '🚗';
      case 'community safety': return '🏘️';
      default: return '📰';
    }
  };

  return (
    <section className="py-16 bg-muted/30" id="crime-news">
      <div className="container mx-auto container-mobile">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            <TrendingUp className="mr-2 h-4 w-4" />
            Breaking News
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Latest North Carolina Crime News
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay informed with real-time crime reports, investigations, and safety alerts from across all 100 NC counties. 
            Updated continuously by our editorial team in partnership with local law enforcement.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {crimeNews.map((news) => (
            <Card 
              key={news.id} 
              className="hover:shadow-crime transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 h-full flex flex-col group cursor-pointer"
              role="article"
            >
              <CardHeader className="flex-shrink-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant={getSeverityColor(news.severity) as "default" | "destructive" | "outline" | "secondary"} className="text-xs">
                    {getCategoryIcon(news.category)} {news.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {news.viewCount} views
                  </div>
                </div>
                
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </CardTitle>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    <span>{news.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{news.location}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <CardDescription className="text-sm line-clamp-3 mb-4">
                  {news.excerpt}
                </CardDescription>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {news.readTime}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-3 text-xs hover:text-primary"
                    aria-label={`Read full story: ${news.title}`}
                  >
                    Read More
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-police hover:opacity-90 transition-opacity mb-4"
            aria-label="View all North Carolina crime news"
          >
            View All Crime News
          </Button>
          <p className="text-sm text-muted-foreground">
            Updated every 15 minutes • Last update: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </section>
  );
});

CrimeNewsSection.displayName = 'CrimeNewsSection';

export default CrimeNewsSection;