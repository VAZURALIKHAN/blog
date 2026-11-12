import React from 'react';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';

const AuthorBio = ({ author }) => {
  if (!author) return null;

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 my-8 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
      <img
        src={author.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'}
        alt={author.name}
        className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-200 flex-shrink-0"
      />
      <div className="flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-base font-bold text-slate-900">{author.name}</h4>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#E42528]">
              {author.role || 'Staff Contributor'}
            </p>
          </div>
          {author.socialLinks && (
            <div className="flex items-center space-x-2">
              {author.socialLinks.twitter && (
                <a
                  href={author.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-500 transition"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {author.socialLinks.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-700 transition"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {author.socialLinks.github && (
                <a
                  href={author.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {author.socialLinks.website && (
                <a
                  href={author.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-600 transition"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {author.bio || 'Contributing technology analyst and software architect.'}
        </p>
      </div>
    </div>
  );
};

export default AuthorBio;
