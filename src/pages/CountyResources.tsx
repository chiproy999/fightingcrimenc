import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, ExternalLink, ShieldAlert } from "lucide-react";
import { countyResourcesSorted } from "@/data/countyResources";

const CountyResources = () => {
  return (
    <>
      <SEOHead
        title="North Carolina County Tip Directory - Official Crime Reporting"
        description="Find verified non-emergency phone numbers and online tip submission links for North Carolina's most populated counties. Connect directly with law enforcement across the state."
        keywords="North Carolina county police tips, NC non emergency numbers, report crime NC, county sheriff tip line, law enforcement directory North Carolina"
        canonicalUrl="/county-resources"
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto container-mobile">
          <Breadcrumbs />

          <section className="py-10">
            <div className="bg-card/70 backdrop-blur-md border border-police-blue/30 rounded-xl p-8 shadow-evidence text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-police p-4 rounded-full shadow-evidence">
                  <ShieldAlert className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Connect with Official NC Law Enforcement Channels
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Use the trusted non-emergency numbers and secure online portals below to send tips straight to investigators
                in North Carolina's most populated counties. For emergencies or crimes in progress, call <strong className="text-emergency-red">911</strong> immediately.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="emergency" size="lg" className="sm:w-auto">
                  <a href="tel:911" aria-label="Call 911">Call 911</a>
                </Button>
                <Button
                  variant="police"
                  size="lg"
                  className="sm:w-auto"
                  asChild
                >
                  <a href="#county-directory">Skip to County Directory</a>
                </Button>
              </div>
            </div>
          </section>

          <section id="county-directory" className="pb-16">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                County Tip Directory
              </h2>
              <p className="text-muted-foreground max-w-3xl">
                Each entry includes the official government-run tip portal and the primary non-emergency number for the agency serving that county's largest population center.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {countyResourcesSorted.map((county) => (
                <Card key={county.name} className="border-police-blue/20 hover:border-police-blue/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-xl text-foreground">
                          {county.populationRank}. {county.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Estimated population: {county.populationEstimate}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm uppercase tracking-wide text-muted-foreground mb-1">Online Tip Portal</p>
                      <Button
                        asChild
                        variant="police"
                        className="w-full md:w-auto"
                        aria-label={`Submit a crime tip for ${county.name}`}
                      >
                        <a href={county.tipWebsite.url} target="_blank" rel="noopener noreferrer">
                          {county.tipWebsite.label}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm uppercase tracking-wide text-muted-foreground">Non-Emergency Number</p>
                      <Button
                        asChild
                        variant="outline"
                        className="justify-start text-left w-full border-police-blue/40 hover:bg-police-blue/10"
                        aria-label={`Call the non-emergency number for ${county.nonEmergency.agency}`}
                      >
                        <a href={`tel:${county.nonEmergency.phone.replace(/[^0-9]/g, "")}`}>
                          <Phone className="h-4 w-4" />
                          {county.nonEmergency.agency}: {county.nonEmergency.phone}
                        </a>
                      </Button>
                      {county.additionalNotes && (
                        <p className="text-sm text-muted-foreground">
                          {county.additionalNotes}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CountyResources;
