import React from "react";

// Ambient background used across all pages. Keeps pointer events off so it
// never blocks interactions.
const NeoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none neo-noise">
      <div
        className="neo-blob w-96 h-96 top-[-6rem] left-[15%]"
        style={{ backgroundColor: 'rgba(188,19,254,0.25)' }}
      />
      <div
        className="neo-blob w-[26rem] h-[26rem] top-[-4rem] right-[12%]"
        style={{ backgroundColor: 'rgba(0,243,255,0.25)' }}
      />
      <div
        className="neo-blob w-[28rem] h-[28rem] bottom-[-10rem] left-1/3"
        style={{ backgroundColor: 'rgba(10,255,10,0.20)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),transparent_35%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
    </div>
  );
};

export default NeoBackground;

