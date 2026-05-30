
import React, { useRef, useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { EXPERIENCES } from '../constants';
import { Briefcase, MapPin, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// ── Company brand themes — keyed by experience ID ────────────────────
// Design: Cards are CLEAN WHITE GLASS at rest, brand colours bloom on HOVER
const COMPANY_THEMES: Record<string, {
  brandPrimary: string;
  brandSecondary: string;
  glowCSS: string;
  glowHoverCSS: string;
  borderHoverCSS: string;
  gradientCSS: string;
  textHover: string;
  tagHover: string;
  pillHover: string;
  logo: string;
}> = {
  experian: {
    brandPrimary: '#632678',
    brandSecondary: '#ba2f7d',
    glowCSS: '0 4px 30px -6px rgba(99, 38, 120, 0.08)',
    glowHoverCSS: '0 12px 50px -6px rgba(99, 38, 120, 0.28), inset 0 1px 0 rgba(255,255,255,0.3)',
    borderHoverCSS: 'rgba(99, 38, 120, 0.5)',
    gradientCSS: 'linear-gradient(135deg, #632678, #ba2f7d, #406eb3)',
    textHover: 'group-hover:text-[#632678] dark:group-hover:text-[#ba2f7d]',
    tagHover: 'group-hover:bg-[#632678]/10 dark:group-hover:bg-[#ba2f7d]/20 group-hover:text-[#632678] dark:group-hover:text-[#ba2f7d] group-hover:border-[#632678]/40 dark:group-hover:border-[#ba2f7d]/40',
    pillHover: 'group-hover:bg-[#632678]/10 dark:group-hover:bg-[#ba2f7d]/20 group-hover:text-[#632678] dark:group-hover:text-[#ba2f7d]',
    logo: '/logos/experian.png',
  },
  oracle: {
    brandPrimary: '#e51c20',
    brandSecondary: '#ffffff',
    glowCSS: '0 4px 30px -6px rgba(229, 28, 32, 0.08)',
    glowHoverCSS: '0 12px 50px -6px rgba(229, 28, 32, 0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
    borderHoverCSS: 'rgba(229, 28, 32, 0.45)',
    gradientCSS: 'linear-gradient(135deg, #e51c20, #ff6b6b)',
    textHover: 'group-hover:text-[#e51c20] dark:group-hover:text-[#ff8888]',
    tagHover: 'group-hover:bg-[#e51c20]/10 dark:group-hover:bg-[#e51c20]/20 group-hover:text-[#e51c20] dark:group-hover:text-[#ff8888] group-hover:border-[#e51c20]/40 dark:group-hover:border-[#e51c20]/50',
    pillHover: 'group-hover:bg-[#e51c20]/10 dark:group-hover:bg-[#e51c20]/20 group-hover:text-[#e51c20] dark:group-hover:text-[#ff8888]',
    logo: '/logos/oracle.png',
  },
  'highradius-assoc': {
    brandPrimary: '#2db6ec',
    brandSecondary: '#ed8802',
    glowCSS: '0 4px 30px -6px rgba(45, 182, 236, 0.08)',
    glowHoverCSS: '0 12px 50px -6px rgba(45, 182, 236, 0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
    borderHoverCSS: 'rgba(45, 182, 236, 0.45)',
    gradientCSS: 'linear-gradient(135deg, #2db6ec, #6fb832, #ed8802)',
    textHover: 'group-hover:text-[#2db6ec] dark:group-hover:text-[#2db6ec]',
    tagHover: 'group-hover:bg-[#2db6ec]/10 dark:group-hover:bg-[#2db6ec]/20 group-hover:text-[#2db6ec] dark:group-hover:text-[#2db6ec] group-hover:border-[#2db6ec]/40 dark:group-hover:border-[#2db6ec]/40',
    pillHover: 'group-hover:bg-[#2db6ec]/10 dark:group-hover:bg-[#2db6ec]/20 group-hover:text-[#2db6ec] dark:group-hover:text-[#2db6ec]',
    logo: '/logos/highradius.png',
  },
  'highradius-junior': {
    brandPrimary: '#2db6ec',
    brandSecondary: '#ed8802',
    glowCSS: '0 4px 30px -6px rgba(45, 182, 236, 0.08)',
    glowHoverCSS: '0 12px 50px -6px rgba(45, 182, 236, 0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
    borderHoverCSS: 'rgba(45, 182, 236, 0.45)',
    gradientCSS: 'linear-gradient(135deg, #2db6ec, #6fb832, #ed8802)',
    textHover: 'group-hover:text-[#2db6ec] dark:group-hover:text-[#2db6ec]',
    tagHover: 'group-hover:bg-[#2db6ec]/10 dark:group-hover:bg-[#2db6ec]/20 group-hover:text-[#2db6ec] dark:group-hover:text-[#2db6ec] group-hover:border-[#2db6ec]/40 dark:group-hover:border-[#2db6ec]/40',
    pillHover: 'group-hover:bg-[#2db6ec]/10 dark:group-hover:bg-[#2db6ec]/20 group-hover:text-[#2db6ec] dark:group-hover:text-[#2db6ec]',
    logo: '/logos/highradius.png',
  },
};

const FALLBACK_THEME = COMPANY_THEMES['experian'];

const Experience: React.FC = () => {
  const [pathD, setPathD] = useState('');
  const [pathLength, setPathLength] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const calculatePath = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const points = dotRefs.current
      .map((dot) => {
        if (!dot) return null;
        const dotRect = dot.getBoundingClientRect();
        return { x: dotRect.left - containerRect.left + dotRect.width / 2, y: dotRect.top - containerRect.top + dotRect.height / 2 };
      })
      .filter((p): p is { x: number; y: number } => p !== null);
    if (points.length < 2) return;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i]; const p2 = points[i + 1]; const midY = (p1.y + p2.y) / 2;
      d += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }
    setPathD(d);
  }, []);

  useLayoutEffect(() => {
    calculatePath();
    const recalc = () => { calculatePath(); if (pathRef.current) setPathLength(pathRef.current.getTotalLength()); };
    const t1 = setTimeout(recalc, 400);
    const t2 = setTimeout(recalc, 1200);
    window.addEventListener('resize', recalc);
    return () => { window.removeEventListener('resize', recalc); clearTimeout(t1); clearTimeout(t2); };
  }, [calculatePath]);

  useEffect(() => {
    if (!pathLength) return;
    let ticking = false;
    if (pathRef.current) pathRef.current.style.transition = 'none';
    const handleScroll = () => {
      if (ticking) return; ticking = true;
      window.requestAnimationFrame(() => {
        if (!containerRef.current || !pathRef.current) { ticking = false; return; }
        const rect = containerRef.current.getBoundingClientRect();
        let progress = (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.35);
        progress = Math.max(0, Math.min(1, progress));
        pathRef.current.style.strokeDashoffset = String(pathLength - pathLength * progress);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathLength]);

  return (
    <section id="experience" className="py-20 md:py-32 bg-transparent relative overflow-hidden">

      {/* Ambient background — very subtle, neutral */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-80 h-80 bg-slate-200/30 dark:bg-slate-700/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-[45%] right-[8%] w-72 h-72 bg-slate-300/20 dark:bg-slate-600/8 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[10%] left-[20%] w-64 h-64 bg-slate-200/25 dark:bg-slate-700/8 rounded-full blur-[100px] animate-float-slower" />
      </div>

      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">

        {/* Section heading */}
        <div className="mb-16 md:mb-28 text-center">
          <ScrollReveal variant="blur-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-xl shadow-sm">
              <Sparkles className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">Career Timeline</span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="slide-up-spring">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              Professional Journey
            </h2>
          </ScrollReveal>
          <ScrollReveal delay="delay-100" variant="blur-in">
            <p className="text-lg md:text-xl text-slate-400 dark:text-slate-500 max-w-2xl mx-auto font-medium">
              Building enterprise-scale solutions across the globe.
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-[2400px] mx-auto">

          {/* Desktop SVG connector */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0 overflow-visible">
            <defs>
              <linearGradient id="cableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path d={pathD} stroke="currentColor" strokeOpacity="0.06" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="6 6" className="text-slate-400 dark:text-slate-600" />
            <path ref={pathRef} d={pathD} stroke="url(#cableGradient)" strokeWidth="2" fill="none" strokeLinecap="round" filter="url(#glow)" style={{ strokeDasharray: pathLength, strokeDashoffset: pathLength, transition: 'none' }} />
          </svg>

          {/* Mobile timeline */}
          <div className="absolute left-[18px] top-0 bottom-0 w-[1.5px] md:hidden bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 opacity-50" />

          {/* Cards */}
          <div className="space-y-12 md:space-y-20">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const theme = COMPANY_THEMES[exp.id] || FALLBACK_THEME;
              const cardVariant = isEven ? 'slide-right' : 'slide-left';

              return (
                <ScrollReveal key={exp.id} threshold={0.12} variant={cardVariant as any} staggerMs={idx * 80}>
                  <div className={`relative flex flex-col md:flex-row items-stretch md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>

                    <div className="w-full md:w-[50%] pl-12 md:pl-0">
                      <div className={`${isEven ? 'md:mr-12' : 'md:ml-12'}`}>

                        {/* ── THE CARD ── */}
                        <div
                          className={`
                            bg-white/10 dark:bg-slate-900/30 backdrop-blur-md 
                            p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl
                            shadow-lg border border-slate-200 dark:border-white/10 
                            hover:shadow-xl hover:-translate-y-2 
                            transition-all duration-300 h-full group relative overflow-hidden cursor-default
                          `}
                          style={{
                            boxShadow: theme.glowCSS,
                            borderColor: 'rgba(226,232,240,0.6)',
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.boxShadow = theme.glowHoverCSS;
                            el.style.borderColor = theme.borderHoverCSS;
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.boxShadow = theme.glowCSS;
                            el.style.borderColor = 'rgba(226,232,240,0.6)';
                          }}
                        >
                          {/* Brand colour bloom — only on hover */}
                          <div
                            className="absolute -top-28 -right-28 w-56 h-56 rounded-full blur-[80px] opacity-0 group-hover:opacity-[0.12] dark:group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
                            style={{ background: theme.gradientCSS }}
                          />
                          <div
                            className="absolute -bottom-24 -left-24 w-44 h-44 rounded-full blur-[70px] opacity-0 group-hover:opacity-[0.08] dark:group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none"
                            style={{ background: theme.gradientCSS }}
                          />

                          {/* ── Company logo — top-right ── */}
                          <div className="absolute top-5 right-5 md:top-6 md:right-7 z-20">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg border border-slate-200/50 dark:border-slate-600/50 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                              <img
                                src={theme.logo}
                                alt={`${exp.company} logo`}
                                className="w-full h-full object-contain p-1.5"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          {/* ── Header ── */}
                          <div className="flex flex-col xl:flex-row justify-between items-start gap-3 md:gap-4 mb-5 md:mb-7 relative z-10 pr-14 md:pr-16">
                            <div className="space-y-2 w-full">
                              {/* Step number */}
                              <div
                                className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-lg text-white text-[11px] md:text-xs font-black shadow-md mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: theme.gradientCSS }}
                              >
                                {String(idx + 1).padStart(2, '0')}
                              </div>

                              <h3 className={`text-xl md:text-2xl lg:text-3xl font-black text-slate-800 dark:text-white/90 transition-all duration-500 ${theme.textHover} leading-tight`}>
                                {exp.role}
                              </h3>

                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold text-base md:text-lg group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-500">
                                  <Briefcase className="w-4 h-4 md:w-5 md:h-5 stroke-[2px] flex-shrink-0" />
                                  <span>{exp.company}</span>
                                </div>
                                {exp.location && (
                                  <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs md:text-sm font-medium">
                                    <MapPin className="w-3 h-3 stroke-[2px]" />
                                    <span>{exp.location}</span>
                                  </div>
                                )}
                                <span className="md:hidden ml-auto text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white/50 dark:bg-slate-800/40 backdrop-blur-sm px-2.5 py-1 rounded-md whitespace-nowrap">
                                  {exp.period}
                                </span>
                              </div>
                            </div>

                            <div className={`hidden md:flex items-center text-xs md:text-sm font-semibold text-slate-400 dark:text-slate-500 bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm px-5 py-2.5 rounded-2xl ${theme.pillHover} transition-all duration-500 whitespace-nowrap shadow-sm border border-white/30 dark:border-white/5`}>
                              {exp.period}
                            </div>
                          </div>

                          {/* ── Description ── */}
                          <ul className="space-y-3 md:space-y-3.5 mb-7 relative z-10">
                            {exp.description.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-slate-500 dark:text-slate-400 text-sm md:text-[15px] leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-500"
                              >
                                <span
                                  className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:scale-125 transition-all duration-500"
                                  style={{ transitionDelay: `${i * 20}ms` }}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>

                          {/* ── Skill tags — neutral at rest, brand on hover ── */}
                          {exp.skills && (
                            <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-100 dark:border-slate-800/40 relative z-10">
                              {exp.skills.map((skill, si) => (
                                <span
                                  key={skill}
                                  className={`px-3 py-1.5 text-[10px] md:text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-800/30 rounded-xl border border-slate-200/50 dark:border-slate-700/30 backdrop-blur-sm transition-all duration-400 hover:scale-105 cursor-default ${theme.tagHover}`}
                                  style={{ transitionDelay: `${si * 25}ms` }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    </div>

                    {/* ── Connector dot ── */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <div ref={(el) => { dotRefs.current[idx] = el; }} className="relative z-20 flex items-center justify-center pointer-events-auto">
                        {/* Mobile */}
                        <div className="md:hidden w-[10px] h-[10px] ml-[14px] rounded-full shadow-md" style={{ background: theme.gradientCSS }} />

                        {/* Desktop */}
                        <div className="hidden md:flex relative w-14 h-14 items-center justify-center">
                          <div className="absolute inset-0 rounded-full opacity-15 animate-ripple" style={{ background: theme.gradientCSS }} />
                          <div className="absolute inset-0 rounded-full opacity-10 animate-ripple" style={{ background: theme.gradientCSS, animationDelay: '0.7s' }} />
                          <div className="absolute inset-0 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/50 dark:border-slate-600/30 shadow-lg" />
                          <div className="absolute inset-[-3px] rounded-full animate-rotate-slow opacity-30" style={{ border: `1.5px dashed ${theme.brandPrimary}33` }} />
                          <div className="relative w-6 h-6 rounded-full shadow-md animate-pulse-glow" style={{ background: theme.gradientCSS }}>
                            <div className="absolute inset-0 rounded-full bg-white/30 backdrop-blur-sm" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block md:w-[50%]" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
