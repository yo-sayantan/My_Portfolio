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

const HIDDEN: Record<NonNullable<ScrollRevealProps['variant']>, string> = {
  'zoom-in': 'opacity-0 scale-95',
  'fade-in': 'opacity-0',
  'slide-left': 'opacity-0 translate-x-12',
  'slide-right': 'opacity-0 -translate-x-12',
  'scale-rotate': 'opacity-0 scale-95 -rotate-2',
  'blur-in': 'opacity-0 blur-sm translate-y-6',
  'slide-up-spring': 'opacity-0 translate-y-10 scale-[0.97]',
  'fade-up': 'opacity-0 translate-y-6',
};

// No filter classes here: an ancestor with any `filter` becomes a backdrop root and would stop
// the glass cards inside from blurring the particle canvas behind them.
const VISIBLE = 'opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0';

/**
 * Reveals its children once, the first time they scroll into view.
 * Revealing only once keeps content stable when scrolling back up and avoids
 * re-running transitions (and the layout reads they trigger) on every pass.
 */
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
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={staggerMs ? { transitionDelay: `${staggerMs}ms` } : undefined}
      className={`transition-[opacity,transform,filter] duration-700 ease-out-expo transform ${delay} ${isVisible ? `${VISIBLE}${variant === 'blur-in' ? ' [filter:none]' : ''}` : HIDDEN[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
