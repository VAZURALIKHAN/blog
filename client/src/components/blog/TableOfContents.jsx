import React, { useState, useEffect } from 'react';
import { ListFilter } from 'lucide-react';

const TableOfContents = ({ items }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm sticky top-24">
      <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-3.5 pb-2 border-b border-slate-100">
        <ListFilter className="w-4 h-4 text-[#E42528]" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`block py-1.5 transition-colors leading-snug rounded-lg px-2.5 ${
                item.level === 3 ? 'ml-3 text-xs' : 'text-sm font-medium'
              } ${
                isActive
                  ? 'bg-red-50 text-[#E42528] font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents;
