import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto container-mobile text-center">
        <div className="max-w-md mx-auto bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-destructive/20">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">Temporarily Unavailable</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="space-y-3">
            {onRetry && (
              <Button 
                onClick={onRetry}
                variant="default"
                className="gap-2 bg-gradient-police"
                aria-label="Retry loading crime news feed"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
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