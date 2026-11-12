const slugifyPkg = require('slugify');

/**
 * Generate a clean, URL-safe slug from a string
 */
const generateSlug = (text) => {
  return slugifyPkg(text, {
    lower: true,
    strict: true,
    trim: true,
  });
};

/**
 * Calculate estimated reading time in minutes
 */
const calculateReadingTime = (content) => {
  if (!content) return 1;
  // Strip HTML tags
  const cleanText = content.replace(/<\/?[^>]+(>|$)/g, ' ');
  const wordCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

/**
 * Extract Table of Contents from HTML/Markdown headings (h2, h3)
 */
const extractTableOfContents = (content) => {
  if (!content) return [];
  const toc = [];
  
  // Match HTML headings <h2> and <h3>
  const headingRegex = /<(h[23])(?:[^>]*id=["']([^"']*)["'])?[^>]*>(.*?)<\/\1>/gi;
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1].charAt(1), 10);
    const text = match[3].replace(/<\/?[^>]+(>|$)/g, '').trim();
    const id = match[2] || generateSlug(text);
    
    if (text) {
      toc.push({ id, text, level });
    }
  }

  // If no HTML headings found, try markdown style `## Heading` and `### Heading`
  if (toc.length === 0) {
    const mdLines = content.split('\n');
    for (const line of mdLines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        const text = trimmed.replace(/^###\s+/, '').trim();
        toc.push({ id: generateSlug(text), text, level: 3 });
      } else if (trimmed.startsWith('## ')) {
        const text = trimmed.replace(/^##\s+/, '').trim();
        toc.push({ id: generateSlug(text), text, level: 2 });
      }
    }
  }

  return toc;
};

module.exports = {
  generateSlug,
  calculateReadingTime,
  extractTableOfContents,
};
