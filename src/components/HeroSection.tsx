import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-crime-fighting.jpg";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            FIGHTING CRIME
            <span className="block text-emergency-red">NEWS & WHO'S WANTED</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Keeping North Carolina communities safe through crime awareness, 
            public information, and community cooperation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-police text-white hover:shadow-evidence px-8 py-6 text-lg"
            >
              View Wanted Persons
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-emergency-red text-emergency-red hover:bg-emergency-red hover:text-white px-8 py-6 text-lg"
            >
              Latest Crime News
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-danger text-white hover:shadow-crime px-8 py-6 text-lg"
            >
              Submit Anonymous Tip
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-police-blue/20">
              <h3 className="text-2xl font-bold text-police-blue mb-2">24/7</h3>
              <p className="text-muted-foreground">Crime Tip Hotline</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-emergency-red/20">
              <h3 className="text-2xl font-bold text-emergency-red mb-2">100+</h3>
              <p className="text-muted-foreground">Cases Solved</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-evidence-green/20">
              <h3 className="text-2xl font-bold text-evidence-green mb-2">Safe</h3>
              <p className="text-muted-foreground">Communities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;