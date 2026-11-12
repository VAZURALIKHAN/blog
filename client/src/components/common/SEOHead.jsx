import { useEffect } from 'react';

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'article',
  publishedTime,
  authorName,
}) => {
  useEffect(() => {
    const siteTitle = 'TechNova | Technology & Engineering Blog';
    const finalTitle = title ? `${title} | TechNova` : siteTitle;
    document.title = finalTitle;

    const defaultDesc =
      'Explore deep-dive technical articles, cloud architectures, AI breakthroughs, and cybersecurity best practices.';
    const finalDesc = description || defaultDesc;
    const finalUrl = url || window.location.href;
    const finalImage =
      image ||
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80';

    // Helper to set meta tag
    const setMetaTag = (attr, key, content) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', finalDesc);
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);
    }

    // Open Graph Meta Tags
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:image', finalImage);
    setMetaTag('property', 'og:url', finalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'TechNova Blog');

    // Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', finalImage);

    // Schema.org JSON-LD Structured Data
    let scriptTag = document.getElementById('jsonld-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (type === 'article') {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        image: [finalImage],
        datePublished: publishedTime || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: authorName || 'TechNova Engineering Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'TechNova',
          logo: {
            '@type': 'ImageObject',
            url: `${window.location.origin}/logo.png`,
          },
        },
        description: finalDesc,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': finalUrl,
        },
      };
      scriptTag.textContent = JSON.stringify(articleSchema);
    } else {
      const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'TechNova Technology Blog',
        url: window.location.origin,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/blogs?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };
      scriptTag.textContent = JSON.stringify(websiteSchema);
    }

    return () => {
      // Cleanup can leave generic tags
    };
  }, [title, description, keywords, image, url, type, publishedTime, authorName]);

  return null;
};

export default SEOHead;
