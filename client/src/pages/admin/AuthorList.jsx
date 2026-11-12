import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, Check, AlertCircle, Twitter, Linkedin, Github } from 'lucide-react';
import { authorAPI } from '../../api/client';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAuthors = async () => {
    try {
      const res = await authorAPI.getAuthors();
      setAuthors(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleEditClick = (auth) => {
    setEditingId(auth._id);
    setName(auth.name);
    setEmail(auth.email || '');
    setRole(auth.role || '');
    setBio(auth.bio || '');
    setAvatar(auth.avatar || '');
    setTwitter(auth.socialLinks?.twitter || '');
    setLinkedin(auth.socialLinks?.linkedin || '');
    setGithub(auth.socialLinks?.github || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setName('');
    setEmail('');
    setRole('');
    setBio('');
    setAvatar('');
    setTwitter('');
    setLinkedin('');
    setGithub('');
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Author name is required.');
      return;
    }

    const payload = {
      name,
      email,
      role: role || 'Contributing Writer',
      bio,
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      socialLinks: { twitter, linkedin, github },
    };

    try {
      if (editingId) {
        await authorAPI.updateAuthor(editingId, payload);
        setSuccess('Author updated successfully!');
      } else {
        await authorAPI.createAuthor(payload);
        setSuccess('Author profile created successfully!');
      }
      handleCancel();
      fetchAuthors();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save author.');
    }
  };

  const handleDelete = async (auth) => {
    if (window.confirm(`Are you sure you want to delete author "${auth.name}"?`)) {
      try {
        await authorAPI.deleteAuthor(auth._id);
        fetchAuthors();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete author.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Author Profiles & Attribution</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage writers, contributing architects, and technical analysts credited across published articles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-6">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{editingId ? 'Edit Author Profile' : 'Add New Author'}</span>
            </h3>

            {error && (
              <div className="my-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="my-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Professional Title / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. VP of Cloud & Distributed Systems"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Biography
                </label>
                <textarea
                  rows={2}
                  placeholder="Short author background and expertise summary..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Twitter URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition"
                >
                  {editingId ? 'Update Author' : 'Create Author'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Authors Table (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Registered Authors ({authors.length})
              </span>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {authors.map((auth) => (
                  <div key={auth._id} className="p-4 flex items-center justify-between hover:bg-slate-50/80 transition">
                    <div className="flex items-center space-x-3 min-w-0 pr-4">
                      <img
                        src={auth.avatar}
                        alt=""
                        className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{auth.name}</h4>
                        <p className="text-xs text-blue-600 font-medium truncate">{auth.role}</p>
                        <span className="text-[11px] text-slate-400">
                          {auth.postCount || 0} published articles
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <button
                        onClick={() => handleEditClick(auth)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition"
                        title="Edit Author"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(auth)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete Author"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorList;
