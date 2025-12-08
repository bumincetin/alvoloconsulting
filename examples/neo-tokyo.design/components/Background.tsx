import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-neon-green/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    </div>
  );
};