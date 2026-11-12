import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, FileCode, Check, ExternalLink, ShieldCheck } from 'lucide-react';

const Settings = () => {
  const [gaId, setGaId] = useState('G-TECHNOVA2026');
  const [gscTag, setGscTag] = useState('google-site-verification=AbCdEfGhIjKlMnOpQrStUvWxYz');
  const [siteName, setSiteName] = useState('TechNova Blog');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SEO & Platform Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage search engine indexation, tracking codes, schema markups, and crawler configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form settings */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center space-x-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Search Engine & Analytics Configuration</span>
            </h3>

            {saved && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>SEO and Analytics settings saved successfully!</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                Site Title
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              />
              <p className="text-xs text-slate-400 mt-1">
                Collects reader dwell time, scroll depth, and category engagement metrics.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                Google Search Console Verification Tag
              </label>
              <input
                type="text"
                placeholder="google-site-verification=..."
                value={gscTag}
                onChange={(e) => setGscTag(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              />
              <p className="text-xs text-slate-400 mt-1">
                Verifies domain ownership in Google Search Console for automated indexing.
              </p>
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition"
            >
              Save Configuration
            </button>
          </form>
        </div>

        {/* Live Crawler Links (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-blue-600" />
              <span>Search Crawler Endpoints</span>
            </h3>

            <div className="space-y-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-between transition group"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block group-hover:text-blue-600">
                    XML Sitemap
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">/sitemap.xml</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </a>

              <a
                href="/robots.txt"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-between transition group"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block group-hover:text-blue-600">
                    Robots.txt Directives
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">/robots.txt</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </a>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-2 text-xs text-blue-900">
            <div className="flex items-center space-x-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Schema & Open Graph Active</span>
            </div>
            <p className="leading-relaxed text-blue-800">
              Structured data (Schema.org <code>BlogPosting</code> & <code>WebSite</code>) is dynamically injected into each page header to achieve rich snippets in Google search results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
