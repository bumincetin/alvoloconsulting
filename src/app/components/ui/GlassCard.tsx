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
        bg-titanium/80
        border border-line
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        ${hover ? 'transition-colors duration-300 hover:border-white/15' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;

