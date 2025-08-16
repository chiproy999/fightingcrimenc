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
        <div className="max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-destructive">RSS Feed Error</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          {onRetry && (
            <Button 
              onClick={onRetry}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ErrorState;