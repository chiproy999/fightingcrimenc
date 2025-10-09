import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Generate breadcrumbs based on path
  pathnames.forEach((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const label = name.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    breadcrumbItems.push({
      label,
      href: routeTo
    });
  });

  if (breadcrumbItems.length <= 1) return null;

  // Generate JSON-LD breadcrumb structured data
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fightingcrimenc.com';
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${baseUrl}${item.href}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index === 0 && <Home className="h-4 w-4 mr-1" />}

              {index < breadcrumbItems.length - 1 ? (
                <Link
                  to={item.href}
                  className="hover:text-police-blue transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}

              {index < breadcrumbItems.length - 1 && (
                <ChevronRight className="h-4 w-4 mx-2" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;