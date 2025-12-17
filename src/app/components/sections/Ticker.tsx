'use client';

import React, { useEffect, useState } from 'react';
import { type TranslationType } from '@/lib/translations';

interface TickerProps {
  t: TranslationType;
}

const Ticker: React.FC<TickerProps> = ({ t }) => {
  const [mounted, setMounted] = useState(false);
  const items = t.ticker.items;
  // Double the items for seamless loop
  const doubledItems = [...items, ...items];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-8 border-y border-glass-border bg-void/50">
      <div className={`flex whitespace-nowrap ${mounted ? 'animate-ticker' : ''}`}>
        {doubledItems.map((item, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className="text-sm md:text-base font-mono uppercase tracking-wider text-text-muted">
              {item}
            </span>
            <span className="mx-8 text-accent-cyan opacity-50">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;

