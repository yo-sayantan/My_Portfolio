
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
    logo: 'logos/experian.png',
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
    logo: 'logos/oracle.png',
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
    logo: 'logos/highradius.png',
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
    logo: 'logos/highradius.png',
  },
};

const FALLBACK_THEME = COMPANY_THEMES['experian'];

const Experience: React.FC = () => {
  const [pathD, setPathD] = useState('');
  const [pathLength, setPathLength] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches);
  const pathYRange = useRef({ start: 0, end: 0 });
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
    pathYRange.current = { start: points[0].y, end: points[points.length - 1].y };
    setSvgHeight(containerRect.height);
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i]; const p2 = points[i + 1]; const midY = (p1.y + p2.y) / 2;
      d += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }
    setPathD(d);
  }, []);

  useLayoutEffect(() => {
    calculatePath();
    // Re-measure whenever the timeline's size changes (fonts/logos loading, breakpoints, resize)
    const observer = new ResizeObserver(() => calculatePath());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [calculatePath]);

  useLayoutEffect(() => {
    if (pathRef.current && pathD) setPathLength(pathRef.current.getTotalLength());
  }, [pathD]);

  // Draw the line with the scroll: its tip follows a point 60% down the viewport, so it grows
  // dot-to-dot while scrolling down and retracts again while scrolling back up.
  useEffect(() => {
    if (!pathLength) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const path = pathRef.current;
      if (!containerRef.current || !path) return;
      const rect = containerRef.current.getBoundingClientRect();
      const { start, end } = pathYRange.current;
      const tipY = window.innerHeight * 0.6 - rect.top;

      // The curve's y only ever increases along its length, so binary-search the length
      // whose point sits on the tip line. This keeps the drawn tip exactly at 60% of the
      // viewport even though an S-curve's arc length isn't proportional to its height.
      let drawn: number;
      if (tipY <= start) drawn = 0;
      else if (tipY >= end) drawn = pathLength;
      else {
        let lo = 0;
        let hi = pathLength;
        for (let i = 0; i < 16; i++) {
          const mid = (lo + hi) / 2;
          if (path.getPointAtLength(mid).y < tipY) lo = mid;
          else hi = mid;
        }
        drawn = lo;
      }
      const progress = drawn / pathLength;
      path.style.strokeDashoffset = String(pathLength - drawn);
      const tip = tipRef.current;
      if (tip) {
        const point = path.getPointAtLength(drawn);
        tip.setAttribute('cx', String(point.x));
        tip.setAttribute('cy', String(point.y));
        tip.style.opacity = progress > 0 && progress < 1 ? '1' : '0';
      }
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathLength]);

  // Track the lg breakpoint (cards slide sideways on desktop, fade up on phones)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Phone/tablet: the vertical rail fills with the scroll, same idea as the desktop snake
  useEffect(() => {
    if (isDesktop) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = mobileLineRef.current;
      const container = containerRef.current;
      if (!line || !container) return;
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - rect.top) / Math.max(rect.height, 1)));
      line.style.transform = `scaleY(${progress})`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isDesktop]);

  return (
    <section id="experience" className="pt-20 pb-14 md:pt-24 md:pb-16 bg-transparent relative overflow-hidden">

      {/* Ambient background — very subtle, neutral */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-80 h-80 bg-slate-200/30 dark:bg-slate-700/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-[45%] right-[8%] w-72 h-72 bg-slate-300/20 dark:bg-slate-600/8 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[10%] left-[20%] w-64 h-64 bg-slate-200/25 dark:bg-slate-700/8 rounded-full blur-[100px] animate-float-slower" />
      </div>

      <div className="w-full px-4 md:px-8 lg:px-10 xl:px-14 relative z-10">

        {/* Section heading */}
        <div className="mb-12 md:mb-16 text-center">
          <ScrollReveal variant="blur-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-xl shadow-sm">
              <Sparkles className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">Career Timeline</span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="slide-up-spring">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 heading-clip bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
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
        <div ref={containerRef} className="relative max-w-[1680px] mx-auto">

          {/* Desktop SVG connector */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0 overflow-visible" aria-hidden="true">
            <defs>
              {/* userSpaceOnUse so the colour runs top-to-bottom along the page, independent of how
                  far the snake swings sideways. */}
              <linearGradient id="cableGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={svgHeight || 1}>
                <stop offset="0%" stopColor="#632678" />
                <stop offset="35%" stopColor="#e51c20" />
                <stop offset="70%" stopColor="#2db6ec" />
                <stop offset="100%" stopColor="#6fb832" />
              </linearGradient>
              <filter id="glow" filterUnits="userSpaceOnUse" x="-20%" y="-5%" width="140%" height="110%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path d={pathD} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="4 8" className="text-slate-300 dark:text-slate-700" />
            <path ref={pathRef} d={pathD} stroke="url(#cableGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#glow)" style={{ strokeDasharray: pathLength, strokeDashoffset: pathLength }} />
            <circle ref={tipRef} r="5" fill="white" stroke="url(#cableGradient)" strokeWidth="3" filter="url(#glow)" style={{ opacity: 0, transition: 'opacity 200ms ease' }} />
          </svg>

          {/* Mobile timeline */}
          <div className="absolute left-[9px] top-0 bottom-0 w-[2px] lg:hidden rounded-full bg-slate-200 dark:bg-slate-800" />
          <div
            ref={mobileLineRef}
            className="absolute left-[9px] top-0 bottom-0 w-[2px] lg:hidden rounded-full origin-top bg-gradient-to-b from-[#632678] via-[#e51c20] to-[#2db6ec] will-change-transform"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Cards */}
          <div className="space-y-10 lg:space-y-12">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const theme = COMPANY_THEMES[exp.id] || FALLBACK_THEME;
              const cardVariant = !isDesktop ? 'fade-up' as const : isEven ? 'slide-right' as const : 'slide-left' as const;

              return (
                // The connector dot sits OUTSIDE the animated wrapper. Previously the whole row was
                // translated by ScrollReveal, so the dots were measured mid-slide and the SVG line
                // ended up offset from them.
                // Cards alternate left/right at 72% width, so their ends never line up; the dot sits in
                // the gutter beside each card and the S-curve snakes from one gutter to the other.
                <div key={exp.id} className="relative flex flex-col lg:block">

                    <div className={`w-full pl-8 lg:pl-0 lg:w-[72%] ${isEven ? '' : 'lg:ml-auto'}`}>
                      <ScrollReveal threshold={0.12} variant={cardVariant} staggerMs={idx * 80}>

                        {/* ── THE CARD ── */}
                        <div
                          className={`
                            bg-white/10 dark:bg-slate-900/30 backdrop-blur-md 
                            p-5 md:p-8 rounded-2xl md:rounded-3xl
                            border border-slate-200/60 dark:border-white/10
                            [box-shadow:var(--glow)] hover:[box-shadow:var(--glow-hover)] hover:[border-color:var(--brand-border)]
                            transition-[box-shadow,border-color] duration-300 ease-out h-full group relative overflow-hidden cursor-default
                          `}
                          style={{
                            '--glow': theme.glowCSS,
                            '--glow-hover': theme.glowHoverCSS,
                            '--brand-border': theme.borderHoverCSS,
                          } as React.CSSProperties}
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
                                src={`${import.meta.env.BASE_URL}${theme.logo}`}
                                alt={`${exp.company} logo`}
                                className="w-full h-full object-contain p-1.5"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          {/* ── Header ── */}
                          <div className="flex flex-col xl:flex-row justify-between items-start gap-3 md:gap-4 mb-5 relative z-10 pr-14 md:pr-16">
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

                              <p className="md:hidden text-xs font-semibold text-slate-500 dark:text-slate-400">{exp.period}</p>

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
                              </div>
                            </div>

                            <div className={`hidden md:flex lg:hidden items-center text-xs md:text-sm font-semibold text-slate-400 dark:text-slate-500 bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm px-5 py-2.5 rounded-2xl ${theme.pillHover} transition-all duration-500 whitespace-nowrap shadow-sm border border-white/30 dark:border-white/5`}>
                              {exp.period}
                            </div>
                          </div>

                          {/* ── Description ── */}
                          <ul className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-2.5 mb-5 relative z-10">
                            {exp.description.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm lg:text-[14px] leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-500"
                              >
                                <span aria-hidden="true" className="flex h-[1.625em] flex-shrink-0 items-center">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:scale-125 transition-transform duration-500"
                                    style={{ transitionDelay: `${i * 20}ms` }}
                                  />
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          {/* ── Skill tags — neutral at rest, brand on hover ── */}
                          {exp.skills && (
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/40 relative z-10">
                              {exp.skills.map((skill, si) => (
                                <span
                                  key={skill}
                                  className={`px-3 py-1.5 text-[10px] md:text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-800/30 rounded-xl border border-slate-200/50 dark:border-slate-700/30 backdrop-blur-sm transition-[background-color,color,border-color,transform] duration-300 hover:scale-105 cursor-default ${theme.tagHover}`}
                                  style={{ transitionDelay: `${si * 25}ms` }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                      </ScrollReveal>
                    </div>

                    {/* ── Connector dot — sits in the gutter beside its card ── */}
                    <div
                      className="absolute left-0 top-7 lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2 lg:[left:var(--dot-left)] flex items-center justify-center pointer-events-none"
                      style={{ '--dot-left': isEven ? 'calc(72% + 2.75rem)' : 'calc(28% - 2.75rem)' } as React.CSSProperties}
                    >
                      <div ref={(el) => { dotRefs.current[idx] = el; }} className="relative z-20 flex items-center justify-center pointer-events-auto">
                        {/* Mobile */}
                        <div className="lg:hidden w-[14px] h-[14px] ml-[3px] rounded-full ring-4 ring-white dark:ring-slate-950 shadow-md" style={{ background: theme.gradientCSS }} />

                        {/* Desktop */}
                        <div className="hidden lg:flex relative w-14 h-14 items-center justify-center">
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

                    {/* ── Period label — fills the gutter opposite the card ── */}
                    <div
                      aria-hidden="true"
                      className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 w-[20%] flex-col gap-1 pointer-events-none select-none ${isEven ? 'right-0 items-start pl-6' : 'left-0 items-end pr-6 text-right'}`}
                    >
                      <span
                        className="text-4xl xl:text-5xl whitespace-nowrap font-black tracking-tighter heading-clip bg-clip-text text-transparent opacity-30"
                        style={{ backgroundImage: theme.gradientCSS }}
                      >
                        {exp.period.split(' – ')[0]}
                      </span>
                      <span className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        → {exp.period.split(' – ')[1]}
                      </span>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
