import React from 'react';

interface AbstractArtProps {
  variant?: 'blue' | 'purple' | 'gold' | 'dark';
  className?: string;
}

export const AbstractArt: React.FC<AbstractArtProps> = ({ variant = 'blue', className = '' }) => {
  
  // 1. Base Backgrounds (Deep, rich colors)
  const bases = {
    blue: 'bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#172554]',
    purple: 'bg-gradient-to-br from-[#2e1065] via-[#581c87] to-[#3b0764]',
    gold: 'bg-gradient-to-br from-[#451a03] via-[#78350f] to-[#451a03]',
    dark: 'bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#09090b]',
  };

  // 2. Accent Colors for the Glowing Orbs
  const accents = {
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
    gold: 'bg-amber-400',
    dark: 'bg-zinc-500',
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${bases[variant]} ${className}`}>
      
      {/* --- LAYER 1: GEOMETRIC PATTERNS --- */}
      
      {/* Variant: BLUE (The "Grid" - Represents Structure/Finance) */}
      {variant === 'blue' && (
        <svg className="absolute inset-0 w-full h-full opacity-20" width="100%" height="100%">
          <defs>
            <pattern id="grid-blue" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-blue)" />
        </svg>
      )}

      {/* Variant: PURPLE (The "Dots" - Represents Tech/Data) */}
      {variant === 'purple' && (
        <svg className="absolute inset-0 w-full h-full opacity-20" width="100%" height="100%">
          <defs>
            <pattern id="dots-purple" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-purple)" />
        </svg>
      )}

      {/* Variant: GOLD (The "Rays" - Represents Growth/Wealth) */}
      {variant === 'gold' && (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0 L100 100 Z" fill="white" />
        </svg>
      )}

      {/* Variant: DARK (The "Noise" - Represents Modern Minimal) */}
      {variant === 'dark' && (
         <div className="absolute inset-0 opacity-20" style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
         }}></div>
      )}


      {/* --- LAYER 2: LIGHTING EFFECTS --- */}

      {/* The "Main Orb" - Soft glow in top right */}
      <div 
        className={`absolute -top-10 -right-10 w-64 h-64 rounded-full blur-[80px] opacity-40 mix-blend-screen ${accents[variant]}`} 
      />

      {/* The "Secondary Orb" - Smaller glow in bottom left for balance */}
      <div 
        className={`absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-[60px] opacity-20 mix-blend-screen ${accents[variant]}`} 
      />

      {/* --- LAYER 3: GLASS SHINE --- */}
      {/* A subtle diagonal shine to make it look like glass */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-50 pointer-events-none" />

    </div>
  );
};