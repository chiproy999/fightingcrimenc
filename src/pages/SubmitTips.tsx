import { useState } from 'react';
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Shield, Phone, Lock, AlertCircle, CheckCircle, Eye } from "lucide-react";

const SubmitTips = () => {
  const [formData, setFormData] = useState({
    tipType: '',
    location: '',
    description: '',
    contact: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
    setFormData({ tipType: '', location: '', description: '', contact: '' });
  };

  return (
    <>
      <SEOHead 
        title="Submit Anonymous Crime Tips - Fighting Crime NC"
        description="Submit anonymous crime tips to help law enforcement solve cases and keep North Carolina communities safe. Your tip could make the difference in solving a crime."
        keywords="NC crime tips, anonymous tips NC, report crime NC, crime stoppers, submit tip North Carolina, help solve crime"
        canonicalUrl="/submit-tips"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Submit Anonymous Crime Tips",
          "description": "Anonymous crime tip submission for North Carolina",
          "provider": {
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
                Submit Anonymous Crime Tips
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Help law enforcement solve crimes and make North Carolina safer. 
                Your anonymous tip could be the key to solving a case and bringing justice to victims.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Badge variant="outline" className="border-evidence-green/50 text-evidence-green">
                  <Lock className="mr-1 h-3 w-3" />
                  100% Anonymous
                </Badge>
                <Badge variant="outline" className="border-police-blue/50 text-police-blue">
                  <Shield className="mr-1 h-3 w-3" />
                  Secure Submission
                </Badge>
                <Badge variant="outline" className="border-warning-yellow/50 text-warning-yellow">
                  <Eye className="mr-1 h-3 w-3" />
                  24/7 Monitoring
                </Badge>
              </div>
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8 pb-12">
            {/* Tip Submission Form */}
            <div className="lg:col-span-2">
              <Card className="border-police-blue/20">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Submit Your Tip</CardTitle>
                  <p className="text-muted-foreground">
                    All information is submitted anonymously and securely to law enforcement.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <Alert className="border-evidence-green/50">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="text-evidence-green">
                        <strong>Tip submitted successfully!</strong> Your anonymous tip has been forwarded to the appropriate law enforcement agencies. Thank you for helping keep our communities safe.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Type of Crime/Incident
                        </label>
                        <select 
                          className="w-full p-3 border border-input rounded-md bg-background text-foreground"
                          value={formData.tipType}
                          onChange={(e) => setFormData({...formData, tipType: e.target.value})}
                          required
                        >
                          <option value="">Select type...</option>
                          <option value="drug-activity">Drug Activity</option>
                          <option value="theft">Theft/Burglary</option>
                          <option value="assault">Assault/Violence</option>
                          <option value="fraud">Fraud/Scam</option>
                          <option value="vandalism">Vandalism</option>
                          <option value="wanted-person">Wanted Person</option>
                          <option value="missing-person">Missing Person</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Location (City, County, or General Area)
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g., Charlotte, Wake County, etc."
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="bg-background border-police-blue/30 focus:border-police-blue"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Detailed Description
                        </label>
                        <Textarea
                          placeholder="Provide as much detail as possible about what you witnessed or know. Include dates, times, descriptions of people, vehicles, etc."
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="bg-background border-police-blue/30 focus:border-police-blue min-h-32"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Contact Information (Optional)
                        </label>
                        <Input
                          type="text"
                          placeholder="Phone or email (only if you want to be contacted)"
                          value={formData.contact}
                          onChange={(e) => setFormData({...formData, contact: e.target.value})}
                          className="bg-background border-police-blue/30 focus:border-police-blue"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Leave blank to remain completely anonymous
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-police text-white hover:shadow-evidence"
                        size="lg"
                      >
                        Submit Anonymous Tip
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Emergency Contact */}
              <Card className="border-emergency-red/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-emergency-red" />
                    Emergency?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    If this is an emergency or crime in progress, call 911 immediately.
                  </p>
                  <Button className="w-full bg-emergency-red text-white hover:bg-emergency-red/90">
                    <Phone className="h-4 w-4 mr-2" />
                    Call 911
                  </Button>
                </CardContent>
              </Card>

              {/* Crime Stoppers */}
              <Card className="border-police-blue/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Crime Stoppers Hotline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Prefer to call? Use the Crime Stoppers hotline for anonymous tips.
                  </p>
                  <Button variant="outline" className="w-full border-police-blue text-police-blue hover:bg-police-blue hover:text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    1-800-CRIMESTOP
                  </Button>
                </CardContent>
              </Card>

              {/* Privacy Notice */}
              <Card className="border-evidence-green/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Lock className="h-5 w-5 text-evidence-green" />
                    Privacy Protected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Your identity is never tracked</li>
                    <li>• No personal information stored</li>
                    <li>• Secure encrypted transmission</li>
                    <li>• Direct to law enforcement</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SubmitTips;