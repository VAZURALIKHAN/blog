import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Flame,
  Layers,
  ChevronRight,
  Send,
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  Sparkles,
} from 'lucide-react';
import { postAPI, categoryAPI, authorAPI } from '../api/client';
import BlogCard from '../components/blog/BlogCard';
import FeaturedHero from '../components/blog/FeaturedHero';
import SEOHead from '../components/common/SEOHead';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [featRes, latestRes, trendRes, catRes, authorRes] = await Promise.all([
          postAPI.getFeaturedPosts(),
          postAPI.getPosts({ limit: 6 }),
          postAPI.getTrendingPosts(),
          categoryAPI.getCategories(),
          authorAPI.getAuthors().catch(() => ({ data: { data: [] } })),
        ]);
        setFeaturedPosts(featRes.data.data || []);
        setLatestPosts(latestRes.data.data || []);
        setTrendingPosts(trendRes.data.data || []);
        setCategories(catRes.data.data || []);
        setAuthors(authorRes.data.data || []);
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/blogs?search=${encodeURIComponent(searchKeyword.trim())}`);
    }
  };

  const handleCategorySelect = async (catSlug) => {
    setSelectedCategory(catSlug);
    try {
      const res = await postAPI.getPosts({ category: catSlug, limit: 6 });
      setLatestPosts(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribedSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribedSuccess(false), 5000);
    }
  };

  const spotlightAuthor = authors.length > 0 ? authors[0] : null;

  return (
    <>
      <SEOHead
        title="TechNova Blog | Enterprise Software & Engineering Insights"
        description="Explore in-depth technical analysis, cloud architectural patterns, artificial intelligence breakthroughs, and cybersecurity best practices."
        type="website"
      />

      <div className="bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* Zoho-Style Hero Banner Heading */}
          <div className="mb-10 pb-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#E42528] mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#E42528] animate-pulse" />
                  <span>The Engineering & Technology Journal</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Perspectives for Software Architects & Builders
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                  Real-world distributed systems, generative AI frameworks, and cloud engineering written by practitioners.
                </p>
              </div>

              {/* Quick Search Input (Zoho Clean Style) */}
              <form onSubmit={handleSearch} className="w-full md:w-80 flex-shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles & topics..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full pl-9 pr-20 py-2.5 text-xs rounded-lg border border-slate-300 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 px-3 py-1 bg-slate-900 hover:bg-[#E42528] text-white text-xs font-bold rounded-md transition"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Loading Indicator */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-10 h-10 border-4 border-[#E42528] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* 1. Zoho Spotlight / Featured Hero Section */}
              <FeaturedHero posts={featuredPosts} />

              {/* 2. Zoho Signature Newsletter CTA Banner */}
              <div className="my-12 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
                {/* Zoho 4-color top border line */}
                <div className="flex h-1.5">
                  <div className="flex-1 bg-[#E42528]" />
                  <div className="flex-1 bg-[#10B981]" />
                  <div className="flex-1 bg-[#2563EB]" />
                  <div className="flex-1 bg-[#F59E0B]" />
                </div>

                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-red-50 text-[#E42528]">
                      Weekly Technical Briefing
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      Stay Ahead in Distributed Tech & Architecture
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                      Get curated engineering blueprints, security alerts, and system architecture breakdowns delivered to your inbox every Thursday.
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    {subscribedSuccess ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-2 text-emerald-800 text-xs font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Thank you! You are subscribed to our weekly newsletter.</span>
                      </div>
                    ) : (
                      <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          required
                          placeholder="Enter your work email address"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-lg bg-[#E42528] hover:bg-[#c71c1e] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center space-x-1.5 flex-shrink-0"
                        >
                          <span>Subscribe</span>
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Main Articles Feed & Sidebar (Zoho 8-col + 4-col Layout) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Main Article Stream (8 Columns) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Category Filter Pills (Zoho Style) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-5 bg-slate-900 rounded-sm" />
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        {selectedCategory
                          ? categories.find((c) => c.slug === selectedCategory)?.name || 'Filtered Stories'
                          : 'Latest Engineering Stories'}
                      </h2>
                    </div>

                    <Link
                      to="/blogs"
                      className="text-xs font-semibold text-[#E42528] hover:text-[#c71c1e] flex items-center gap-1"
                    >
                      <span>View All Articles</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Horizontal Category Switcher Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                    <button
                      onClick={() => handleCategorySelect('')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        selectedCategory === ''
                          ? 'bg-[#E42528] text-white font-bold shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => handleCategorySelect(cat.slug)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition flex items-center space-x-1.5 whitespace-nowrap ${
                          selectedCategory === cat.slug
                            ? 'bg-slate-900 text-white font-bold shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color || '#E42528' }} />
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Articles Card Grid */}
                  {latestPosts.length === 0 ? (
                    <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500">
                      <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-semibold text-slate-700 text-sm">No articles found in this category.</p>
                      <button
                        onClick={() => handleCategorySelect('')}
                        className="mt-3 text-xs font-bold text-[#E42528] hover:underline"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {latestPosts.map((post) => (
                        <BlogCard key={post._id} post={post} />
                      ))}
                    </div>
                  )}

                  {/* Archive CTA */}
                  <div className="pt-6 text-center">
                    <Link
                      to="/blogs"
                      className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-sm transition"
                    >
                      <span>Explore Full Article Archive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Zoho Corporate Sidebar (4 Columns) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Widget 1: Trending Reads (Numbered 01, 02, 03) */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                    <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-100">
                      <Flame className="w-4 h-4 text-[#E42528]" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                        Most Popular Reads
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {trendingPosts.slice(0, 5).map((post, idx) => (
                        <article key={post._id} className="group flex items-start space-x-3.5 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                          <span className="text-xl font-extrabold text-slate-300 group-hover:text-[#E42528] transition-colors w-7 flex-shrink-0 font-mono">
                            0{idx + 1}
                          </span>
                          <div className="min-w-0 space-y-1">
                            {post.category && (
                              <span
                                className="text-[10px] font-bold uppercase tracking-wider block"
                                style={{ color: post.category.color || '#E42528' }}
                              >
                                {post.category.name}
                              </span>
                            )}
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#E42528] transition-colors line-clamp-2 leading-snug">
                              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                            </h4>
                            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                              <span>{post.readingTime || 3} min read</span>
                              <span>•</span>
                              <span>{post.views || 0} views</span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* Widget 2: Topic Taxonomy Tags (Zoho Style) */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                    <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-100">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                        Explore by Topics
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat._id}
                          to={`/blogs?category=${cat.slug}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-[#E42528] border border-slate-200/80 hover:border-red-200 text-xs font-medium transition flex items-center space-x-1.5"
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({cat.postCount || 0})
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Widget 3: Author Spotlight */}
                  {spotlightAuthor && (
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                      <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-100">
                        <Award className="w-4 h-4 text-amber-500" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                          Author Spotlight
                        </h3>
                      </div>

                      <div className="flex items-start space-x-3.5">
                        <img
                          src={spotlightAuthor.avatar}
                          alt={spotlightAuthor.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
                        />
                        <div className="space-y-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-900">
                            {spotlightAuthor.name}
                          </h4>
                          <p className="text-[11px] font-semibold text-[#E42528]">
                            {spotlightAuthor.role}
                          </p>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {spotlightAuthor.bio}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <Link
                          to={`/blogs?author=${spotlightAuthor._id}`}
                          className="text-xs font-bold text-[#E42528] hover:underline flex items-center justify-between"
                        >
                          <span>Read articles by {spotlightAuthor.name.split(' ')[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Widget 4: Corporate Quick Links (Zoho Style) */}
                  <div className="bg-[#191919] text-white rounded-xl p-6 shadow-sm space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E42528]">
                      EDITORIAL POLICIES
                    </span>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      Open Peer-Reviewed Standards
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Every code blueprint and architectural pattern published is container-tested for reproducibility and verified by domain engineers.
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/about"
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#ff6b6b] hover:text-white transition"
                      >
                        <span>Learn our editorial guidelines</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default Home;
