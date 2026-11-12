import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, BookOpen, ArrowRight, X } from 'lucide-react';
import { postAPI, categoryAPI } from '../api/client';
import BlogCard from '../components/blog/BlogCard';
import Pagination from '../components/common/Pagination';
import SEOHead from '../components/common/SEOHead';

const BlogListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'latest';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // Local search input
  const [keywordInput, setKeywordInput] = useState(searchParam);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryAPI.getCategories();
        setCategories(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await postAPI.getPosts({
          category: categoryParam,
          search: searchParam,
          sort: sortParam,
          page: pageParam,
          limit: 9,
        });
        setPosts(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalPosts(res.data.total || 0);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryParam, searchParam, sortParam, pageParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQuery({ search: keywordInput.trim(), page: 1 });
  };

  const handleCategorySelect = (slug) => {
    updateQuery({ category: slug === categoryParam ? '' : slug, page: 1 });
  };

  const handleSortChange = (newSort) => {
    updateQuery({ sort: newSort, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateQuery({ page: newPage });
  };

  const updateQuery = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(updates).forEach((key) => {
      if (updates[key]) {
        params.set(key, updates[key]);
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params);
  };

  const activeCategory = categories.find((c) => c.slug === categoryParam);

  return (
    <>
      <SEOHead
        title={activeCategory ? `${activeCategory.name} Articles | TechNova Blog` : 'All Articles & Engineering Archive | TechNova Blog'}
        description={activeCategory?.description || 'Browse all published engineering articles, cloud architecture blueprints, and AI analysis.'}
        type="website"
      />

      <div className="bg-[#f8fafc] min-h-screen py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner (Zoho Style) */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-10 mb-8 shadow-xs">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#E42528]">
                <span>ARCHIVE & PUBLICATIONS</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {activeCategory ? activeCategory.name : searchParam ? `Search: "${searchParam}"` : 'All Engineering Articles'}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeCategory
                  ? activeCategory.description || `In-depth articles, production blueprints, and analysis for ${activeCategory.name}.`
                  : 'Deep-dive explorations of distributed systems, cloud computing, cybersecurity postures, and software engineering craft.'}
              </p>
            </div>
          </div>

          {/* Filtering & Search Toolbar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles by title, topic..."
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              {keywordInput && (
                <button
                  type="button"
                  onClick={() => {
                    setKeywordInput('');
                    updateQuery({ search: '', page: 1 });
                  }}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Sort & Count */}
            <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs text-slate-500">
                <strong className="text-slate-800 font-semibold">{totalPosts}</strong> articles found
              </span>

              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortParam}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="text-xs font-medium border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                >
                  <option value="latest">Newest First</option>
                  <option value="views">Most Popular</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Filter Chips Bar */}
          <div className="mb-8 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleCategorySelect('')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                !categoryParam
                  ? 'bg-[#E42528] text-white font-bold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Topics ({totalPosts})
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition flex items-center space-x-1.5 whitespace-nowrap ${
                  categoryParam === cat.slug
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color || '#E42528' }} />
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-60">({cat.postCount || 0})</span>
              </button>
            ))}
          </div>

          {/* Articles Feed */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-10 h-10 border-4 border-[#E42528] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-16 text-center space-y-4 max-w-lg mx-auto shadow-xs">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No articles matched your criteria</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Try searching for a different keyword or resetting your category filter.
              </p>
              <button
                onClick={() => {
                  setKeywordInput('');
                  setSearchParams({});
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-[#E42528] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* 3-column Zoho-style grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {posts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {/* Numbered Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={pageParam}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default BlogListing;
