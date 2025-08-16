import { useState, useEffect, useCallback } from 'react';

export interface RSSItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
  location?: string;
  source: string;
}

export const useRSSFeed = () => {
  const [rssItems, setRssItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock RSS data - in production, replace with actual RSS parser
  const mockRSSData: RSSItem[] = [
    {
      id: "1",
      title: "Breaking: Multi-County Drug Bust Nets 15 Arrests in Western NC",
      description: "A coordinated operation between multiple law enforcement agencies resulted in significant drug seizures and arrests across Buncombe and Henderson counties.",
      link: "https://ncfightingcrime.com/news/drug-bust-western-nc",
      pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      category: "Drug Crimes",
      location: "Buncombe County, NC",
      source: "NC Fighting Crime"
    },
    {
      id: "2",
      title: "Wanted: Armed Robbery Suspect from Charlotte Area",
      description: "Mecklenburg County Sheriff's Office seeks public assistance in locating suspect connected to multiple armed robberies.",
      link: "https://ncfightingcrime.com/wanted/charlotte-robbery-suspect",
      pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      category: "Wanted",
      location: "Charlotte, NC",
      source: "Mecklenburg County SO"
    },
    {
      id: "3",
      title: "Highway Patrol Increases Presence During Holiday Travel",
      description: "North Carolina State Highway Patrol announces enhanced enforcement measures for upcoming holiday weekend.",
      link: "https://ncfightingcrime.com/news/highway-patrol-holiday",
      pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      category: "Traffic Safety",
      location: "Statewide, NC",
      source: "NC State Highway Patrol"
    },
    {
      id: "4",
      title: "Missing Person Alert: Elderly Man from Raleigh",
      description: "Silver Alert issued for 72-year-old man missing from Raleigh. Last seen driving white Toyota Camry.",
      link: "https://ncfightingcrime.com/missing/raleigh-elderly",
      pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      category: "Missing Person",
      location: "Raleigh, NC",
      source: "Raleigh PD"
    }
  ];

  const fetchRSSData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In production, implement actual RSS parsing here
      // const response = await fetch('/api/rss-proxy?url=https://ncfightingcrime.com/rss');
      // const rssData = await response.json();
      
      // Simulate loading for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRssItems(mockRSSData);
    } catch (err) {
      setError('Failed to load RSS feed');
      console.error('RSS fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRSSData();
  }, [fetchRSSData]);

  const getCategoryColor = useCallback((category: string) => {
    switch (category?.toLowerCase()) {
      case 'wanted':
        return 'destructive';
      case 'drug crimes':
        return 'secondary';
      case 'missing person':
        return 'outline';
      case 'traffic safety':
        return 'default';
      default:
        return 'outline';
    }
  }, []);

  const formatTimeAgo = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Less than 1 hour ago';
    }
  }, []);

  return {
    rssItems,
    loading,
    error,
    getCategoryColor,
    formatTimeAgo,
    refetch: fetchRSSData
  };
};