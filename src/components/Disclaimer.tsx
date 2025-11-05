import { memo } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface DisclaimerProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
}

const Disclaimer = memo(({ variant = "default", className = "" }: DisclaimerProps) => {
  const content = (
    <>
      <strong>Important Disclaimer:</strong> Fighting Crime NC is not affiliated with law enforcement. 
      This website is for informational purposes only. For official matters, emergencies, or to report 
      crimes in progress, please contact local authorities or call 911 immediately. We do not provide 
      legal advice. Always consult with qualified legal professionals for legal matters.
    </>
  );

  if (variant === "compact") {
    return (
      <Alert className={`border-warning-yellow/50 bg-warning-yellow/5 ${className}`}>
        <AlertTriangle className="h-4 w-4 text-warning-yellow" />
        <AlertDescription className="text-sm text-muted-foreground">
          {content}
        </AlertDescription>
      </Alert>
    );
  }

  if (variant === "inline") {
    return (
      <p className={`text-xs text-muted-foreground italic ${className}`}>
        {content}
      </p>
    );
  }

  return (
    <Alert className={`border-warning-yellow/50 bg-warning-yellow/5 ${className}`}>
      <AlertTriangle className="h-4 w-4 text-warning-yellow" />
      <AlertDescription className="text-sm text-muted-foreground">
        {content}
      </AlertDescription>
    </Alert>
  );
});

Disclaimer.displayName = 'Disclaimer';

export default Disclaimer;

