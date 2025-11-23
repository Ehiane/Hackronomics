import React from 'react';
import { Shield, Zap, Users, Lock, TrendingUp, Gift, Cpu, Radio } from 'lucide-react';

interface CardProps {
  icon: any;
  label: string;
  sub: string;
}

const Card: React.FC<CardProps> = ({ icon: Icon, label, sub }) => (
  <div className="flex flex-col items-start justify-center w-[240px] h-[100px] bg-white/5 backdrop-blur-sm rounded-xl mx-3 shrink-0 hover:bg-white/10 transition-all cursor-default border border-white/10 px-6 group relative overflow-hidden">
    <div className="absolute right-0 top-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
      <Icon className="w-12 h-12 text-gray-500 group-hover:text-primary transition-colors" />
    </div>
    <div className="relative z-10">
      <span className="text-xs font-mono text-primary mb-1 block uppercase tracking-wider">{sub}</span>
      <span className="text-lg font-bold text-white font-display">{label}</span>
    </div>
  </div>
);

const items = [
  { icon: Shield, label: "Fraud Shield", sub: "Defense +100" },
  { icon: Zap, label: "XP Multiplier", sub: "Passive Buff" },
  { icon: Users, label: "Clan Mode", sub: "Co-op Saving" },
  { icon: Lock, label: "Crypto Vault", sub: "Cold Storage" },
  { icon: TrendingUp, label: "Auto-Invest", sub: "Yield Farming" },
  { icon: Gift, label: "Loot Drops", sub: "Weekly Rewards" },
  { icon: Cpu, label: "AI Advisor", sub: "Neural Net" },
  { icon: Radio, label: "Live Sync", sub: "Real-Time" },
];

const Carousel: React.FC = () => {
  return (
    <section className="py-24 overflow-hidden relative bg-background border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-10">
         <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">System Loadout</span>
         </div>
         <h2 className="text-3xl md:text-4xl font-bold font-display max-w-xl">
            Equip your wallet with <span className="text-gradient">God-Tier Tools</span>
         </h2>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
      
      <div className="flex animate-scroll w-[calc(264px*16)] hover:[animation-play-state:paused]">
        {/* Double loop for seamless infinite scroll */}
        {[...items, ...items].map((item, idx) => (
          <Card key={idx} icon={item.icon} label={item.label} sub={item.sub} />
        ))}
      </div>
    </section>
  );
};

export default Carousel;