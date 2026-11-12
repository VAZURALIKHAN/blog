import React, { useState } from 'react';
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  Code,
  Quote,
  List,
  Table,
  Image as ImageIcon,
  Link2,
  Video,
  Eye,
  Edit3,
} from 'lucide-react';
import RichContentRenderer from '../blog/RichContentRenderer';
import { uploadAPI } from '../../api/client';

const RichEditor = ({ value, onChange }) => {
  const [activeTab, setActiveTab] = useState('write');
  const [uploading, setUploading] = useState(false);

  const insertText = (before, after = '') => {
    const textarea = document.getElementById('rich-content-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);

    const replacement = `${before}${selected || 'text'}${after}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + (selected ? selected.length : 4)
      );
    }, 50);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await uploadAPI.uploadImage(formData);
      const url = res.data.url;
      insertText(`\n<img src="${url}" alt="Article illustration" class="rounded-xl shadow-md my-6" />\n`);
    } catch (err) {
      alert('Failed to upload image: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="border border-slate-300 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Header Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center justify-between gap-2">
        {/* Formatting Buttons */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertText('\n<h2 id="section-title">', '</h2>\n')}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition"
            title="Heading 2 (H2)"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText('\n<h3 id="subsection-title">', '</h3>\n')}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition"
            title="Heading 3 (H3)"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1"></span>

          <button
            type="button"
            onClick={() => insertText('<strong>', '</strong>')}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText('<em>', '</em>')}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText('<code>', '</code>')}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition"
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-300 mx-1"></span>

          <button
            type="button"
            onClick={() =>
              insertText(
                '\n<pre><code class="language-javascript">\n// Your code snippet here\nconst result = true;\n',
                '\n</code></pre>\n'
              )
            }
            className="px-2 py-1 rounded-lg text-xs font-mono font-semibold text-slate-700 hover:bg-slate-200 transition"
            title="Code Block"
          >
            {'</> Code'}
          </button>

          <button
            type="button"
            onClick={() =>
              insertText(
                '\n<div class="overflow-x-auto my-6">\n<table class="min-w-full divide-y divide-gray-200 border">\n  <thead>\n    <tr class="bg-gray-50">\n      <th>Feature</th>\n      <th>Details</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Item 1</td>\n      <td>Value 1</td>\n    </tr>\n  </tbody>\n</table>\n</div>\n'
              )
            }
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition"
            title="Insert Table"
          >
            <Table className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              insertText(
                '\n<div class="callout-box bg-blue-50 border-l-4 border-blue-600 p-4 rounded my-6">\n  <p class="font-semibold text-blue-900">Important Note:</p>\n  <p class="text-blue-800 text-sm">Key insight or technical takeaway.</p>\n</div>\n'
              )
            }
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition"
            title="Callout Box"
          >
            <Quote className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              insertText(
                '\n<div class="video-container my-6 aspect-video bg-gray-900 rounded-lg overflow-hidden">\n  <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>\n</div>\n'
              )
            }
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition"
            title="Video Embed"
          >
            <Video className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => insertText('<a href="https://example.com" target="_blank" rel="noreferrer">', '</a>')}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition"
            title="Insert Link"
          >
            <Link2 className="w-4 h-4" />
          </button>

          {/* Inline Content Image Upload */}
          <label className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition cursor-pointer flex items-center gap-1 text-xs">
            <ImageIcon className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Insert Image'}</span>
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Tab Toggle: Write vs Preview */}
        <div className="flex items-center space-x-1 bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition ${
              activeTab === 'write' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition ${
              activeTab === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      {activeTab === 'write' ? (
        <textarea
          id="rich-content-textarea"
          rows={20}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your article content using HTML or Markdown tags... Supports <h2>, <h3>, <code>, tables, and callouts."
          className="w-full p-4 font-mono text-sm leading-relaxed text-slate-800 placeholder-slate-400 focus:outline-none resize-y"
        />
      ) : (
        <div className="p-6 min-h-[400px] bg-white">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">
            Rendered Article Output
          </div>
          <RichContentRenderer content={value || '<p class="text-slate-400 italic">No content written yet.</p>'} />
        </div>
      )}
    </div>
  );
};

export default RichEditor;
