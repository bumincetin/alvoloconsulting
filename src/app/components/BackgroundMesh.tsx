'use client';

import React, { useEffect, useState } from 'react';

const BackgroundMesh: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none bg-void">
      {/* Orb 1 - Purple */}
      <div
        className={`absolute w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-40 -top-[20%] -left-[10%] bg-[radial-gradient(circle,_#7000ff,_transparent)] will-change-transform ${mounted ? 'animate-float' : ''}`}
      />

      {/* Orb 2 - Cyan */}
      <div
        className={`absolute w-[50vw] h-[50vw] rounded-full blur-[80px] opacity-40 -bottom-[10%] -right-[10%] bg-[radial-gradient(circle,_#00f0ff,_transparent)] will-change-transform ${mounted ? 'animate-float-delayed' : ''}`}
      />

      {/* Orb 3 - Orange (company accent) */}
      <div
        className={`absolute w-[35vw] h-[35vw] rounded-full blur-[100px] opacity-30 top-[50%] left-[30%] bg-[radial-gradient(circle,_#f58643,_transparent)] will-change-transform ${mounted ? 'animate-float' : ''}`}
      />
    </div>
  );
};

export default BackgroundMesh;

