import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  Tag,
  Share2,
  BookOpen,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { postAPI } from '../api/client';
import TableOfContents from '../components/blog/TableOfContents';
import SocialShare from '../components/blog/SocialShare';
import AuthorBio from '../components/blog/AuthorBio';
import PreviousNextNav from '../components/blog/PreviousNextNav';
import BlogCard from '../components/blog/BlogCard';
import RichContentRenderer from '../components/blog/RichContentRenderer';
import SEOHead from '../components/common/SEOHead';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [previousPost, setPreviousPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await postAPI.getPostBySlug(slug);
        setPost(res.data.data);
        setRelatedPosts(res.data.relatedPosts || []);
        setPreviousPost(res.data.previousPost || null);
        setNextPost(res.data.nextPost || null);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Article not found or has been moved.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="w-10 h-10 border-4 border-[#E42528] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
        <p className="text-sm text-slate-500">
          {error || "The article you are looking for doesn't exist or has been unpublished."}
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E42528] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Articles</span>
        </Link>
      </div>
    );
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <>
      <SEOHead
        title={post.seo?.metaTitle || post.title}
        description={post.seo?.metaDescription || post.excerpt}
        keywords={post.seo?.focusKeywords}
        image={post.featuredImage}
        url={window.location.href}
        type="article"
        publishedTime={post.publishedAt}
        authorName={post.author?.name}
      />

      <article className="min-h-screen bg-[#f8fafc]">
        {/* Article Header (Zoho Blog style header banner) */}
        <header className="bg-white border-b border-slate-200 pt-8 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            
            {/* Breadcrumbs (Zoho Style) */}
            <nav className="flex items-center space-x-2 text-xs text-slate-500">
              <Link to="/" className="hover:text-[#E42528] transition">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link to="/blogs" className="hover:text-[#E42528] transition">
                Articles
              </Link>
              {post.category && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <Link
                    to={`/blogs?category=${post.category.slug}`}
                    className="font-bold uppercase tracking-wider transition"
                    style={{ color: post.category.color || '#E42528' }}
                  >
                    {post.category.name}
                  </Link>
                </>
              )}
            </nav>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {post.excerpt}
            </p>

            {/* Author & Publication Metadata */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <img
                  src={post.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                  alt={post.author?.name || 'Author'}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {post.author?.name || 'Editorial Team'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {post.author?.role || 'Technical Contributor'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formattedDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.readingTime || 4} min read</span>
                </span>
                {post.views > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.views} views</span>
                    </span>
                  </>
                )}
              </div>
            </div>

          </div>
        </header>

        {/* Featured Cover Image */}
        {post.featuredImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="rounded-xl overflow-hidden aspect-[21/9] sm:aspect-[16/8] bg-slate-900 shadow-md">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* 2-Column Main Article Body & Table of Contents */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Sticky Sidebar: Table of Contents & Social Share (Zoho Style) */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                {post.tableOfContents && post.tableOfContents.length > 0 && (
                  <TableOfContents items={post.tableOfContents} />
                )}
                
                {/* Social Share Box */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Share This Story
                  </span>
                  <SocialShare title={post.title} url={window.location.href} />
                </div>
              </div>
            </aside>

            {/* Core Article Text Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-xs">
                
                <RichContentRenderer htmlContent={post.content} />

                {/* Tags Footer */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-6 border-t border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                      Tags & Technologies:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag._id || tag.name}
                          to={`/blogs?search=${encodeURIComponent(tag.name)}`}
                          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-[#E42528] border border-slate-200 transition"
                        >
                          <Tag className="w-3 h-3 text-slate-400" />
                          <span>{tag.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio Section */}
                {post.author && (
                  <div className="mt-10 pt-8 border-t border-slate-200">
                    <AuthorBio author={post.author} />
                  </div>
                )}

                {/* Next / Previous Article Navigation */}
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <PreviousNextNav previous={previousPost} next={nextPost} />
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Related Articles Strip (Zoho Style 3-col Grid) */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="bg-white border-t border-slate-200 py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-6 bg-[#E42528] rounded-sm" />
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Related Articles in {post.category?.name || 'this category'}
                  </h2>
                </div>
                <Link
                  to={post.category ? `/blogs?category=${post.category.slug}` : '/blogs'}
                  className="text-xs font-bold uppercase tracking-wider text-[#E42528] hover:text-[#c71c1e]"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedPosts.slice(0, 3).map((relPost) => (
                  <BlogCard key={relPost._id} post={relPost} />
                ))}
              </div>
            </div>
          </section>
        )}

      </article>
    </>
  );
};

export default BlogDetail;
