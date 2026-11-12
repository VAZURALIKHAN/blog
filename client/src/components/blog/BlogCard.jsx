import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Eye, ArrowRight } from 'lucide-react';

const BlogCard = ({ post, compact = false }) => {
  if (!post) return null;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <article className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-col h-full">
      {/* Cover Image */}
      <Link
        to={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        <img
          src={post.featuredImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {post.category && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
            style={{ backgroundColor: post.category.color || '#E42528' }}
          >
            {post.category.name}
          </span>
        )}
      </Link>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div className="space-y-2.5">
          {/* Metadata Row */}
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTime || 3} min read</span>
            </span>
            {post.views > 0 && (
              <>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{post.views}</span>
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#E42528] transition-colors line-clamp-2 leading-snug">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Excerpt */}
          {!compact && (
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Card Footer: Author + Read Link */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img
              src={post.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
              alt={post.author?.name || 'Author'}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-800 block leading-tight">
                {post.author?.name || 'Engineering Staff'}
              </span>
              <span className="text-slate-400 block text-[10px]">
                {post.author?.role || 'Contributor'}
              </span>
            </div>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-xs font-bold text-[#E42528] hover:text-[#c71c1e] flex items-center space-x-0.5"
          >
            <span>Read</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
