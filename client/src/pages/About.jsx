import React from 'react';
import { Shield, Cpu, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Logo from '../components/common/Logo';

const About = () => {
  return (
    <>
      <SEOHead
        title="About TechNova Blog | Engineering Rigor & Editorial Standards"
        description="Learn about TechNova's editorial mission, peer-review standards, and enterprise technology analyst team."
        type="website"
      />

      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#E42528] border border-red-100">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E42528]" />
            <span>Our Mission & Editorial Rigor</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Engineering Rigor for Enterprise Technology Decision Makers
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            TechNova is a developer-first technology publication dedicated to deep technical analysis, enterprise distributed architectures, applied AI frameworks, and robust cybersecurity postures.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">Battle-Tested Architecture</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We focus on production code, distributed cloud patterns, fault tolerance, and failure modes rather than high-level marketing claims.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E42528] flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">Security-First Thinking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every architectural blueprint adheres to Zero Trust, least privilege, threat modeling, and modern cryptographic standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">Open Knowledge</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Committed to empowering global engineers with peer-reviewed engineering documentation, guides, and reproducible benchmarks.
            </p>
          </div>
        </div>

        {/* Editorial Standards Box */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-10 space-y-6 shadow-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-6 bg-[#E42528] rounded-sm" />
            <h2 className="text-2xl font-bold text-slate-900">Editorial Guidelines & Code Validation</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            All articles published on TechNova undergo rigorous editorial and peer review. Code snippets and configuration templates are validated in isolated container environments to guarantee reproducibility before publication.
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Verifiable technical accuracy confirmed by specialized domain engineers.',
              'Zero tolerance for unverified benchmarks, sponsored bias, or marketing jargon.',
              'Clear distinction between production-ready enterprise patterns and experimental prototypes.',
              'Adherence to ethical technology standards, data privacy, and inclusive system design.',
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                <CheckCircle className="w-4 h-4 text-[#E42528] flex-shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Interested in contributing? Submit your draft via our Author Portal.
            </span>
            <Link
              to="/admin/login"
              className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#E42528] hover:text-[#c71c1e]"
            >
              <span>Author Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
