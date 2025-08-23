import { Suspense } from 'react';
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RSSFeed from "@/components/RSSFeed";
import LoadingState from "@/components/LoadingState";
import ComponentErrorBoundary from "@/components/ComponentErrorBoundary";
import { Shield, Clock, AlertTriangle } from "lucide-react";

const CrimeNews = () => {
  return (
    <>
      <SEOHead 
        title="Latest North Carolina Crime News - Fighting Crime NC"
        description="Stay informed with breaking crime news, police reports, and public safety updates from across North Carolina. Real-time coverage of criminal activities and law enforcement actions."
        keywords="NC crime news, North Carolina police reports, breaking crime news, law enforcement updates, public safety alerts, criminal activity NC"
        canonicalUrl="/crime-news"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "NewsMediaOrganization",
          "name": "Fighting Crime NC",
          "url": "https://fightingcrimenc.com",
          "logo": "https://fightingcrimenc.com/logo.png",
          "description": "North Carolina's premier source for crime news and public safety information"
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
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Latest North Carolina Crime News
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay informed with real-time updates on criminal activities, law enforcement actions, 
                and public safety alerts from across all 100 North Carolina counties.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card border border-police-blue/20 rounded-lg p-6 text-center">
                <Shield className="h-8 w-8 text-police-blue mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">24/7</h3>
                <p className="text-muted-foreground">Breaking News Coverage</p>
              </div>
              <div className="bg-card border border-evidence-green/20 rounded-lg p-6 text-center">
                <Clock className="h-8 w-8 text-evidence-green mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">Real-Time</h3>
                <p className="text-muted-foreground">Crime Updates</p>
              </div>
              <div className="bg-card border border-emergency-red/20 rounded-lg p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-emergency-red mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">100</h3>
                <p className="text-muted-foreground">NC Counties Covered</p>
              </div>
            </div>
          </section>

          {/* Crime News Feed */}
          <section className="pb-12">
            <ComponentErrorBoundary>
              <Suspense fallback={<LoadingState />}>
                <RSSFeed />
              </Suspense>
            </ComponentErrorBoundary>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CrimeNews;