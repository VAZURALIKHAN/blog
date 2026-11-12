import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, CheckCircle2, Github, Twitter, Linkedin, Youtube, ShieldCheck, Globe } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#191919] text-[#b0b0b0] pt-16 pb-12 border-t border-[#2a2a2a] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter CTA Box (Zoho Corporate Style) */}
        <div className="bg-[#242424] border border-[#333333] rounded-xl p-8 mb-16 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#E42528]/20 text-[#ff6b6b]">
                Weekly Technical Digest
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Enterprise Insights & Software Engineering Blueprints
              </h3>
              <p className="text-[#a0a0a0] text-xs sm:text-sm leading-relaxed max-w-xl">
                Join 25,000+ developers, architects, and engineering directors receiving our curated weekly analysis on cloud, AI systems, and cybersecurity.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 p-3.5 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs font-semibold">Thank you! Check your inbox for the weekly briefing.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#141414] border border-[#404040] text-white placeholder-[#707070] text-xs focus:outline-none focus:ring-2 focus:ring-[#E42528]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#E42528] hover:bg-[#c71c1e] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition shadow-sm flex-shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 5-Column Corporate Navigation Grid (Zoho Blog Architecture) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-[#2e2e2e]">
          
          {/* Col 1: Brand & Overview */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <Link to="/" className="inline-block">
              <Logo className="w-7 h-7" showText={true} textClassName="text-white text-lg" />
            </Link>
            <p className="text-[#888888] leading-relaxed pr-2">
              TechNova is an engineering publication focused on deep distributed systems, modern cloud infrastructure, applied AI, and enterprise cyber resilience.
            </p>
            <div className="flex items-center space-x-2.5 pt-1">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded bg-[#252525] hover:bg-[#E42528] hover:text-white flex items-center justify-center text-[#999999] transition" aria-label="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded bg-[#252525] hover:bg-[#2563EB] hover:text-white flex items-center justify-center text-[#999999] transition" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded bg-[#252525] hover:bg-[#333333] hover:text-white flex items-center justify-center text-[#999999] transition" aria-label="GitHub">
                <Github className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded bg-[#252525] hover:bg-[#E42528] hover:text-white flex items-center justify-center text-[#999999] transition" aria-label="YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Topics & Categories */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-[#999999]">
              <li><Link to="/blogs?category=software-development" className="hover:text-white transition">Software Development</Link></li>
              <li><Link to="/blogs?category=artificial-intelligence-machine-learning" className="hover:text-white transition">AI & Machine Learning</Link></li>
              <li><Link to="/blogs?category=cloud-computing" className="hover:text-white transition">Cloud Computing</Link></li>
              <li><Link to="/blogs?category=cybersecurity" className="hover:text-white transition">Cybersecurity</Link></li>
              <li><Link to="/blogs?category=web-and-mobile-app-development" className="hover:text-white transition">Web & Mobile Apps</Link></li>
              <li><Link to="/blogs?category=industry-insights" className="hover:text-white transition">Industry Insights</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources & Indexes */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-[#999999]">
              <li><Link to="/blogs" className="hover:text-white transition">All Published Posts</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Editorial Guidelines</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Peer-Review Process</Link></li>
              <li><a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-white transition">XML Sitemap</a></li>
              <li><a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-white transition">Robots.txt</a></li>
            </ul>
          </div>

          {/* Col 4: Corporate & Portal */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Corporate & CMS
            </h4>
            <ul className="space-y-2 text-[#999999]">
              <li>
                <Link to="/admin" className="hover:text-white transition flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E42528]" />
                  <span>Admin CMS</span>
                </Link>
              </li>
              <li><Link to="/admin/login" className="hover:text-white transition">Author Portal</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Our Writers & Contributors</Link></li>
            </ul>
          </div>

          {/* Col 5: Legal & Trust */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Privacy & Legal
            </h4>
            <ul className="space-y-2 text-[#999999]">
              <li><Link to="/about" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Security Statement</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Cookie Preferences</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Zoho Global Copyright & Status */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[#777777] gap-4">
          <p>© {new Date().getFullYear()} TechNova Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-[#999999]" />
              <span>English (Global)</span>
            </span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
