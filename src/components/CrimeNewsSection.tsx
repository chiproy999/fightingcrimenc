import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import crimeNewsBg from "@/assets/crime-news-bg.jpg";

const CrimeNewsSection = () => {
  const newsStories = [
    {
      title: "Multi-County Drug Ring Busted in Eastern NC",
      date: "December 15, 2024",
      category: "Drug Crime",
      description: "Federal and local authorities coordinated to arrest 12 individuals connected to a major drug trafficking operation spanning three counties.",
      urgent: true
    },
    {
      title: "Armed Robbery Suspect Captured After Week-Long Manhunt",
      date: "December 14, 2024", 
      category: "Violent Crime",
      description: "Suspect in series of convenience store robberies apprehended with help from community tips and surveillance footage.",
      urgent: false
    },
    {
      title: "Identity Theft Ring Targeting Senior Citizens",
      date: "December 13, 2024",
      category: "Financial Crime", 
      description: "Police warn residents about sophisticated phone scam targeting elderly residents' Social Security and banking information.",
      urgent: true
    },
    {
      title: "Burglary Suspects Arrested Following Investigation",
      date: "December 12, 2024",
      category: "Property Crime",
      description: "Two suspects charged in connection with residential break-ins across suburban neighborhoods.",
      urgent: false
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            FEATURED CRIME NEWS
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed about criminal activity and law enforcement actions in North Carolina communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {newsStories.map((story, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-evidence transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge 
                    variant={story.urgent ? "destructive" : "secondary"}
                    className={story.urgent ? "bg-emergency-red" : "bg-police-blue"}
                  >
                    {story.urgent ? "URGENT" : story.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{story.date}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {story.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {story.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-police-blue text-police-blue hover:bg-police-blue hover:text-white">
                  Read Full Story
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-police text-white hover:shadow-evidence px-8 py-4"
          >
            View All Crime News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CrimeNewsSection;