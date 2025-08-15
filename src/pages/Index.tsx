import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CrimeNewsSection from "@/components/CrimeNewsSection";
import WantedSection from "@/components/WantedSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RSSFeed from "@/components/RSSFeed";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="Fighting Crime NC - North Carolina Crime News & Who's Wanted"
        description="Fighting Crime NC provides real-time North Carolina crime news, wanted persons information, and community safety resources. Report tips anonymously to keep NC communities safe."
        keywords="North Carolina crime news, NC wanted persons, NC public safety, North Carolina law enforcement, crime tips NC, wanted suspects North Carolina, NC sheriff department, crime prevention NC, Fighting Crime NC"
        canonicalUrl="https://fightingcrimenc.com"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <RSSFeed />
        <CrimeNewsSection />
        <WantedSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
