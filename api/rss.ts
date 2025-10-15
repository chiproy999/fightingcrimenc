import type { VercelRequest, VercelResponse } from '@vercel/node';
import { scrapeAllDepartments, type ScrapedNewsItem } from './lib/police-scrapers';

/**
 * Vercel Serverless Function to scrape NC Police Department news
 * Web scraping is more reliable than RSS feeds which most departments no longer provide
 */

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600'); // Cache for 5 minutes

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting web scraping of NC police departments...');
    const startTime = Date.now();

    // Scrape all departments
    const items = await scrapeAllDepartments();

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`Scraping completed in ${duration}ms. Total items: ${items.length}`);

    // Group items by source for the response
    const feedsBySource: { [key: string]: ScrapedNewsItem[] } = {};
    items.forEach(item => {
      if (!feedsBySource[item.source]) {
        feedsBySource[item.source] = [];
      }
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
      totalItems: items.length,
      totalSources: feeds.length,
      scrapeDuration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error scraping police departments:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to scrape crime news',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}
