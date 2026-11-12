import React from 'react';

/**
 * Zoho-style corporate brand logo:
 * Features the signature 4-color modular blocks (Red, Green, Blue, Amber)
 * giving it that unmistakable Zoho / enterprise SaaS identity.
 */
const Logo = ({ className = 'w-6 h-6', showText = false, textClassName = 'text-xl' }) => (
  <div className="inline-flex items-center space-x-2.5">
    {/* 4-quadrant geometric blocks emblem like Zoho */}
    <div className={`grid grid-cols-2 gap-0.5 rounded-md p-1 bg-slate-900/5 ${className}`}>
      <div className="w-full h-full rounded-[2px] bg-[#E42528]" />
      <div className="w-full h-full rounded-[2px] bg-[#10B981]" />
      <div className="w-full h-full rounded-[2px] bg-[#2563EB]" />
      <div className="w-full h-full rounded-[2px] bg-[#F59E0B]" />
    </div>

    {showText && (
      <div className="flex items-center space-x-2">
        <span className={`font-bold tracking-tight text-slate-900 ${textClassName}`}>
          TechNova
        </span>
        <span className="text-slate-300 font-light text-lg">|</span>
        <span className="text-sm font-semibold tracking-wide uppercase text-slate-600">
          Blog
        </span>
      </div>
    )}
  </div>
);

export default Logo;
