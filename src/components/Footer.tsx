import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-card border-t border-emergency-red/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-police rounded-full flex items-center justify-center">
                <span className="text-white font-bold">FC</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Fighting Crime NC</h3>
            </div>
            <p className="text-muted-foreground">
              Dedicated to keeping North Carolina communities safe through 
              crime awareness and public information.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => navigate('/crime-news')}
              >
                Crime News
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => navigate('/wanted')}
              >
                Who's Wanted
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => navigate('/missing-persons')}
              >
                Missing Persons
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => navigate('/submit-tips')}
              >
                Submit Tips
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">County Coverage</h4>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => navigate('/nash-county')}
              >
                Nash County
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => navigate('/edgecombe-county')}
              >
                Edgecombe County
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => navigate('/wilson-county')}
              >
                Wilson County
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Emergency Contacts</h4>
            <div className="space-y-3">
              <div>
                <p className="text-emergency-red font-semibold">Emergency: 911</p>
                <p className="text-muted-foreground text-sm">Immediate danger or crimes in progress</p>
              </div>
              <div>
                <p className="text-police-blue font-semibold">Wake County Crime Stoppers</p>
                <p className="text-muted-foreground text-sm">(919) 996-1193</p>
              </div>
              <div>
                <p className="text-foreground font-semibold">Mecklenburg Crime Stoppers</p>
                <p className="text-muted-foreground text-sm">(704) 334-1600</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-3">
            <span>© 2025 Fighting Crime NC. All rights reserved.</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">|</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto text-police-blue hover:text-primary"
                onClick={() => navigate('/policy')}
              >
                Policy
              </Button>
              <span className="text-muted-foreground">|</span>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-police-blue hover:text-primary" onClick={() => navigate('/privacy')}>
                Privacy Policy
              </Button>
              <span className="text-muted-foreground">|</span>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-police-blue hover:text-primary" onClick={() => navigate('/terms')}>
                Terms of Service
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Website: fightingcrimenc.com | Working together for safer communities
          </p>
          <p className="text-xs text-muted-foreground mt-3 max-w-4xl mx-auto">
            Fighting Crime NC publishes crime news and arrest information sourced from official news outlets and public records. Mugshots and arrest images shown on this site come directly from the original source material.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;