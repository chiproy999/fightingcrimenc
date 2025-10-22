import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  HTTP_CONFIG,
  CACHE_CONFIG,
  API_CONFIG,
  CORS_HEADERS,
  TEXT_CONFIG
} from './config/constants';

/**
 * Web Scraper for NC Police Departments
 * Scrapes official press releases directly from government websites
 */

interface ScrapedNewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
  location?: string;
  source: string;
}

// Utility functions
function extractTextFromHTML(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractCategory(content: string): string {
  const lower = content.toLowerCase();
  if (lower.includes('wanted') || lower.includes('fugitive') || lower.includes('warrant')) return 'Wanted';
  if (lower.includes('missing') || lower.includes('alert')) return 'Missing Person';
  if (lower.includes('drug') || lower.includes('narcotics')) return 'Drug Crimes';
  if (lower.includes('robbery') || lower.includes('armed') || lower.includes('theft')) return 'Robbery';
  if (lower.includes('homicide') || lower.includes('murder') || lower.includes('shooting')) return 'Violent Crime';
  if (lower.includes('arrest')) return 'Arrest';
  return 'Crime News';
}

function generateId(source: string, title: string): string {
  let hash = 0;
  const str = title + source;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return `${source}-${Math.abs(hash)}-${Date.now()}`;
}

function truncateDescription(description: string, maxLength: number = TEXT_CONFIG.MAX_RSS_DESCRIPTION_LENGTH): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength).trim() + '...';
}

async function fetchHTML(url: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), HTTP_CONFIG.DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': HTTP_CONFIG.USER_AGENT,
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Individual scrapers
async function scrapeCharlottePD(): Promise<ScrapedNewsItem[]> {
  try {
    const html = await fetchHTML('https://www.charlottenc.gov/CMPD/News');
    const items: ScrapedNewsItem[] = [];
    const articleMatches = html.match(/<article[^>]*>[\s\S]*?<\/article>/gi) || [];

    for (let i = 0; i < Math.min(articleMatches.length, API_CONFIG.MAX_ARTICLES_PER_DEPARTMENT); i++) {
      const article = articleMatches[i];
      const titleMatch = article.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/i);
      if (!titleMatch) continue;

      const title = extractTextFromHTML(titleMatch[1]);
      const linkMatch = article.match(/href=["']([^"']+)["']/i);
      const link = linkMatch ? `https://www.charlottenc.gov${linkMatch[1]}` : 'https://www.charlottenc.gov/CMPD/News';
      const descMatch = article.match(/<p[^>]*>(.*?)<\/p>/i);
      const description = descMatch ? truncateDescription(extractTextFromHTML(descMatch[1])) : '';

      items.push({
        id: generateId('CMPD', title),
        title,
        description,
        link,
        pubDate: new Date().toISOString(),
        category: extractCategory(title + ' ' + description),
        location: 'Charlotte, NC',
        source: 'Charlotte-Mecklenburg Police',
      });
    }
    return items;
  } catch (error) {
    console.error('Charlotte PD error:', error);
    return [];
  }
}

async function scrapeRaleighPD(): Promise<ScrapedNewsItem[]> {
  try {
    const html = await fetchHTML('https://raleighnc.gov/news-category/police');
    const items: ScrapedNewsItem[] = [];
    const articleMatches = html.match(/<article[^>]*>[\s\S]*?<\/article>/gi) || [];

    for (let i = 0; i < Math.min(articleMatches.length, API_CONFIG.MAX_ARTICLES_PER_DEPARTMENT); i++) {
      const article = articleMatches[i];
      const titleMatch = article.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/i);
      if (!titleMatch) continue;

      const title = extractTextFromHTML(titleMatch[1]);
      const linkMatch = article.match(/href=["']([^"']+)["']/i);
      const link = linkMatch ? (linkMatch[1].startsWith('http') ? linkMatch[1] : `https://raleighnc.gov${linkMatch[1]}`) : 'https://raleighnc.gov/news-category/police';
      const descMatch = article.match(/<p[^>]*>(.*?)<\/p>/i);
      const description = descMatch ? truncateDescription(extractTextFromHTML(descMatch[1])) : '';

      items.push({
        id: generateId('RPD', title),
        title,
        description,
        link,
        pubDate: new Date().toISOString(),
        category: extractCategory(title + ' ' + description),
        location: 'Raleigh, NC',
        source: 'Raleigh Police Department',
      });
    }
    return items;
  } catch (error) {
    console.error('Raleigh PD error:', error);
    return [];
  }
}

async function scrapeWakeSheriff(): Promise<ScrapedNewsItem[]> {
  try {
    const html = await fetchHTML('https://www.wake.gov/departments-government/sheriffs-office/news');
    const items: ScrapedNewsItem[] = [];
    const articleMatches = html.match(/<article[^>]*>[\s\S]*?<\/article>/gi) || [];

    for (let i = 0; i < Math.min(articleMatches.length, API_CONFIG.MAX_ARTICLES_PER_DEPARTMENT); i++) {
      const article = articleMatches[i];
      const titleMatch = article.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/i);
      if (!titleMatch) continue;

      const title = extractTextFromHTML(titleMatch[1]);
      const linkMatch = article.match(/href=["']([^"']+)["']/i);
      const link = linkMatch ? (linkMatch[1].startsWith('http') ? linkMatch[1] : `https://www.wake.gov${linkMatch[1]}`) : 'https://www.wake.gov/departments-government/sheriffs-office/news';
      const descMatch = article.match(/<p[^>]*>(.*?)<\/p>/i);
      const description = descMatch ? truncateDescription(extractTextFromHTML(descMatch[1])) : '';

      items.push({
        id: generateId('WakeSheriff', title),
        title,
        description,
        link,
        pubDate: new Date().toISOString(),
        category: extractCategory(title + ' ' + description),
        location: 'Wake County, NC',
        source: 'Wake County Sheriff',
      });
    }
    return items;
  } catch (error) {
    console.error('Wake Sheriff error:', error);
    return [];
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  res.setHeader('Cache-Control', `s-maxage=${CACHE_CONFIG.NEWS_SCRAPER_CACHE_SECONDS}, stale-while-revalidate=${CACHE_CONFIG.NEWS_SCRAPER_SWR_SECONDS}`);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    console.log('Starting scraping...');

    // Run all scrapers
    const results = await Promise.allSettled([
      scrapeCharlottePD(),
      scrapeRaleighPD(),
      scrapeWakeSheriff(),
    ]);

    const allItems: ScrapedNewsItem[] = [];
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        allItems.push(...result.value);
        console.log(`Scraper ${i + 1}: ${result.value.length} items`);
      } else {
        console.error(`Scraper ${i + 1} failed:`, result.reason);
      }
    });

    allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    const feedsBySource: { [key: string]: ScrapedNewsItem[] } = {};
    allItems.forEach(item => {
      if (!feedsBySource[item.source]) feedsBySource[item.source] = [];
      feedsBySource[item.source].push(item);
    });

    const feeds = Object.keys(feedsBySource).map(source => ({
      source,
      items: feedsBySource[source],
      count: feedsBySource[source].length,
      fetchedAt: new Date().toISOString(),
    }));

    return res.status(200).json({
      success: true,
      feeds,
      totalItems: allItems.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return res.status(500).json({
      success: false,
      error: 'Scraping failed',
      details: error instanceof Error ? error.message : 'Unknown',
    });
  }
}
