'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div 
      className={`
        rounded-2xl p-6
        bg-gradient-to-br from-white/[0.06] to-white/[0.02]
        border border-glass-border
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_40px_rgba(0,240,255,0.08)]
        ${hover ? 'transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-[0_25px_70px_rgba(0,0,0,0.4),0_0_50px_rgba(0,240,255,0.12)] hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;

