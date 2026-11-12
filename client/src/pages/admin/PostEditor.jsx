import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Clock,
  Send,
  Upload,
  Search,
  Check,
  Calendar,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react';
import { postAPI, categoryAPI, authorAPI, tagAPI, uploadAPI } from '../../api/client';
import RichEditor from '../../components/admin/RichEditor';

const PostEditor = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  // Form States
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredImageCaption, setFeaturedImageCaption] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [status, setStatus] = useState('draft');
  const [scheduledAt, setScheduledAt] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);

  // SEO States
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeywords, setFocusKeywords] = useState('');

  // Dropdown options
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [tags, setTags] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [catRes, authRes, tagRes] = await Promise.all([
          categoryAPI.getCategories(),
          authorAPI.getAuthors(),
          tagAPI.getTags(),
        ]);
        setCategories(catRes.data.data || []);
        setAuthors(authRes.data.data || []);
        setTags(tagRes.data.data || []);

        if (!isEditMode) {
          if (catRes.data.data?.length > 0) setCategory(catRes.data.data[0]._id);
          if (authRes.data.data?.length > 0) setAuthor(authRes.data.data[0]._id);
        }
      } catch (err) {
        console.error('Error fetching metadata:', err);
      }
    };

    fetchMetadata();
  }, [isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        try {
          const res = await postAPI.getAdminPostById(id);
          const p = res.data.data;
          setTitle(p.title || '');
          setSlug(p.slug || '');
          setExcerpt(p.excerpt || '');
          setContent(p.content || '');
          setFeaturedImage(p.featuredImage || '');
          setFeaturedImageCaption(p.featuredImageCaption || '');
          setCategory(p.category?._id || p.category || '');
          setAuthor(p.author?._id || p.author || '');
          setSelectedTags(p.tags?.map((t) => t._id || t) || []);
          setStatus(p.status || 'draft');
          if (p.scheduledAt) {
            setScheduledAt(new Date(p.scheduledAt).toISOString().slice(0, 16));
          }
          setIsFeatured(Boolean(p.isFeatured));
          setIsTrending(Boolean(p.isTrending));
          setMetaTitle(p.seo?.metaTitle || '');
          setMetaDescription(p.seo?.metaDescription || '');
          setFocusKeywords(p.seo?.focusKeywords?.join(', ') || '');
        } catch (err) {
          setError('Failed to load article details.');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, isEditMode]);

  // Auto-generate slug and SEO title if not customized
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isEditMode && (!slug || slug === title.toLowerCase().replace(/\s+/g, '-'))) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(autoSlug);
    }
    if (!metaTitle) setMetaTitle(val);
  };

  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setImageUploading(true);
    try {
      const res = await uploadAPI.uploadImage(formData);
      setFeaturedImage(res.data.url);
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (submitStatus) => {
    setError('');
    setSuccessMsg('');

    const targetStatus = submitStatus || status;

    if (!title.trim() || !content.trim()) {
      setError('Title and Article Content are required.');
      return;
    }
    if (!category) {
      setError('Please select a category.');
      return;
    }
    if (!author) {
      setError('Please select an author.');
      return;
    }
    if (targetStatus === 'scheduled' && !scheduledAt) {
      setError('Please specify a publication date and time for scheduled status.');
      return;
    }

    const payload = {
      title,
      slug,
      excerpt: excerpt || title,
      content,
      featuredImage: featuredImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
      featuredImageCaption,
      category,
      author,
      tags: selectedTags,
      status: targetStatus,
      scheduledAt: targetStatus === 'scheduled' ? new Date(scheduledAt) : null,
      isFeatured,
      isTrending,
      seo: {
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt || title,
        focusKeywords: focusKeywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
      },
    };

    setLoading(true);
    try {
      if (isEditMode) {
        await postAPI.updatePost(id, payload);
        setSuccessMsg('Article updated successfully!');
      } else {
        const res = await postAPI.createPost(payload);
        setSuccessMsg('Article created successfully!');
        setTimeout(() => navigate('/admin/posts'), 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save article.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/posts"
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {isEditMode ? 'Edit Technology Article' : 'Compose New Article'}
            </h1>
            <p className="text-xs text-slate-500">
              Full authoring editor with SEO tags, auto TOC generation, and scheduling.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit('draft')}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-1.5 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit('published')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center space-x-1.5 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isEditMode ? 'Update & Publish' : 'Publish Now'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-2 text-red-800 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-2 text-emerald-800 text-sm">
          <Check className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Title, Excerpt, Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Article Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Architecting Resilient Cloud-Native Microservices in 2026"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 text-base font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                URL Slug *
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 text-xs text-slate-400 bg-slate-50 border border-r-0 border-slate-300 rounded-l-xl font-mono">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  placeholder="architecting-resilient-microservices"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2 text-xs font-mono rounded-r-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Short Description / Excerpt *
              </label>
              <textarea
                rows={3}
                placeholder="Brief 1-2 sentence synopsis displayed on article cards and search results..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Rich Content Editor */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Article Content (HTML / Markdown) *
              </label>
              <span className="text-xs text-slate-400">Headings automatically form Table of Contents</span>
            </div>
            <RichEditor value={content} onChange={setContent} />
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <Search className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">SEO & Social Meta Configuration</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                placeholder="Title as it appears on Google SERP (50-60 characters)"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Meta Description
              </label>
              <textarea
                rows={2}
                placeholder="Description shown in Google snippets and social previews (150-160 characters)"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Focus Keywords (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. microservices, kubernetes, distributed systems, cloud computing"
                value={focusKeywords}
                onChange={(e) => setFocusKeywords(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Metadata (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publishing Status & Schedule Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Publishing Settings</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Article Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft (Unpublished)</option>
                <option value="published">Published (Live to Public)</option>
                <option value="scheduled">Scheduled (Future Publication)</option>
              </select>
            </div>

            {status === 'scheduled' && (
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-2 animate-in fade-in">
                <label className="block text-xs font-semibold text-purple-900 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Scheduled Publication Date & Time</span>
                </label>
                <input
                  type="datetime-local"
                  required
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-purple-300 bg-white"
                />
                <p className="text-[11px] text-purple-700 leading-tight">
                  The article will automatically become visible to readers on this date.
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Feature on Homepage Hero</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Highlight in Trending List</span>
              </label>
            </div>
          </div>

          {/* Category & Author Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Taxonomy & Attribution
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category...</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Author *
              </label>
              <select
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Author...</option>
                {authors.map((auth) => (
                  <option key={auth._id} value={auth._id}>
                    {auth.name} ({auth.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                {tags.map((t) => {
                  const isChecked = selectedTags.includes(t._id);
                  return (
                    <button
                      key={t._id}
                      type="button"
                      onClick={() => {
                        setSelectedTags((prev) =>
                          isChecked ? prev.filter((id) => id !== t._id) : [...prev, t._id]
                        );
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                        isChecked
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Featured Image Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-blue-600" />
              <span>Featured Header Image</span>
            </h3>

            {featuredImage ? (
              <div className="space-y-2">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={featuredImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-2 right-2 px-2 py-1 bg-black/70 hover:bg-black text-white text-[10px] font-semibold rounded-md backdrop-blur-sm"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition text-center">
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-semibold text-slate-700">
                    {imageUploading ? 'Uploading file...' : 'Upload Featured Image'}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    PNG, JPG, WEBP up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={imageUploading}
                    onChange={handleFeaturedImageUpload}
                    className="hidden"
                  />
                </label>

                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                    Or paste image URL
                  </span>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Image Caption (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Distributed cloud infrastructure overview"
                value={featuredImageCaption}
                onChange={(e) => setFeaturedImageCaption(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PostEditor;
