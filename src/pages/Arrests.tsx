import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Disclaimer from "@/components/Disclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Calendar, MapPin, Users, AlertTriangle, FileText, User } from "lucide-react";

const Arrests = () => {
  const navigate = useNavigate();

  // Real data will come from database/API
  const recentArrests: Array<{
    id: number;
    name: string;
    age: number;
    charges: string[];
    arrestDate: string;
    location: string;
    agency: string;
    description: string;
  }> = [];

  const hasData = recentArrests.length > 0;

  return (
    <>
      <SEOHead 
        title="Recent Arrests in North Carolina - Fighting Crime NC"
        description="View recent arrests and booking information from across North Carolina. Stay informed about law enforcement activities and public safety updates."
        keywords="NC arrests, North Carolina arrests, recent arrests, booking information, law enforcement arrests, NC police arrests"
        canonicalUrl="/arrests"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "North Carolina Recent Arrests",
          "description": "Database of recent arrests in North Carolina",
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
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Recent Arrests in North Carolina
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Stay informed about recent arrests and booking information from law enforcement agencies 
                across all 100 North Carolina counties. All information is sourced from official public records.
              </p>
              
              <Alert className="max-w-2xl mx-auto border-police-blue/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> All individuals are presumed innocent until 
                  proven guilty in a court of law. Arrest information is public record and does not indicate guilt.
                </AlertDescription>
              </Alert>
              
              {/* Disclaimer */}
              <div className="mt-4 max-w-2xl mx-auto">
                <Disclaimer variant="compact" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card border border-police-blue/20 rounded-lg p-6 text-center">
                <Users className="h-8 w-8 text-police-blue mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">Daily</h3>
                <p className="text-muted-foreground">Arrest Updates</p>
              </div>
              <div className="bg-card border border-evidence-green/20 rounded-lg p-6 text-center">
                <FileText className="h-8 w-8 text-evidence-green mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">Public</h3>
                <p className="text-muted-foreground">Records Source</p>
              </div>
              <div className="bg-card border border-warning-yellow/20 rounded-lg p-6 text-center">
                <Calendar className="h-8 w-8 text-warning-yellow mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">100</h3>
                <p className="text-muted-foreground">NC Counties</p>
              </div>
            </div>
          </section>

          {/* Arrests Grid */}
          <section className="pb-12">
            {!hasData ? (
              <Card className="border-police-blue/20">
                <CardContent className="pt-8 pb-8 text-center">
                  <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Recent Arrests Database
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    The NC arrests database is being updated with real-time information from law enforcement 
                    agencies and public records across all 100 North Carolina counties. Check back for daily updates.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      className="bg-gradient-police text-white hover:shadow-evidence"
                      onClick={() => navigate('/crime-news')}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Crime News
                    </Button>
                    <Button
                      variant="outline"
                      className="border-police-blue text-police-blue hover:bg-police-blue hover:text-white"
                      onClick={() => navigate('/wanted')}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      View Wanted
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentArrests.map((arrest) => (
                <Card key={arrest.id} className="border-police-blue/20 hover:shadow-evidence transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-foreground">{arrest.name}</CardTitle>
                      <Badge variant="outline" className="border-police-blue text-police-blue">
                        ARRESTED
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Age: {arrest.age}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Arrest Date: {arrest.arrestDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {arrest.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        {arrest.agency}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Charges:</h4>
                        <div className="flex flex-wrap gap-1">
                          {arrest.charges.map((charge, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {charge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{arrest.description}</p>
                      
                      <Alert className="border-warning-yellow/50 bg-warning-yellow/5">
                        <AlertTriangle className="h-4 w-4 text-warning-yellow" />
                        <AlertDescription className="text-xs text-muted-foreground">
                          All individuals are presumed innocent until proven guilty in a court of law.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
                ))}
              </div>
            )}
            
            {/* Information Notice */}
            <div className="mt-12">
              <Card className="border-police-blue/20">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-police-blue" />
                    About Arrest Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>
                    All arrest information displayed on this website is sourced from public records and official 
                    law enforcement releases. This information is provided for informational purposes only and 
                    does not indicate guilt or innocence.
                  </p>
                  <p>
                    <strong className="text-foreground">Important:</strong> All individuals are presumed innocent 
                    until proven guilty in a court of law. The charges listed are allegations, and the accused 
                    are entitled to a fair trial.
                  </p>
                  <p>
                    If you have information about a crime or want to report suspicious activity, please{' '}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-police-blue hover:underline"
                      onClick={() => navigate('/submit-tips')}
                    >
                      submit an anonymous tip
                    </Button>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Arrests;

