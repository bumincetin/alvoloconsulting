import React from 'react';
import { Check } from 'lucide-react';

const services = [
  "Strategic UI/UX Design",
  "React & Next.js Engineering",
  "WebGL & Shader Development",
  "Brand Identity Systems",
  "Conversion Rate Optimization",
  "Motion Design & Interaction"
];

export const Services: React.FC = () => {
  return (
    <section id="process" className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">WE BUILD THE UNBUILDABLE</h2>
          <p className="text-white/60 text-lg">
            Our stack is cutting edge. Our methodology is rigorous. We don't just design websites; 
            we engineer digital ecosystems designed to scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {services.map((service, index) => (
            <div key={index} className="bg-[#030305] p-8 hover:bg-[#08080a] transition-colors group">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-neon-cyan/20 transition-colors">
                <Check className="w-4 h-4 text-white group-hover:text-neon-cyan" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">{service}</h3>
              <p className="text-white/40 text-sm">
                High-fidelity execution utilizing modern frameworks and performance-first architecture.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};