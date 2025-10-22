import { VercelRequest, VercelResponse } from '@vercel/node';
import * as he from 'he';

/**
 * WRAL News AI Rewriter
 *
 * Fetches WRAL RSS feed, filters for crime news, rewrites with AI
 */

interface WRALArticle {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  category: string;
  source: string;
  location: string;
  image?: string;
  originalTitle?: string;
  rewritten: boolean;
}

/**
 * Detect if article is crime-related
 */
function isCrimeRelated(title: string, description: string): boolean {
  const content = (title + ' ' + description).toLowerCase();

  const crimeKeywords = [
    'arrest', 'charged', 'police', 'sheriff', 'crime', 'wanted',
    'missing', 'murder', 'homicide', 'shooting', 'shot', 'killed',
    'robbery', 'theft', 'stolen', 'burglary', 'drug', 'trafficking',
    'assault', 'battery', 'domestic', 'abuse', 'investigation',
    'suspect', 'victim', 'convicted', 'sentenced', 'trial', 'court',
    'jail', 'prison', 'fugitive', 'manhunt', 'dui', 'dwi',
    'hit-and-run', 'crash death', 'fatal', 'body found', 'sexual assault',
    'rape', 'kidnapping', 'abduction', 'fraud', 'scam', 'embezzlement',
    'gang', 'weapon', 'firearm', 'gun', 'knife', 'stabbing'
  ];

  return crimeKeywords.some(keyword => content.includes(keyword));
}

/**
 * Categorize crime article
 */
function categorizeCrime(title: string, description: string): string {
  const content = (title + ' ' + description).toLowerCase();

  if (content.includes('wanted') || content.includes('fugitive') || content.includes('manhunt')) {
    return 'Wanted';
  }
  if (content.includes('missing') || content.includes('amber alert') || content.includes('silver alert')) {
    return 'Missing Person';
  }
  if (content.includes('arrest') || content.includes('charged') || content.includes('custody')) {
    return 'Arrest';
  }
  if (content.includes('murder') || content.includes('homicide') || content.includes('killed') || content.includes('death investigation')) {
    return 'Homicide';
  }
  if (content.includes('shooting') || content.includes('shot') || content.includes('gunfire')) {
    return 'Shooting';
  }
  if (content.includes('drug') || content.includes('narcotic') || content.includes('trafficking') || content.includes('fentanyl')) {
    return 'Drug Offense';
  }
  if (content.includes('theft') || content.includes('burglary') || content.includes('robbery') || content.includes('stolen')) {
    return 'Theft';
  }
  if (content.includes('assault') || content.includes('battery') || content.includes('domestic')) {
    return 'Assault';
  }
  if (content.includes('dui') || content.includes('dwi') || content.includes('impaired')) {
    return 'DUI/DWI';
  }
  if (content.includes('sexual') || content.includes('rape') || content.includes('sex crime')) {
    return 'Sex Crime';
  }
  if (content.includes('fraud') || content.includes('scam') || content.includes('embezzlement')) {
    return 'Fraud';
  }

  return 'Crime News';
}

/**
 * Extract NC location from content
 */
function extractLocation(title: string, description: string): string {
  const content = title + ' ' + description;

  const cities = [
    'Raleigh', 'Durham', 'Chapel Hill', 'Cary', 'Apex', 'Wake Forest',
    'Garner', 'Morrisville', 'Holly Springs', 'Fuquay-Varina',
    'Knightdale', 'Zebulon', 'Wendell', 'Clayton', 'Smithfield',
    'Charlotte', 'Greensboro', 'Winston-Salem', 'Fayetteville',
    'Asheville', 'Wilmington', 'Greenville', 'Rocky Mount'
  ];

  const counties = [
    'Wake County', 'Durham County', 'Orange County', 'Johnston County',
    'Franklin County', 'Granville County', 'Harnett County',
    'Mecklenburg County', 'Guilford County', 'Forsyth County'
  ];

  // Check cities first
  for (const city of cities) {
    if (content.includes(city)) {
      return `${city}, NC`;
    }
  }

  // Then check counties
  for (const county of counties) {
    if (content.includes(county)) {
      return county;
    }
  }

  return 'North Carolina';
}

/**
 * Clean and normalize text with robust HTML handling
 * This is the local-only implementation that uses he package for HTML entity decoding
 */
function simpleRewrite(title: string, description: string): { title: string; description: string } {
  // Helper function to clean HTML content
  function cleanHTML(html: string): string {
    if (!html) return '';
    
    // Remove script and style blocks (including their content) and replace with space
    let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
    cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
    
    // Strip all HTML tags and replace with space
    cleaned = cleaned.replace(/<[^>]+>/g, ' ');
    
    // Decode HTML entities using he package
    cleaned = he.decode(cleaned);
    
    // Collapse whitespace (including various types of spaces)
    cleaned = cleaned.replace(/\s+/g, ' ');
    
    return cleaned.trim();
  }
  
  // Helper function to truncate text at word/sentence boundaries
  function truncateGracefully(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text;
    
    // First, try to truncate at sentence boundary (look for the last sentence ending within maxLength)
    const truncated = text.substring(0, maxLength);
    const sentenceMatch = truncated.match(/[.!?](?=\s)/g);
    if (sentenceMatch && sentenceMatch.length > 0) {
      // Find the position of the last sentence ending
      const lastPuncIndex = truncated.lastIndexOf(sentenceMatch[sentenceMatch.length - 1]);
      // Only use sentence boundary if it retains at least 20% of max length
      if (lastPuncIndex > maxLength * 0.2) {
        return text.substring(0, lastPuncIndex + 1).trim();
      }
    }
    
    // Otherwise, truncate at word boundary
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > maxLength * 0.8) { // Only if we keep at least 80% of desired length
      return truncated.substring(0, lastSpace).trim() + '...';
    }
    
    return truncated.trim() + '...';
  }
  
  // Clean and normalize title
  let rewrittenTitle = cleanHTML(title);
  
  // Remove common news site branding patterns
  rewrittenTitle = rewrittenTitle
    .replace(/^WRAL\.com\s*[-:]\s*/i, '')
    .replace(/\s*\|\s*WRAL\.com$/i, '')
    .replace(/^By\s+[^-]+-\s*/i, '') // Remove author bylines like "By John Doe - "
    .replace(/^\w+,\s+\w+\s+\d+,?\s+\d{4}\s*[-:]\s*/i, '') // Remove datelines
    .trim();
  
  // Truncate title to reasonable length (100 chars)
  rewrittenTitle = truncateGracefully(rewrittenTitle, 100);
  
  // Clean and normalize description
  let rewrittenDesc = cleanHTML(description);
  
  // Remove common author/dateline patterns from description (must be more robust)
  rewrittenDesc = rewrittenDesc
    .replace(/^By\s+[^-]+-\s*/i, '')
    .replace(/^\w+,\s+\w+\s+\d+,?\s+\d{4}\s*[-:—]\s*/i, '') // Include em dash
    .replace(/^\w+\s+—\s+/i, '') // Remove "CITYNAME — " patterns
    .trim();
  
  // Add source attribution if not present
  if (!rewrittenDesc.toLowerCase().includes('according to') &&
      !rewrittenDesc.toLowerCase().includes('wral')) {
    if (rewrittenDesc.length > 0) {
      rewrittenDesc = `According to WRAL News, ${rewrittenDesc.charAt(0).toLowerCase() + rewrittenDesc.slice(1)}`;
    }
  }
  
  // Truncate description gracefully (500 chars)
  rewrittenDesc = truncateGracefully(rewrittenDesc, 500);
  
  return {
    title: rewrittenTitle,
    description: rewrittenDesc
  };
}

/**
 * Rewrite article with AI (requires API key or API URL)
 * Supports optional REWRITE_API_URL for custom LLM endpoints
 */
async function rewriteWithAI(
  title: string,
  description: string,
  apiKey?: string,
  apiUrl?: string
): Promise<{ title: string; description: string }> {

  // If custom API URL is provided, use it
  if (apiUrl) {
    try {
      console.log('🔌 Using custom rewrite API:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description
        })
      });

      if (!response.ok) {
        console.error('Custom API error:', response.status);
        return simpleRewrite(title, description);
      }

      const data = await response.json();
      return {
        title: data.title || title,
        description: data.description || description
      };
    } catch (error) {
      console.error('Custom API rewriting error:', error);
      return simpleRewrite(title, description);
    }
  }

  // Check if Claude API key is provided
  if (!apiKey || apiKey === 'YOUR_ANTHROPIC_API_KEY') {
    console.log('⚠️  No Claude API key - using simple rewrite');
    return simpleRewrite(title, description);
  }

  try {
    // Call Claude API to rewrite
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Rewrite this crime news article for a North Carolina crime news website.

ORIGINAL TITLE: ${title}

ORIGINAL DESCRIPTION: ${description}

Instructions:
- Keep all facts accurate (names, locations, charges, dates)
- Use professional journalistic tone
- Make it 200-300 words
- Optimize for NC crime news keywords
- Add "According to [source]" attribution
- Make it SEO-friendly

Return as JSON:
{
  "title": "rewritten headline",
  "description": "rewritten article text"
}`
        }]
      })
    });

    if (!response.ok) {
      console.error('Claude API error:', response.status);
      return simpleRewrite(title, description);
    }

    const data = await response.json();
    const aiText = data.content[0].text;

    // Parse JSON response
    const match = aiText.match(/\{[\s\S]*\}/);
    if (match) {
      const rewritten = JSON.parse(match[0]);
      return {
        title: rewritten.title,
        description: rewritten.description
      };
    }

    return simpleRewrite(title, description);

  } catch (error) {
    console.error('AI rewriting error:', error);
    return simpleRewrite(title, description);
  }
}

/**
 * Parse WRAL RSS feed
 */
async function fetchWRALFeed(): Promise<WRALArticle[]> {
  const RSS_URL = 'https://www.wral.com/news/rss/48';

  try {
    const response = await fetch(RSS_URL, {
      headers: {
        'User-Agent': 'FightingCrimeNC/1.0 (+https://fightingcrimenc.com)'
      }
    });

    if (!response.ok) {
      throw new Error(`WRAL RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();
    const articles: WRALArticle[] = [];

    // Parse XML items
    const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/gi);
    if (!itemMatches) return articles;

    for (const itemXml of itemMatches) {
      // Extract fields
      const titleMatch = itemXml.match(/<title[^>]*>(.*?)<\/title>/i);
      const linkMatch = itemXml.match(/<link[^>]*>(.*?)<\/link>/i);
      const descMatch = itemXml.match(/<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>/i) ||
                       itemXml.match(/<description[^>]*>(.*?)<\/description>/i);
      const pubDateMatch = itemXml.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i);
      const imageMatch = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);

      if (!titleMatch || !linkMatch) continue;

      const title = titleMatch[1]
        .replace(/<!\[CDATA\[/g, '')
        .replace(/\]\]>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();

      const description = (descMatch?.[1] || '')
        .replace(/<!\[CDATA\[/g, '')
        .replace(/\]\]>/g, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();

      // Filter: only crime-related articles
      if (!isCrimeRelated(title, description)) {
        continue;
      }

      const link = linkMatch[1].trim();
      const pubDate = pubDateMatch?.[1] || new Date().toISOString();
      const image = imageMatch?.[1];
      const category = categorizeCrime(title, description);
      const location = extractLocation(title, description);

      articles.push({
        id: `wral-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        link,
        pubDate,
        description,
        category,
        source: 'WRAL News',
        location,
        image,
        originalTitle: title,
        rewritten: false
      });
    }

    return articles;

  } catch (error) {
    console.error('Error fetching WRAL feed:', error);
    return [];
  }
}

/**
 * Main API handler
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Cache for 30 minutes
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  try {
    console.log('🚀 Fetching WRAL crime news...');

    // Get API configuration from environment
    const claudeApiKey = process.env.ANTHROPIC_API_KEY;
    const rewriteApiUrl = process.env.REWRITE_API_URL;

    // Fetch articles
    const articles = await fetchWRALFeed();

    console.log(`📰 Found ${articles.length} crime articles`);

    // Determine rewrite mode
    const customApiEnabled = !!rewriteApiUrl;
    const aiRewriteEnabled = !customApiEnabled && claudeApiKey && claudeApiKey !== 'YOUR_ANTHROPIC_API_KEY';

    if (customApiEnabled) {
      console.log('🔌 Custom API rewriting enabled');

      for (const article of articles) {
        try {
          const rewritten = await rewriteWithAI(
            article.title,
            article.description,
            undefined,
            rewriteApiUrl
          );

          article.originalTitle = article.title;
          article.title = rewritten.title;
          article.description = rewritten.description;
          article.rewritten = true;

        } catch (error) {
          console.error('Rewriting failed for article:', article.id, error);
        }
      }
    } else if (aiRewriteEnabled) {
      console.log('🤖 AI rewriting enabled');

      for (const article of articles) {
        try {
          const rewritten = await rewriteWithAI(
            article.title,
            article.description,
            claudeApiKey
          );

          article.originalTitle = article.title;
          article.title = rewritten.title;
          article.description = rewritten.description;
          article.rewritten = true;

        } catch (error) {
          console.error('Rewriting failed for article:', article.id, error);
        }
      }
    } else {
      console.log('⚠️  AI rewriting disabled - using local-only cleaning');

      // Use simple rewrite for all
      for (const article of articles) {
        const rewritten = simpleRewrite(article.title, article.description);
        article.originalTitle = article.title;
        article.title = rewritten.title;
        article.description = rewritten.description;
        article.rewritten = false;
      }
    }

    // Sort by date
    articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    // Return top 20
    const topArticles = articles.slice(0, 20);

    let message = 'Using local-only cleaning (add REWRITE_API_URL or ANTHROPIC_API_KEY for AI)';
    if (customApiEnabled) {
      message = 'Articles rewritten with custom API';
    } else if (aiRewriteEnabled) {
      message = 'Articles rewritten with AI';
    }

    return res.status(200).json({
      success: true,
      articles: topArticles,
      totalArticles: topArticles.length,
      aiRewriting: customApiEnabled || aiRewriteEnabled,
      source: 'WRAL News',
      timestamp: new Date().toISOString(),
      message
    });

  } catch (error) {
    console.error('Fatal error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to fetch crime news',
      message: error instanceof Error ? error.message : 'Unknown error',
      articles: [],
      totalArticles: 0,
      timestamp: new Date().toISOString()
    });
  }
}
