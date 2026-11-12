import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle,
  FileEdit,
  Clock,
  Eye,
  FolderTree,
  Users,
  Plus,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { postAPI } from '../../api/client';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await postAPI.getAdminStats();
        setStats(res.data.data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Articles', value: stats?.totalPosts || 0, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Published', value: stats?.publishedPosts || 0, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Drafts', value: stats?.draftPosts || 0, icon: FileEdit, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Scheduled', value: stats?.scheduledPosts || 0, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Views', value: stats?.totalViews || 0, icon: Eye, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Categories', value: stats?.totalCategories || 0, icon: FolderTree, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Authors', value: stats?.totalAuthors || 0, icon: Users, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Editorial Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your technology blog publications, editorial calendar, and audience metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Article</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.label}</p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Articles</h3>
            <p className="text-xs text-slate-500">Latest updates across drafts, scheduled, and published posts.</p>
          </div>
          <Link
            to="/admin/posts"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-5">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Views</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {stats?.recentPosts?.map((post) => (
                <tr key={post._id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-5 font-semibold text-slate-900 max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${post.category?.color || '#2563eb'}15`,
                        color: post.category?.color || '#2563eb',
                      }}
                    >
                      {post.category?.name || 'General'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-600">
                    {post.author?.name || 'Anonymous'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold capitalize ${
                        post.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : post.status === 'scheduled'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-xs text-slate-500">
                    {post.views || 0}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Link
                      to={`/admin/posts/edit/${post._id}`}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                    >
                      Edit Post
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
