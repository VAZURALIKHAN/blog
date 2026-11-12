const mongoose = require('mongoose');
const Post = require('../models/Post');
const Category = require('../models/Category');
const storage = require('../config/storage');

const isMongo = () => mongoose.connection.readyState === 1;

exports.getSitemapXml = async (req, res, next) => {
  try {
    const siteUrl = process.env.SITE_URL || 'http://localhost:5173';

    let posts = [];
    let categories = [];

    if (isMongo()) {
      posts = await Post.find({
        $or: [
          { status: 'published' },
          { status: 'scheduled', scheduledAt: { $lte: new Date() } },
        ],
      }).select('slug updatedAt');
      categories = await Category.find().select('slug updatedAt');
    } else {
      posts = storage.data.posts
        .filter(
          (p) =>
            p.status === 'published' ||
            (p.status === 'scheduled' && new Date(p.scheduledAt) <= new Date())
        )
        .map((p) => ({ slug: p.slug, updatedAt: p.updatedAt || p.publishedAt }));
      categories = storage.data.categories.map((c) => ({ slug: c.slug, updatedAt: c.updatedAt }));
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blogs</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

    categories.forEach((cat) => {
      xml += `  <url>
    <loc>${siteUrl}/blogs?category=${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    posts.forEach((post) => {
      const lastMod = post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString();
      xml += `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
};

exports.getRobotsTxt = (req, res) => {
  const siteUrl = process.env.SITE_URL || 'http://localhost:5173';
  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.status(200).send(robots);
};
