import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    title: "VORTEX FINANCE",
    category: "Fintech Interface",
    image: "https://picsum.photos/800/600?random=1"
  },
  {
    title: "AETHER LABS",
    category: "AI Research",
    image: "https://picsum.photos/800/600?random=2"
  },
  {
    title: "CHRONOS WEAR",
    category: "E-Commerce",
    image: "https://picsum.photos/800/600?random=3"
  }
];

export const Work: React.FC = () => {
  return (
    <section id="work" className="py-32 px-6 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">SELECTED WORKS</h2>
            <p className="text-white/50">2023 — 2025</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-neon-cyan hover:text-white transition-colors">
            FULL ARCHIVE <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <div key={index} className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl rounded-3xl -z-10"></div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                   <div className="overflow-hidden rounded-xl border border-white/10">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                   </div>
                </div>
                <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} space-y-4`}>
                  <div className="text-neon-cyan font-mono text-xs tracking-widest uppercase">0{index + 1} // {project.category}</div>
                  <h3 className="font-display text-4xl md:text-5xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
                    {project.title}
                  </h3>
                  <p className="text-white/60 max-w-sm">
                    A comprehensive overhaul of the brand identity and digital presence, 
                    resulting in a 400% increase in user engagement.
                  </p>
                  <div className="flex gap-2 mt-4">
                    {['React', 'WebGL', 'GSAP'].map(tag => (
                      <span key={tag} className="px-3 py-1 border border-white/10 rounded-full text-xs text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};