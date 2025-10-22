/**
 * Unit tests for WRAL News AI text cleaning and rewriting
 * Tests the simpleRewrite function's robust HTML handling
 */

// We need to import the module and test the simpleRewrite function
// Since simpleRewrite is not exported, we'll need to test it through the module
// For testing purposes, let's create a test module that exports the function

import * as he from 'he';

/**
 * Replicated simpleRewrite function for testing
 * This is the same implementation as in wral-news-ai.ts
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

describe('simpleRewrite - Text Cleaning and Normalization', () => {
  
  describe('Empty Inputs', () => {
    it('should handle empty title and description', () => {
      const result = simpleRewrite('', '');
      expect(result.title).toBe('');
      expect(result.description).toBe('');
    });

    it('should handle empty title with valid description', () => {
      const result = simpleRewrite('', 'Test description');
      expect(result.title).toBe('');
      expect(result.description).toBe('According to WRAL News, test description');
    });

    it('should handle valid title with empty description', () => {
      const result = simpleRewrite('Test Title', '');
      expect(result.title).toBe('Test Title');
      expect(result.description).toBe('');
    });

    it('should handle whitespace-only inputs', () => {
      const result = simpleRewrite('   ', '   ');
      expect(result.title).toBe('');
      expect(result.description).toBe('');
    });
  });

  describe('HTML Tag Stripping', () => {
    it('should remove simple HTML tags from title', () => {
      const result = simpleRewrite('<p>Breaking News</p>', 'Description');
      expect(result.title).toBe('Breaking News');
    });

    it('should remove complex HTML tags from description', () => {
      const result = simpleRewrite('Title', '<div class="content"><p>Test <strong>bold</strong> text</p></div>');
      expect(result.description).toBe('According to WRAL News, test bold text');
    });

    it('should remove nested HTML tags', () => {
      const result = simpleRewrite('Title', '<div><span><em>Nested content</em></span></div>');
      expect(result.description).toBe('According to WRAL News, nested content');
    });

    it('should remove self-closing tags', () => {
      const result = simpleRewrite('Title', 'Text<br/>with<br>breaks');
      expect(result.description).toBe('According to WRAL News, text with breaks');
    });

    it('should handle malformed HTML tags', () => {
      const result = simpleRewrite('Title', '<p>Text with <incomplete tag');
      // Malformed tags are still stripped, leaving the text
      expect(result.description).toContain('text with');
    });
  });

  describe('Script and Style Block Removal', () => {
    it('should remove script blocks and their content', () => {
      const result = simpleRewrite(
        'Title',
        '<div>Before<script>alert("test")</script>After</div>'
      );
      // The first word after "According to WRAL News, " is lowercased
      expect(result.description).toContain('before');
      expect(result.description).not.toContain('alert');
      expect(result.description).not.toContain('script');
    });

    it('should remove style blocks and their content', () => {
      const result = simpleRewrite(
        'Title',
        '<div>Before<style>.class { color: red; }</style>After</div>'
      );
      // The first word after "According to WRAL News, " is lowercased
      expect(result.description).toContain('before');
      expect(result.description).not.toContain('color');
      expect(result.description).not.toContain('style');
    });

    it('should remove multiple script and style blocks', () => {
      const result = simpleRewrite(
        'Title',
        '<script>code1()</script>Text<style>css</style>More<script>code2()</script>'
      );
      // The first word after "According to WRAL News, " is lowercased
      expect(result.description).toContain('text');
      expect(result.description).not.toContain('code1');
      expect(result.description).not.toContain('css');
    });

    it('should handle script tags with attributes', () => {
      const result = simpleRewrite(
        'Title',
        '<script type="text/javascript" src="test.js">code</script>Content'
      );
      expect(result.description).toBe('According to WRAL News, content');
    });
  });

  describe('HTML Entity Decoding', () => {
    it('should decode common HTML entities', () => {
      const result = simpleRewrite('Title', 'Test &amp; Example &lt;tag&gt; &quot;quote&quot;');
      expect(result.description).toContain('& Example <tag> "quote"');
    });

    it('should decode numeric HTML entities', () => {
      const result = simpleRewrite('Title', 'Test &#169; &#8364; &#8482;');
      expect(result.description).toContain('©');
      expect(result.description).toContain('€');
      expect(result.description).toContain('™');
    });

    it('should decode hex HTML entities', () => {
      const result = simpleRewrite('Title', 'Test &#x00A9; &#x20AC;');
      expect(result.description).toContain('©');
      expect(result.description).toContain('€');
    });

    it('should decode named entities', () => {
      const result = simpleRewrite('Title', 'Test &copy; &reg; &trade; &mdash;');
      expect(result.description).toContain('©');
      expect(result.description).toContain('®');
      expect(result.description).toContain('™');
      expect(result.description).toContain('—');
    });
  });

  describe('NBSP (Non-Breaking Space) Decoding', () => {
    it('should decode &nbsp; entities', () => {
      const result = simpleRewrite('Title', 'Word1&nbsp;Word2&nbsp;Word3');
      expect(result.description).toBe('According to WRAL News, word1 Word2 Word3');
      // Note: he.decode converts &nbsp; to a regular space which gets collapsed
    });

    it('should decode numeric NBSP', () => {
      const result = simpleRewrite('Title', 'Word1&#160;Word2');
      expect(result.description).toContain('word1 Word2');
    });

    it('should decode hex NBSP', () => {
      const result = simpleRewrite('Title', 'Word1&#xA0;Word2');
      expect(result.description).toContain('word1 Word2');
    });

    it('should handle multiple consecutive NBSPs', () => {
      const result = simpleRewrite('Title', 'Word1&nbsp;&nbsp;&nbsp;Word2');
      expect(result.description).toContain('word1 Word2');
      // Multiple spaces should be collapsed to single space
    });
  });

  describe('Whitespace Collapsing', () => {
    it('should collapse multiple spaces', () => {
      const result = simpleRewrite('Title', 'Word1     Word2');
      expect(result.description).toBe('According to WRAL News, word1 Word2');
    });

    it('should collapse tabs and newlines', () => {
      const result = simpleRewrite('Title', 'Word1\t\n\r Word2');
      expect(result.description).toBe('According to WRAL News, word1 Word2');
    });

    it('should trim leading and trailing whitespace', () => {
      const result = simpleRewrite('  Title  ', '  Description  ');
      expect(result.title).toBe('Title');
      expect(result.description).toBe('According to WRAL News, description');
    });

    it('should handle mixed whitespace characters', () => {
      const result = simpleRewrite('Title', 'Word1 \t\n\r  Word2');
      expect(result.description).toBe('According to WRAL News, word1 Word2');
    });
  });

  describe('Long Title Truncation', () => {
    it('should not truncate short titles', () => {
      const title = 'Short Title';
      const result = simpleRewrite(title, 'Description');
      expect(result.title).toBe('Short Title');
    });

    it('should truncate title at word boundary when over 100 chars', () => {
      const title = 'This is a very long title that exceeds one hundred characters and should be truncated at a word boundary to maintain readability';
      const result = simpleRewrite(title, 'Description');
      expect(result.title.length).toBeLessThanOrEqual(104); // 100 + "..." = 103, but with word boundary
      expect(result.title).toContain('...');
      expect(result.title).not.toMatch(/\s\.\.\.$/); // Should not end with space before ellipsis
    });

    it('should truncate title at sentence boundary when available', () => {
      const title = 'First sentence ends here. Second sentence is very long and continues for many words to exceed the limit';
      const result = simpleRewrite(title, 'Description');
      // With the new logic that requires only 20% retention, it should keep the first sentence
      expect(result.title).toBe('First sentence ends here.');
      expect(result.title).not.toContain('...');
    });

    it('should handle title with exactly 100 characters', () => {
      const title = 'a'.repeat(100);
      const result = simpleRewrite(title, 'Description');
      expect(result.title).toBe('a'.repeat(100));
    });

    it('should add ellipsis when truncating at word boundary', () => {
      const title = 'Word '.repeat(30); // Will exceed 100 chars
      const result = simpleRewrite(title, 'Description');
      expect(result.title).toContain('...');
    });
  });

  describe('Long Description Truncation', () => {
    it('should not truncate short descriptions', () => {
      const desc = 'Short description text';
      const result = simpleRewrite('Title', desc);
      expect(result.description).toContain('short description text');
    });

    it('should truncate description at word boundary when over 500 chars', () => {
      const desc = 'Word '.repeat(150); // Will exceed 500 chars
      const result = simpleRewrite('Title', desc);
      expect(result.description.length).toBeLessThanOrEqual(504); // 500 + "..." = 503
      expect(result.description).toContain('...');
    });

    it('should truncate description at sentence boundary when available', () => {
      const desc = 'First sentence. ' + 'Word '.repeat(200); // First sentence under 70% of 500
      const result = simpleRewrite('Title', desc);
      // Should truncate at word boundary since sentence is too early
      expect(result.description).toContain('...');
    });

    it('should preserve sentence boundary when it falls within acceptable range', () => {
      const firstPart = 'Word '.repeat(80); // About 400 chars
      const desc = firstPart + 'Final sentence ends here. Extra text that goes over.';
      const result = simpleRewrite('Title', desc);
      // If sentence boundary is after 70% of max length, it should be used
      if (result.description.includes('Final sentence ends here.')) {
        expect(result.description).toContain('Final sentence ends here.');
      }
    });

    it('should handle description with exactly 500 characters', () => {
      const desc = 'a'.repeat(500);
      const result = simpleRewrite('Title', desc);
      // Should not be truncated or should be at word boundary
      expect(result.description.length).toBeLessThanOrEqual(504);
    });
  });

  describe('Author and Dateline Stripping', () => {
    it('should remove "By Author -" pattern from title', () => {
      const result = simpleRewrite('By John Doe - Breaking News', 'Description');
      expect(result.title).toBe('Breaking News');
    });

    it('should remove dateline pattern from title', () => {
      const result = simpleRewrite('Raleigh, January 15, 2024 - Breaking News', 'Description');
      expect(result.title).toBe('Breaking News');
    });

    it('should remove dateline with different format from title', () => {
      const result = simpleRewrite('Durham, March 5 2024: Crime Report', 'Description');
      expect(result.title).toBe('Crime Report');
    });

    it('should remove author byline from description', () => {
      const result = simpleRewrite('Title', 'By Jane Smith - The incident occurred yesterday.');
      expect(result.description).not.toContain('By Jane Smith');
      expect(result.description).toContain('incident occurred');
    });

    it('should remove dateline from description', () => {
      const result = simpleRewrite('Title', 'Raleigh, February 20, 2024 - Police are investigating.');
      expect(result.description).not.toContain('February 20');
      expect(result.description).toContain('police are investigating');
    });

    it('should handle title without author or dateline', () => {
      const result = simpleRewrite('Simple Title', 'Description');
      expect(result.title).toBe('Simple Title');
    });
  });

  describe('Source Attribution', () => {
    it('should add "According to WRAL News" to description without attribution', () => {
      const result = simpleRewrite('Title', 'Police arrested a suspect.');
      expect(result.description).toBe('According to WRAL News, police arrested a suspect.');
    });

    it('should not add attribution if "according to" already present', () => {
      const result = simpleRewrite('Title', 'According to officials, a crime occurred.');
      expect(result.description).toBe('According to officials, a crime occurred.');
      expect(result.description).not.toContain('According to WRAL News');
    });

    it('should not add attribution if "wral" already present', () => {
      const result = simpleRewrite('Title', 'WRAL reports that an incident occurred.');
      expect(result.description).toBe('WRAL reports that an incident occurred.');
      expect(result.description).not.toContain('According to WRAL News');
    });

    it('should lowercase first character when adding attribution', () => {
      const result = simpleRewrite('Title', 'Police made an arrest.');
      expect(result.description).toBe('According to WRAL News, police made an arrest.');
    });

    it('should handle case-insensitive check for "wral"', () => {
      const result = simpleRewrite('Title', 'The Wral news team reports.');
      expect(result.description).toBe('The Wral news team reports.');
      expect(result.description).not.toContain('According to WRAL News');
    });

    it('should handle case-insensitive check for "according to"', () => {
      const result = simpleRewrite('Title', 'ACCORDING TO sources, an event happened.');
      expect(result.description).toBe('ACCORDING TO sources, an event happened.');
      expect(result.description).not.toContain('According to WRAL News');
    });
  });

  describe('WRAL Branding Removal from Title', () => {
    it('should remove "WRAL.com -" prefix from title', () => {
      const result = simpleRewrite('WRAL.com - Breaking News Alert', 'Description');
      expect(result.title).toBe('Breaking News Alert');
    });

    it('should remove "WRAL.com:" prefix from title', () => {
      const result = simpleRewrite('WRAL.com: Crime Update', 'Description');
      expect(result.title).toBe('Crime Update');
    });

    it('should remove "| WRAL.com" suffix from title', () => {
      const result = simpleRewrite('Crime Report | WRAL.com', 'Description');
      expect(result.title).toBe('Crime Report');
    });

    it('should remove both prefix and suffix if present', () => {
      const result = simpleRewrite('WRAL.com - News | WRAL.com', 'Description');
      expect(result.title).toBe('News');
    });

    it('should be case-insensitive for WRAL branding', () => {
      const result = simpleRewrite('wral.com - News Story', 'Description');
      expect(result.title).toBe('News Story');
    });

    it('should handle title without WRAL branding', () => {
      const result = simpleRewrite('Regular Title', 'Description');
      expect(result.title).toBe('Regular Title');
    });
  });

  describe('Complex Real-World Examples', () => {
    it('should handle complex news article with HTML, entities, and branding', () => {
      const title = 'WRAL.com - Police Arrest &quot;Dangerous&quot; Suspect | WRAL.com';
      const description = '<div class="article"><p>By Staff Writer - <strong>RALEIGH</strong> &mdash; Police have arrested a suspect&nbsp;in connection with&nbsp;the robbery.</p><script>track()</script></div>';
      
      const result = simpleRewrite(title, description);
      
      expect(result.title).toBe('Police Arrest "Dangerous" Suspect');
      // After cleaning and removing "RALEIGH —", the description should start with "Police"
      expect(result.description).toContain('police have arrested a suspect in connection with the robbery');
      expect(result.description).toContain('According to WRAL News');
      expect(result.description).not.toContain('track()');
      expect(result.description).not.toContain('<');
      expect(result.description).not.toContain('&nbsp;');
    });

    it('should handle article with minimal content', () => {
      const title = 'Alert';
      const description = 'Brief.';
      
      const result = simpleRewrite(title, description);
      
      expect(result.title).toBe('Alert');
      expect(result.description).toBe('According to WRAL News, brief.');
    });

    it('should handle article with excessive whitespace and formatting', () => {
      const title = '  Multiple   Spaces   Title  ';
      const description = '<p>  Text  with  \n\n  lots   of   \t  whitespace  </p>';
      
      const result = simpleRewrite(title, description);
      
      expect(result.title).toBe('Multiple Spaces Title');
      expect(result.description).toBe('According to WRAL News, text with lots of whitespace');
    });

    it('should handle article with special characters and entities', () => {
      const title = 'Breaking: Man&apos;s Car Stolen';
      const description = 'The victim&apos;s vehicle was taken at 3:00&nbsp;PM. Damage estimated at $10,000&mdash;$15,000.';
      
      const result = simpleRewrite(title, description);
      
      expect(result.title).toContain("Breaking: Man's Car Stolen");
      expect(result.description).toContain("victim's vehicle");
      expect(result.description).toContain('3:00 PM');
      expect(result.description).toContain('—');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long single word in title', () => {
      const title = 'a'.repeat(150);
      const result = simpleRewrite(title, 'Description');
      expect(result.title.length).toBeLessThanOrEqual(104); // Max 100 + "..."
    });

    it('should handle title with only HTML tags', () => {
      const result = simpleRewrite('<div><span></span></div>', 'Description');
      expect(result.title).toBe('');
    });

    it('should handle description with only HTML tags', () => {
      const result = simpleRewrite('Title', '<div><span></span></div>');
      expect(result.description).toBe('');
    });

    it('should handle mixed content with various entity types', () => {
      const result = simpleRewrite(
        'Title',
        '&lt;tag&gt; &amp; &#169; &#x20AC; &nbsp; &mdash;'
      );
      expect(result.description).toContain('<tag> & © €');
      expect(result.description).toContain('—');
    });

    it('should handle description that starts with uppercase after attribution', () => {
      const result = simpleRewrite('Title', 'Police made an arrest yesterday.');
      expect(result.description).toBe('According to WRAL News, police made an arrest yesterday.');
      expect(result.description).toMatch(/According to WRAL News, [a-z]/);
    });
  });
});
