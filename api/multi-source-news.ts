import { VercelRequest, VercelResponse } from '@vercel/node';

interface NewsArticle {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  category: string;
  source: string;
  location: string;
  image?: string;
}

const RSS_SOURCES = [
  {
    url: 'https://www.wral.com/news/rss/48',
    source: 'WRAL News',
    location: 'Statewide, NC'
  },
  {
    url: 'https://rss.app/feeds/tvI8Yljaufh8bKGI.xml',
    source: 'Charlotte Observer',
    location: 'Charlotte Metro, NC'
  },
  {
    url: 'https://rss.app/feeds/tDDgqBliLo6e3NdL.xml',
    source: 'News & Observer',
    location: 'Triangle/Raleigh, NC'
  },
  {
    url: 'https://rss.app/feeds/t96LtdAzAj7QgM23.xml',
    source: 'Spectrum News',
    location: 'Charlotte, NC'
  },
  {
    url: 'https://rss.app/feeds/tuM05JUF7u1g90pU.xml',
    source: 'NC Crime (Multi-Source)',
    location: 'Statewide, NC'
  }
];

function parseRSSXML(xml: string, sourceName: string, sourceLocation: string): NewsArticle[] {
  const articles: NewsArticle[] = [];

  try {
    const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/gi);
    if (!itemMatches) return articles;

    for (const itemXml of itemMatches) {
      const titleMatch = itemXml.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>/i) ||
                        itemXml.match(/<title[^>]*>(.*?)<\/title>/i);
      const linkMatch = itemXml.match(/<link[^>]*>(.*?)<\/link>/i);
      const descMatch = itemXml.match(/<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>/i) ||
                       itemXml.match(/<description[^>]*>(.*?)<\/description>/i);
      const pubDateMatch = itemXml.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i);
      const imageMatch = itemXml.match(/<media:(?:content|thumbnail)[^>]+url=["']([^"']+)["']/i);

      if (!titleMatch || !linkMatch) continue;

      const title = cleanText(titleMatch[1]);
      const description = cleanText(descMatch?.[1] || '').substring(0, 300);
      const link = linkMatch[1].trim();
      const pubDate = pubDateMatch?.[1] || new Date().toISOString();
      const image = imageMatch?.[1];
      const category = extractCategory(title + ' ' + description);

      // Only include crime-related articles
      if (isCrimeRelated(title, description)) {
        articles.push({
          id: `${sourceName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title,
          link,
          pubDate,
          description,
          category,
          source: sourceName,
          location: sourceLocation,
          image
        });
      }
    }
  } catch (error) {
    console.error(`Error parsing ${sourceName}:`, error);
  }

  return articles;
}

function isCrimeRelated(title: string, description: string): boolean {
  const content = (title + ' ' + description).toLowerCase();
  const crimeKeywords = [
    'arrest', 'charged', 'police', 'sheriff', 'crime', 'wanted',
    'missing', 'murder', 'homicide', 'shooting', 'shot', 'killed',
    'robbery', 'theft', 'stolen', 'burglary', 'drug', 'trafficking',
    'assault', 'battery', 'domestic', 'investigation', 'suspect', 'victim',
    'convicted', 'sentenced', 'trial', 'court', 'jail', 'prison'
  ];
  return crimeKeywords.some(keyword => content.includes(keyword));
}

function extractCategory(content: string): string {
  const lower = content.toLowerCase();
  if (lower.includes('wanted') || lower.includes('fugitive')) return 'Wanted';
  if (lower.includes('missing') || lower.includes('amber alert')) return 'Missing Person';
  if (lower.includes('arrest') || lower.includes('charged')) return 'Arrest';
  if (lower.includes('murder') || lower.includes('homicide')) return 'Homicide';
  if (lower.includes('shooting') || lower.includes('shot')) return 'Shooting';
  if (lower.includes('drug') || lower.includes('trafficking')) return 'Drug Offense';
  if (lower.includes('theft') || lower.includes('robbery')) return 'Theft';
  return 'Crime News';
}

function cleanText(text: string): string {
  return text
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function deduplicateArticles(articles: NewsArticle[]): NewsArticle[] {
  const seen = new Map<string, NewsArticle>();

  for (const article of articles) {
    // Normalize title for comparison
    const normalizedTitle = article.title.toLowerCase().replace(/[^\w\s]/g, '').trim();

    // Check if we've seen a similar title
    let isDuplicate = false;
    for (const [seenTitle, seenArticle] of seen) {
      // If titles are very similar (80%+ match), consider duplicate
      const similarity = calculateSimilarity(normalizedTitle, seenTitle);
      if (similarity > 0.8) {
        isDuplicate = true;
        // Keep the one with more info (longer description or has image)
        if (article.description.length > seenArticle.description.length ||
            (article.image && !seenArticle.image)) {
          seen.set(seenTitle, article);
        }
        break;
      }
    }

    if (!isDuplicate) {
      seen.set(normalizedTitle, article);
    }
  }

  return Array.from(seen.values());
}

function calculateSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.split(/\s+/));
  const words2 = new Set(str2.split(/\s+/));
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  return intersection.size / union.size;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const allArticles: NewsArticle[] = [];

    // Fetch all sources in parallel
    const results = await Promise.allSettled(
      RSS_SOURCES.map(async (source) => {
        const response = await fetch(source.url, {
          headers: { 'User-Agent': 'FightingCrimeNC/1.0' }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const xml = await response.text();
        return parseRSSXML(xml, source.source, source.location);
      })
    );

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allArticles.push(...result.value);
      }
    });

    // Deduplicate articles by title similarity
    const uniqueArticles = deduplicateArticles(allArticles);

    // Sort by date (newest first)
    uniqueArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return res.status(200).json({
      success: true,
      articles: uniqueArticles.slice(0, 30), // Return top 30
      totalArticles: uniqueArticles.length,
      duplicatesRemoved: allArticles.length - uniqueArticles.length,
      sources: RSS_SOURCES.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
      articles: [],
      totalArticles: 0
    });
  }
}
