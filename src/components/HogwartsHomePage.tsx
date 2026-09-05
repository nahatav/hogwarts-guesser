import React from 'react';
import { GoldenSnitch3D } from './GoldenSnitch3D';
import { sound } from '../utils/audio';

interface HogwartsHomePageProps {
  playerName: string;
  onSetPlayerName: (name: string) => void;
  onStartGame: () => void;
  onOpenRules: () => void;
}

export const HogwartsHomePage: React.FC<HogwartsHomePageProps> = ({
  onStartGame,
  onOpenRules,
}) => {
  const handlePlayClick = () => {
    sound.playWandWhoosh();
    onStartGame();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#03070a]">
      {/* Background: Hogwarts at night */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/hogwarts-loading.jpg')`,
          filter: 'brightness(0.88) contrast(1.06) saturate(0.9)',
        }}
      />

      {/* Vignette — dark top + dark bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(2,5,8,0.82) 0%,
              rgba(2,5,8,0.10) 22%,
              rgba(2,5,8,0.08) 65%,
              rgba(2,5,8,0.92) 100%
            )
          `,
        }}
      />

      {/* Flying Snitch */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <GoldenSnitch3D />
      </div>

      {/* ── TOP NAV ─────────────────────────────────────────── */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-center px-8 sm:px-12 py-5 pointer-events-none mt-2">
        {/* Center: minimal pill nav */}
        <nav className="pointer-events-auto flex items-center gap-10 px-8 py-2.5 rounded-full bg-black/50 border border-[#c9a84c]/20 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
          <span className="font-cinzel text-sm font-semibold text-[#e8dcc8] tracking-widest cursor-default">
            Home
          </span>
          <button
            onClick={handlePlayClick}
            className="font-cinzel text-sm font-semibold text-[#c9a84c] hover:text-[#e0c06a] tracking-widest transition-colors duration-150"
          >
            Play
          </button>
          <button
            onClick={onOpenRules}
            className="font-cinzel text-sm font-semibold text-[#a09278] hover:text-[#e8dcc8] tracking-widest transition-colors duration-150"
          >
            Guide
          </button>
        </nav>
      </header>

      {/* ── BOTTOM TITLE + CTA ──────────────────────────────── */}
      <div className="absolute bottom-10 sm:bottom-14 inset-x-0 z-20 flex flex-col items-center text-center px-4 pointer-events-none">
        {/* Game title — HarryP font, gold */}
        <h1
          className="font-harry select-none leading-none tracking-wider uppercase"
          style={{
            fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
            color: '#d4af37',
            textShadow: `
              0 0 18px rgba(212,175,55,0.55),
              0 0 60px rgba(180,140,30,0.25),
              2px 4px 20px rgba(0,0,0,0.95)
            `,
            letterSpacing: '0.06em',
          }}
        >
          Hogwarts Guesser
        </h1>

        {/* Subtitle */}
        <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.22em] text-[#a09278] uppercase mt-3">
          Panoramic Realm Geoguesser
        </p>

        {/* CTA button — clean, matte dark with gold border */}
        <div className="mt-7 pointer-events-auto">
          <button
            onClick={handlePlayClick}
            className="px-10 py-3 rounded-sm bg-[#0c0a08] hover:bg-[#181410] border border-[#c9a84c]/60 hover:border-[#c9a84c] text-[#e8dcc8] font-cinzel font-semibold text-sm tracking-[0.18em] uppercase shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.18)] transition-all duration-200 active:scale-[0.97]"
          >
            Cast Off &amp; Play
          </button>
        </div>
      </div>
    </div>
  );
};
