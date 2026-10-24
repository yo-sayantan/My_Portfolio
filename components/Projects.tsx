
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS } from '../constants';
import { Code2, Github, Lock, X, ExternalLink, CheckCircle, ArrowRight, Terminal } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { Project } from '../types';
import ProjectScene from './ProjectScenes';

/** How many tech tags a card shows before collapsing the rest into "+N". */
const CARD_TAGS = 5;

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
                    group relative h-[450px] rounded-[2.5rem] bg-white dark:bg-slate-900 
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
                       {/* Fixed-height rows (title / summary / tags) keep every card's text on the same lines */}
                       <h3 title={project.title} className="h-7 text-xl xl:text-[22px] leading-7 font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                         {project.title}
                       </h3>
                       <p className="h-[46px] text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                         {project.summary ?? project.description}
                       </p>
                       
                       {/* Key stack: techStack is ordered by importance, so the card shows the first few */}
                       <div className="flex flex-wrap content-start gap-1.5 h-[60px] overflow-hidden mb-4">
                          {project.techStack.slice(0, CARD_TAGS).map((tech) => (
                             <span key={tech} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/60 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                               {tech}
                             </span>
                          ))}
                          {project.techStack.length > CARD_TAGS && (
                             <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/60 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-500">
                               +{project.techStack.length - CARD_TAGS}
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
          {/* One fixed size per project type (work projects have less to show, so their window is shorter) */}
          <div className={`bg-white dark:bg-slate-900 w-full max-w-[1075px] ${selectedProject.type === 'Work' ? 'h-[min(92vh,750px)]' : 'h-[min(92vh,940px)]'} rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-300 ease-out-strong border border-slate-200 dark:border-white/10`}>

             {/* Close button lives outside the scroller so it never scrolls away */}
             <button 
               ref={closeButtonRef}
               onClick={() => setSelectedProject(null)}
               aria-label="Close project details"
               className="absolute top-5 right-5 md:top-6 md:right-6 p-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/70 dark:border-white/10 text-slate-900 dark:text-white rounded-full hover:bg-white/90 dark:hover:bg-slate-700/80 active:scale-95 transition-[background-color,transform] duration-150 z-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
             >
               <X size={20} />
             </button>

             <div className="h-full overflow-y-auto overscroll-contain">

               {/* Tall animated header at rest. It is sticky with a negative offset, so on scroll it
                   slides away until only the bottom strip (chip + title) is left, pinned as frosted
                   glass with the content blurring underneath it. */}
               <div className="sticky -top-24 md:-top-40 z-30 group h-48 md:h-64 overflow-hidden border-b border-slate-200/70 dark:border-white/10 bg-white/55 dark:bg-slate-900/55 backdrop-blur-2xl backdrop-saturate-150">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 pointer-events-none" />
                  <ProjectScene id={selectedProject.id} type={selectedProject.type} fade={false} className="absolute inset-y-0 right-0 w-[62%] md:w-[58%] pb-8 pr-6" />
                  <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-4 md:pb-5 pr-20">
                     <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/50 dark:bg-black/30 border border-slate-200/70 dark:border-white/15 text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-white mb-1.5">
                        {selectedProject.type === 'Work' ? <Lock size={11} /> : <Code2 size={11} />}
                        {selectedProject.type} Project
                     </div>
                     <h2 id="project-modal-title" className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                       {selectedProject.title}
                     </h2>
                  </div>
               </div>

               {/* Content */}
               <div className="p-6 md:p-8 grid lg:grid-cols-3 gap-x-8 gap-y-7">

                 {/* Main column */}
                 <div className="lg:col-span-2 space-y-7">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Overview</h4>
                      <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>

                    {selectedProject.features && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Key Features</h4>
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                          {selectedProject.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300 text-sm font-medium leading-snug">
                               <CheckCircle className="w-[18px] h-[18px] mt-px text-green-500 shrink-0" />
                               {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProject.requirements && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Run It With</h4>
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                          {selectedProject.requirements.map((req) => (
                            <li key={req} className="flex items-start gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                              <Terminal className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                 </div>

                 {/* Sidebar */}
                 <div className="space-y-7">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Technology Stack</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.techStack.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedProject.skills && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Skills Demonstrated</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.skills.map((skill) => (
                            <span key={skill} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/40 text-primary-700 dark:text-primary-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedProject.link ? (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-[transform,box-shadow] duration-200 shadow-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
                      >
                        <Github size={18} />
                        <span>View Source on GitHub</span>
                        <ExternalLink size={14} className="ml-0.5 opacity-70" />
                      </a>
                    ) : (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 opacity-80">
                         <div className="flex items-center gap-2 mb-1.5">
                           <Lock className="text-slate-400" size={18} />
                           <h4 className="font-bold text-sm text-slate-900 dark:text-white">
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
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Projects;
