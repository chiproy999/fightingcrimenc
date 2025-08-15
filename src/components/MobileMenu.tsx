import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, AlertTriangle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#", icon: "🏠" },
    { name: "Crime News", href: "#crime-news", icon: "📰" },
    { name: "Who's Wanted", href: "#wanted", icon: "🚨" },
    { name: "Missing Persons", href: "#missing", icon: "👤" },
    { name: "Submit Tips", href: "#tips", icon: "💡" },
    { name: "Contact", href: "#contact", icon: "📞" }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative h-12 w-12 hover:bg-primary/10"
          aria-label="Open mobile menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-lg border-l border-border/50">
        <SheetHeader className="border-b border-border/50 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-police p-2 rounded-lg">
              <span className="text-white font-bold text-lg">FC</span>
            </div>
            <div>
              <SheetTitle className="text-left text-foreground">Fighting Crime NC</SheetTitle>
              <p className="text-xs text-muted-foreground">Keeping NC Safe</p>
            </div>
          </div>
        </SheetHeader>

        {/* Emergency Contact */}
        <div className="mb-6">
          <Badge variant="destructive" className="w-full py-3 justify-center text-sm font-semibold">
            <Phone className="mr-2 h-4 w-4" />
            EMERGENCY: 911
          </Badge>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-3 mb-6">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start h-12 text-left px-4 hover:bg-primary/10 hover:text-primary"
              onClick={() => {
                setIsOpen(false);
                // Handle navigation
                if (item.href.startsWith('#')) {
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="space-y-3 border-t border-border/50 pt-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Quick Actions
          </h3>
          
          <Button 
            variant="destructive" 
            className="w-full h-12 text-sm font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report Emergency
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 text-sm"
            onClick={() => setIsOpen(false)}
          >
            <Phone className="mr-2 h-4 w-4" />
            Anonymous Tip Line
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            24/7 Crime Tip Hotline
          </p>
          <p className="text-sm font-semibold text-primary">
            1-800-NC-CRIME
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;