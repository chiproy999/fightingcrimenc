import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto container-mobile">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-police p-2 rounded-lg shadow-evidence">
              <span className="text-white font-bold text-lg sm:text-xl">FC</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground">Fighting Crime NC</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Keeping Communities Safe</p>
            </div>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary text-sm"
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary text-sm"
              onClick={() => navigate('/crime-news')}
            >
              Crime News
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary text-sm"
              onClick={() => navigate('/wanted')}
            >
              Who's Wanted
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary text-sm"
              onClick={() => navigate('/missing-persons')}
            >
              Missing Persons
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary text-sm"
              onClick={() => navigate('/submit-tips')}
            >
              Submit Tips
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary text-sm"
              onClick={() => navigate('/contact')}
            >
              Contact
            </Button>
          </nav>

          {/* Auth and Emergency Section */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="hidden md:flex border-police-blue/50 text-police-blue hover:bg-police-blue hover:text-white"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
            
            <Badge variant="destructive" className="hidden sm:flex lg:hidden xl:flex items-center gap-2 px-3 py-2">
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">Emergency:</span> 911
            </Badge>
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;