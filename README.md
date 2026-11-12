# TechNova - Full Stack Technology Blog Platform (MERN Stack)

A modern, high-performance technology blog website and Content Management System (CMS) built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and styled with clean, corporate aesthetics inspired by **Zoho Blog**.

---

## 🌟 Features Overview

### 1. Public Reader Experience
- **Zoho Blog-Inspired Homepage:**
  - Header with company branding, quick category links, and instant search modal.
  - **Featured Stories Section:** Prominent highlighted hero card alongside secondary featured articles.
  - **Live Topic Filters:** Interactive category pills with article counts for quick topic switching.
  - **Latest Engineering Articles:** Clean card grid displaying thumbnails, category badges, titles, excerpts, author avatars, published dates, and reading times.
  - **Trending & Popular Sidebar:** Ranked list of high-traffic articles based on reader views.
  - **Weekly Tech Digest Banner:** Interactive corporate newsletter subscription block.
  - **Comprehensive Footer:** Company details, category links, resources, and social channels.

- **Dedicated Blog Listing Page (`/blogs`):**
  - Full archive of all published articles.
  - Keyword search across titles, excerpts, and article content.
  - Category / topic dropdown filtering.
  - Sorting by **Latest Published**, **Most Popular** (views), and **Oldest First**.
  - Interactive numbered **pagination**.

- **Dedicated Blog Detail Page (`/blog/:slug`):**
  - High-resolution featured hero image with optional photo caption.
  - Author attribution with avatar, professional title, publication date, and estimated reading time.
  - **Rich Article Content Support:** Headings (H2, H3), paragraphs, code syntax blocks, formatted tables, blockquotes, callout highlight boxes, embedded YouTube videos, and inline images.
  - **Interactive Table of Contents (TOC):** Sticky desktop sidebar that auto-spies and highlights the active heading as readers scroll, with smooth click-to-scroll.
  - **Social Sharing:** One-click sharing to Twitter / X, LinkedIn, Facebook, WhatsApp, plus instant "Copy Link" with visual toast feedback.
  - **Author Bio Card:** Author background, role, and social links (Twitter, LinkedIn, GitHub, Website).
  - **Previous & Next Article Navigation:** Dual-card navigation at the end of each post.
  - **Related Articles Grid:** 3 articles automatically recommended based on shared categories and tags.

---

### 2. Content Management System (Admin Panel - `/admin`)
- **Secure Authentication:**
  - JWT token-based authentication with bcrypt password hashing.
  - Protected route guards for the administrative console.
  - Default administrative credentials provided out-of-the-box.
- **Editorial Dashboard:**
  - High-level KPI metric cards: Total Articles, Published, Drafts, Scheduled, Categories, Authors, and Total Platform Views.
  - Recent posts table with quick action links.
- **Post Management & Publishing Workflow:**
  - **Full CRUD:** Create, view, edit, and delete articles.
  - **Publishing Statuses:**
    - `Draft`: Save articles privately during drafting.
    - `Published`: Make articles publicly visible immediately.
    - `Scheduled`: Set future publication date & time (articles automatically unlock when the scheduled time arrives).
  - **Featured Article Toggle:** Mark top posts for prominent homepage display.
  - **Rich WYSIWYG & Markdown Editor:** Toolbar supporting H2, H3, bold, italic, inline code, code blocks, tables, blockquotes, callouts, links, and video embeds.
  - **Live Content Preview:** Toggle between Edit mode and live-rendered HTML preview.
  - **Image Uploader:** Multer-backed local static image upload endpoint for featured headers and inline article graphics.
  - **SEO & Social Metadata Editor:** Custom SEO Meta Title, Meta Description, focus keywords, and auto-generated or custom URL slugs.
- **Category Management:**
  - Pre-seeded with the 7 initial requirement categories:
    1. *Software Development*
    2. *Artificial Intelligence & Machine Learning*
    3. *Web and Mobile App Development*
    4. *Technology & Innovation*
    5. *Cybersecurity*
    6. *Cloud Computing*
    7. *Industry Insights*
  - Add, edit color/description, and safely delete categories (with protection against deleting categories in use).
- **Author Management:**
  - Manage contributing writers with avatars, roles, bios, and social links.
- **SEO & Crawler Configuration:**
  - Live links and configuration for `/sitemap.xml` and `/robots.txt`.
  - Google Analytics 4 Measurement ID and Google Search Console verification meta tag settings.

---

### 3. SEO & Technical Compliance
- **SEO-Friendly URLs:** Clean, human-readable slugs (`/blog/architecting-resilient-microservices`).
- **Dynamic XML Sitemap:** Automatically served at `/sitemap.xml` including all published posts, categories, and static pages.
- **Robots.txt:** Automatically served at `/robots.txt` directing web crawlers and disallowing admin routes.
- **Open Graph Metadata:** Dynamic `og:title`, `og:description`, `og:image`, `og:url`, and `og:type` tags.
- **Schema.org Structured Data:** Dynamic JSON-LD `BlogPosting` and `WebSite` markup for Google Rich Snippets.
- **Zero-Config In-Memory Fallback:** The backend includes an automated embedded MongoDB in-memory fallback. If local MongoDB is not installed, the application runs out of the box with zero errors and auto-seeds the 7 categories, sample authors, and rich technology articles!

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS, Lucide React, Axios |
| **Backend** | Node.js, Express.js, Mongoose, JWT (`jsonwebtoken`), `bcryptjs`, `multer`, `slugify`, `morgan` |
| **Database** | MongoDB (with automatic embedded `mongodb-memory-server` fallback) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x or v20+ recommended)
- **npm** (v9+ or v10+)

### 1. Installation
Clone the repository and install all dependencies for root, server, and client with one command:
```bash
# Run from the project root
npm run install:all
```
*(Or install individually: `npm install`, `cd server && npm install`, `cd ../client && npm install`)*

### 2. Environment Configuration
The server includes a pre-configured `.env` file with defaults:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/technova_blog
JWT_SECRET=super_secret_jwt_key_technova_blog_2026_secure
CLIENT_URL=http://localhost:5173
SITE_URL=http://localhost:5173
```
> **Note:** If you do not have MongoDB running locally, the server will automatically launch an embedded in-memory MongoDB instance and auto-seed the database!

### 3. Database Seeding (Optional if not using fallback)
To manually populate the database with the 7 initial categories, 4 authors, and realistic technical articles:
```bash
npm run seed
```

### 4. Running the Application
Run both backend API and frontend Vite client simultaneously with:
```bash
npm run dev
```

The application will be live at:
- **Public Blog:** [http://localhost:5173](http://localhost:5173)
- **Admin CMS:** [http://localhost:5173/admin](http://localhost:5173/admin)
- **Backend API:** [http://localhost:5000/api/posts](http://localhost:5000/api/posts)
- **XML Sitemap:** [http://localhost:5000/sitemap.xml](http://localhost:5000/sitemap.xml)
- **Robots.txt:** [http://localhost:5000/robots.txt](http://localhost:5000/robots.txt)

---

## 🔑 Default Admin Credentials

To log into the Admin Management Panel, visit `/admin/login` and use:
- **Email:** `admin@technova.io`
- **Password:** `admin123`
*(A convenient one-click "Fill Default Demo Credentials" button is also provided on the login page)*

---

## 📡 API Reference Summary

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/posts` | Public | List published articles (supports `?category=`, `?search=`, `?sort=`, `?page=`) |
| `GET` | `/api/posts/featured` | Public | Get featured hero articles |
| `GET` | `/api/posts/trending` | Public | Get popular articles by views |
| `GET` | `/api/posts/slug/:slug` | Public | Get single article by slug + related + prev/next |
| `GET` | `/api/categories` | Public | Get all categories with post counts |
| `GET` | `/api/authors` | Public | Get all authors |
| `POST` | `/api/auth/login` | Public | Admin login, returns JWT token |
| `GET` | `/api/auth/me` | Admin | Verify current authenticated user |
| `GET` | `/api/posts/admin/stats` | Admin | Dashboard KPI metrics & recent posts |
| `GET` | `/api/posts/admin/all` | Admin | List all posts across all statuses |
| `POST` | `/api/posts/admin` | Admin | Create new article |
| `PUT` | `/api/posts/admin/:id` | Admin | Update existing article |
| `DELETE` | `/api/posts/admin/:id` | Admin | Delete article |
| `POST` | `/api/categories` | Admin | Create category |
| `PUT` | `/api/categories/:id` | Admin | Update category |
| `DELETE` | `/api/categories/:id` | Admin | Delete category |
| `POST` | `/api/authors` | Admin | Create author |
| `PUT` | `/api/authors/:id` | Admin | Update author |
| `DELETE` | `/api/authors/:id` | Admin | Delete author |
| `POST` | `/api/upload` | Admin | Upload image (multipart/form-data) |
| `GET` | `/sitemap.xml` | Public | Dynamic XML sitemap |
| `GET` | `/robots.txt` | Public | Dynamic robots.txt |

---

## 👨‍💻 Author & Contributor
- **Author:** [VAZURALIKHAN](https://github.com/VAZURALIKHAN)
- **Repository:** [https://github.com/VAZURALIKHAN/blog](https://github.com/VAZURALIKHAN/blog)

---

## 📄 License
MIT License. Built for enterprise technology publishing.
