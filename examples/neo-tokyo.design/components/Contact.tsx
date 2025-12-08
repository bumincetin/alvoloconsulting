import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">
          READY TO <span className="text-neon-cyan">ASCEND?</span>
        </h2>
        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
          We only take on 3 projects per quarter. Tell us why yours matters.
          If the vision aligns, we build.
        </p>

        <form className="max-w-md mx-auto space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-white/40 ml-1">Identity</label>
            <input 
              type="text" 
              placeholder="Your Name / Company" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-neon-cyan transition-colors text-white placeholder-white/20"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-white/40 ml-1">Coordinates</label>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-neon-cyan transition-colors text-white placeholder-white/20"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-white/40 ml-1">Vision</label>
            <textarea 
              rows={4}
              placeholder="Brief project description" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-neon-cyan transition-colors text-white placeholder-white/20"
            ></textarea>
          </div>
          <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-neon-cyan hover:scale-[1.02] transition-all duration-300 tracking-wide mt-4">
            INITIATE SEQUENCE
          </button>
        </form>

        <div className="mt-20 flex justify-center gap-8 text-white/30 text-sm font-mono uppercase">
          <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
          <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
          <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
        </div>
      </div>
    </section>
  );
};