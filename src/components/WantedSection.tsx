import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import wantedImage from "@/assets/wanted-section.jpg";

const WantedSection = () => {
  const wantedPersons = [
    {
      name: "Michael Johnson",
      age: 34,
      charges: "Armed Robbery, Assault with Deadly Weapon",
      lastSeen: "Raleigh, NC",
      reward: "$5,000",
      dangerous: true,
      description: "6'2\", 180 lbs, Brown hair, Brown eyes. Last seen driving a blue sedan."
    },
    {
      name: "Sarah Martinez",
      age: 28,
      charges: "Grand Theft Auto, Drug Trafficking",
      lastSeen: "Charlotte, NC",
      reward: "$3,000",
      dangerous: false,
      description: "5'6\", 140 lbs, Black hair, Green eyes. Known to frequent downtown area."
    },
    {
      name: "Robert Davis",
      age: 41,
      charges: "Burglary, Probation Violation",
      lastSeen: "Greensboro, NC",
      reward: "$2,500",
      dangerous: false,
      description: "5'10\", 200 lbs, Bald, Blue eyes. Has distinctive tattoo on left arm."
    },
    {
      name: "Ashley Brown",
      age: 26,
      charges: "Identity Theft, Fraud",
      lastSeen: "Durham, NC",
      reward: "$1,500",
      dangerous: false,
      description: "5'4\", 125 lbs, Blonde hair, Blue eyes. May be using false identification."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            WHO'S <span className="text-emergency-red">WANTED</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us locate these individuals. If you have information, contact authorities immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {wantedPersons.map((person, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-crime transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-4xl text-muted-foreground">?</span>
                </div>
                <div className="flex justify-center mb-2">
                  <Badge 
                    variant={person.dangerous ? "destructive" : "secondary"}
                    className={person.dangerous ? "bg-emergency-red" : "bg-warning-yellow text-black"}
                  >
                    {person.dangerous ? "ARMED & DANGEROUS" : "WANTED"}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-emergency-red transition-colors">
                  {person.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  Age: {person.age} • Last seen: {person.lastSeen}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-emergency-red mb-1">Charges:</h4>
                  <p className="text-sm text-muted-foreground">{person.charges}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-evidence-green mb-1">Reward: {person.reward}</h4>
                  <p className="text-xs text-muted-foreground">{person.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-emergency-red text-emergency-red hover:bg-emergency-red hover:text-white"
                >
                  Report Sighting
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card p-8 rounded-lg border border-emergency-red/30 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            See Someone on This List?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Do not approach. Call 911 immediately or submit an anonymous tip. 
            Your information could help bring justice and keep our communities safe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-danger text-white hover:shadow-crime px-8 py-4"
            >
              Call 911 Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-police-blue text-police-blue hover:bg-police-blue hover:text-white px-8 py-4"
            >
              Submit Anonymous Tip
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WantedSection;