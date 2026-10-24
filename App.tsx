
import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleNetwork from './components/ParticleNetwork';
import AIChatbot from './components/AIChatbot';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // The inline script in index.html applies the saved/system theme before first paint;
  // read it back here so React state starts in sync with the DOM.
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Always load the main page on refresh. If a hash is present, 
    // remove it from the URL silently and scroll to the top.
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  const toggleTheme = (origin?: { x: number; y: number }) => {
    const next = !document.documentElement.classList.contains('dark');
    const root = document.documentElement;

    const applyTheme = () => {
      root.classList.toggle('dark', next);
      flushSync(() => setIsDark(next));
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch {
        // Storage can be unavailable (private mode); the toggle still works for this visit.
      }
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fallback (no View Transitions support, e.g. older Firefox): one shared colour cross-fade
    // so every surface changes together instead of each element using its own timing.
    if (!document.startViewTransition || reduceMotion) {
      root.classList.add('theme-fade');
      applyTheme();
      window.setTimeout(() => root.classList.remove('theme-fade'), 400);
      return;
    }

    // View Transition: snapshot old/new themes and reveal the new one as a circle
    // expanding from the toggle button. Per-element transitions are disabled while it runs
    // so the "new" snapshot is captured at its final colours.
    root.classList.add('theme-switching');
    const x = origin?.x ?? window.innerWidth - 80;
    const y = origin?.y ?? 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(applyTheme);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  };

  return (
    <div className="min-h-screen bg-transparent relative flex flex-col">
      
      <ParticleNetwork isDark={isDark} />
      
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="relative z-10 flex-grow">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <About />
        <Education />
        <Contact />
      </main>
      
      <ScrollToTop />
      <AIChatbot />
      <Footer />
    </div>
  );
}

export default App;
