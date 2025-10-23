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
export const fetchMultipleRSSFeeds = async (_configs?: RSSFeedConfig[]): Promise<RSSItem[]> => {
  const sortByDateDesc = (items: RSSItem[]) =>
    items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const tryFetchScrapedFeeds = async (): Promise<RSSItem[] | null> => {
    try {
      const response = await fetch('/api/rss', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data?.success || !Array.isArray(data.feeds)) {
        return null;
      }

      const flattened: RSSItem[] = data.feeds.flatMap((feed: { source: string; items: RSSItem[] }) =>
        (feed.items || []).map((item, index) => ({
          ...item,
          id: item.id || `${feed.source}-${index}-${Date.now()}`,
          source: item.source || feed.source,
        }))
      );

      if (!flattened.length) {
        return null;
      }

      return sortByDateDesc(flattened);
    } catch (scrapeError) {
      console.error('Error fetching scraped NC crime news:', scrapeError);
      return null;
    }
  };

  const tryFetchWralFeed = async (): Promise<RSSItem[] | null> => {
    try {
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
        return null;
      }

      return sortByDateDesc(data.articles as RSSItem[]);
    } catch (wralError) {
      console.error('Error fetching WRAL crime news feed:', wralError);
      return null;
    }
  };

  const scrapedFeeds = await tryFetchScrapedFeeds();
  if (scrapedFeeds && scrapedFeeds.length > 0) {
    return scrapedFeeds;
  }

  const wralFeeds = await tryFetchWralFeed();
  if (wralFeeds && wralFeeds.length > 0) {
    return wralFeeds;
  }

  if (import.meta.env.DEV) {
    console.info('Using mock data for development');
    return getMockCrimeNews();
  }

  throw new Error('No crime news feeds are currently available.');
};

/**
 * Mock crime news data for development
 */
const getMockCrimeNews = (): RSSItem[] => {
  const now = new Date();
  const mockArticles: RSSItem[] = [
    {
      id: 'mock-1',
      title: 'Charlotte Police Arrest Suspect in Armed Robbery Investigation',
      description: 'Charlotte-Mecklenburg Police Department announced the arrest of a suspect connected to multiple armed robberies in the uptown area. The suspect was apprehended following a coordinated investigation.',
      link: '#',
      pubDate: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      category: 'Robbery',
      location: 'Charlotte, NC',
      source: 'Charlotte-Mecklenburg Police Department'
    },
    {
      id: 'mock-2',
      title: 'Raleigh Police Seeking Public Assistance in Missing Person Case',
      description: 'The Raleigh Police Department is asking for the public\'s help in locating a missing person last seen in the downtown area. Anyone with information is urged to contact authorities.',
      link: '#',
      pubDate: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      category: 'Missing Person',
      location: 'Raleigh, NC',
      source: 'Raleigh Police Department'
    },
    {
      id: 'mock-3',
      title: 'Durham County Sheriff\'s Office Reports Major Drug Trafficking Bust',
      description: 'A multi-agency operation led by the Durham County Sheriff\'s Office resulted in the seizure of significant quantities of illegal narcotics and multiple arrests in an ongoing drug trafficking investigation.',
      link: '#',
      pubDate: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
      category: 'Drug Crimes',
      location: 'Durham, NC',
      source: 'Durham County Sheriff\'s Office'
    },
    {
      id: 'mock-4',
      title: 'Winston-Salem Police Investigate Overnight Shooting Incident',
      description: 'Winston-Salem Police responded to reports of gunfire in the early morning hours. One person was transported to a local hospital with non-life-threatening injuries. The investigation is ongoing.',
      link: '#',
      pubDate: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      category: 'Crime News',
      location: 'Winston-Salem, NC',
      source: 'Winston-Salem Police Department'
    },
    {
      id: 'mock-5',
      title: 'NC Highway Patrol Announces Increased DUI Enforcement Campaign',
      description: 'The North Carolina Highway Patrol announced a statewide campaign to reduce impaired driving. Enhanced patrols will be in effect across all 100 counties with a focus on high-risk areas.',
      link: '#',
      pubDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Traffic Safety',
      location: 'North Carolina',
      source: 'NC State Highway Patrol'
    },
    {
      id: 'mock-6',
      title: 'Fayetteville Police Department Warns of Recent Fraud Schemes',
      description: 'The Fayetteville Police Department issued a warning about sophisticated fraud schemes targeting local residents. Authorities advise residents to verify all requests for personal information or money.',
      link: '#',
      pubDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Fraud Alert',
      location: 'Fayetteville, NC',
      source: 'Fayetteville Police Department'
    }
  ];
  
  return mockArticles;
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
