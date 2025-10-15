/**
 * Web Scrapers for NC Police Departments
 * Scrapes official press releases and crime news from government websites
 */

export interface ScrapedNewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
  location?: string;
  source: string;
}

/**
 * Generic HTML scraper utility
 */
export async function fetchAndParse(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FightingCrimeNC-Bot/1.0; +https://fightingcrimenc.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

/**
 * Extract text content from HTML string
 */
export function extractTextFromHTML(html: string): string {
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

/**
 * Extract category from content using keywords
 */
export function extractCategory(content: string): string {
  const lower = content.toLowerCase();

  if (lower.includes('wanted') || lower.includes('fugitive') || lower.includes('warrant')) {
    return 'Wanted';
  }
  if (lower.includes('missing') || lower.includes('silver alert') || lower.includes('amber alert')) {
    return 'Missing Person';
  }
  if (lower.includes('drug') || lower.includes('fentanyl') || lower.includes('narcotics') || lower.includes('overdose')) {
    return 'Drug Crimes';
  }
  if (lower.includes('robbery') || lower.includes('armed') || lower.includes('theft')) {
    return 'Robbery';
  }
  if (lower.includes('gang')) {
    return 'Gang Activity';
  }
  if (lower.includes('fraud') || lower.includes('scam')) {
    return 'Fraud Alert';
  }
  if (lower.includes('traffic') || lower.includes('highway') || lower.includes('dui') || lower.includes('accident')) {
    return 'Traffic Safety';
  }
  if (lower.includes('homicide') || lower.includes('murder') || lower.includes('shooting')) {
    return 'Violent Crime';
  }
  if (lower.includes('arrest')) {
    return 'Arrest';
  }

  return 'Crime News';
}

/**
 * Extract NC location from content
 */
export function extractLocation(content: string): string | undefined {
  const ncLocations = [
    'Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville',
    'Cary', 'Wilmington', 'High Point', 'Concord', 'Asheville', 'Greenville',
    'Jacksonville', 'Chapel Hill', 'Rocky Mount', 'Burlington', 'Huntersville',
    'Wake County', 'Mecklenburg County', 'Guilford County', 'Forsyth County',
    'Durham County', 'Buncombe County', 'Cumberland County', 'New Hanover County',
    'Union County', 'Gaston County', 'Onslow County', 'Orange County'
  ];

  for (const location of ncLocations) {
    if (content.includes(location)) {
      return `${location}, NC`;
    }
  }

  if (content.includes('North Carolina') || content.includes(' NC ')) {
    return 'North Carolina';
  }

  return undefined;
}

/**
 * Parse date string to ISO format
 */
export function parseDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Generate unique ID for scraped item
 */
export function generateId(source: string, title: string, date?: string): string {
  const timestamp = date ? new Date(date).getTime() : Date.now();
  const hash = Math.abs(hashString(title + source));
  return `${source}-${hash}-${timestamp}`;
}

/**
 * Simple string hash function
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Limit description length
 */
export function truncateDescription(description: string, maxLength: number = 300): string {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength).trim() + '...';
}
