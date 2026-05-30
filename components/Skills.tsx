
import React from 'react';
import { SKILLS } from '../constants';
import { Server, Cloud, Brain, GitBranch } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Skills: React.FC = () => {
  const getIcon = (category: string) => {
    if (category.includes('Backend')) return <Server className="w-6 h-6" />;
    if (category.includes('Cloud')) return <Cloud className="w-6 h-6" />;
    if (category.includes('AI')) return <Brain className="w-6 h-6" />;
    if (category.includes('DevOps')) return <GitBranch className="w-6 h-6" />;
    return <Server className="w-6 h-6" />;
  };

  return (
    <section id="skills" className="py-32 bg-transparent relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Technical Arsenal</h2>
          </ScrollReveal>
          <ScrollReveal delay="delay-100">
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
               A comprehensive toolset for building enterprise-grade applications.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skillGroup, idx) => (
            <ScrollReveal key={idx} delay={`delay-[${(idx * 100)}ms]`}>
              <div 
                className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-8 rounded-[2rem] shadow-lg border border-slate-200 dark:border-white/10 hover:border-primary-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full group relative overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 bg-white/20 dark:bg-white/5 text-primary-600 dark:text-primary-400 group-hover:scale-110 group-hover:bg-primary-50/50 dark:group-hover:bg-primary-900/30`}>
                  {getIcon(skillGroup.category)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-300 bg-white/20 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg shadow-sm hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-primary-500 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
