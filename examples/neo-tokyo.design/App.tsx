import React from 'react';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Work } from './components/Work';
import { Services } from './components/Services';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-[#030305] text-white selection:bg-neon-cyan selection:text-black">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Philosophy />
          <Work />
          <Services />
          <Contact />
        </main>
        <footer className="py-8 border-t border-white/5 text-center text-white/20 text-xs font-mono uppercase tracking-widest">
          © 2025 Neo-Tokyo Design Systems. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;