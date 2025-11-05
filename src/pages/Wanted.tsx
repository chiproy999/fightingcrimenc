import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Disclaimer from "@/components/Disclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Phone, AlertTriangle, Users, Calendar, MapPin } from "lucide-react";

const Wanted = () => {
  // Mock data - replace with real data from API
  const wantedPersons = [
    {
      id: 1,
      name: "Sample Person",
      age: 35,
      charges: ["Armed Robbery", "Breaking & Entering"],
      lastSeen: "Charlotte, NC",
      dateAdded: "2024-01-15",
      description: "This is sample data for demonstration purposes only.",
      reward: "$5,000"
    }
  ];

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
              
              {/* Disclaimer */}
              <div className="mt-4 max-w-2xl mx-auto">
                <Disclaimer variant="compact" />
              </div>
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
                <Phone className="h-8 w-8 text-police-blue mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">24/7</h3>
                <p className="text-muted-foreground">Tip Hotline</p>
              </div>
            </div>
          </section>

          {/* Wanted Persons Grid */}
          <section className="pb-12">
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
                      
                      <Button className="w-full bg-gradient-police text-white hover:shadow-evidence">
                        <Phone className="h-4 w-4 mr-2" />
                        Report Information
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-card border border-police-blue/20 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Have Information?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your tip could help solve a case and make our communities safer.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-police text-white hover:shadow-evidence">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Crime Stoppers
                  </Button>
                  <Button size="lg" variant="outline" className="border-police-blue text-police-blue hover:bg-police-blue hover:text-white">
                    Submit Anonymous Tip
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