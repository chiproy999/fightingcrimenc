import { useState, useEffect, useCallback } from 'react';
import { fetchMultipleRSSFeeds, NC_RSS_FEEDS } from '@/lib/rssParser';

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

  const fetchRSSData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch real RSS feeds only - no mock data
      const feedData = await fetchMultipleRSSFeeds(NC_RSS_FEEDS);

      if (feedData && feedData.length > 0) {
        setRssItems(feedData.slice(0, 12)); // Limit to 12 most recent items
      } else {
        setError('No crime news available. Please check back later.');
        setRssItems([]);
      }
    } catch (err) {
      setError('Failed to load crime news feed. Please try again later.');
      console.error('RSS fetch error:', err);
      setRssItems([]); // Empty on error - no mock data
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
        return 'destructive';
      case 'traffic safety':
        return 'default';
      case 'gang activity':
        return 'destructive';
      case 'fraud alert':
        return 'secondary';
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