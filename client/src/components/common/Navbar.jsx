import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, ShieldCheck, Mail, Send, CheckCircle2, Bookmark, Flame } from 'lucide-react';
import Logo from './Logo';
import { categoryAPI } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await categoryAPI.getCategories();
        setCategories(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCats();
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSearchModal(false);
    setShowSubscribeModal(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blogs?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchModal(false);
      setSearchQuery('');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribeEmail.trim()) {
      setSubscribedSuccess(true);
      setTimeout(() => {
        setSubscribedSuccess(false);
        setShowSubscribeModal(false);
        setSubscribeEmail('');
      }, 2500);
    }
  };

  const activeCategoryParam = new URLSearchParams(location.search).get('category') || '';

  return (
    <>
      {/* Top Corporate Ecosystem Utility Bar (Zoho Global Nav Style) */}
      <div className="bg-[#191919] text-[#a0a0a0] text-xs py-1.5 px-4 border-b border-[#2d2d2d]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#E42528]/20 text-[#ff6b6b]">
              ENTERPRISE SAAS & ENGINEERING
            </span>
            <span className="hidden md:inline text-[#888888]">
              Architectural Insights, Product Systems & Deep Technical Perspectives
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[12px]">
            <Link to="/about" className="hover:text-white transition">About Us</Link>
            <span className="text-[#3d3d3d]">|</span>
            <Link to="/blogs" className="hover:text-white transition">All Publications</Link>
            <span className="text-[#3d3d3d]">|</span>
            <Link
              to={isAuthenticated ? "/admin" : "/admin/login"}
              className="inline-flex items-center space-x-1 text-[#4dabf7] hover:text-[#74c0fc] font-medium transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAuthenticated ? 'Admin CMS' : 'Author Portal'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Zoho-Style Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Zoho Brand Logo Mark */}
            <div className="flex items-center space-x-6 lg:space-x-8">
              <Link to="/" className="flex items-center group">
                <Logo className="w-7 h-7" showText={true} textClassName="text-xl" />
              </Link>

              {/* Main Desktop Navigation Items (Zoho Blog Structure) */}
              <nav className="hidden lg:flex items-center space-x-1">
                <Link
                  to="/"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    location.pathname === '/' && !location.search
                      ? 'text-[#E42528] bg-red-50/80 font-semibold'
                      : 'text-slate-700 hover:text-[#E42528] hover:bg-slate-50'
                  }`}
                >
                  All Stories
                </Link>
                <Link
                  to="/blogs?category=software-development"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    activeCategoryParam === 'software-development'
                      ? 'text-[#E42528] bg-red-50/80 font-semibold'
                      : 'text-slate-700 hover:text-[#E42528] hover:bg-slate-50'
                  }`}
                >
                  Software & Dev
                </Link>
                <Link
                  to="/blogs?category=artificial-intelligence-machine-learning"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    activeCategoryParam === 'artificial-intelligence-machine-learning'
                      ? 'text-[#E42528] bg-red-50/80 font-semibold'
                      : 'text-slate-700 hover:text-[#E42528] hover:bg-slate-50'
                  }`}
                >
                  AI & ML
                </Link>
                <Link
                  to="/blogs?category=cloud-computing"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    activeCategoryParam === 'cloud-computing'
                      ? 'text-[#E42528] bg-red-50/80 font-semibold'
                      : 'text-slate-700 hover:text-[#E42528] hover:bg-slate-50'
                  }`}
                >
                  Cloud & Infra
                </Link>
                <Link
                  to="/blogs?category=cybersecurity"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    activeCategoryParam === 'cybersecurity'
                      ? 'text-[#E42528] bg-red-50/80 font-semibold'
                      : 'text-slate-700 hover:text-[#E42528] hover:bg-slate-50'
                  }`}
                >
                  Security
                </Link>
                <Link
                  to="/about"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    location.pathname === '/about'
                      ? 'text-[#E42528] bg-red-50/80 font-semibold'
                      : 'text-slate-700 hover:text-[#E42528] hover:bg-slate-50'
                  }`}
                >
                  About
                </Link>
              </nav>
            </div>

            {/* Right Action Tools: Search, Subscribe Button, Admin */}
            <div className="flex items-center space-x-3">
              {/* Search Trigger Button */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-slate-500 bg-slate-100/80 hover:bg-slate-200/80 hover:text-slate-800 text-sm font-medium transition"
                title="Search stories"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline text-xs">Search...</span>
                <kbd className="hidden sm:inline text-[10px] bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">
                  Ctrl K
                </kbd>
              </button>

              {/* Zoho Red Subscribe CTA Button */}
              <button
                onClick={() => setShowSubscribeModal(true)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-[#E42528] text-white hover:bg-[#c71c1e] shadow-sm transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Subscribe</span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Secondary Category Horizontal Scroll Bar (Zoho Signature Feature) */}
        <div className="bg-slate-50/90 border-t border-slate-200/70 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-1 py-2 text-xs whitespace-nowrap">
              <Link
                to="/blogs"
                className={`px-3 py-1 rounded-full font-medium transition ${
                  location.pathname === '/blogs' && !activeCategoryParam
                    ? 'bg-[#E42528] text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                All Topics
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/blogs?category=${cat.slug}`}
                  className={`px-3 py-1 rounded-full font-medium transition flex items-center space-x-1.5 ${
                    activeCategoryParam === cat.slug
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: cat.color || '#E42528' }}
                  />
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-3">
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </form>

            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              All Stories
            </Link>
            <Link
              to="/blogs"
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              All Articles Archive
            </Link>
            
            <div className="pt-2 border-t border-slate-100">
              <div className="px-3 text-xs font-semibold uppercase text-slate-400 mb-2">
                Categories
              </div>
              <div className="grid grid-cols-1 gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/blogs?category=${cat.slug}`}
                    className="flex items-center space-x-2 px-3 py-1.5 text-sm text-slate-600 hover:text-[#E42528]"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                About TechNova
              </Link>
              <Link
                to={isAuthenticated ? "/admin" : "/admin/login"}
                className="block mt-2 w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800"
              >
                {isAuthenticated ? 'Admin Dashboard' : 'Author Portal Login'}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden">
            <form onSubmit={handleSearchSubmit} className="p-4 border-b border-slate-200 flex items-center space-x-3">
              <Search className="w-5 h-5 text-[#E42528]" />
              <input
                type="text"
                autoFocus
                placeholder="Search articles by title, keywords, tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-base text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowSearchModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
            <div className="p-4 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
              <span>Press <strong className="text-slate-700">Enter</strong> to search</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}

      {/* Subscribe Modal (Zoho Blog Style) */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden p-6 sm:p-8 relative">
            <button
              onClick={() => setShowSubscribeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Zoho 4-color stripe */}
            <div className="flex h-1.5 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6">
              <div className="flex-1 bg-[#E42528]" />
              <div className="flex-1 bg-[#10B981]" />
              <div className="flex-1 bg-[#2563EB]" />
              <div className="flex-1 bg-[#F59E0B]" />
            </div>

            <div className="text-center space-y-2 mb-6">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Subscribe to TechNova Digest
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join 25,000+ technology leaders and developers receiving our curated weekly engineering deep-dives, architectural breakdowns, and software trends.
              </p>
            </div>

            {subscribedSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">You are subscribed!</h4>
                <p className="text-xs text-emerald-700">Look out for our weekly digests in your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Your Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#E42528] hover:bg-[#c71c1e] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition"
                >
                  Join Newsletter
                </button>
                <p className="text-[11px] text-slate-400 text-center">
                  Zero spam. Unsubscribe anytime with 1-click.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
