import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center space-y-4">
      <span className="text-6xl font-black text-blue-600">404</span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-500 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="pt-2 flex items-center space-x-3">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
