
import React from 'react';
import { SUMMARY, AWARDS } from '../constants';
import { Bot, Trophy, Target, Brain, Sparkles, Terminal, Github, Command } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const ChatGPTIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.108a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-2.1466zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829v-2.3324a.0804.0804 0 0 1 .0332-.0615l4.3178-2.4952a4.4992 4.4992 0 0 1 6.1408 2.1466 4.4755 4.4755 0 0 1 .5346 3.0137l-.1419-.0852-4.7829-2.7582a.7712.7712 0 0 0-.7806 0l-5.8428 3.3685zm.8344-7.5146a4.4945 4.4945 0 0 1 2.8812 1.0409l-.1419.0804-4.783 2.7581a.7948.7948 0 0 0-.3927.6813v6.7369l-2.0199-1.1685a.071.071 0 0 1-.0379-.052V8.7308a4.504 4.504 0 0 1 4.4944-4.4944zM10.9754 3.993a4.4755 4.4755 0 0 1 4.5422-.4446v5.6728a.7712.7712 0 0 0-.3879-.6765l-5.8144-3.3543 2.0201-1.1685a.0757.0757 0 0 1 .071 0l4.8303 2.7865z" />
  </svg>
);

const ClaudeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
  </svg>
);

const About: React.FC = () => {
  const experienceYears = React.useMemo(() => {
    const startDate = new Date('2020-05-01');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return diffYears.toFixed(1);
  }, []);

  const dynamicSummary = SUMMARY.replace('{{YRS}}', experienceYears);

  const tools = [
    { name: 'Cursor', icon: Command, color: 'text-blue-400', bg: 'group-hover/item:bg-blue-500/10', border: 'group-hover/item:border-blue-500/50', iconColor: 'group-hover/item:text-blue-400' },
    { name: 'Claude', icon: ClaudeIcon, color: 'text-amber-500', bg: 'group-hover/item:bg-amber-500/10', border: 'group-hover/item:border-amber-500/50', iconColor: 'group-hover/item:text-amber-500' },
    { name: 'Copilot', icon: Github, color: 'text-white', bg: 'group-hover/item:bg-slate-500/10', border: 'group-hover/item:border-slate-500/50', iconColor: 'group-hover/item:text-white' },
    { name: 'MCPs', icon: Bot, color: 'text-purple-400', bg: 'group-hover/item:bg-purple-500/10', border: 'group-hover/item:border-purple-500/50', iconColor: 'group-hover/item:text-purple-400' },
  ];

  return (
    <section id="about" className="py-32 bg-transparent relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center md:text-left">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Beyond the Code</h2>
          </ScrollReveal>
          <ScrollReveal delay="delay-100">
            <div className="h-1.5 w-24 bg-primary-600 rounded-full md:mx-0 mx-auto"></div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Main Summary Block */}
          <div className="md:col-span-8 bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-primary-100/50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Engineering Philosophy</h3>
            </div>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-loose font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
              {dynamicSummary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Java Champion', 'Backend Engineer', 'AI Enthusiast'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full bg-white/20 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-200 dark:border-white/10 shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Expanded AI Focus Block - Redesigned for "AI Generated" Look */}
          <div className="md:col-span-4 relative group rounded-[2.5rem] overflow-hidden">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-blue-600 opacity-40 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-md"></div>

            {/* Card Content - Always Dark for Tech Feel */}
            <div className="absolute inset-[2px] bg-slate-950 rounded-[2.4rem] overflow-hidden z-10">

              {/* Dynamic Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

              {/* Animated Glow Orbs */}
              <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-cyan-500/10 blur-[80px] animate-pulse rounded-full"></div>
              <div className="absolute bottom-[-50%] right-[-50%] w-full h-full bg-purple-500/10 blur-[80px] animate-pulse rounded-full delay-700"></div>

              <div className="relative h-full p-8 flex flex-col justify-between">

                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      <Bot className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">AI Native</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Intelligent Workflow</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                    Fully integrating modern AI tools like GPT, Claude, Cursor, MCP Servers, and Generative AI agents into the development lifecycle. This involves prompt engineering, deploying and integrating MCP Servers, and orchestrating generative AI agents to drastically accelerate architecture decisions and automate test coverage. Transforming natural language into robust, production-ready infrastructure code.
                  </p>

                  {/* Tool Tokens */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tools.map((tool) => (
                      <div key={tool.name} className={`px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 flex items-center gap-2 group/item cursor-default backdrop-blur-sm ${tool.bg} ${tool.border}`}>
                        <tool.icon className={`w-3 h-3 text-slate-500 transition-colors ${tool.iconColor}`} />
                        <span className={`text-[11px] font-bold text-slate-300 transition-colors ${tool.iconColor}`}>{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Terminal/Code Snippet Visual */}
                <div className="mt-auto p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-[10px] text-slate-400 leading-relaxed relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50"></div>
                  <div className="flex items-center gap-2 mb-2 text-slate-600 border-b border-white/5 pb-2">
                    <Terminal size={10} />
                    <span>agent.process_task()</span>
                  </div>
                  <div className="space-y-1">
                    <p className="flex gap-2">
                      <span className="text-slate-600">1</span>
                      <span><span className="text-purple-400">const</span> <span className="text-blue-400">context</span> = <span className="text-green-400">await</span> load(docs);</span>
                    </p>
                    <p className="flex gap-2">
                      <span className="text-slate-600">2</span>
                      <span><span className="text-purple-400">return</span> <span className="text-yellow-400">generate</span>(context);</span>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-cyan-500/70">
                    <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>
                    <span>Optimizing...</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Awards Block */}
          <div className="md:col-span-6 bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-yellow-100/50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Recognition</h3>
            </div>
            <div className="space-y-6">
              {AWARDS.map((award, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 transition-colors">
                  <span className="text-4xl">🏆</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{award.title}</h4>
                    <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">{award.issuer} • {award.year}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Block */}
          <div className="md:col-span-6 grid grid-rows-3 gap-6">
            <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-lg flex items-center gap-6 hover:-translate-y-1 transition-transform group">
              <div className="p-4 bg-green-100/50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Result Driven</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Engineered high-concurrency parallel processing architectures that slashed credit approval times by <span className="text-slate-900 dark:text-white font-bold">80%</span>, optimizing financial workflows for enterprise clients.
                </p>
              </div>
            </div>
            <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-lg flex items-center gap-6 hover:-translate-y-1 transition-transform group">
              <div className="p-4 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Client Engagement</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Pioneered a configurable Dynamic Notification engine, driving a <span className="text-slate-900 dark:text-white font-bold">25% increase</span> in client engagement through personalized, rule-based alerting systems.
                </p>
              </div>
            </div>
            <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-lg flex items-center gap-6 hover:-translate-y-1 transition-transform group">
              <div className="p-4 bg-orange-100/50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">AI-Driven Innovation</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Architected an AI-native engineering ecosystem by integrating Generative AI agents and intelligent coding assistants. Automated complex workflows to boost overall team productivity by <span className="text-slate-900 dark:text-white font-bold">50%</span> and dramatically accelerate project delivery.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
