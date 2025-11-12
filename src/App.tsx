import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "@/hooks/useAuth";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Lazy load pages for better code splitting
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const CrimeNews = lazy(() => import("./pages/CrimeNews"));
const Wanted = lazy(() => import("./pages/Wanted"));
const MissingPersons = lazy(() => import("./pages/MissingPersons"));
const SubmitTips = lazy(() => import("./pages/SubmitTips"));
const Policy = lazy(() => import("./pages/Policy"));
const CountyResources = lazy(() => import("./pages/CountyResources"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-center">
      <div className="w-16 h-16 bg-gradient-police rounded-full mx-auto mb-4 flex items-center justify-center">
        <span className="text-white font-bold text-2xl">FC</span>
      </div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-destructive mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <button 
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Try again
      </button>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/crime-news" element={<CrimeNews />} />
                  <Route path="/wanted" element={<Wanted />} />
                  <Route path="/missing-persons" element={<MissingPersons />} />
                  <Route path="/submit-tips" element={<SubmitTips />} />
                  <Route path="/county-resources" element={<CountyResources />} />
                  <Route path="/policy" element={<Policy />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          <SpeedInsights />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
