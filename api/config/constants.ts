/**
 * API Configuration Constants
 * Centralized configuration values to avoid magic numbers
 */

/**
 * HTTP Request Configuration
 */
export const HTTP_CONFIG = {
  /** Default timeout for HTTP requests in milliseconds */
  DEFAULT_TIMEOUT_MS: 8000,

  /** User agent for web scraping requests */
  USER_AGENT: 'Mozilla/5.0 (compatible; FightingCrimeNC-Bot/1.0)',

  /** User agent for RSS feed requests */
  RSS_USER_AGENT: 'FightingCrimeNC/1.0 (+https://fightingcrimenc.com)',
} as const;

/**
 * Text Processing Configuration
 */
export const TEXT_CONFIG = {
  /** Maximum title length in characters */
  MAX_TITLE_LENGTH: 100,

  /** Maximum description length in characters */
  MAX_DESCRIPTION_LENGTH: 500,

  /** Maximum RSS description length in characters */
  MAX_RSS_DESCRIPTION_LENGTH: 300,

  /** Minimum percentage of max length to keep when truncating at sentence boundary */
  SENTENCE_TRUNCATE_MIN_RATIO: 0.2,

  /** Minimum percentage of max length to keep when truncating at word boundary */
  WORD_TRUNCATE_MIN_RATIO: 0.8,
} as const;

/**
 * Cache Configuration
 */
export const CACHE_CONFIG = {
  /** WRAL News API cache duration in seconds (30 minutes) */
  WRAL_NEWS_CACHE_SECONDS: 1800,

  /** WRAL News stale-while-revalidate duration in seconds (1 hour) */
  WRAL_NEWS_SWR_SECONDS: 3600,

  /** News scraper cache duration in seconds (5 minutes) */
  NEWS_SCRAPER_CACHE_SECONDS: 300,

  /** News scraper stale-while-revalidate duration in seconds (10 minutes) */
  NEWS_SCRAPER_SWR_SECONDS: 600,

  /** RSS aggregator cache duration in seconds (5 minutes) */
  RSS_CACHE_SECONDS: 300,

  /** RSS aggregator stale-while-revalidate duration in seconds (10 minutes) */
  RSS_SWR_SECONDS: 600,
} as const;

/**
 * API Response Configuration
 */
export const API_CONFIG = {
  /** Maximum number of articles to return from WRAL News API */
  MAX_WRAL_ARTICLES: 20,

  /** Maximum number of articles to scrape per department */
  MAX_ARTICLES_PER_DEPARTMENT: 15,

  /** Maximum number of RSS items to return per source */
  MAX_RSS_ITEMS_PER_SOURCE: 20,

  /** Maximum number of RSS items to display on frontend */
  MAX_FRONTEND_RSS_ITEMS: 20,
} as const;

/**
 * AI Rewriting Configuration
 */
export const AI_CONFIG = {
  /** Claude API version */
  ANTHROPIC_API_VERSION: '2023-06-01',

  /** Claude model to use for rewriting */
  CLAUDE_MODEL: 'claude-3-5-sonnet-20241022',

  /** Maximum tokens for AI responses */
  MAX_TOKENS: 1024,

  /** Placeholder for unset API key */
  UNSET_API_KEY_PLACEHOLDER: 'YOUR_ANTHROPIC_API_KEY',
} as const;

/**
 * Application URLs
 */
export const URLS = {
  /** Production site URL */
  SITE_URL: 'https://fightingcrimenc.com',

  /** WRAL RSS feed URL */
  WRAL_RSS_URL: 'https://www.wral.com/news/rss/48',

  /** Anthropic API endpoint */
  ANTHROPIC_API_URL: 'https://api.anthropic.com/v1/messages',
} as const;

/**
 * CORS Headers
 */
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
} as const;
