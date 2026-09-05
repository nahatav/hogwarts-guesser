import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onDone: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDone }) => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('out'), 2200);
    const t3 = setTimeout(() => onDone(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030405] select-none"
      style={{
        opacity: phase === 'out' ? 0 : 1,
        transition: phase === 'in' ? 'opacity 600ms ease-in' : phase === 'out' ? 'opacity 700ms ease-out' : 'none',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(180,130,60,0.13) 0%, transparent 80%)' }}
      />
      <div
        className="relative w-[min(88vw,640px)]"
        style={{
          opacity: phase === 'in' ? 0 : 1,
          transform: phase === 'in' ? 'scale(0.97)' : 'scale(1)',
          transition: 'opacity 700ms ease-out 200ms, transform 700ms ease-out 200ms',
          filter: 'sepia(0.25) contrast(1.08)',
        }}
      >
        <img
          src="/maps/wizarding-world-map.jpg"
          alt="The Wizarding World"
          className="w-full rounded-xl shadow-[0_0_80px_rgba(180,130,40,0.22)]"
          style={{ border: '1px solid rgba(160,110,40,0.3)' }}
        />
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(3,4,5,0.75) 100%)' }}
        />
      </div>
      <div
        className="mt-7 text-center"
        style={{
          opacity: phase === 'in' ? 0 : 1,
          transform: phase === 'in' ? 'translateY(12px)' : 'translateY(0)',
          transition: 'opacity 700ms ease-out 400ms, transform 700ms ease-out 400ms',
        }}
      >
        <p className="font-cinzel text-[11px] tracking-[0.35em] text-[#8a7048] uppercase mb-2">
          I solemnly swear that I am up to no good
        </p>
        <h1
          className="font-gothic text-4xl sm:text-5xl text-[#e8dcc4] tracking-wide"
          style={{ textShadow: '0 0 40px rgba(200,160,60,0.4)' }}
        >
          The Marauder's Guessr
        </h1>
      </div>
    </div>
  );
};
