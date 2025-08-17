import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

// Lazy load non-critical components for better Core Web Vitals
const Footer = lazy(() => import('./Footer'));

// Loading component for better perceived performance
const SectionLoader = () => (
  <div className="animate-pulse bg-muted/20 h-64 rounded-lg mx-auto max-w-7xl"></div>
);

// Performance-optimized component for above-the-fold content
const CriticalContent = () => {
  return (
    <>
      {/* Critical CSS inline for above-the-fold content */}
      <Helmet>
        <style type="text/css">{`
          .hero-section { 
            background: linear-gradient(135deg, hsl(220 15% 6%) 0%, hsl(217 91% 15%) 50%, hsl(220 15% 6%) 100%);
            min-height: 60vh;
          }
          .hero-text { 
            font-family: system-ui, -apple-system, sans-serif;
            font-weight: 800;
            letter-spacing: -0.025em;
          }
          .btn-primary {
            background: linear-gradient(90deg, hsl(217 91% 35%) 0%, hsl(217 91% 45%) 100%);
            border: none;
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            font-weight: 600;
            transition: opacity 0.2s;
          }
          .btn-primary:hover { opacity: 0.9; }
        `}</style>
      </Helmet>
      
      <section className="hero-section relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl mb-6 text-white">
            Fighting Crime in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
              North Carolina
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your trusted source for real-time NC crime news, most wanted alerts, and community safety information. 
            <strong> Protecting communities across all 100 counties.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              🚨 Latest Crime Alerts
            </button>
            <button className="btn-primary bg-red-600 hover:bg-red-700">
              📞 Report Anonymous Tip
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export { CriticalContent, Footer, SectionLoader };