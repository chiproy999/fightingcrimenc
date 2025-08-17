import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ComponentErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ComponentErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const DefaultErrorFallback = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="min-h-[200px] flex items-center justify-center bg-card/30 rounded-lg border border-destructive/20">
    <div className="text-center p-6">
      <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2 text-destructive">Component Error</h3>
      <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
      <Button onClick={retry} variant="outline" size="sm" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Retry
      </Button>
    </div>
  </div>
);

class ComponentErrorBoundary extends React.Component<ComponentErrorBoundaryProps, ComponentErrorBoundaryState> {
  constructor(props: ComponentErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ComponentErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const ErrorComponent = this.props.fallback || DefaultErrorFallback;
      return <ErrorComponent error={this.state.error} retry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

export default ComponentErrorBoundary;