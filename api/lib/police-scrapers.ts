/**
 * Specific scrapers for NC Police Departments
 */

import {
  ScrapedNewsItem,
  fetchAndParse,
  extractTextFromHTML,
  extractCategory,
  extractLocation,
  parseDate,
  generateId,
  truncateDescription,
} from './scrapers';

/**
 * Charlotte-Mecklenburg Police Department
 * URL: https://www.charlottenc.gov/CMPD/News
 */
export async function scrapeCharlottePD(): Promise<ScrapedNewsItem[]> {
  try {
    const html = await fetchAndParse('https://www.charlottenc.gov/CMPD/News');
    const items: ScrapedNewsItem[] = [];

    // Charlotte uses a custom CMS - parse news items
    const articleMatches = html.match(/<article[^>]*>[\s\S]*?<\/article>/gi) || [];

    for (let i = 0; i < Math.min(articleMatches.length, 20); i++) {
      const article = articleMatches[i];

      // Extract title
      const titleMatch = article.match(/<h2[^>]*>(.*?)<\/h2>/i) || article.match(/<h3[^>]*>(.*?)<\/h3>/i);
      if (!titleMatch) continue;

      const title = extractTextFromHTML(titleMatch[1]);

      // Extract link
      const linkMatch = article.match(/href=["']([^"']+)["']/i);
      const link = linkMatch ? `https://www.charlottenc.gov${linkMatch[1]}` : 'https://www.charlottenc.gov/CMPD/News';

      // Extract description
      const descMatch = article.match(/<p[^>]*>(.*?)<\/p>/i);
      const description = descMatch ? truncateDescription(extractTextFromHTML(descMatch[1])) : '';

      // Extract date
      const dateMatch = article.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i) ||
                       article.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
      const pubDate = dateMatch ? parseDate(dateMatch[0]) : new Date().toISOString();

      items.push({
        id: generateId('CMPD', title, pubDate),
        title,
        description,
        link,
        pubDate,
        category: extractCategory(title + ' ' + description),
        location: 'Charlotte, NC',
        source: 'Charlotte-Mecklenburg Police Department',
      });
    }

    return items;
  } catch (error) {
    console.error('Error scraping Charlotte PD:', error);
    return [];
  }
}

/**
 * Raleigh Police Department
 * URL: https://raleighnc.gov/news-category/police
 */
export async function scrapeRaleighPD(): Promise<ScrapedNewsItem[]> {
  try {
    const html = await fetchAndParse('https://raleighnc.gov/news-category/police');
    const items: ScrapedNewsItem[] = [];

    // Raleigh uses WordPress-style news feed
    const articleMatches = html.match(/<article[^>]*>[\s\S]*?<\/article>/gi) ||
                          html.match(/<div[^>]*class="[^"]*news-item[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];

    for (let i = 0; i < Math.min(articleMatches.length, 20); i++) {
      const article = articleMatches[i];

      const titleMatch = article.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/i);
      if (!titleMatch) continue;

      const title = extractTextFromHTML(titleMatch[1]);

      const linkMatch = article.match(/href=["']([^"']+)["']/i);
      const link = linkMatch ? (linkMatch[1].startsWith('http') ? linkMatch[1] : `https://raleighnc.gov${linkMatch[1]}`) : 'https://raleighnc.gov/news-category/police';

      const descMatch = article.match(/<p[^>]*>(.*?)<\/p>/i);
      const description = descMatch ? truncateDescription(extractTextFromHTML(descMatch[1])) : '';

      const dateMatch = article.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i) ||
                       article.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
      const pubDate = dateMatch ? parseDate(dateMatch[0]) : new Date().toISOString();

      items.push({
        id: generateId('RPD', title, pubDate),
        title,
        description,
        link,
        pubDate,
        category: extractCategory(title + ' ' + description),
        location: 'Raleigh, NC',
        source: 'Raleigh Police Department',
      });
    }

    return items;
  } catch (error) {
    console.error('Error scraping Raleigh PD:', error);
    return [];
  }
}

/**
 * Wake County Sheriff's Office
 * URL: https://www.wake.gov/departments-government/sheriffs-office/news
 */
export async function scrapeWakeSheriff(): Promise<ScrapedNewsItem[]> {
  try {
    const html = await fetchAndParse('https://www.wake.gov/departments-government/sheriffs-office/news');
    const items: ScrapedNewsItem[] = [];

    const articleMatches = html.match(/<article[^>]*>[\s\S]*?<\/article>/gi) ||
                          html.match(/<div[^>]*class="[^"]*news[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];

    for (let i = 0; i < Math.min(articleMatches.length, 20); i++) {
      const article = articleMatches[i];

      const titleMatch = article.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/i);
      if (!titleMatch) continue;

      const title = extractTextFromHTML(titleMatch[1]);

      const linkMatch = article.match(/href=["']([^"']+)["']/i);
      const link = linkMatch ? (linkMatch[1].startsWith('http') ? linkMatch[1] : `https://www.wake.gov${linkMatch[1]}`) : 'https://www.wake.gov/departments-government/sheriffs-office/news';

      const descMatch = article.match(/<p[^>]*>(.*?)<\/p>/i);
      const description = descMatch ? truncateDescription(extractTextFromHTML(descMatch[1])) : '';

      const dateMatch = article.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i) ||
                       article.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
      const pubDate = dateMatch ? parseDate(dateMatch[0]) : new Date().toISOString();

      items.push({
        id: generateId('WakeSheriff', title, pubDate),
        title,
        description,
        link,
        pubDate,
        category: extractCategory(title + ' ' + description),
        location: 'Wake County, NC',
        source: 'Wake County Sheriff\'s Office',
      });
    }

    return items;
  } catch (error) {
    console.error('Error scraping Wake County Sheriff:', error);
    return [];
  }
}

/**
 * Durham Police Department
 * URL: https://durhamnc.gov/CivicAlerts.aspx?AID=2289
 */
export async function scrapeDurhamPD(): Promise<ScrapedNewsItem[]> {
  try {
    const html = await fetchAndParse('https://durhamnc.gov/CivicAlerts.aspx?AID=2289');
    const items: ScrapedNewsItem[] = [];

    // Durham uses CivicAlerts system
    const articleMatches = html.match(/<div[^>]*class="[^"]*civicalert[^"]*"[^>]*>[\s\S]*?<\/div>/gi) ||
                          html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];

    for (let i = 0; i < Math.min(articleMatches.length, 20); i++) {
      const article = articleMatches[i];

      // Skip header rows
      if (article.includes('<th')) continue;

      const titleMatch = article.match(/<a[^>]*>(.*?)<\/a>/i) || article.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/i);
      if (!titleMatch) continue;

      const title = extractTextFromHTML(titleMatch[1]);
      if (title.length < 10) continue; // Skip short/empty titles

      const linkMatch = article.match(/href=["']([^"']+)["']/i);
      const link = linkMatch ? (linkMatch[1].startsWith('http') ? linkMatch[1] : `https://durhamnc.gov${linkMatch[1]}`) : 'https://durhamnc.gov/CivicAlerts.aspx?AID=2289';

      const descMatch = article.match(/<p[^>]*>(.*?)<\/p>/i) || article.match(/<td[^>]*>(.*?)<\/td>/i);
      const description = descMatch ? truncateDescription(extractTextFromHTML(descMatch[1])) : '';

      const dateMatch = article.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i) ||
                       article.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
      const pubDate = dateMatch ? parseDate(dateMatch[0]) : new Date().toISOString();

      items.push({
        id: generateId('DurhamPD', title, pubDate),
        title,
        description,
        link,
        pubDate,
        category: extractCategory(title + ' ' + description),
        location: 'Durham, NC',
        source: 'Durham Police Department',
      });
    }

    return items;
  } catch (error) {
    console.error('Error scraping Durham PD:', error);
    return [];
  }
}

/**
 * Greensboro Police Department
 * URL: https://www.greensboro-nc.gov/departments/police/news
 */
export async function scrapeGreensboroPD(): Promise<ScrapedNewsItem[]> {
  try {
    const html = await fetchAndParse('https://www.greensboro-nc.gov/departments/police/news');
    const items: ScrapedNewsItem[]  = [];

    const articleMatches = html.match(/<article[^>]*>[\s\S]*?<\/article>/gi) ||
                          html.match(/<div[^>]*class="[^"]*news[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];

    for (let i = 0; i < Math.min(articleMatches.length, 20); i++) {
      const article = articleMatches[i];

      const titleMatch = article.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/i);
      if (!titleMatch) continue;

      const title = extractTextFromHTML(titleMatch[1]);

      const linkMatch = article.match(/href=["']([^"']+)["']/i);
      const link = linkMatch ? (linkMatch[1].startsWith('http') ? linkMatch[1] : `https://www.greensboro-nc.gov${linkMatch[1]}`) : 'https://www.greensboro-nc.gov/departments/police/news';

      const descMatch = article.match(/<p[^>]*>(.*?)<\/p>/i);
      const description = descMatch ? truncateDescription(extractTextFromHTML(descMatch[1])) : '';

      const dateMatch = article.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i) ||
                       article.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
      const pubDate = dateMatch ? parseDate(dateMatch[0]) : new Date().toISOString();

      items.push({
        id: generateId('GreensboroPD', title, pubDate),
        title,
        description,
        link,
        pubDate,
        category: extractCategory(title + ' ' + description),
        location: 'Greensboro, NC',
        source: 'Greensboro Police Department',
      });
    }

    return items;
  } catch (error) {
    console.error('Error scraping Greensboro PD:', error);
    return [];
  }
}

/**
 * NC State Highway Patrol
 * URL: https://www.ncdps.gov/news-releases
 */
export async function scrapeNCHighwayPatrol(): Promise<ScrapedNewsItem[]> {
  try {
    const html = await fetchAndParse('https://www.ncdps.gov/news-releases');
    const items: ScrapedNewsItem[] = [];

    const articleMatches = html.match(/<article[^>]*>[\s\S]*?<\/article>/gi) ||
                          html.match(/<div[^>]*class="[^"]*view-content[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];

    for (let i = 0; i < Math.min(articleMatches.length, 20); i++) {
      const article = articleMatches[i];

      const titleMatch = article.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/i) || article.match(/<span[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/span>/i);
      if (!titleMatch) continue;

      const title = extractTextFromHTML(titleMatch[1]);

      const linkMatch = article.match(/href=["']([^"']+)["']/i);
      const link = linkMatch ? (linkMatch[1].startsWith('http') ? linkMatch[1] : `https://www.ncdps.gov${linkMatch[1]}`) : 'https://www.ncdps.gov/news-releases';

      const descMatch = article.match(/<p[^>]*>(.*?)<\/p>/i);
      const description = descMatch ? truncateDescription(extractTextFromHTML(descMatch[1])) : '';

      const dateMatch = article.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i) ||
                       article.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
      const pubDate = dateMatch ? parseDate(dateMatch[0]) : new Date().toISOString();

      items.push({
        id: generateId('NCSHP', title, pubDate),
        title,
        description,
        link,
        pubDate,
        category: extractCategory(title + ' ' + description),
        location: extractLocation(title + ' ' + description) || 'North Carolina',
        source: 'NC State Highway Patrol',
      });
    }

    return items;
  } catch (error) {
    console.error('Error scraping NC Highway Patrol:', error);
    return [];
  }
}

/**
 * Run all scrapers and combine results
 */
export async function scrapeAllDepartments(): Promise<ScrapedNewsItem[]> {
  console.log('Starting web scraping for all departments...');

  const results = await Promise.allSettled([
    scrapeCharlottePD(),
    scrapeRaleighPD(),
    scrapeWakeSheriff(),
    scrapeDurhamPD(),
    scrapeGreensboroPD(),
    scrapeNCHighwayPatrol(),
  ]);

  const allItems: ScrapedNewsItem[] = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
      console.log(`Scraper ${index + 1} succeeded: ${result.value.length} items`);
    } else {
      console.error(`Scraper ${index + 1} failed:`, result.reason);
    }
  });

  // Sort by date (newest first)
  allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  console.log(`Total scraped items: ${allItems.length}`);
  return allItems;
}
