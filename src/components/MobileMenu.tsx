import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, AlertTriangle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Crime News", path: "/crime-news", icon: "📰" },
    { name: "Who's Wanted", path: "/wanted", icon: "🚨" },
    { name: "Missing Persons", path: "/missing-persons", icon: "👤" },
    { name: "County Tip Directory", path: "/county-resources", icon: "🗺️" },
    { name: "Submit Tips", path: "/submit-tips", icon: "💡" },
    { name: "Contact", path: "/contact", icon: "📞" }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden relative h-12 w-12 hover:bg-primary/10 transition-colors"
          aria-label="Open mobile menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                navigate(item.path);
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
            asChild
            variant="destructive"
            className="w-full h-12 text-sm font-semibold"
          >
            <a href="tel:911" aria-label="Call 911 from mobile menu">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Call 911
            </a>
          </Button>

          <Button
            variant="police"
            className="w-full h-12 text-sm font-semibold"
            onClick={() => {
              setIsOpen(false);
              navigate('/county-resources');
            }}
          >
            <Phone className="mr-2 h-4 w-4" />
            County Tip Directory
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Need non-emergency help?
          </p>
          <p className="text-sm font-semibold text-primary">
            Use the County Tip Directory for verified numbers.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;