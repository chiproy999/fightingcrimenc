import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead 
        title="Page Not Found - Fighting Crime NC"
        description="The page you are looking for could not be found. Return to Fighting Crime NC homepage for crime news, wanted persons, and community safety information."
        canonicalUrl={location.pathname}
      />
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-danger p-4 rounded-full shadow-evidence">
              <AlertTriangle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 text-emergency-red">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to safety.
          </p>
          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="bg-gradient-police text-white hover:shadow-evidence"
          >
            <Home className="h-5 w-5 mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
