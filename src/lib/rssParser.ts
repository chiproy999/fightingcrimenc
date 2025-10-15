import { RSSItem } from '@/hooks/useRSSFeed';

export interface RSSFeedConfig {
  url: string;
  source: string;
  category?: string;
}

/**
 * Parse RSS feed from XML string
 */
export const parseRSSFeed = (xmlString: string, source: string): RSSItem[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  // Check for parsing errors
  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    console.error('RSS Parse Error:', parseError.textContent);
    throw new Error('Failed to parse RSS feed');
  }

  const items: RSSItem[] = [];
  const itemElements = xmlDoc.querySelectorAll('item');

  itemElements.forEach((item, index) => {
    const title = item.querySelector('title')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '#';
    const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();

    // Try to extract category from title or description
    const categoryMatch = title.match(/\[(.*?)\]/);
    const category = categoryMatch ? categoryMatch[1] : extractCategoryFromContent(title + ' ' + description);

    // Try to extract location
    const location = extractLocation(title + ' ' + description);

    items.push({
      id: `${source}-${index}-${Date.now()}`,
      title: cleanText(title),
      description: cleanText(description),
      link,
      pubDate: parsePubDate(pubDate),
      category,
      location,
      source
    });
  });

  return items;
};

/**
 * Fetch RSS feed via CORS proxy (DEPRECATED - kept for backwards compatibility)
 */
export const fetchRSSFeed = async (config: RSSFeedConfig): Promise<RSSItem[]> => {
  try {
    // Use a CORS proxy for client-side fetching
    // In production, you should use your own backend proxy
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(config.url)}`;

    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();
    return parseRSSFeed(xmlText, config.source);
  } catch (error) {
    console.error(`Error fetching RSS feed from ${config.source}:`, error);
    throw error;
  }
};

/**
 * Fetch crime news via Vercel serverless function
 * Uses WRAL RSS feed with AI rewriting for unique content
 */
export const fetchMultipleRSSFeeds = async (configs?: RSSFeedConfig[]): Promise<RSSItem[]> => {
  try {
    // Call our WRAL News AI endpoint
    const response = await fetch('/api/wral-news-ai', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !data.articles) {
      throw new Error('Invalid response from news API');
    }

    // Return articles directly (already formatted)
    return data.articles.sort((a: RSSItem, b: RSSItem) =>
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
  } catch (error) {
    console.error('Error fetching crime news from API:', error);
    throw error;
  }
};

/**
 * Extract category from content using keywords
 */
const extractCategoryFromContent = (content: string): string => {
  const lowerContent = content.toLowerCase();

  if (lowerContent.includes('wanted') || lowerContent.includes('fugitive')) {
    return 'Wanted';
  }
  if (lowerContent.includes('missing') || lowerContent.includes('silver alert') || lowerContent.includes('amber alert')) {
    return 'Missing Person';
  }
  if (lowerContent.includes('drug') || lowerContent.includes('fentanyl') || lowerContent.includes('narcotics')) {
    return 'Drug Crimes';
  }
  if (lowerContent.includes('robbery') || lowerContent.includes('armed')) {
    return 'Robbery';
  }
  if (lowerContent.includes('gang')) {
    return 'Gang Activity';
  }
  if (lowerContent.includes('fraud') || lowerContent.includes('scam')) {
    return 'Fraud Alert';
  }
  if (lowerContent.includes('traffic') || lowerContent.includes('highway') || lowerContent.includes('dui')) {
    return 'Traffic Safety';
  }

  return 'Crime News';
};

/**
 * Extract NC location from content
 */
const extractLocation = (content: string): string | undefined => {
  // Common NC cities and counties
  const ncLocations = [
    'Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville',
    'Cary', 'Wilmington', 'High Point', 'Concord', 'Asheville', 'Greenville',
    'Wake County', 'Mecklenburg County', 'Guilford County', 'Forsyth County',
    'Durham County', 'Buncombe County', 'Cumberland County', 'New Hanover County'
  ];

  for (const location of ncLocations) {
    if (content.includes(location)) {
      return location + ', NC';
    }
  }

  // Generic NC mention
  if (content.includes('North Carolina') || content.includes(' NC ')) {
    return 'North Carolina';
  }

  return undefined;
};

/**
 * Parse publication date
 */
const parsePubDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  } catch {
    return new Date().toISOString();
  }
};

/**
 * Clean text content (remove HTML, extra whitespace)
 */
const cleanText = (text: string): string => {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

/**
 * Default NC law enforcement RSS feeds
 */
export const NC_RSS_FEEDS: RSSFeedConfig[] = [
  // Charlotte-Mecklenburg Police Department
  {
    url: 'https://www.charlottenc.gov/CMPD/News/RSS',
    source: 'Charlotte-Mecklenburg Police Department',
    category: 'Crime News'
  },
  // Raleigh Police Department
  {
    url: 'https://www.raleighnc.gov/news/police',
    source: 'Raleigh Police Department',
    category: 'Crime News'
  },
  // Durham Police Department
  {
    url: 'https://durhamnc.gov/CivicAlerts.aspx?AID=2289&RSS=2289',
    source: 'Durham Police Department',
    category: 'Crime News'
  },
  // Greensboro Police Department
  {
    url: 'https://www.greensboro-nc.gov/modules/showdocument.aspx?documentid=1',
    source: 'Greensboro Police Department',
    category: 'Crime News'
  },
  // Winston-Salem Police Department
  {
    url: 'https://www.cityofws.org/CivicAlerts.aspx?AID=2322&RSS=2322',
    source: 'Winston-Salem Police Department',
    category: 'Crime News'
  },
  // NC State Highway Patrol
  {
    url: 'https://www.ncdps.gov/news-releases/rss.xml',
    source: 'NC State Highway Patrol',
    category: 'Traffic Safety'
  },
  // Fayetteville Police Department
  {
    url: 'https://www.fayettevillenc.gov/news.rss',
    source: 'Fayetteville Police Department',
    category: 'Crime News'
  },
  // Asheville Police Department
  {
    url: 'https://www.ashevillenc.gov/news/rss',
    source: 'Asheville Police Department',
    category: 'Crime News'
  },
  // Wilmington Police Department
  {
    url: 'https://www.wilmingtonnc.gov/departments/police-department/news',
    source: 'Wilmington Police Department',
    category: 'Crime News'
  },
  // Wake County Sheriff's Office
  {
    url: 'https://www.wake.gov/departments-government/sheriffs-office/news',
    source: 'Wake County Sheriff\'s Office',
    category: 'Crime News'
  },
  // Mecklenburg County Sheriff's Office
  {
    url: 'https://www.mecksheriff.com/News/RSS',
    source: 'Mecklenburg County Sheriff\'s Office',
    category: 'Crime News'
  },
  // NC Department of Public Safety (includes SBI, Corrections)
  {
    url: 'https://www.ncdps.gov/rss.xml',
    source: 'NC Department of Public Safety',
    category: 'Crime News'
  },
  // NC State Bureau of Investigation
  {
    url: 'https://www.ncdoj.gov/news/rss',
    source: 'NC State Bureau of Investigation',
    category: 'Crime News'
  },
  // High Point Police Department
  {
    url: 'https://www.highpointnc.gov/CivicAlerts.aspx?AID=1&RSS=1',
    source: 'High Point Police Department',
    category: 'Crime News'
  },
  // Cary Police Department
  {
    url: 'https://www.carync.gov/services-publications/news-publications/news-rss',
    source: 'Cary Police Department',
    category: 'Crime News'
  }
];
