import React from 'react';

/**
 * Animated SVG "scenes" for the project cards — one per project, themed on what the project does.
 *
 * Motion rules: transform/opacity/stroke-dashoffset only (compositor-friendly), slow ambient loops
 * that sit behind the card text, and a lift on card hover. The keyframes live in index.css
 * (`.ps-*`) and are switched off under prefers-reduced-motion, leaving a static composition.
 */

/** Per-element timing + travel distance, consumed by the .ps-* keyframes via CSS variables. */
const m = (dur: number, delay = 0, dx = 0, dy = 0) =>
  ({ '--dur': `${dur}s`, '--delay': `${delay}s`, '--dx': `${dx}px`, '--dy': `${dy}px` }) as React.CSSProperties;

const LINE = 'stroke-slate-400/70 dark:stroke-slate-500';
const SURFACE = 'fill-white/70 dark:fill-slate-800/70';
const GLYPH = 'font-bold';

const Scene: React.FC<{ id: string; type: 'Work' | 'Personal' }> = ({ id, type }) => {
  switch (id) {
    case 'legacy-modernization':
      return (
        <>
          <rect x="40" y="55" width="95" height="95" rx="10" className="ps-el ps-pulse fill-sky-500/10 stroke-sky-500" strokeWidth="2.5" style={m(3.2)} />
          <path d="M58 82h60M58 102h60M58 122h40" className={LINE} strokeWidth="3" strokeLinecap="round" />
          {[70, 95, 120].map((y, i) => (
            <rect key={y} x="150" y={y} width="14" height="14" rx="3" className="ps-el ps-travel fill-indigo-500" style={m(3.2, i * 0.55, 125, 0)} />
          ))}
          <circle cx="315" cy="100" r="46" fill="none" className="ps-el ps-spin stroke-sky-400/60" strokeWidth="1.5" strokeDasharray="4 7" style={m(24)} />
          {[[295, 68], [338, 100], [295, 132]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="13" className="ps-el ps-pulse fill-sky-500/15 stroke-sky-500" strokeWidth="2.5" style={m(3.2, 1.2 + i * 0.4)} />
          ))}
          <path d="M295 68L338 100L295 132Z" fill="none" className={LINE} strokeWidth="1.5" strokeDasharray="3 4" />
        </>
      );

    case 'ai-jira-board':
      return (
        <>
          {[60, 160, 260].map((x) => (
            <rect key={x} x={x} y="30" width="80" height="140" rx="10" className={`${SURFACE} ${LINE}`} strokeWidth="2" />
          ))}
          {[48, 78, 108].map((y) => (
            <rect key={y} x="70" y={y} width="60" height="22" rx="5" className="fill-slate-200/70 dark:fill-slate-700/70" />
          ))}
          <rect x="170" y="48" width="60" height="22" rx="5" className="fill-slate-200/70 dark:fill-slate-700/70" />
          <rect x="70" y="48" width="60" height="22" rx="5" className="ps-el ps-shuttle fill-violet-500 stroke-violet-300" strokeWidth="2" style={m(4.2, 0, 200, 0)} />
          <path d="M283 148l6 6 12-13" fill="none" className="ps-el ps-pop stroke-emerald-500" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={m(4.2, 1.6)} />
          <path d="M350 28l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" className="ps-el ps-pulse fill-violet-400" style={m(2.4)} />
        </>
      );

    case 'quickbooks-integration':
      return (
        <>
          <rect x="45" y="68" width="76" height="64" rx="14" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="2.5" />
          <text x="83" y="108" textAnchor="middle" className={`${GLYPH} fill-emerald-500 text-[22px]`}>HR</text>
          <rect x="279" y="68" width="76" height="64" rx="14" className="fill-sky-500/10 stroke-sky-500" strokeWidth="2.5" />
          <text x="317" y="108" textAnchor="middle" className={`${GLYPH} fill-sky-500 text-[22px]`}>QB</text>
          <path d="M126 90H274M126 110H274" fill="none" className={LINE} strokeWidth="1.5" strokeDasharray="4 6" />
          {[0, 1.1, 2.2].map((d) => (
            <circle key={`r${d}`} cx="130" cy="90" r="4.5" className="ps-el ps-travel fill-emerald-500" style={m(3.3, d, 140, 0)} />
          ))}
          {[0.5, 1.6, 2.7].map((d) => (
            <circle key={`l${d}`} cx="270" cy="110" r="4.5" className="ps-el ps-travel fill-sky-500" style={m(3.3, d, -140, 0)} />
          ))}
          <circle cx="200" cy="100" r="16" fill="none" className="ps-el ps-ripple stroke-emerald-500" strokeWidth="2" style={m(2.6)} />
          <circle cx="200" cy="100" r="16" fill="none" className="ps-el ps-ripple stroke-sky-500" strokeWidth="2" style={m(2.6, 1.3)} />
        </>
      );

    case 'book-exchange':
      return (
        <>
          <circle cx="200" cy="100" r="28" fill="none" className="ps-el ps-spin stroke-amber-500/70" strokeWidth="2.5" strokeDasharray="10 9" style={m(9)} />
          <g className="ps-el ps-shuttle" style={m(3.6, 0, 140, -22)}>
            <rect x="105" y="72" width="44" height="64" rx="5" className="fill-amber-400/30 stroke-amber-500" strokeWidth="2.5" />
            <path d="M115 72v64M124 92h16M124 104h16" className="stroke-amber-500" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <g className="ps-el ps-shuttle" style={m(3.6, 0, -140, 22)}>
            <rect x="251" y="64" width="44" height="64" rx="5" className="fill-rose-400/30 stroke-rose-500" strokeWidth="2.5" />
            <path d="M261 64v64M270 84h16M270 96h16" className="stroke-rose-500" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </>
      );

    case 'quick-task':
      return (
        <>
          <rect x="145" y="14" width="110" height="172" rx="20" className={`${SURFACE} ${LINE}`} strokeWidth="2.5" />
          <rect x="185" y="22" width="30" height="5" rx="2.5" className="fill-slate-300 dark:fill-slate-600" />
          {[58, 96, 134].map((y, i) => (
            <g key={y}>
              <circle cx="172" cy={y} r="10" className="fill-teal-500/10 stroke-teal-500" strokeWidth="2.5" />
              <path d={`M167 ${y}l4 4 7-8`} fill="none" className="ps-el ps-pop stroke-teal-500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={m(4.5, i * 1.1)} />
              <rect x="192" y={y - 3} width="46" height="6" rx="3" className="fill-slate-300 dark:fill-slate-600" />
              <rect x="192" y={y - 3} width="46" height="6" rx="3" className="ps-el ps-growx fill-teal-500/70" style={m(4.5, i * 1.1 + 0.2)} />
            </g>
          ))}
          <circle cx="238" cy="168" r="11" className="ps-el ps-pulse fill-teal-500" style={m(2.4)} />
          <path d="M238 162v12M232 168h12" className="stroke-white" strokeWidth="2.5" strokeLinecap="round" />
        </>
      );

    case 'pdf-unlocker':
      return (
        <>
          <rect x="60" y="38" width="90" height="124" rx="8" className={`${SURFACE} stroke-orange-500`} strokeWidth="2.5" />
          <path d="M76 70h58M76 88h58M76 106h36" className={LINE} strokeWidth="3" strokeLinecap="round" />
          <rect x="66" y="48" width="78" height="3" rx="1.5" className="ps-el ps-travel fill-orange-500" style={m(3, 0, 0, 100)} />
          <path d="M255 96V78a22 22 0 0 1 44 0v18" fill="none" className="ps-el ps-shuttle stroke-orange-500" strokeWidth="5" strokeLinecap="round" style={m(3, 0, 0, -14)} />
          <rect x="242" y="96" width="70" height="56" rx="10" className="fill-orange-500/20 stroke-orange-500" strokeWidth="2.5" />
          <circle cx="277" cy="120" r="6" className="fill-orange-500" />
          <path d="M277 124v14" className="stroke-orange-500" strokeWidth="4" strokeLinecap="round" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={246 + i * 17} y="166" width="12" height="16" rx="3" className="ps-el ps-fade fill-amber-500" style={m(1.6, i * 0.35)} />
          ))}
        </>
      );

    case 'pc-part-picker':
      return (
        <>
          <rect x="140" y="30" width="120" height="150" rx="12" className={`${SURFACE} ${LINE}`} strokeWidth="2.5" />
          <rect x="160" y="132" width="80" height="14" rx="3" className="fill-slate-300/60 dark:fill-slate-700/60" />
          <rect x="160" y="50" width="38" height="38" rx="5" className="fill-slate-300/40 dark:fill-slate-700/40" />
          <rect x="160" y="10" width="38" height="38" rx="5" className="ps-el ps-travel fill-emerald-500/40 stroke-emerald-500" strokeWidth="2.5" style={m(4, 0, 0, 40)} />
          <rect x="212" y="10" width="8" height="46" rx="2" className="ps-el ps-travel fill-sky-500/40 stroke-sky-500" strokeWidth="2" style={m(4, 0.6, 0, 40)} />
          <rect x="226" y="10" width="8" height="46" rx="2" className="ps-el ps-travel fill-sky-500/40 stroke-sky-500" strokeWidth="2" style={m(4, 0.8, 0, 40)} />
          <rect x="160" y="82" width="80" height="16" rx="4" className="ps-el ps-travel fill-violet-500/40 stroke-violet-500" strokeWidth="2" style={m(4, 1.4, 0, 40)} />
          <path d="M290 60l6 7 12-14" fill="none" className="ps-el ps-pop stroke-emerald-500" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={m(4, 1.8)} />
          <text x="86" y="108" className={`${GLYPH} fill-emerald-500/70 text-[44px]`}>₹</text>
        </>
      );

    case 'legal-entity':
      return (
        <>
          <circle cx="200" cy="100" r="32" className="fill-blue-500/10 stroke-blue-500" strokeWidth="2.5" />
          <ellipse cx="200" cy="100" rx="13" ry="32" fill="none" className="stroke-blue-500/80" strokeWidth="2" />
          <path d="M168 100h64M174 82h52M174 118h52" className="stroke-blue-500/80" strokeWidth="1.5" />
          <g className="ps-el ps-spin" style={m(16)}>
            {[['$', 200, 36], ['€', 266, 106], ['£', 200, 176], ['₹', 134, 106]].map(([g, x, y]) => (
              <text key={g as string} x={x as number} y={y as number} textAnchor="middle" className={`${GLYPH} fill-blue-500 text-[22px]`}>{g}</text>
            ))}
          </g>
          <rect x="52" y="62" width="52" height="68" rx="6" className={`${SURFACE} ${LINE}`} strokeWidth="2" />
          <path d="M62 80h32M62 92h32M62 104h18" className={LINE} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M82 116l5 5 10-11" fill="none" className="ps-el ps-pop stroke-emerald-500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={m(3.6, 0.8)} />
        </>
      );

    case 'parallel-invoice':
      return (
        <>
          {[48, 82, 116, 150].map((y, i) => (
            <g key={y}>
              <circle cx="48" cy={y} r="5" className="ps-el ps-pulse fill-cyan-500" style={m(2, i * 0.3)} />
              <rect x="64" y={y - 6} width="280" height="12" rx="6" className="fill-slate-300/50 dark:fill-slate-700/50" />
              <rect x="64" y={y - 6} width="280" height="12" rx="6" className="ps-el ps-growx fill-cyan-500/70" style={m(2.6 + i * 0.5, i * 0.2)} />
            </g>
          ))}
        </>
      );

    case 'dynamic-notifications':
      return (
        <>
          <circle cx="170" cy="100" r="36" fill="none" className="ps-el ps-ripple stroke-rose-400" strokeWidth="2" style={m(3)} />
          <circle cx="170" cy="100" r="36" fill="none" className="ps-el ps-ripple stroke-rose-400" strokeWidth="2" style={m(3, 1.5)} />
          <g className="ps-el ps-swing ps-origin-top" style={m(2.6)}>
            <path d="M170 56c-22 0-34 16-34 38v18l-10 12h88l-10-12V94c0-22-12-38-34-38z" className="fill-rose-500/20 stroke-rose-500" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="170" cy="138" r="7" className="fill-rose-500" />
          </g>
          <circle cx="200" cy="62" r="9" className="ps-el ps-pulse fill-rose-500" style={m(1.8)} />
          {[44, 80, 116].map((y, i) => (
            <g key={y} className="ps-el ps-pop" style={m(4.2, 0.4 + i * 1.1)}>
              <rect x="246" y={y} width="104" height="26" rx="9" className={`${SURFACE} stroke-rose-400`} strokeWidth="2" />
              <rect x="256" y={y + 8} width="50" height="4" rx="2" className="fill-rose-400/70" />
              <rect x="256" y={y + 15} width="72" height="3.5" rx="1.75" className="fill-slate-300 dark:fill-slate-600" />
            </g>
          ))}
        </>
      );

    case 'my-portfolio':
      return (
        <>
          <circle cx="150" cy="80" r="34" className="ps-el ps-shuttle fill-purple-500/15" style={m(6, 0, 90, 24)} />
          <rect x="80" y="30" width="240" height="140" rx="12" className={`${SURFACE} ${LINE}`} strokeWidth="2.5" />
          <path d="M80 54h240" className={LINE} strokeWidth="2" />
          {[96, 110, 124].map((x, i) => (
            <circle key={x} cx={x - 6} cy="42" r="3.5" className={['fill-rose-400', 'fill-amber-400', 'fill-emerald-400'][i]} />
          ))}
          <rect x="100" y="76" width="96" height="11" rx="5.5" className="ps-el ps-fade fill-purple-500/50" style={m(2.8)} />
          <rect x="100" y="96" width="130" height="7" rx="3.5" className="ps-el ps-fade fill-slate-400/50" style={m(2.8, 0.4)} />
          <rect x="100" y="110" width="104" height="7" rx="3.5" className="ps-el ps-fade fill-slate-400/50" style={m(2.8, 0.8)} />
          <circle cx="270" cy="94" r="20" className="ps-el ps-float fill-purple-500/20 stroke-purple-500" strokeWidth="2.5" style={m(4)} />
          <g className="ps-el ps-pop" style={m(4.5, 0.5)}>
            <rect x="238" y="128" width="84" height="30" rx="12" className="fill-purple-500" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={262 + i * 14} cy="143" r="3.5" className="ps-el ps-bounce fill-white" style={m(1, i * 0.15)} />
            ))}
          </g>
        </>
      );

    case 'mf-portfolio-tracker':
      return (
        <>
          <g className="ps-el ps-spin" style={m(26)}>
            <circle cx="125" cy="100" r="42" fill="none" pathLength={100} strokeDasharray="44 56" strokeWidth="16" className="stroke-teal-500" />
            <circle cx="125" cy="100" r="42" fill="none" pathLength={100} strokeDasharray="30 70" strokeDashoffset="-44" strokeWidth="16" className="stroke-sky-500" />
            <circle cx="125" cy="100" r="42" fill="none" pathLength={100} strokeDasharray="24 76" strokeDashoffset="-74" strokeWidth="16" className="stroke-violet-400" />
          </g>
          <path d="M215 164h140" className={LINE} strokeWidth="2" strokeLinecap="round" />
          {[52, 78, 64, 102, 128].map((h, i) => (
            <rect key={i} x={222 + i * 28} y={164 - h} width="16" height={h} rx="4" className="ps-el ps-growy ps-origin-bottom fill-teal-500/70" style={m(3.2, i * 0.25)} />
          ))}
        </>
      );

    case 'investment-tracker':
      return (
        <>
          <path d="M40 40V160H370" fill="none" className={LINE} strokeWidth="2" strokeLinecap="round" />
          <path d="M40 150L90 120L140 135L190 90L240 105L300 50L360 62V160H40Z" className="ps-el ps-fade fill-emerald-500/15" style={m(4.5)} />
          <path d="M40 150L90 120L140 135L190 90L240 105L300 50L360 62" fill="none" pathLength={1} className="ps-el ps-draw ps-dash stroke-emerald-500" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={m(4.5)} />
          <circle cx="360" cy="62" r="6" className="ps-el ps-pulse fill-emerald-500" style={m(2.2, 1)} />
          <g className="ps-el ps-pulse" style={m(2.6)}>
            <rect x="270" y="22" width="62" height="22" rx="11" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="2" />
            <text x="301" y="38" textAnchor="middle" className={`${GLYPH} fill-emerald-500 text-[12px]`}>+24.5%</text>
          </g>
        </>
      );

    case 'investment-planner':
      return (
        <>
          <path d="M50 58H350" fill="none" className="stroke-indigo-400/80" strokeWidth="2" strokeDasharray="7 7" />
          <path d="M352 30v30M352 30l20 8-20 8" className="ps-el ps-pulse stroke-indigo-500 fill-indigo-500/40" strokeWidth="2.5" strokeLinejoin="round" style={m(2.4)} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={62 + i * 46} y={164 - (28 + i * 20)} width="30" height={28 + i * 20} rx="6" className="ps-el ps-growy ps-origin-bottom fill-indigo-500/60" style={m(3.4, i * 0.3)} />
          ))}
          <path d="M40 164H350" className={LINE} strokeWidth="2" strokeLinecap="round" />
        </>
      );

    case 'os-scheduler':
      return (
        <>
          <text x="50" y="62" textAnchor="end" className={`${GLYPH} fill-slate-400 text-[11px]`}>CPU</text>
          <text x="50" y="118" textAnchor="end" className={`${GLYPH} fill-slate-400 text-[11px]`}>I/O</text>
          <path d="M60 80H340M60 136H340" className={LINE} strokeWidth="2" />
          {[[60, 52, 'fill-blue-500/70'], [112, 30, 'fill-indigo-500/70'], [142, 74, 'fill-cyan-500/70'], [216, 40, 'fill-blue-500/70'], [256, 64, 'fill-indigo-500/70']].map(([x, w, c], i) => (
            <rect key={i} x={x as number} y="46" width={w as number} height="30" rx="5" className={`ps-el ps-growx ${c}`} style={m(6, i * 0.45)} />
          ))}
          {[[84, 40, 'fill-amber-500/70'], [168, 48, 'fill-orange-500/70'], [250, 36, 'fill-amber-500/70']].map(([x, w, c], i) => (
            <rect key={i} x={x as number} y="102" width={w as number} height="30" rx="5" className={`ps-el ps-growx ${c}`} style={m(6, 0.6 + i * 0.9)} />
          ))}
          <rect x="60" y="34" width="2.5" height="112" rx="1.25" className="ps-el ps-travel fill-sky-500" style={m(6, 0, 270, 0)} />
        </>
      );

    case 'school-connect':
      return (
        <>
          <g className="ps-el ps-float" style={m(5)}>
            <path d="M200 50L272 78L200 106L128 78Z" className="fill-sky-500/20 stroke-sky-500" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M160 92v20q40 20 80 0V92" fill="none" className="stroke-sky-500" strokeWidth="2.5" />
            <g className="ps-el ps-swing ps-origin-top" style={m(3)}>
              <path d="M272 78v34" className="stroke-sky-500" strokeWidth="2.5" />
              <circle cx="272" cy="116" r="4.5" className="fill-sky-500" />
            </g>
          </g>
          {[[80, 158], [200, 172], [320, 158]].map(([x, y], i) => (
            <g key={i}>
              <path d={`M${x} ${y}L200 134`} className={LINE} strokeWidth="1.5" strokeDasharray="3 5" />
              <circle cx={x} cy={y} r="9" className="fill-sky-500/15 stroke-sky-500" strokeWidth="2.5" />
              <circle cx={x} cy={y} r="3.5" className="ps-el ps-travel fill-sky-500" style={m(2.8, i * 0.7, 200 - x, 134 - y)} />
            </g>
          ))}
        </>
      );

    case 'beautiful-bengal':
      return (
        <>
          <circle cx="272" cy="96" r="34" className="ps-el ps-ripple fill-amber-400/30" style={m(5)} />
          <circle cx="272" cy="96" r="22" className="ps-el ps-rise fill-amber-400" style={m(7)} />
          <path d="M0 150Q80 100 170 140T340 122T400 142V200H0Z" className="fill-emerald-500/25" />
          <path d="M0 178Q100 134 200 168T400 160V200H0Z" className="fill-emerald-600/35" />
          <path d="M90 60l7 5 7-5M130 46l6 4 6-4" fill="none" className="ps-el ps-travel stroke-slate-500" strokeWidth="2" strokeLinecap="round" style={m(9, 0, 120, -14)} />
          <path d="M40 188h60M70 194h70" className="ps-el ps-fade stroke-sky-400" strokeWidth="2" strokeLinecap="round" style={m(3)} />
        </>
      );

    default:
      return type === 'Work' ? (
        <>
          <rect x="130" y="50" width="140" height="100" rx="12" className={`${SURFACE} stroke-blue-400`} strokeWidth="2.5" />
          <path d="M148 80h60M148 100h90M148 120h50" className={LINE} strokeWidth="3" strokeLinecap="round" />
          <circle cx="250" cy="76" r="8" className="ps-el ps-pulse fill-emerald-400" style={m(2)} />
        </>
      ) : (
        <>
          <rect x="120" y="50" width="160" height="100" rx="12" className={`${SURFACE} stroke-purple-400`} strokeWidth="2.5" />
          <path d="M148 90l-14 14 14 14M252 90l14 14-14 14M214 84l-28 40" fill="none" className="ps-el ps-pulse stroke-purple-500" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={m(3)} />
        </>
      );
  }
};

interface ProjectSceneProps {
  id: string;
  type: 'Work' | 'Personal';
  /** Positioning/size classes for the scene box. Cards use the top band; the modal header fills itself. */
  className?: string;
}

const ProjectScene: React.FC<ProjectSceneProps> = ({ id, type, className = 'absolute inset-x-0 top-0 h-[210px]' }) => (
  <div
    aria-hidden="true"
    className={`${className} pointer-events-none opacity-50 dark:opacity-60 transition-[opacity,transform] duration-500 ease-out group-hover:opacity-90 group-hover:scale-[1.04] [mask-image:linear-gradient(to_bottom,black_72%,transparent)]`}
  >
    <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <Scene id={id} type={type} />
    </svg>
  </div>
);

export default ProjectScene;
