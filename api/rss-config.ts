/**
 * RSS.app Feed Configuration
 *
 * This file contains the RSS feed URLs from RSS.app for NC police departments.
 *
 * TO ADD YOUR RSS.APP FEEDS:
 * 1. Subscribe to RSS.app ($19/month Pro plan)
 * 2. Create feeds for each NC police Facebook page
 * 3. Copy the RSS feed URLs RSS.app generates
 * 4. Replace the placeholder URLs below with your actual RSS.app feed URLs
 * 5. Deploy to Vercel
 */

export interface RSSFeedSource {
  id: string;
  name: string;
  location: string;
  feedUrl: string; // RSS.app feed URL
  priority: 'high' | 'medium' | 'low';
  enabled: boolean;
}

/**
 * RSS.app Feed URLs
 * Replace these placeholder URLs with your actual RSS.app feed URLs
 */
export const RSS_FEED_SOURCES: RSSFeedSource[] = [
  // TOP PRIORITY - Start with these
  {
    id: 'charlotte-pd',
    name: 'Charlotte-Mecklenburg Police',
    location: 'Charlotte, Mecklenburg County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml', // Replace with actual RSS.app URL
    priority: 'high',
    enabled: false, // Set to true when you add real URL
  },
  {
    id: 'raleigh-pd',
    name: 'Raleigh Police Department',
    location: 'Raleigh, Wake County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },
  {
    id: 'wake-sheriff',
    name: 'Wake County Sheriff\'s Office',
    location: 'Wake County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },
  {
    id: 'durham-pd',
    name: 'Durham Police Department',
    location: 'Durham, Durham County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },
  {
    id: 'greensboro-pd',
    name: 'Greensboro Police Department',
    location: 'Greensboro, Guilford County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },
  {
    id: 'winston-salem-pd',
    name: 'Winston-Salem Police Department',
    location: 'Winston-Salem, Forsyth County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },
  {
    id: 'fayetteville-pd',
    name: 'Fayetteville Police Department',
    location: 'Fayetteville, Cumberland County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },
  {
    id: 'asheville-pd',
    name: 'Asheville Police Department',
    location: 'Asheville, Buncombe County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },

  // COMPETITOR'S COUNTIES - Beat them!
  {
    id: 'nash-sheriff',
    name: 'Nash County Sheriff\'s Office',
    location: 'Nash County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },
  {
    id: 'edgecombe-sheriff',
    name: 'Edgecombe County Sheriff\'s Office',
    location: 'Edgecombe County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },
  {
    id: 'wilson-sheriff',
    name: 'Wilson County Sheriff\'s Office',
    location: 'Wilson County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },
  {
    id: 'halifax-sheriff',
    name: 'Halifax County Sheriff\'s Office',
    location: 'Halifax County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
  },

  // MEDIUM PRIORITY
  {
    id: 'wilmington-pd',
    name: 'Wilmington Police Department',
    location: 'Wilmington, New Hanover County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'medium',
    enabled: false,
  },
  {
    id: 'high-point-pd',
    name: 'High Point Police Department',
    location: 'High Point, Guilford County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'medium',
    enabled: false,
  },
  {
    id: 'cary-pd',
    name: 'Cary Police Department',
    location: 'Cary, Wake County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'medium',
    enabled: false,
  },

  // Add more as needed...
];

/**
 * Get only enabled feed sources
 */
export function getEnabledFeeds(): RSSFeedSource[] {
  return RSS_FEED_SOURCES.filter(source => source.enabled);
}

/**
 * Get feeds by priority
 */
export function getFeedsByPriority(priority: 'high' | 'medium' | 'low'): RSSFeedSource[] {
  return RSS_FEED_SOURCES.filter(
    source => source.enabled && source.priority === priority
  );
}
