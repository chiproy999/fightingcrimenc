import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CrimeNewsSection from "@/components/CrimeNewsSection";
import WantedSection from "@/components/WantedSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CrimeNewsSection />
      <WantedSection />
      <Footer />
    </div>
  );
};

export default Index;
