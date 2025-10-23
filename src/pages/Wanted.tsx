import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Phone, AlertTriangle, Users, Calendar, MapPin } from "lucide-react";

const Wanted = () => {
  const navigate = useNavigate();

  const handleReportClick = (personName: string) => {
    toast.info("Opening official tip resources...", {
      description: `Use the County Tip Directory to report information about ${personName}.`
    });
    setTimeout(() => navigate('/county-resources'), 800);
  };

  // Real data will come from database/API
  const wantedPersons: Array<{
    id: number;
    name: string;
    age: number;
    charges: string[];
    lastSeen: string;
    dateAdded: string;
    description: string;
    reward?: string;
  }> = [];

  const hasData = wantedPersons.length > 0;

  return (
    <>
      <SEOHead 
        title="North Carolina Most Wanted Persons - Fighting Crime NC"
        description="View North Carolina's most wanted fugitives and suspects. Help law enforcement by reporting information on wanted persons. Updated daily with new suspects and captures."
        keywords="NC most wanted, North Carolina fugitives, wanted persons NC, criminal suspects, law enforcement assistance, crime stoppers NC"
        canonicalUrl="/wanted"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "North Carolina Most Wanted",
          "description": "Database of most wanted persons in North Carolina",
          "publisher": {
            "@type": "Organization",
            "name": "Fighting Crime NC"
          }
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto container-mobile">
          <Breadcrumbs />
          
          {/* Hero Section */}
          <section className="py-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-danger p-4 rounded-full shadow-evidence">
                  <Search className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                North Carolina Most Wanted
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Help law enforcement capture dangerous fugitives. If you have information about any of these individuals, 
                contact authorities immediately. Do not approach these suspects.
              </p>
              
              <Alert className="max-w-2xl mx-auto border-emergency-red/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-emergency-red font-medium">
                  <strong>Warning:</strong> These individuals may be armed and dangerous. 
                  Do not attempt to apprehend. Call 911 immediately if spotted.
                </AlertDescription>
              </Alert>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card border border-emergency-red/20 rounded-lg p-6 text-center">
                <Users className="h-8 w-8 text-emergency-red mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">Active</h3>
                <p className="text-muted-foreground">Wanted Persons</p>
              </div>
              <div className="bg-card border border-evidence-green/20 rounded-lg p-6 text-center">
                <Calendar className="h-8 w-8 text-evidence-green mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">Daily</h3>
                <p className="text-muted-foreground">Database Updates</p>
              </div>
              <div className="bg-card border border-police-blue/20 rounded-lg p-6 text-center">
                <MapPin className="h-8 w-8 text-police-blue mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">Official Contacts</h3>
                <p className="text-muted-foreground">County Tip Directory</p>
              </div>
            </div>
          </section>

          {/* Wanted Persons Grid */}
          <section className="pb-12">
            {!hasData ? (
              <Card className="border-police-blue/20">
                <CardContent className="pt-8 pb-8 text-center">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Wanted Persons Database
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    The NC wanted persons database is being updated with real-time information from law enforcement agencies across all 100 North Carolina counties.
                  </p>
                  <Button
                    className="bg-gradient-police text-white hover:shadow-evidence"
                    onClick={() => navigate('/county-resources')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Tip Resources
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wantedPersons.map((person) => (
                <Card key={person.id} className="border-emergency-red/20 hover:shadow-evidence transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-foreground">{person.name}</CardTitle>
                      <Badge variant="destructive">WANTED</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Age: {person.age}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Last seen: {person.lastSeen}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Charges:</h4>
                        <div className="flex flex-wrap gap-1">
                          {person.charges.map((charge, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {charge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {person.reward && (
                        <div className="bg-warning-yellow/10 border border-warning-yellow/30 rounded p-3">
                          <p className="text-sm font-semibold text-warning-yellow">
                            Reward: {person.reward}
                          </p>
                        </div>
                      )}
                      
                      <p className="text-sm text-muted-foreground">{person.description}</p>
                      
                      <Button
                        className="w-full bg-gradient-police text-white hover:shadow-evidence"
                        onClick={() => handleReportClick(person.name)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Report Information
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                ))}
              </div>
            )}
            
            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-card border border-police-blue/20 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Have Information?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Contact law enforcement directly using emergency services or verified county resources.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    variant="emergency"
                    size="lg"
                    className="sm:w-auto"
                  >
                    <a href="tel:911" aria-label="Call 911">
                      <Phone className="h-5 w-5 mr-2" />
                      Call 911
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="police"
                    className="sm:w-auto"
                    onClick={() => navigate('/county-resources')}
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    County Tip Directory
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Wanted;