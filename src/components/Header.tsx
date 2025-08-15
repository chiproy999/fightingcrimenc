import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="bg-card border-b border-emergency-red/30 sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-police rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">FC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Fighting Crime NC</h1>
                <p className="text-xs text-muted-foreground">Keeping North Carolina Safe</p>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Home
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Crime News
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Who's Wanted
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Missing Persons
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Submit Tips
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Contact
            </Button>
          </nav>

          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="bg-emergency-red">
              Emergency: 911
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;