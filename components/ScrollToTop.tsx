import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling past the first 2 sections (roughly 1.5 - 2 screen heights)
      if (window.scrollY > window.innerHeight * 1.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    // Check initially in case page is reloaded halfway down
    toggleVisibility();
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // Optional: Clear any hash URL to signify returning to top cleanly
    window.history.replaceState(null, '', window.location.pathname);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 left-6 z-50 p-4 rounded-2xl
        bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl 
        border border-slate-200/50 dark:border-slate-700/50 
        text-slate-600 dark:text-slate-300 
        shadow-lg shadow-slate-900/5 dark:shadow-black/20
        hover:shadow-xl hover:shadow-primary-500/20 hover:-translate-y-1.5 
        hover:bg-white dark:hover:bg-slate-800 
        hover:text-primary-600 dark:hover:text-primary-400 
        hover:border-primary-200 dark:hover:border-primary-700/50 
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isVisible ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-12 scale-90 pointer-events-none'}
      `}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp className="w-6 h-6 stroke-[2.5px]" />
    </button>
  );
};

export default ScrollToTop;
