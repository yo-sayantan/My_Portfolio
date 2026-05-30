
import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string; // CSS class for delay e.g. "delay-100"
  variant?: 'fade-up' | 'zoom-in' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-rotate' | 'blur-in' | 'slide-up-spring';
  /** Inline delay in ms — useful for staggered children */
  staggerMs?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = "", 
  threshold = 0.1,
  delay = "delay-0",
  variant = "fade-up",
  staggerMs,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getAnimationClasses = () => {
    switch (variant) {
      case 'zoom-in':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90';
      case 'fade-in':
        return isVisible ? 'opacity-100' : 'opacity-0';
      case 'slide-left':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12';
      case 'slide-right':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12';
      case 'scale-rotate':
        return isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 -rotate-2';
      case 'blur-in':
        return isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-6';
      case 'slide-up-spring':
        return isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.97]';
      case 'fade-up':
      default:
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';
    }
  };

  const inlineStyle: React.CSSProperties = {};
  if (staggerMs) {
    inlineStyle.transitionDelay = `${staggerMs}ms`;
  }

  return (
    <div
      ref={ref}
      style={inlineStyle}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${delay} ${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
