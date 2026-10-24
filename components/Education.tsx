
import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../constants';
import ScrollReveal from './ScrollReveal';

const Education: React.FC = () => {
  return (
    <section id="education" className="pt-20 pb-14 md:pt-24 md:pb-16 bg-transparent relative">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div className="flex flex-col">
                <div className="mb-8">
                    <ScrollReveal>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary-100/50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight heading-clip bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Education</h2>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="flex flex-col gap-6 flex-1">
                    {EDUCATION.map((edu, index) => (
                        <ScrollReveal key={edu.school} staggerMs={index * 80} className="flex-1">
                        <div className="h-full bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg p-5 md:p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{edu.school}</h3>
                            <p className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-1">{edu.degree}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-4">{edu.location}</p>
                            
                            <div className="space-y-2">
                                {edu.details.map((detail, i) => (
                                <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-2">
                                    <span aria-hidden="true" className="flex h-[1.625em] items-center shrink-0"><span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full"></span></span>
                                    {detail}
                                </p>
                                ))}
                            </div>
                        </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            <div className="flex flex-col">
                <div className="mb-8">
                    <ScrollReveal delay="delay-200">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl">
                                <Award className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight heading-clip bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Certifications</h2>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Rows share the column's height equally, so any number of certificates ends flush
                    with the Education column instead of stretching the layout. */}
                <div className="flex flex-col gap-3 flex-1">
                  {CERTIFICATIONS.map((cert, index) => (
                    <ScrollReveal key={cert.name} staggerMs={index * 50 + 120} className="flex-1 min-h-[64px]">
                        <div className="h-full flex items-center justify-between gap-3 px-5 py-3 rounded-[1.25rem] bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:bg-white/20 dark:hover:bg-slate-800/40 transition-[box-shadow,background-color] duration-300 group">
                            <div className="flex items-center gap-3.5 min-w-0">
                                <div className="w-10 h-10 shrink-0 rounded-full bg-purple-50/30 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-[15px] leading-snug font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">{cert.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{cert.issuer}<span className="sm:hidden">{cert.issuer ? " · " : ""}{cert.date}</span></p>
                                </div>
                            </div>
                            <span className="hidden sm:inline-block shrink-0 text-xs font-bold text-slate-400 dark:text-slate-500 bg-white/20 dark:bg-white/10 px-3 py-1 rounded-full">
                                {cert.date}
                            </span>
                        </div>
                    </ScrollReveal>
                  ))}
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Education;
