import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Shield, Phone, Map, FileText } from "lucide-react";
import { countyResourcesSorted } from "@/data/countyResources";

const SubmitTips = () => {
  const quickContacts = countyResourcesSorted.slice(0, 5);

  return (
    <>
      <SEOHead
        title="Report Crime Tips Safely - Fighting Crime NC"
        description="Learn how to report crime information directly to North Carolina law enforcement. Find official non-emergency numbers, online tip portals, and emergency guidance."
        keywords="report crime North Carolina, NC police tip line, non emergency number NC, county sheriff tips, law enforcement contact NC"
        canonicalUrl="/submit-tips"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Report Crime Tips Safely",
          "description": "Guidance for reporting crime tips directly to North Carolina law enforcement",
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

          <section className="py-8">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-police p-4 rounded-full shadow-evidence">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Report Crime Tips Safely
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fighting Crime NC does <strong className="text-foreground">not collect or store tips</strong>.
                Use the official non-emergency numbers and secure portals below to contact the correct authorities directly.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Badge variant="outline" className="border-emergency-red/50 text-emergency-red">
                  Emergency calls must go to 911
                </Badge>
                <Badge variant="outline" className="border-police-blue/50 text-police-blue">
                  Tips route to law enforcement only
                </Badge>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="emergency" size="lg" className="sm:w-auto">
                  <a href="tel:911" aria-label="Call 911">Call 911</a>
                </Button>
                <Button
                  asChild
                  variant="police"
                  size="lg"
                  className="sm:w-auto"
                >
                  <a href="/county-resources">Open County Tip Directory</a>
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-emergency-red/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Phone className="h-5 w-5 text-emergency-red" />
                    Emergency Response
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Dial <strong className="text-foreground">911</strong> for crimes in progress, threats to life, or urgent medical needs.</p>
                  <p>Provide exact locations, suspect descriptions, and any immediate risks while you remain on the line.</p>
                </CardContent>
              </Card>

              <Card className="border-police-blue/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Map className="h-5 w-5 text-police-blue" />
                    County Tip Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Use our <strong className="text-foreground">County Tip Directory</strong> to find verified online forms and non-emergency numbers for North Carolina's largest counties.</p>
                  <p>Every link points to an official municipal or county agency portal.</p>
                </CardContent>
              </Card>

              <Card className="border-evidence-green/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-evidence-green" />
                    Prepare Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>When you call or submit a form, share details such as dates, times, locations, vehicle descriptions, and any known associates.</p>
                  <p>Include your contact information only if you are willing to speak with investigators.</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Access Non-Emergency Contacts</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                These are the five most-populated counties in North Carolina. Call the listed number or use the linked portal to send tips directly to the responsible agency.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {quickContacts.map((county) => (
                  <Card key={county.name} className="border-police-blue/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-foreground">
                        {county.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Non-Emergency:</span>
                        <a
                          className="text-police-blue hover:underline"
                          href={`tel:${county.nonEmergency.phone.replace(/[^0-9]/g, "")}`}
                        >
                          {county.nonEmergency.phone} — {county.nonEmergency.agency}
                        </a>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-police-blue/40 hover:bg-police-blue/10"
                      >
                        <a href={county.tipWebsite.url} target="_blank" rel="noopener noreferrer">
                          Visit Tip Portal
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Alert className="mt-12 border-warning-yellow/40">
              <AlertDescription className="text-sm text-muted-foreground">
                Fighting Crime NC is an information resource. All crime reports and investigative follow-ups are handled solely by the official law enforcement agencies listed above.
              </AlertDescription>
            </Alert>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SubmitTips;
