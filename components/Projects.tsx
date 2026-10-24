
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS } from '../constants';
import { Code2, Github, Lock, X, ExternalLink, CheckCircle, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { Project } from '../types';
import ProjectScene from './ProjectScenes';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Work' | 'Personal'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  const filteredProjects = PROJECTS.filter(p => filter === 'All' || p.type === filter);

  // Lock body scroll, close on Escape, and move focus into the modal while it's open
  useEffect(() => {
    if (!selectedProject) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedProject(null);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [selectedProject]);

  const openOnKey = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedProject(project);
    }
  };

  return (
    <section id="projects" className="pt-20 pb-14 md:pt-24 md:pb-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
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
                   onClick={() => setFilter(type as typeof filter)}
                   aria-pressed={filter === type}
                   className={`px-6 sm:px-8 py-2.5 rounded-full text-sm font-bold transition-[background-color,color,box-shadow,transform] duration-200 ${
                     filter === type 
                     ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg scale-105' 
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
            <ScrollReveal key={project.id} staggerMs={(index % 3) * 80}>
              <div
                 role="button"
                 tabIndex={0}
                 aria-label={`Open details for ${project.title}`}
                 onClick={() => setSelectedProject(project)}
                 onKeyDown={(e) => openOnKey(e, project)}
                 className={`
                    group relative h-[420px] rounded-[2.5rem] bg-white dark:bg-slate-900 
                    border border-slate-200 dark:border-slate-800 overflow-hidden 
                    transition-[transform,box-shadow,border-color] duration-300 ease-out
                    hover:-translate-y-2 hover:shadow-[0_20px_80px_-15px_rgba(14,165,233,0.3)] hover:border-primary-500/30
                    active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950
                    cursor-pointer flex flex-col
                 `}
              >
                 {/* Project Visual / Doodle Background */}
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 transition-colors duration-500 group-hover:from-primary-50/50 group-hover:to-purple-50/50 dark:group-hover:from-primary-900/20 dark:group-hover:to-purple-900/20 z-0">
                    <ProjectScene id={project.id} type={project.type} />
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
                            <span className="py-2.5 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow duration-300 flex items-center gap-2">
                                See Project
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </span>

                            {/* Secondary Github Button */}
                            {project.link ? (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-[background-color,transform] duration-150 border border-slate-200 dark:border-slate-700 ml-auto"
                                  title="View code on GitHub"
                                  aria-label={`View ${project.title} source code on GitHub`}
                                >
                                    <Github size={20} />
                                </a>
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

      {/* Modal — portalled to <body> so the section's stacking context can't trap it under the fixed header */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200" 
            onClick={() => setSelectedProject(null)}
          ></div>
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-[2rem] shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300 ease-out-strong border border-slate-200 dark:border-white/10 flex flex-col">
             
             {/* Modal Header */}
             <div className="relative h-48 md:h-64 shrink-0 bg-slate-100 dark:bg-slate-950 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10">
                   <ProjectScene id={selectedProject.id} type={selectedProject.type} className="absolute inset-0 pb-10" />
                </div>
                <button 
                  ref={closeButtonRef}
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="absolute top-6 right-6 p-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/60 dark:border-white/10 text-slate-900 dark:text-white rounded-full hover:bg-white/80 dark:hover:bg-slate-700/80 active:scale-95 transition-[background-color,transform] duration-150 z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 left-6 md:left-10 z-10">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                      {selectedProject.type} Project
                   </div>
                   <h2 id="project-modal-title" className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight pr-16">
                     {selectedProject.title}
                   </h2>
                </div>
             </div>

             {/* Modal Content */}
             <div className="p-6 md:p-10 grid lg:grid-cols-3 gap-10">
               
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
                         Browse the repository for the full implementation, architecture and setup instructions.
                       </p>
                       <a
                         href={selectedProject.link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-[transform,box-shadow] duration-200 shadow-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
                       >
                         <Github size={18} />
                         <span>View on GitHub</span>
                         <ExternalLink size={14} className="ml-0.5 opacity-70" />
                       </a>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 opacity-75">
                       <div className="flex items-center gap-2 mb-2">
                         <Lock className="text-slate-400" size={20} />
                         <h4 className="font-bold text-slate-900 dark:text-white">
                           {selectedProject.type === 'Work' ? 'Internal Project' : 'Private Repository'}
                         </h4>
                       </div>
                       <p className="text-xs text-slate-500 dark:text-slate-400">
                         {selectedProject.type === 'Work' 
                           ? 'The source code for this project is proprietary and cannot be shared publicly due to company policies.' 
                           : 'The source code for this project is kept private and is not available for public access.'}
                       </p>
                    </div>
                  )}
               </div>

             </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Projects;
