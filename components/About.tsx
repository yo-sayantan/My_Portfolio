
import React from 'react';
import { SUMMARY, AWARDS, getExperienceYears } from '../constants';
import { Bot, Trophy, Target, Brain, Sparkles, Terminal, Command, Rocket } from 'lucide-react';
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
  const experienceYears = React.useMemo(() => getExperienceYears(), []);

  const dynamicSummary = SUMMARY.replace('{{YRS}}', experienceYears);

  const tools = [
    { name: 'Claude Code', icon: ClaudeIcon },
    { name: 'Cursor', icon: Command },
    { name: 'ChatGPT', icon: ChatGPTIcon },
    { name: 'Gemini', icon: Sparkles },
    { name: 'Ollama', icon: Terminal },
    { name: 'MCP Servers', icon: Bot },
  ];

  const aiPractices = [
    'MCP servers connect agents to Jira, Bitbucket, Jenkins and Dynatrace, so they work with real engineering context.',
    'Agent-assisted coding, test generation and documentation across the whole SDLC.',
    'Built AI Jira Board: local (Ollama) or cloud LLMs write ticket briefs and PR readiness reports.',
  ];

  return (
    <section id="about" className="pt-20 pb-14 md:pt-24 md:pb-16 bg-transparent relative">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center md:text-left">
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
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed md:leading-loose font-medium">
              {dynamicSummary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Java & Spring Specialist', 'Cloud-Native Microservices', 'AI-Native Engineer'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full bg-white/20 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-200 dark:border-white/10 shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Intelligent Workflow — a deliberately dark "AI engineer" card: cyan/emerald on near-black,
              static (no lift), with only a border + glow shift on hover */}
          <div className="md:col-span-4 relative group rounded-[2.5rem] overflow-hidden bg-slate-950 border border-slate-800 shadow-lg hover:border-cyan-400/50 hover:shadow-[0_0_60px_-18px_rgba(34,211,238,0.45)] transition-[border-color,box-shadow] duration-500">

            {/* Engineering-grid texture + soft cyan wash from the top */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_80%)]" />
            <div className="absolute inset-x-0 top-0 h-40 pointer-events-none bg-[radial-gradient(60%_100%_at_50%_0%,rgba(34,211,238,0.16),transparent)] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

            <div className="relative h-full p-7 flex flex-col gap-5 z-10">

              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/25 flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">AI-Native</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Intelligent Workflow</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  AI is part of how I ship software, not an add-on. I rolled Claude, Cursor and MCP servers out across Experian&apos;s engineering workflow.
                </p>
              </div>

              {/* Concrete practices */}
              <ul className="space-y-2.5">
                {aiPractices.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-snug text-slate-300">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Results */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                  <p className="text-2xl font-black text-cyan-300 leading-none">~50%</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Team productivity · Experian</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                  <p className="text-2xl font-black text-emerald-300 leading-none">30%</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Productivity gain · Oracle</p>
                </div>
              </div>

              {/* Toolchain */}
              <div className="flex flex-wrap gap-1.5">
                {tools.map((tool) => (
                  <span key={tool.name} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition-colors duration-200 hover:border-cyan-400/40 hover:text-cyan-200">
                    <tool.icon className="h-3 w-3 text-slate-500" />
                    {tool.name}
                  </span>
                ))}
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
          <div className="md:col-span-6 grid grid-rows-4 gap-4">
            <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg px-6 py-5 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg flex items-center gap-5 hover:-translate-y-1 transition-transform group">
              <div className="p-3.5 shrink-0 bg-green-100/50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Result Driven</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Engineered high-concurrency parallel processing architectures that slashed credit approval times by <span className="text-slate-900 dark:text-white font-bold">80%</span>, optimizing financial workflows for enterprise clients.
                </p>
              </div>
            </div>
            <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg px-6 py-5 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg flex items-center gap-5 hover:-translate-y-1 transition-transform group">
              <div className="p-3.5 shrink-0 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Client Engagement</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Pioneered a configurable Dynamic Notification engine, driving a <span className="text-slate-900 dark:text-white font-bold">25% increase</span> in client engagement through personalized, rule-based alerting systems.
                </p>
              </div>
            </div>
            <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg px-6 py-5 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg flex items-center gap-5 hover:-translate-y-1 transition-transform group">
              <div className="p-3.5 shrink-0 bg-orange-100/50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">AI-Driven Innovation</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Architected an AI-native engineering ecosystem by integrating Generative AI agents and intelligent coding assistants. Automated complex workflows to boost overall team productivity by <span className="text-slate-900 dark:text-white font-bold">50%</span> and dramatically accelerate project delivery.
                </p>
              </div>
            </div>
            <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg px-6 py-5 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg flex items-center gap-5 hover:-translate-y-1 transition-transform group">
              <div className="p-3.5 shrink-0 bg-sky-100/50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Rocket className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Cloud-Native Modernizer</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Led the migration of legacy on-prem applications to <span className="text-slate-900 dark:text-white font-bold">AWS</span> with Docker and Kubernetes, upgraded core systems from <span className="text-slate-900 dark:text-white font-bold">JDK 8 to 21</span> with zero-downtime CI/CD, and closed critical vulnerabilities. Recognized with the 2026 NIKE Technology Transformation award.
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
