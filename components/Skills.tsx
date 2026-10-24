import React from 'react';
import { SKILLS } from '../constants';
import { Server, Network, Cloud, Database, Brain, MonitorSmartphone, GitBranch, Landmark, LucideIcon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// One entry per skill category (keyed by the category name in constants.ts).
// Tailwind needs full class names to exist in the source, so each colour is spelled out here.
interface CategoryStyle {
  Icon: LucideIcon;
  icon: string;
  tag: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  'Backend Engineering': { Icon: Server, icon: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 group-hover:bg-sky-500/20', tag: 'hover:border-sky-500' },
  'Architecture & Integration': { Icon: Network, icon: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 group-hover:bg-indigo-500/20', tag: 'hover:border-indigo-500' },
  'Cloud & Containers': { Icon: Cloud, icon: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 group-hover:bg-cyan-500/20', tag: 'hover:border-cyan-500' },
  'Databases & Performance': { Icon: Database, icon: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 group-hover:bg-emerald-500/20', tag: 'hover:border-emerald-500' },
  'AI & Agentic Engineering': { Icon: Brain, icon: 'text-violet-600 dark:text-violet-400 bg-violet-500/10 group-hover:bg-violet-500/20', tag: 'hover:border-violet-500' },
  'Frontend & Mobile': { Icon: MonitorSmartphone, icon: 'text-pink-600 dark:text-pink-400 bg-pink-500/10 group-hover:bg-pink-500/20', tag: 'hover:border-pink-500' },
  'DevOps, Quality & Tooling': { Icon: GitBranch, icon: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 group-hover:bg-amber-500/20', tag: 'hover:border-amber-500' },
  'Domain Expertise': { Icon: Landmark, icon: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 group-hover:bg-rose-500/20', tag: 'hover:border-rose-500' },
};

const FALLBACK: CategoryStyle = CATEGORY_STYLES['Backend Engineering'];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="pt-20 pb-14 md:pt-24 md:pb-16 bg-transparent relative">
      <div className="mx-auto w-full max-w-[1760px] px-6 lg:px-10">
        <div className="text-center mb-12">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Technical Arsenal</h2>
          </ScrollReveal>
          <ScrollReveal delay="delay-100">
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Eight focus areas, from JVM backends and cloud-native delivery to AI-assisted engineering and fraud-detection domain depth.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map((skillGroup, idx) => {
            const { Icon, icon, tag } = CATEGORY_STYLES[skillGroup.category] ?? FALLBACK;
            return (
              <ScrollReveal key={skillGroup.category} staggerMs={(idx % 4) * 80}>
                <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-6 rounded-[1.75rem] shadow-lg border border-slate-200 dark:border-white/10 hover:border-primary-300 hover:shadow-xl transition-[box-shadow,border-color] duration-300 h-full group relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-[background-color,transform] duration-300 group-hover:scale-110 ${icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">{skillGroup.category}</h3>
                  </div>
                  {/* Pills grow to fill each row so the card edge stays tidy; the zero-height spacer
                      soaks up the leftover space on the LAST row so it keeps natural pill widths. */}
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className={`flex-auto text-center px-2.5 py-1 text-[12.5px] leading-snug font-semibold whitespace-nowrap text-slate-700 dark:text-slate-300 bg-white/20 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg shadow-sm hover:bg-white/40 dark:hover:bg-white/10 transition-[background-color,border-color,transform] duration-200 hover:scale-[1.04] cursor-default ${tag}`}
                      >
                        {skill}
                      </span>
                    ))}
                    <span aria-hidden="true" className="h-0 min-w-0 basis-0 grow-[999]" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
