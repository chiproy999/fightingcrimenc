import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import ComponentErrorBoundary from '@/components/ComponentErrorBoundary';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';

const SectionLoader = () => (
  <div className="animate-pulse bg-muted rounded-lg h-32"></div>
);

const Footer = lazy(() => import('@/components/Footer'));

const Policy = () => {
  return (
    <>
      <SEOHead 
        title="Our Publishing Policy - Fighting Crime NC"
        description="Learn about Fighting Crime NC's publishing policy for crime news, arrest information, and public records sourced from official outlets."
        keywords="publishing policy, crime news sources, public records, arrest information, North Carolina"
        canonicalUrl="https://fightingcrimenc.com/policy"
      />
      
      <div className="min-h-screen bg-background flex flex-col">
        <ComponentErrorBoundary>
          <Header />
        </ComponentErrorBoundary>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-police py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Our Publishing Policy
                </h1>
                <p className="text-xl text-white/90">
                  Transparency in crime reporting and public information
                </p>
              </div>
            </div>
          </section>

          {/* Breadcrumbs */}
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs />
          </div>

          {/* Policy Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-bold text-foreground mb-6">Information Sources and Content Policy</h2>
                      
                      <div className="space-y-6 text-muted-foreground">
                        <p className="text-lg leading-relaxed">
                          We aggregate crime news and public-record information from reputable news outlets and government sources. 
                          Images, including mugshots, appear only when provided by the original source.
                        </p>
                        
                        <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-police-blue">
                          <h3 className="text-xl font-semibold text-foreground mb-3">Content Standards</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-police-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              All crime news is sourced from official news outlets and verified sources
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-police-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Arrest information comes from public records and official law enforcement releases
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-police-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Images and mugshots are published only when included in original source material
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-police-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              We maintain accuracy by linking to and crediting original sources
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-card border rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                            <Mail className="mr-2 text-police-blue" size={24} />
                            Corrections and Concerns
                          </h3>
                          <p className="mb-4">
                            For corrections or concerns regarding published content, please contact us at:
                          </p>
                          <div className="bg-police-blue/10 p-4 rounded border">
                            <p className="font-semibold text-police-blue">
                              support@fightingcrimenc.com
                            </p>
                          </div>
                          <p className="mt-4 text-sm">
                            We review all requests quickly and take appropriate action when warranted.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <ComponentErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </ComponentErrorBoundary>
      </div>
    </>
  );
};

export default Policy;