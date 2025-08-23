import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";
import heroImage from "@/assets/hero-crime-fighting.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      <ImageWithFallback
        src={heroImage}
        alt="Fighting Crime NC - Law enforcement and public safety"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        fallbackSrc="/placeholder.svg"
      />
      <div className="absolute inset-0 bg-gradient-backdrop"></div>
      
      {/* Emergency light effect */}
      <div className="absolute top-0 left-0 w-4 h-4 bg-emergency-red rounded-full animate-emergency-pulse shadow-glow"></div>
      <div className="absolute top-0 right-0 w-4 h-4 bg-police-blue rounded-full animate-emergency-pulse shadow-evidence"></div>
      
      <div className="relative z-10 container mx-auto container-mobile text-center animate-slide-up">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            FIGHTING CRIME IN
            <span className="block bg-gradient-to-r from-emergency-red via-white to-police-blue bg-clip-text text-transparent">
              NORTH CAROLINA
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            Your trusted source for <strong className="text-foreground">real-time NC crime news</strong>, 
            <strong className="text-emergency-red"> most wanted alerts</strong>, and 
            <strong className="text-police-blue"> community safety information</strong>. 
            Protecting communities across all 100 counties.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
            <Button 
              size="lg" 
              className="bg-gradient-police text-white hover:shadow-evidence px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-auto"
              onClick={() => navigate('/wanted')}
            >
              View Wanted Persons
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-emergency-red text-emergency-red hover:bg-emergency-red hover:text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-auto"
              onClick={() => navigate('/crime-news')}
            >
              Latest Crime News
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-danger text-white hover:shadow-crime px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-auto"
              onClick={() => navigate('/submit-tips')}
            >
              Submit Anonymous Tip
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-card/70 backdrop-blur-md p-6 rounded-lg border border-police-blue/30 hover:border-police-blue/50 transition-all duration-300 hover:shadow-evidence">
              <h3 className="text-3xl font-bold text-police-blue mb-2">24/7</h3>
              <p className="text-foreground font-medium">Crime Tip Hotline</p>
              <p className="text-xs text-muted-foreground mt-1">Anonymous reporting available</p>
            </div>
            <div className="bg-card/70 backdrop-blur-md p-6 rounded-lg border border-emergency-red/30 hover:border-emergency-red/50 transition-all duration-300 hover:shadow-crime">
              <h3 className="text-3xl font-bold text-emergency-red mb-2">2,500+</h3>
              <p className="text-foreground font-medium">Active Cases</p>
              <p className="text-xs text-muted-foreground mt-1">Real-time tracking across NC</p>
            </div>
            <div className="bg-card/70 backdrop-blur-md p-6 rounded-lg border border-evidence-green/30 hover:border-evidence-green/50 transition-all duration-300 hover:shadow-glow">
              <h3 className="text-3xl font-bold text-evidence-green mb-2">100</h3>
              <p className="text-foreground font-medium">Counties Covered</p>
              <p className="text-xs text-muted-foreground mt-1">Statewide crime awareness</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;