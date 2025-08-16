import { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Shield, AlertTriangle, MapPin, Clock, Users } from "lucide-react";

// Memoized hero section for performance
const HeroSection = memo(() => {
  const heroStats = [
    { icon: Shield, label: "Counties Served", value: "100", color: "text-blue-400" },
    { icon: AlertTriangle, label: "Active Cases", value: "2,847", color: "text-red-400" },
    { icon: Users, label: "Tips Received", value: "15,000+", color: "text-green-400" },
    { icon: Clock, label: "Response Time", value: "<2min", color: "text-yellow-400" }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto container-mobile relative z-10">
        <div className="text-center mb-12">
          {/* Emergency Badge */}
          <Badge variant="destructive" className="mb-6 px-4 py-2 text-sm font-semibold animate-pulse">
            <AlertTriangle className="mr-2 h-4 w-4" />
            LIVE: Real-Time Crime Alerts
          </Badge>
          
          {/* Main Headline - SEO Optimized */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-foreground">Fighting Crime in</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-danger">
              North Carolina
            </span>
          </h1>
          
          {/* SEO-Rich Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            <strong>North Carolina's #1 Crime News Source</strong> - Get instant access to breaking crime news, 
            most wanted suspects, missing persons alerts, and anonymous tip reporting across all 100 NC counties. 
            Trusted by law enforcement agencies and communities statewide since 2024.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-police hover:opacity-90 transition-opacity h-12 px-8 text-lg font-semibold"
              aria-label="View latest North Carolina crime alerts"
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Latest Crime Alerts
            </Button>
            <Button 
              size="lg" 
              variant="destructive" 
              className="h-12 px-8 text-lg font-semibold hover:scale-105 transition-transform"
              aria-label="Report anonymous crime tip"
            >
              <Phone className="mr-2 h-5 w-5" />
              Report Anonymous Tip
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {heroStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.label}
                className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:shadow-evidence transition-all duration-300"
              >
                <IconComponent className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Access Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-border/30">
            <Shield className="h-10 w-10 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Most Wanted</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View NC's most wanted criminals and help law enforcement bring them to justice.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Most Wanted
            </Button>
          </div>

          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-border/30">
            <MapPin className="h-10 w-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Missing Persons</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Help reunite families by checking our missing persons database.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Search Missing
            </Button>
          </div>

          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-border/30">
            <Phone className="h-10 w-10 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Submit Tips</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Report crimes anonymously through our secure tip hotline system.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Submit Tip
            </Button>
          </div>
        </div>

        {/* Emergency Contact Bar */}
        <div className="mt-12 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="destructive" className="px-3 py-1">
              <Phone className="mr-1 h-3 w-3" />
              EMERGENCY: 911
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Phone className="mr-1 h-3 w-3" />
              Crime Stoppers: 1-800-NC-CRIME
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;