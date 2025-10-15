import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * RSS Feed Source Configuration
 */
interface RSSFeedSource {
  id: string;
  name: string;
  location: string;
  feedUrl: string;
  priority: 'high' | 'medium' | 'low';
  enabled: boolean;
}

/**
 * RSS.app Feed URLs - Replace placeholders with your actual feed URLs
 */
const RSS_FEED_SOURCES: RSSFeedSource[] = [
  // TOP PRIORITY - Start with these
  {
    id: 'charlotte-pd',
    name: 'Charlotte-Mecklenburg Police',
    location: 'Charlotte, Mecklenburg County',
    feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml',
    priority: 'high',
    enabled: false,
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
  // COMPETITOR'S COUNTIES
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
  // Add more as needed...
];

/**
 * Get only enabled feed sources
 */
function getEnabledFeeds(): RSSFeedSource[] {
  return RSS_FEED_SOURCES.filter(source => source.enabled);
}

interface RSSItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  category?: string;
  source: string;
  location: string;
  image?: string;
}

interface FeedGroup {
  source: string;
  location: string;
  items: RSSItem[];
}

/**
 * Parse RSS XML to JSON
 */
function parseRSSXML(xml: string, source: RSSFeedSource): RSSItem[] {
  const items: RSSItem[] = [];

  try {
    // Extract all <item> elements
    const itemMatches = xml.match(/<item[^>]*>[\s\S]*?<\/item>/gi);
    if (!itemMatches) return items;

    for (const itemXml of itemMatches) {
      // Extract fields
      const titleMatch = itemXml.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>/i) ||
                        itemXml.match(/<title[^>]*>(.*?)<\/title>/i);
      const linkMatch = itemXml.match(/<link[^>]*>(.*?)<\/link>/i);
      const pubDateMatch = itemXml.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i);
      const descriptionMatch = itemXml.match(/<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>/i) ||
                              itemXml.match(/<description[^>]*>(.*?)<\/description>/i);
      const categoryMatch = itemXml.match(/<category[^>]*>(.*?)<\/category>/i);

      // Extract image from content:encoded or description
      let imageUrl: string | undefined;
      const contentMatch = itemXml.match(/<content:encoded[^>]*><!\[CDATA\[(.*?)\]\]><\/content:encoded>/i);
      const imgMatch = (contentMatch?.[1] || descriptionMatch?.[1])?.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) {
        imageUrl = imgMatch[1];
      }

      if (titleMatch && linkMatch) {
        const title = titleMatch[1]
          .replace(/<!\[CDATA\[/g, '')
          .replace(/\]\]>/g, '')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .trim();

        const description = (descriptionMatch?.[1] || '')
          .replace(/<!\[CDATA\[/g, '')
          .replace(/\]\]>/g, '')
          .replace(/<[^>]+>/g, ' ') // Strip HTML tags
          .replace(/&nbsp;/g, ' ')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 300); // Limit description length

        const link = linkMatch[1].trim();
        const pubDate = pubDateMatch?.[1].trim() || new Date().toISOString();
        const category = categoryMatch?.[1].trim() || extractCategory(title + ' ' + description);

        items.push({
          id: `${source.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title,
          link,
          pubDate,
          description,
          category,
          source: source.name,
          location: source.location,
          image: imageUrl,
        });
      }
    }
  } catch (error) {
    console.error(`Error parsing RSS XML for ${source.name}:`, error);
  }

  return items;
}

/**
 * Extract category from content
 */
function extractCategory(content: string): string {
  const lower = content.toLowerCase();

  if (lower.includes('wanted') || lower.includes('fugitive')) return 'Wanted';
  if (lower.includes('missing') || lower.includes('amber alert') || lower.includes('silver alert')) return 'Missing Person';
  if (lower.includes('arrest') || lower.includes('charged') || lower.includes('custody')) return 'Arrest';
  if (lower.includes('shooting') || lower.includes('shot') || lower.includes('gun')) return 'Shooting';
  if (lower.includes('drug') || lower.includes('narcotic') || lower.includes('trafficking')) return 'Drug Offense';
  if (lower.includes('theft') || lower.includes('burglary') || lower.includes('robbery') || lower.includes('stolen')) return 'Theft';
  if (lower.includes('assault') || lower.includes('battery') || lower.includes('domestic')) return 'Assault';
  if (lower.includes('homicide') || lower.includes('murder') || lower.includes('death investigation')) return 'Homicide';
  if (lower.includes('dui') || lower.includes('dwi') || lower.includes('impaired')) return 'DUI/DWI';
  if (lower.includes('traffic') || lower.includes('crash') || lower.includes('accident')) return 'Traffic';

  return 'Crime News';
}

/**
 * Fetch a single RSS feed
 */
async function fetchRSSFeed(source: RSSFeedSource): Promise<RSSItem[]> {
  try {
    console.log(`Fetching RSS feed from ${source.name}...`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(source.feedUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        'User-Agent': 'FightingCrimeNC/1.0 (+https://fightingcrimenc.com)',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`Failed to fetch ${source.name}: HTTP ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const items = parseRSSXML(xml, source);

    console.log(`✓ ${source.name}: ${items.length} items`);
    return items;

  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching ${source.name}:`, error.message);
    }
    return [];
  }
}

/**
 * Main API handler
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Cache for 5 minutes, stale-while-revalidate for 10 minutes
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  try {
    const enabledFeeds = getEnabledFeeds();

    // If no feeds are enabled yet, return helpful message
    if (enabledFeeds.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'RSS feeds are being configured. Add your RSS.app feed URLs to api/rss-aggregator.ts and set enabled: true',
        feeds: [],
        totalItems: 0,
        timestamp: new Date().toISOString(),
        configuration: {
          totalFeeds: 0,
          enabledFeeds: 0,
          instructions: 'Edit api/rss-aggregator.ts to add RSS.app feed URLs',
        },
      });
    }

    console.log(`\n🚀 Fetching from ${enabledFeeds.length} RSS feeds...`);

    // Fetch all feeds in parallel
    const results = await Promise.allSettled(
      enabledFeeds.map(source => fetchRSSFeed(source))
    );

    // Combine all items
    const allItems: RSSItem[] = [];
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        allItems.push(...result.value);
      } else {
        console.error(`Feed ${index + 1} failed:`, result.reason);
      }
    });

    // Sort by publication date (newest first)
    allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    // Group by source
    const feedGroups: FeedGroup[] = [];
    const sourceMap = new Map<string, RSSItem[]>();

    for (const item of allItems) {
      if (!sourceMap.has(item.source)) {
        sourceMap.set(item.source, []);
      }
      sourceMap.get(item.source)!.push(item);
    }

    for (const [sourceName, items] of sourceMap) {
      const sourceConfig = enabledFeeds.find(f => f.name === sourceName);
      feedGroups.push({
        source: sourceName,
        location: sourceConfig?.location || '',
        items: items.slice(0, 20), // Limit to 20 items per source
      });
    }

    console.log(`\n✅ Total items fetched: ${allItems.length}`);
    console.log(`📦 Grouped into ${feedGroups.length} sources\n`);

    return res.status(200).json({
      success: true,
      feeds: feedGroups,
      totalItems: allItems.length,
      timestamp: new Date().toISOString(),
      configuration: {
        totalFeeds: enabledFeeds.length,
        enabledFeeds: enabledFeeds.length,
      },
    });

  } catch (error) {
    console.error('Fatal error in RSS aggregator:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to fetch RSS feeds',
      message: error instanceof Error ? error.message : 'Unknown error',
      feeds: [],
      totalItems: 0,
      timestamp: new Date().toISOString(),
    });
  }
}
