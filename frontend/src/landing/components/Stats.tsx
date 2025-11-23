import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Activity } from 'lucide-react';

const CountUp = ({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const Stats: React.FC = () => {
  return (
    <section id="stats" className="relative z-20 pt-32 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header / Tagline */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
           <div className="flex items-center gap-2 text-primary/80 mb-4 bg-primary/10 px-4 py-1 rounded-full border border-primary/20">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase">Live Network Status</span>
           </div>
           <h2 className="text-3xl md:text-4xl font-bold text-white font-display">
              Global <span className="text-gradient">Player Metrics</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl text-center border-t-4 border-primary hover:scale-105 transition-transform duration-300 group">
            <div className="mb-4 flex justify-center">
               <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Activity className="w-8 h-8 text-primary" />
               </div>
            </div>
            <h3 className="text-5xl font-bold text-white mb-2 font-display">
              <CountUp end={50} suffix="k+" />
            </h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm font-display">Active Players</p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl text-center border-t-4 border-accent hover:scale-105 transition-transform duration-300 group">
            <div className="mb-4 flex justify-center">
               <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <span className="text-2xl font-bold text-accent">$</span>
               </div>
            </div>
            <h3 className="text-5xl font-bold text-white mb-2 font-display">
              <CountUp end={12} suffix="M+" />
            </h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm font-display">Money Saved</p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl text-center border-t-4 border-secondary hover:scale-105 transition-transform duration-300 group">
             <div className="mb-4 flex justify-center">
               <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <span className="text-2xl font-bold text-secondary">%</span>
               </div>
            </div>
            <h3 className="text-5xl font-bold text-white mb-2 font-display">
              <CountUp end={98} suffix="%" />
            </h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm font-display">Goal Completion</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;