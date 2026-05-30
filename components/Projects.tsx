
import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Code2, Github, Lock, X, ExternalLink, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Work' | 'Personal'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const filteredProjects = PROJECTS.filter(p => filter === 'All' || p.type === filter);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      // Reset redirect state when modal opens
      setIsRedirecting(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const handleGithubClick = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    if (isRedirecting) return;

    setIsRedirecting(true);
    
    // Simulate a brief loading/preparation phase for visual feedback
    setTimeout(() => {
      window.open(link, '_blank');
      setIsRedirecting(false);
    }, 1500);
  };

  const renderDoodle = (project: Project) => {
    switch (project.id) {
      case 'book-exchange':
        return (
          <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
               <path d="M50 150 Q 100 50 150 150 T 250 150" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-300" strokeDasharray="8,8" />
               <rect x="120" y="60" width="40" height="60" rx="4" className="fill-primary-100 dark:fill-primary-900/50 stroke-primary-400" strokeWidth="2" />
               <rect x="130" y="50" width="40" height="60" rx="4" className="fill-white dark:fill-slate-800 stroke-primary-400" strokeWidth="2" />
               <path d="M140 80 H160 M140 95 H160 M140 110 H155" stroke="currentColor" strokeWidth="2" className="text-slate-400" />
               
               <circle cx="280" cy="80" r="15" className="fill-purple-100 dark:fill-purple-900/50 stroke-purple-400 animate-pulse" strokeWidth="2" />
               <circle cx="320" cy="120" r="10" className="fill-blue-100 dark:fill-blue-900/50 stroke-blue-400" strokeWidth="2" />
               <line x1="295" y1="80" x2="320" y2="120" stroke="currentColor" className="text-slate-300" />
            </svg>
          </div>
        );

      case 'quick-task':
        return (
          <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-1">
            <div className="absolute top-8 left-12 w-28 h-48 border-4 border-slate-300 dark:border-slate-600 rounded-[1.5rem] bg-white dark:bg-slate-800 transform -rotate-12 shadow-xl overflow-hidden group-hover:-rotate-6 transition-transform duration-500">
               <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 border-b border-slate-200"></div>
               <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2">
                     <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500/20"></div>
                     <div className="w-16 h-2 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500/20"></div>
                     <div className="w-12 h-2 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                     <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                     <div className="w-14 h-2 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                  </div>
               </div>
               <div className="absolute bottom-4 right-4 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-lg font-bold">+</div>
            </div>
            <div className="absolute top-20 right-16 w-6 h-6 rounded-full bg-yellow-400/50 animate-bounce"></div>
          </div>
        );

      case 'investment-tracker':
        return (
          <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-105">
             <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#10b981" stopOpacity="0.4"/>
                   <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                 </linearGradient>
               </defs>
               <path d="M0 150 L 60 130 L 120 160 L 180 100 L 240 120 L 320 40 L 400 60 V 200 H 0 Z" fill="url(#chartGrad)" className="group-hover:translate-y-1 transition-transform duration-500"/>
               <polyline points="0,150 60,130 120,160 180,100 240,120 320,40 400,60" fill="none" stroke="#10b981" strokeWidth="3" className="group-hover:stroke-[4px] transition-all duration-500"/>
            </svg>
            <div className="absolute top-10 right-10 px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-800 shadow-sm group-hover:scale-110 transition-transform duration-300">
              +24.5%
            </div>
          </div>
        );

      default:
        if (project.type === 'Work') {
          return (
            <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-105">
              <div className="absolute top-8 left-10 w-24 h-32 border-2 border-blue-400/30 rounded-lg flex flex-col gap-2 p-2 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="h-2 w-full bg-blue-400/20 rounded-full animate-pulse"></div>
                <div className="h-2 w-2/3 bg-blue-400/20 rounded-full"></div>
                <div className="h-2 w-full bg-blue-400/20 rounded-full"></div>
                <div className="mt-auto flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
                   <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                </div>
              </div>
              <svg className="absolute inset-0 w-full h-full">
                 <path d="M140 60 Q 200 100 250 60" stroke="currentColor" strokeWidth="1" fill="none" className="text-slate-300 dark:text-slate-600" strokeDasharray="5,5" />
                 <circle cx="140" cy="60" r="3" className="fill-blue-400" />
                 <circle cx="250" cy="60" r="3" className="fill-purple-400" />
              </svg>
            </div>
          );
        } else {
          return (
            <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-105">
              <div className="absolute top-6 right-8 w-32 h-24 bg-slate-800/5 border border-purple-400/30 rounded-lg p-2 flex flex-col gap-1.5 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                 <div className="flex gap-1 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                 </div>
                 <div className="w-3/4 h-1 bg-slate-400/30 rounded-full"></div>
                 <div className="w-1/2 h-1 bg-slate-400/30 rounded-full ml-2"></div>
                 <div className="w-2/3 h-1 bg-slate-400/30 rounded-full"></div>
              </div>
              <div className="absolute bottom-8 left-12 text-purple-500/30 rotate-12 group-hover:rotate-[360deg] transition-transform duration-1000">
                  <Code2 size={40} />
              </div>
            </div>
          );
        }
    }
  };

  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-20">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Featured </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">Projects</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay="delay-100">
            <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/50 backdrop-blur-xl rounded-full border border-slate-200 dark:border-white/5 shadow-sm relative">
               {['All', 'Work', 'Personal'].map((type) => (
                 <button
                   key={type}
                   onClick={() => setFilter(type as any)}
                   className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                     filter === type 
                     ? 'bg-slate-900 text-white shadow-lg scale-105' 
                     : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                   }`}
                 >
                   {type}
                 </button>
               ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={`delay-[${index * 100}ms]`}>
              <div
                 onClick={() => setSelectedProject(project)}
                 className={`
                    group relative h-[420px] rounded-[2.5rem] bg-white dark:bg-slate-900 
                    border border-slate-200 dark:border-slate-800 overflow-hidden 
                    transition-all duration-500 
                    hover:-translate-y-4 hover:scale-[1.03] hover:shadow-[0_20px_80px_-15px_rgba(14,165,233,0.3)] hover:border-primary-500/30
                    cursor-pointer flex flex-col
                 `}
              >
                 {/* Project Visual / Doodle Background */}
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 transition-colors duration-500 group-hover:from-primary-50/50 group-hover:to-purple-50/50 dark:group-hover:from-primary-900/20 dark:group-hover:to-purple-900/20 z-0">
                    {renderDoodle(project)}
                 </div>
                 
                 {/* Content Overlay - Removed complex pointer-events for better touch support */}
                 <div className="relative z-10 p-8 flex flex-col h-full">
                    
                    {/* Icon Header */}
                    <div className="mb-auto">
                       <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                             {project.type === 'Work' ? <Lock size={20} /> : <Code2 size={20} />}
                          </div>
                       </div>
                    </div>

                    {/* Text Content */}
                    <div>
                       <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                         {project.title}
                       </h3>
                       <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                         {project.description}
                       </p>
                       
                       <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                             <span key={i} className="px-3 py-1 rounded-lg text-xs font-bold bg-white/60 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                               {tech}
                             </span>
                          ))}
                          {project.techStack.length > 3 && (
                             <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white/60 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-500">
                               +{project.techStack.length - 3}
                             </span>
                          )}
                       </div>

                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 mt-auto flex items-center gap-3">
                            {/* Main 'See Details' Button for better mobile interaction */}
                            <button type="button" className="py-2.5 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-md group-hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                                See Project
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Secondary Github Button */}
                            {project.link ? (
                                <button 
                                  onClick={(e) => handleGithubClick(e, project.link!)}
                                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 ml-auto"
                                  title="View Code"
                                >
                                    <Github size={20} />
                                </button>
                            ) : (
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 border border-slate-100 dark:border-slate-800 cursor-not-allowed ml-auto" title="Private Repo">
                                    <Lock size={16} />
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => !isRedirecting && setSelectedProject(null)}
          ></div>
          <div className={`bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-white/10 flex flex-col transition-opacity duration-300 ${isRedirecting ? 'pointer-events-none opacity-90' : ''}`}>
             
             {/* Modal Header */}
             <div className={`relative h-48 md:h-64 shrink-0 bg-slate-100 dark:bg-slate-950 overflow-hidden group ${isRedirecting ? 'opacity-50' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10">
                   {renderDoodle(selectedProject)}
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  disabled={isRedirecting}
                  className="absolute top-6 right-6 p-2.5 bg-white/20 backdrop-blur-md border border-white/10 text-slate-900 dark:text-white rounded-full hover:bg-white/40 transition-colors z-20"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 left-6 md:left-10 z-10">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                      {selectedProject.type} Project
                   </div>
                   <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                     {selectedProject.title}
                   </h2>
                </div>
             </div>

             {/* Modal Content */}
             <div className={`p-6 md:p-10 grid lg:grid-cols-3 gap-10 transition-opacity duration-300 ${isRedirecting ? 'opacity-50' : ''}`}>
               
               {/* Main Info - Left Col */}
               <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Overview</h4>
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.features && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Key Features</h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm font-medium">
                             <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                             {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
               </div>

               {/* Sidebar - Right Col */}
               <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.link ? (
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                       <h4 className="font-bold text-slate-900 dark:text-white mb-2">Interested in the code?</h4>
                       <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                         Check out the repository to see the implementation details and contribution guidelines.
                       </p>
                       <button 
                         onClick={(e) => handleGithubClick(e, selectedProject.link!)}
                         disabled={isRedirecting}
                         className={`
                           flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm 
                           transition-all duration-300 shadow-lg
                           ${isRedirecting 
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-wait translate-y-0 shadow-none' 
                              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:-translate-y-0.5 hover:shadow-xl active:scale-95'
                           }
                         `}
                       >
                         {isRedirecting ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              <span className="animate-pulse">Redirecting to GitHub...</span>
                            </>
                         ) : (
                            <>
                              <Github size={18} />
                              <span>View on GitHub</span>
                              <ExternalLink size={14} className="ml-0.5 opacity-70" />
                            </>
                         )}
                       </button>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 opacity-75">
                       <div className="flex items-center gap-2 mb-2">
                         <Lock className="text-slate-400" size={20} />
                         <h4 className="font-bold text-slate-900 dark:text-white">Internal Project</h4>
                       </div>
                       <p className="text-xs text-slate-500 dark:text-slate-400">
                         The source code for this project is proprietary and cannot be shared publicly due to company policies.
                       </p>
                    </div>
                  )}
               </div>

             </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
