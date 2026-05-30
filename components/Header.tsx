
import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Download, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Handle background transparency
      setIsScrolled(window.scrollY > 20);

      // Handle Active Section Highlighting
      const sections = document.querySelectorAll('section');
      let current = 'hero';
      
      // Check which section is currently in the middle of the viewport
      const scrollPosition = window.scrollY + (window.innerHeight / 2);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
           current = section.getAttribute('id') || 'hero';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero', showScrolled: true },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const element = document.querySelector(href);
    if (!element) return;

    // Slight delay to allow for visual feedback/animation before scroll starts
    setTimeout(() => {
      // Adjusted offset to 0. This utilizes the section's top padding (typically py-32) 
      // to sit *under* the sticky header, placing the content nicely near the top.
      const headerOffset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/10 py-3 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2 group"
        >
          <div className="bg-gradient-to-br from-primary-500 to-blue-600 p-2 rounded-xl text-white shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform duration-300">
            <Code2 size={20} />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
            Sayantan<span className="text-primary-500">.Dev</span>
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
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 
                  ${isActive 
                    ? 'bg-slate-900 text-white font-bold shadow-md' 
                    : 'text-slate-600 dark:text-slate-300 font-medium hover:font-bold hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 hover:shadow-lg hover:-translate-y-0.5'}
                  ${link.showScrolled ? 'animate-in fade-in slide-in-from-right-4 duration-500' : ''}`}
              >
                {link.name}
              </a>
            );
          })}
          
          <div className="ml-4 pl-4 border-l border-slate-200/20 dark:border-slate-700/30 flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white/10 dark:bg-slate-800/30 hover:bg-white/20 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 transition-all duration-300 hover:scale-110 focus:outline-none relative overflow-hidden group"
              aria-label="Toggle Theme"
            >
              <div className="relative w-[18px] h-[18px]">
                <Sun 
                  size={18} 
                  className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`} 
                />
                <Moon 
                  size={18} 
                  className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    !isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
                  }`} 
                />
              </div>
              <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
            </button>

            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/40 hover:-translate-y-0.5 px-6 py-2.5 rounded-full shadow-lg"
            >
              <span>Resume</span>
              <Download size={16} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
