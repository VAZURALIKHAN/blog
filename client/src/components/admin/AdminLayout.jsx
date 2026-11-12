import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Users,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldAlert,
} from 'lucide-react';
import Logo from '../common/Logo';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'All Articles', path: '/admin/posts', icon: FileText },
    { label: 'Create Article', path: '/admin/posts/new', icon: PlusCircle },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Authors', path: '/admin/authors', icon: Users },
    { label: 'Settings & SEO', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-[#191919] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <Link to="/admin" className="flex items-center space-x-2">
          <Logo className="w-6 h-6" showText={true} textClassName="text-white text-base" />
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#191919] text-slate-300 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand */}
          <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
            <Link to="/admin" className="flex items-center">
              <Logo className="w-7 h-7" showText={true} textClassName="text-white text-lg" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    active
                      ? 'bg-[#E42528] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-[#252525]'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#2a2a2a] space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-[#252525] transition"
          >
            <span>View Public Blog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between pt-2 border-t border-[#2a2a2a]">
            <div className="flex items-center space-x-2.5 min-w-0">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={user?.name || 'Admin'}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700 flex-shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  {user?.name || 'Administrator'}
                </span>
                <span className="text-[10px] uppercase font-bold text-[#ff6b6b] block truncate">
                  {user?.role || 'Admin'}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-[#252525] transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
