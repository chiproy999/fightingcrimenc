import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

const ErrorState = ({ error, onRetry, showHomeButton = false }: ErrorStateProps) => {
  const navigate = useNavigate();

  // Sanitize error message to prevent XSS
  const sanitizedError = error.replace(/[<>]/g, '');

  return (
    <section className="py-12 bg-muted/30" role="alert" aria-live="polite">
      <div className="container mx-auto container-mobile text-center">
        <div className="max-w-md mx-auto bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-destructive/20 shadow-depth-2">
          <AlertTriangle 
            className="h-16 w-16 text-destructive mx-auto mb-4 animate-pulse" 
            aria-hidden="true"
          />
          <h2 className="text-2xl font-bold mb-2 text-foreground">Temporarily Unavailable</h2>
          <p className="text-muted-foreground mb-6">{sanitizedError}</p>
          <div className="space-y-3">
            {onRetry && (
              <Button 
                onClick={onRetry}
                variant="default"
                className="gap-2 bg-gradient-police"
                aria-label="Retry loading content"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            {showHomeButton && (
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="gap-2 w-full"
                aria-label="Return to homepage"
              >
                <Home className="h-4 w-4" />
                Return Home
              </Button>
            )}
            <p className="text-xs text-muted-foreground">
              Our team is working to restore full service. Thank you for your patience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorState;