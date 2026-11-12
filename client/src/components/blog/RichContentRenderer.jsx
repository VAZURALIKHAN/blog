import React, { useMemo } from 'react';

const RichContentRenderer = ({ content }) => {
  // Ensure all <h2> and <h3> have an id attribute matching their text slug for TOC linking
  const processedHtml = useMemo(() => {
    if (!content) return '';

    return content.replace(
      /<(h[23])([^>]*)>(.*?)<\/\1>/gi,
      (match, tag, attrs, text) => {
        // If an id already exists, keep it
        if (/id=["'][^"']*["']/i.test(attrs)) {
          return match;
        }
        // Generate slug from text
        const cleanText = text.replace(/<\/?[^>]+(>|$)/g, '').trim();
        const slug = cleanText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        return `<${tag} id="${slug}" ${attrs}>${text}</${tag}>`;
      }
    );
  }, [content]);

  return (
    <div
      className="article-prose"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
};

export default RichContentRenderer;
