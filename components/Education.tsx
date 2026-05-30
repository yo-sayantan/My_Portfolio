
import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../constants';
import ScrollReveal from './ScrollReveal';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-32 bg-transparent relative">
      <div className="container mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-16">
            <div>
                <div className="mb-10">
                    <ScrollReveal>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary-100/50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Education</h2>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="space-y-8">
                    {EDUCATION.map((edu, index) => (
                        <ScrollReveal key={index} delay={`delay-[${index * 150}ms]`}>
                        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{edu.school}</h3>
                            <p className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-1">{edu.degree}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-4">{edu.location}</p>
                            
                            <div className="space-y-2">
                                {edu.details.map((detail, i) => (
                                <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-2">
                                    <span className="mt-2 w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full shrink-0"></span>
                                    {detail}
                                </p>
                                ))}
                            </div>
                        </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            <div>
                <div className="mb-10">
                    <ScrollReveal delay="delay-200">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl">
                                <Award className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Certifications</h2>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="space-y-4">
                  {CERTIFICATIONS.map((cert, index) => (
                    <ScrollReveal key={index} delay={`delay-[${(index * 100) + 200}ms]`}>
                        <div className="flex items-center justify-between p-6 rounded-[1.5rem] bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:bg-white/20 dark:hover:bg-slate-800/40 transition-all duration-300 group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-50/30 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">{cert.name}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{cert.issuer}</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-white/20 dark:bg-white/10 px-3 py-1 rounded-full">
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
