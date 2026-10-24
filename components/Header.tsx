
import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Download, Sun, Moon } from 'lucide-react';
import { OWNER } from '../ownerConfig';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track when a hash-link click triggers a smooth scroll — during that period
  // we must NOT call replaceState or it will overwrite the target hash mid-scroll
  // and cancel/confuse the browser's native smooth-scroll.
  const isNavigatingRef = React.useRef(false);
  const navTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const activeSectionRef = React.useRef('hero');

  useEffect(() => {
    // Intercept hash-link clicks so we can set the "navigating" flag
    const handleHashClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;

      // Mark that we are doing a programmatic smooth-scroll
      isNavigatingRef.current = true;

      // Clear any previous timeout
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);

      // Allow enough time for the smooth scroll to settle (1.2s covers most cases)
      navTimeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
      }, 1200);
    };

    document.addEventListener('click', handleHashClick, true);

    let ticking = false;
    const updateFromScroll = () => {
      ticking = false;
      setIsScrolled(window.scrollY > 20);

      // Active section = the one crossing the middle of the viewport
      const probe = window.innerHeight / 2;
      let current = 'hero';
      document.querySelectorAll('section[id]').forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) current = section.id;
      });

      if (current === activeSectionRef.current) return;
      activeSectionRef.current = current;
      setActiveSection(current);

      // Only update the URL hash when NOT in the middle of a smooth-scroll navigation
      if (!isNavigatingRef.current) {
        const newUrl = current === 'hero' ? window.location.pathname : `#${current}`;
        window.history.replaceState(null, '', newUrl);
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateFromScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateFromScroll(); // Initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleHashClick, true);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [isMenuOpen]);

  const handleThemeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  const resumeHref = `${import.meta.env.BASE_URL}${OWNER.firstName}_Resume.pdf`;

  const themeIcon = (
    <div className="relative w-[18px] h-[18px]">
      <Sun
        size={18}
        className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out-strong ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
      />
      <Moon
        size={18}
        className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out-strong ${!isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}
      />
    </div>
  );

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero', showScrolled: true },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,box-shadow,border-color] duration-300 ease-out border-b ${isScrolled || isMenuOpen
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md backdrop-saturate-150 border-slate-200/60 dark:border-white/10 py-3 shadow-sm'
        : 'bg-transparent border-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2 group"
        >
          <div className="bg-gradient-to-br from-primary-500 to-blue-600 p-2 rounded-xl text-white shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform duration-300">
            <Code2 size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {OWNER.firstName}<span className="text-primary-500">.Dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            if (link.showScrolled && !isScrolled) return null;
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-[background-color,color,box-shadow,transform] duration-200 ease-out
                  ${isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900/90 hover:text-white dark:hover:bg-white/90 dark:hover:text-slate-950 hover:shadow-lg hover:-translate-y-0.5'}
                  ${link.showScrolled ? 'animate-in fade-in slide-in-from-right-4 duration-500' : ''}`}
              >
                {link.name}
              </a>
            );
          })}

          <div className="ml-4 pl-4 border-l border-slate-200/20 dark:border-slate-700/30 flex items-center gap-3">
            <button
              onClick={handleThemeClick}
              className="p-2.5 rounded-full bg-white/10 dark:bg-slate-800/30 hover:bg-white/20 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 transition-[background-color,transform] duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 relative overflow-hidden group"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {themeIcon}
              <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
            </button>

            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/40 hover:-translate-y-0.5 px-6 py-2.5 rounded-full shadow-lg"
            >
              <span>Resume</span>
              <Download size={16} />
            </a>
          </div>
        </nav>

        {/* Mobile / tablet controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={handleThemeClick}
            className="p-2.5 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10 active:scale-95 transition-[background-color,transform] duration-150"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {themeIcon}
          </button>
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="p-2.5 rounded-full text-slate-800 dark:text-slate-100 hover:bg-slate-900/5 dark:hover:bg-white/10 active:scale-95 transition-[background-color,transform] duration-150"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel — drops from under the bar it belongs to */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out-strong ${isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <nav className="container mx-auto px-6 pt-4 pb-2 flex flex-col gap-1" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              aria-current={activeSection === link.id ? 'page' : undefined}
              className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors duration-150 ${activeSection === link.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10'}`}
            >
              {link.name}
            </a>
          ))}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-blue-600 px-6 py-3 rounded-xl shadow-lg"
          >
            <span>Download Resume</span>
            <Download size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
