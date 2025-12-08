import React from 'react';
import { Layers, Monitor, Cpu, Trophy } from 'lucide-react';
import { Stat } from '../types';

const stats: Stat[] = [
  { value: "98%", label: "Conversion Rate Lift" },
  { value: "<0.1s", label: "Interaction Latency" },
  { value: "40+", label: "Unicorns Scaled" },
];

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-32 px-6 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-none">
            DEATH TO<br />
            SOULLESS SAAS.
          </h2>
          <div className="space-y-6 text-white/70 text-lg leading-relaxed">
            <p>
              I burned out building dashboards that looked like spreadsheets. I fled to Tokyo, 
              studied shader programming in basements, and realized the web had lost its soul 
              to utility.
            </p>
            <p>
              Your customers don't buy features. They buy feelings. They buy the future version 
              of themselves your product promises. We engineer that feeling with obsessive 
              visual fidelity and psychological triggers.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-bold text-neon-cyan mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-neon-purple/50 transition-colors duration-500 group">
            <Layers className="w-10 h-10 text-white mb-6 group-hover:text-neon-purple transition-colors" />
            <h3 className="font-bold text-xl mb-3">Depth Strategy</h3>
            <p className="text-sm text-white/50">Flat design is dead. We use spatial hierarchies to guide user focus instinctively.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-neon-cyan/50 transition-colors duration-500 group sm:translate-y-8">
            <Monitor className="w-10 h-10 text-white mb-6 group-hover:text-neon-cyan transition-colors" />
            <h3 className="font-bold text-xl mb-3">Liquid UI</h3>
            <p className="text-sm text-white/50">Interfaces that flow like water. 60fps animations that feel like extensions of thought.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-neon-green/50 transition-colors duration-500 group">
            <Cpu className="w-10 h-10 text-white mb-6 group-hover:text-neon-green transition-colors" />
            <h3 className="font-bold text-xl mb-3">Meta-Prompting</h3>
            <p className="text-sm text-white/50">Leveraging next-gen AI to iterate design patterns at speeds agencies cannot match.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-white/50 transition-colors duration-500 group sm:translate-y-8">
            <Trophy className="w-10 h-10 text-white mb-6 group-hover:text-white transition-colors" />
            <h3 className="font-bold text-xl mb-3">Elite Conversion</h3>
            <p className="text-sm text-white/50">Aesthetics mean nothing without ROI. We optimize for the click, the lead, the sale.</p>
          </div>
        </div>
      </div>
    </section>
  );
};