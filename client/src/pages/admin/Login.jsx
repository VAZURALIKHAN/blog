import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Key, ShieldCheck } from 'lucide-react';
import Logo from '../../components/common/Logo';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('admin@technova.io');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@technova.io');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#191919] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block mb-6">
          <Logo className="w-9 h-9" showText={true} textClassName="text-white text-2xl" />
        </Link>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Editorial & Content Management System
        </h2>
        <p className="mt-1 text-xs text-[#888888]">
          Authorized staff portal for draft creation, review, and publication.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-200 overflow-hidden relative">
          
          {/* Zoho 4-color stripe */}
          <div className="flex h-1.5 -mx-6 sm:-mx-10 -mt-8 mb-6">
            <div className="flex-1 bg-[#E42528]" />
            <div className="flex-1 bg-[#10B981]" />
            <div className="flex-1 bg-[#2563EB]" />
            <div className="flex-1 bg-[#F59E0B]" />
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-2.5 text-red-800 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#E42528] mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Corporate Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#E42528] focus:border-[#E42528]"
                  placeholder="admin@technova.io"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#E42528] focus:border-[#E42528]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#E42528] hover:bg-[#c71c1e] shadow-sm transition disabled:opacity-50 mt-2"
            >
              <span>{submitting ? 'Authenticating...' : 'Sign In to Author Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              <Key className="w-3.5 h-3.5 text-[#E42528]" />
              <span>Fill Default Demo Credentials</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-800 transition">
              ← Return to Public Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
