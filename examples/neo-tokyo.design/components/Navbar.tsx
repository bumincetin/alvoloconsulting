import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Vision', href: '#hero' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${
        isScrolled ? 'bg-black/50 backdrop-blur-xl py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
            <Zap className="w-5 h-5 text-neon-cyan" />
          </div>
          <span className="font-display font-bold text-xl tracking-tighter text-white">
            NEO<span className="text-white/40">TOKYO</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wide uppercase"
            >
              {item.label}
            </a>
          ))}
          <button className="px-6 py-2 bg-white text-black font-bold text-sm tracking-wide hover:bg-neon-cyan hover:text-black transition-all duration-300 rounded-sm">
            START PROJECT
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4">
           {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button className="w-full py-3 bg-white text-black font-bold mt-4">
            START PROJECT
          </button>
        </div>
      )}
    </nav>
  );
};