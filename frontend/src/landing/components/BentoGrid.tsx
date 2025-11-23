import React, { useRef, MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ScanLine, Brain, Coins, BarChart3, Target, Gift } from 'lucide-react';
import { FeatureCardProps } from '../types';

const features: FeatureCardProps[] = [
  {
    title: "Instant Receipt Scan",
    description: "Snap a photo. We extract the data. XP gained.",
    icon: <ScanLine className="w-8 h-8 text-primary" />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    title: "AI Financial Oracle",
    description: "Personalized insights powered by Gemini 2.5. Ask anything about your spending habits.",
    icon: <Brain className="w-8 h-8 text-secondary" />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    gradient: "from-blue-900/40 to-cyan-900/40"
  },
  {
    title: "Save-to-Earn",
    description: "Earn 'HackPoints' for every budget goal met. Redeem for real rewards.",
    icon: <Coins className="w-8 h-8 text-accent" />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    gradient: "from-amber-900/20 to-orange-900/20"
  },
  {
    title: "Deep Analytics",
    description: "Visualizations that actually make sense.",
    icon: <BarChart3 className="w-8 h-8 text-pink-400" />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    title: "Quest Goals",
    description: "Set targets. Smash them. Level up.",
    icon: <Target className="w-8 h-8 text-red-400" />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    title: "Weekly Loot",
    description: "Unlock mystery boxes when you stay under budget.",
    icon: <Gift className="w-8 h-8 text-purple-400" />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  }
];

const TiltCard: React.FC<FeatureCardProps & { index: number }> = ({ title, description, icon, colSpan, gradient, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth rotation values
  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform mouse position to rotation degrees
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate normalized position (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group rounded-3xl border border-white/10 bg-white/5 p-8 ${colSpan} hover:bg-white/[0.07] transition-colors perspective-1000`}
    >
      {gradient && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
      )}
      
      {/* 3D Depth Element - Floating Content */}
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
        <div className="bg-white/10 w-fit p-3 rounded-2xl mb-4 backdrop-blur-md shadow-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-white font-display">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Glossy reflection overlay */}
      <motion.div 
        style={{
          background: useMotionTemplate`radial-gradient(circle at ${useTransform(x, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(y, [-0.5, 0.5], ["0%", "100%"])}, rgba(255,255,255,0.1) 0%, transparent 60%)`
        }}
        className="absolute inset-0 rounded-3xl z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.div>
  );
};

const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto perspective-1000">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
          Built for the <span className="text-gradient">Modern Player</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Everything you need to master your money, packed into a powerful grid.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {features.map((feature, idx) => (
          <TiltCard key={idx} {...feature} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;