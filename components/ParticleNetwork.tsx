
import React, { useEffect, useRef, useState } from 'react';

interface ParticleNetworkProps {
  isDark: boolean;
}

const ParticleNetwork: React.FC<ParticleNetworkProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Initialize based on window width to prevent flash of content
  // Disable on Mobile (< 768px) and Tablet (< 1024px)
  const [isHidden, setIsHidden] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  
  const interactionRef = useRef({
    x: -1000,
    y: -1000,
    isClicked: false
  });

  useEffect(() => {
    const checkScreenSize = () => {
        // Disable on Mobile (< 768px) and Tablet (< 1024px)
        setIsHidden(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isHidden) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set actual canvas size to match display size for sharp rendering
    canvas.width = width;
    canvas.height = height;

    let particles: Particle[] = [];
    let animationFrameId: number;
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        
        // Slower movement for viscous liquid feel, but slightly faster than dead stop
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.08 + 0.02; 
        this.baseVx = Math.cos(angle) * speed;
        this.baseVy = Math.sin(angle) * speed;
        
        this.vx = this.baseVx;
        this.vy = this.baseVy;
      }

      update(w: number, h: number) {
        // Smooth return to base velocity (viscosity/damping)
        this.vx += (this.baseVx - this.vx) * 0.01;
        this.vy += (this.baseVy - this.vy) * 0.01;

        // Interaction calculations
        const dx = interactionRef.current.x - this.x;
        const dy = interactionRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse Interaction
        // Instead of pure attraction, we use a "sweet spot"
        // Attract if far, repel if too close (prevents convergence at point)
        const hoverRadius = 400;
        const repulsionRadius = 80; // Particles won't go closer than this to mouse

        if (distance < hoverRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          
          if (distance < repulsionRadius) {
             // Repel if too close to mouse center
             const force = (repulsionRadius - distance) / repulsionRadius;
             const repelStrength = 0.05;
             this.vx -= forceDirectionX * force * repelStrength;
             this.vy -= forceDirectionY * force * repelStrength;
          } else {
             // Gentle pull towards mouse area if in the "web" zone
             const force = (hoverRadius - distance) / hoverRadius;
             const pullStrength = 0.02; 
             this.vx += forceDirectionX * force * pullStrength;
             this.vy += forceDirectionY * force * pullStrength;
          }
        }

        // Click Shockwave (Disrupt the web on click)
        if (interactionRef.current.isClicked && distance < 300) {
            // Push away on click
            const pushDx = this.x - interactionRef.current.x;
            const pushDy = this.y - interactionRef.current.y;
            const pushDist = Math.sqrt(pushDx * pushDx + pushDy * pushDy);
            
            if (pushDist > 0) {
                const forceX = pushDx / pushDist;
                const forceY = pushDy / pushDist;
                const force = (300 - pushDist) / 300;
                
                const clickStrength = 2; // Strong impulse
                this.vx += forceX * force * clickStrength;
                this.vy += forceY * force * clickStrength;
            }
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Screen wrapping for continuous flow using passed dimensions
        if (this.x < 0) { this.x = w; }
        else if (this.x > w) { this.x = 0; }
        
        if (this.y < 0) { this.y = h; }
        else if (this.y > h) { this.y = 0; }
      }
    }

    const initParticles = () => {
      particles = [];
      // Increase density
      const particleCount = Math.min(Math.floor((width * height) / 7000), 250);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update physics
      particles.forEach(p => p.update(width, height));

      // Reset click state after frame
      if (interactionRef.current.isClicked) {
          interactionRef.current.isClicked = false;
      }

      // Draw Connections
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Increased threshold for "web" look (more connections)
          if (distance < 200) { 
            ctx.beginPath();
            const opacity = (1 - distance / 200) * 0.15;
            
            // Theme colors
            ctx.strokeStyle = isDark 
                ? `rgba(56, 189, 248, ${opacity})` // Primary-400
                : `rgba(15, 23, 42, ${opacity})`; // Slate-900
            
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      interactionRef.current.x = e.clientX;
      interactionRef.current.y = e.clientY;
    };

    const handleMouseDown = () => {
        interactionRef.current.isClicked = true;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    
    // Initialize
    resizeCanvas(); 
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark, isHidden]);

  if (isHidden) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ParticleNetwork;
