import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Flame, TrendingUp } from 'lucide-react';

const FeaturedHero = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 4);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '';

  return (
    <section className="mb-12">
      {/* Spotlight Header with Zoho-style red accent bar */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-6 bg-[#E42528] rounded-sm" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Editor's Spotlight
          </h2>
        </div>
        <Link
          to="/blogs"
          className="text-xs font-semibold text-[#E42528] hover:text-[#c71c1e] flex items-center space-x-1"
        >
          <span>View All Featured</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main Flagship Hero Story (Left ~60% width) */}
        {mainPost && (
          <div className="lg:col-span-7 flex">
            <article className="group relative w-full bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between">
              
              {/* Cover Image */}
              <Link to={`/blog/${mainPost.slug}`} className="relative aspect-[16/9] overflow-hidden bg-slate-100 block">
                <img
                  src={mainPost.featuredImage}
                  alt={mainPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-[#E42528] text-white shadow-sm">
                    Featured
                  </span>
                  {mainPost.category && (
                    <span
                      className="px-2.5 py-1 rounded text-[11px] font-medium text-white shadow-sm"
                      style={{ backgroundColor: mainPost.category.color || '#1e293b' }}
                    >
                      {mainPost.category.name}
                    </span>
                  )}
                </div>
              </Link>

              {/* Story Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(mainPost.publishedAt)}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{mainPost.readingTime || 4} min read</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#E42528] transition-colors leading-snug tracking-tight">
                    <Link to={`/blog/${mainPost.slug}`}>{mainPost.title}</Link>
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {mainPost.excerpt}
                  </p>
                </div>

                {/* Author Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={mainPost.author?.avatar}
                      alt={mainPost.author?.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {mainPost.author?.name}
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        {mainPost.author?.role || 'Staff Engineer'}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${mainPost.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#E42528] hover:text-[#c71c1e]"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </article>
          </div>
        )}

        {/* Secondary Spotlight Stack (Right ~40% width) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5 pb-1">
            <Flame className="w-4 h-4 text-[#E42528]" />
            <span>Highlighted Stories</span>
          </div>

          {sidePosts.map((post) => (
            <article
              key={post._id}
              className="group bg-white rounded-xl border border-slate-200/90 p-4 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex gap-4 items-center flex-1"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="w-24 sm:w-28 aspect-square rounded-lg overflow-hidden flex-shrink-0 bg-slate-100"
              >
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="flex-1 min-w-0 space-y-1">
                {post.category && (
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: post.category.color || '#E42528' }}
                  >
                    {post.category.name}
                  </span>
                )}
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#E42528] transition-colors line-clamp-2 leading-snug">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                <div className="flex items-center space-x-2 text-[11px] text-slate-400 pt-1">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>•</span>
                  <span>{post.readingTime || 3} min read</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedHero;
