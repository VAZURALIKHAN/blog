import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PreviousNextNav = ({ previous, next, prev }) => {
  const previousItem = previous || prev;
  if (!previousItem && !next) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      {previousItem ? (
        <Link
          to={`/blog/${previousItem.slug}`}
          className="group p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50/20 transition flex flex-col justify-between"
        >
          <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#E42528] transition mb-1.5">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Previous Story</span>
          </div>
          <h5 className="text-sm font-bold text-slate-900 group-hover:text-[#E42528] transition line-clamp-2">
            {previousItem.title}
          </h5>
        </Link>
      ) : (
        <div className="hidden sm:block"></div>
      )}

      {next ? (
        <Link
          to={`/blog/${next.slug}`}
          className="group p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50/20 transition flex flex-col justify-between text-right"
        >
          <div className="flex items-center justify-end space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#E42528] transition mb-1.5">
            <span>Next Story</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
          <h5 className="text-sm font-bold text-slate-900 group-hover:text-[#E42528] transition line-clamp-2">
            {next.title}
          </h5>
        </Link>
      ) : null}
    </div>
  );
};

export default PreviousNextNav;
