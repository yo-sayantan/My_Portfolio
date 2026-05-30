
import React, { useState, useEffect } from 'react';
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

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Ensure page starts at top on reload/load by disabling browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-transparent relative transition-colors duration-500 flex flex-col">
      
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
      
      <AIChatbot />
      <Footer />
    </div>
  );
}

export default App;
