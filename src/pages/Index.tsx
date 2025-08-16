import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import RSSFeed from "@/components/RSSFeed";

// Lazy load below-the-fold components for better performance
const CrimeNewsSection = lazy(() => import("@/components/CrimeNewsSection"));
const WantedSection = lazy(() => import("@/components/WantedSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="py-12">
    <div className="animate-pulse bg-muted/20 h-48 rounded-lg mx-auto max-w-7xl"></div>
  </div>
);

const Index = () => {
  return (
    <>
      <SEOHead 
        title="Fighting Crime NC - #1 North Carolina Crime News & Most Wanted Database"
        description="Fighting Crime NC is North Carolina's premier crime news source. Get real-time NC crime alerts, wanted suspect information, missing persons updates, and anonymous tip reporting. Trusted by law enforcement and communities statewide."
        keywords="North Carolina crime news, NC wanted persons, NC public safety, North Carolina law enforcement, crime tips NC, wanted suspects North Carolina, NC sheriff department, crime prevention NC, Fighting Crime NC, NC missing persons, North Carolina police news, crime alerts NC, NC criminal database, North Carolina safety, NC crime statistics, NC law enforcement news, North Carolina criminal activity, NC police reports, crime prevention North Carolina, NC community safety"
        canonicalUrl="https://fightingcrimenc.com"
        articleModifiedTime={new Date().toISOString()}
        articleAuthor="Fighting Crime NC Editorial Team"
        articleSection="Crime News"
      />
      
      {/* Critical above-the-fold content */}
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        
        {/* RSS Feed - High priority content */}
        <RSSFeed />
        
        {/* Lazy load below-the-fold content */}
        <Suspense fallback={<SectionLoader />}>
          <CrimeNewsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <WantedSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
