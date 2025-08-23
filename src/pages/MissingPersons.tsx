import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Phone, Calendar, MapPin, Clock, Users } from "lucide-react";

const MissingPersons = () => {
  // Mock data - replace with real data from API
  const missingPersons = [
    {
      id: 1,
      name: "Sample Missing Person",
      age: 28,
      lastSeen: "Raleigh, NC",
      dateMissing: "2024-01-10",
      description: "This is sample data for demonstration purposes only.",
      circumstances: "Sample circumstances"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Missing Persons in North Carolina - Fighting Crime NC"
        description="Help find missing persons in North Carolina. View current missing person cases, share information, and assist in bringing loved ones home safely."
        keywords="NC missing persons, North Carolina missing people, missing person alerts, amber alerts NC, silver alerts NC, help find missing"
        canonicalUrl="/missing-persons"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "North Carolina Missing Persons",
          "description": "Database of missing persons in North Carolina",
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
                <div className="bg-gradient-police p-4 rounded-full shadow-evidence">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Missing Persons in North Carolina
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Every missing person case matters. Help us bring families back together by sharing information 
                about missing individuals in North Carolina. Your awareness could make the difference.
              </p>
              
              <Alert className="max-w-2xl mx-auto border-police-blue/50">
                <Heart className="h-4 w-4" />
                <AlertDescription className="text-police-blue font-medium">
                  If you have any information about a missing person, please contact local law enforcement 
                  or call the National Missing Persons Helpline immediately.
                </AlertDescription>
              </Alert>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card border border-police-blue/20 rounded-lg p-6 text-center">
                <Users className="h-8 w-8 text-police-blue mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">Active</h3>
                <p className="text-muted-foreground">Missing Person Cases</p>
              </div>
              <div className="bg-card border border-evidence-green/20 rounded-lg p-6 text-center">
                <Clock className="h-8 w-8 text-evidence-green mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">24/7</h3>
                <p className="text-muted-foreground">Search Coordination</p>
              </div>
              <div className="bg-card border border-warning-yellow/20 rounded-lg p-6 text-center">
                <Phone className="h-8 w-8 text-warning-yellow mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">Immediate</h3>
                <p className="text-muted-foreground">Alert System</p>
              </div>
            </div>
          </section>

          {/* Missing Persons Grid */}
          <section className="pb-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missingPersons.map((person) => (
                <Card key={person.id} className="border-police-blue/20 hover:shadow-evidence transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-foreground">{person.name}</CardTitle>
                      <Badge className="bg-warning-yellow text-warning-yellow-foreground">MISSING</Badge>
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
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Missing since: {person.dateMissing}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Description:</h4>
                        <p className="text-sm text-muted-foreground">{person.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Circumstances:</h4>
                        <p className="text-sm text-muted-foreground">{person.circumstances}</p>
                      </div>
                      
                      <Button className="w-full bg-gradient-police text-white hover:shadow-evidence">
                        <Phone className="h-4 w-4 mr-2" />
                        Report Sighting
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
                  Help Bring Someone Home
                </h2>
                <p className="text-muted-foreground mb-6">
                  Share missing person information on social media and with your community. 
                  Every share increases the chances of a safe return.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-police text-white hover:shadow-evidence">
                    <Phone className="h-5 w-5 mr-2" />
                    Report Information
                  </Button>
                  <Button size="lg" variant="outline" className="border-police-blue text-police-blue hover:bg-police-blue hover:text-white">
                    <Heart className="h-5 w-5 mr-2" />
                    Share Alert
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

export default MissingPersons;