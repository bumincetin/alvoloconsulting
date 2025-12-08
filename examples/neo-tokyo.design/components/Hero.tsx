import React from 'react';
import { ArrowRight, MoveDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-20">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in opacity-0" style={{animationDelay: '0.2s'}}>
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
          <span className="text-xs font-mono uppercase tracking-widest text-white/60">Accepting Q1 2025 Clients</span>
        </div>
        
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 animate-slide-up opacity-0" style={{animationDelay: '0.4s'}}>
          DIGITAL <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">VISCERALISM.</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-end animate-slide-up opacity-0" style={{animationDelay: '0.6s'}}>
          <p className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed">
            We reject the template. We build digital cathedrals for brands that dare to dominate. 
            Surgical conversion strategy meets Tokyo underground aesthetics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group px-8 py-4 bg-white text-black font-bold tracking-wider hover:bg-neon-cyan transition-all duration-300 flex items-center gap-2">
              VIEW CASE STUDIES
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-bold tracking-wider hover:bg-white/5 transition-all duration-300">
              OUR PHILOSOPHY
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 animate-bounce duration-[3000ms]">
        <MoveDown className="w-6 h-6 text-white/40" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute right-0 bottom-0 w-1/3 h-px bg-gradient-to-l from-white/20 to-transparent"></div>
      <div className="absolute right-0 bottom-0 h-1/3 w-px bg-gradient-to-t from-white/20 to-transparent"></div>
    </section>
  );
};