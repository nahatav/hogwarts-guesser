import React, { useState } from 'react';
import type { HogwartsHouse, GameMode } from '../types/game';
import { sound } from '../utils/audio';
import { GoldenSnitch3D } from './GoldenSnitch3D';
import { 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Award,
  Sparkles,
  Compass
} from 'lucide-react';

interface NewspaperLandingPageProps {
  onStartGame: (house: HogwartsHouse, mode: GameMode) => void;
  onOpenRules?: () => void;
}

const HOUSES: { id: HogwartsHouse; name: string; crest: string; color: string; motto: string }[] = [
  { id: 'Gryffindor', name: 'Gryffindor', crest: '🦁', color: 'text-amber-900', motto: 'Bravery & Chivalry' },
  { id: 'Slytherin',  name: 'Slytherin',  crest: '🐍', color: 'text-emerald-900', motto: 'Ambition & Cunning' },
  { id: 'Ravenclaw',  name: 'Ravenclaw',  crest: '🦅', color: 'text-blue-900', motto: 'Wisdom & Wit' },
  { id: 'Hufflepuff', name: 'Hufflepuff', crest: '🦡', color: 'text-yellow-900', motto: 'Patience & Loyalty' },
];

const MODES: { id: GameMode; label: string; desc: string }[] = [
  { id: 'classic_5',       label: 'Classic 5-Round',   desc: 'Great Britain & Castle' },
  { id: 'castle_only',     label: 'Castle Only',       desc: 'Hogwarts Chambers' },
  { id: 'owl_streak',      label: 'O.W.L. Streak',     desc: 'Until First Error' },
  { id: 'lumos_challenge', label: 'Lumos Night Mode',  desc: 'Dark Wand Exploration' },
];

export const NewspaperLandingPage: React.FC<NewspaperLandingPageProps> = ({
  onStartGame,
  onOpenRules,
}) => {
  const [selectedHouse, setSelectedHouse] = useState<HogwartsHouse>('Gryffindor');
  const [selectedMode, setSelectedMode] = useState<GameMode>('classic_5');
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isLaunching, setIsLaunching] = useState<boolean>(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playThemeMusic(0.7);
      sound.playTick();
    }
  };

  const handleEnterGame = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    sound.playWandWhoosh();
    sound.playThemeMusic(0.7);
    setTimeout(() => {
      onStartGame(selectedHouse, selectedMode);
    }, 400);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0b0e12] text-[#141414] font-serif py-6 px-3 sm:px-6 flex items-center justify-center select-none overflow-x-hidden">
      {/* Flying 3D Quidditch Golden Snitch */}
      <GoldenSnitch3D />

      {/* Main Newspaper Broadsheet Sheet - Centered & Focused */}
      <div 
        className="w-full max-w-4xl bg-[#ded6c4] border-[3px] border-[#181818] shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-5 sm:p-8 relative transition-all duration-300"
        style={{
          backgroundImage: 'radial-gradient(#d3c9b4 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Inner double-line border */}
        <div className="border border-[#181818]/80 p-3 sm:p-5 relative">
          
          {/* Victorian Corner Flourishes */}
          <span className="absolute top-1 left-2 text-sm text-[#181818]/70 select-none">❦</span>
          <span className="absolute top-1 right-2 text-sm text-[#181818]/70 select-none">❦</span>
          <span className="absolute bottom-1 left-2 text-sm text-[#181818]/70 select-none">❦</span>
          <span className="absolute bottom-1 right-2 text-sm text-[#181818]/70 select-none">❦</span>

          {/* TOP MASTHEAD */}
          <header className="border-2 border-[#181818] rounded-xl px-4 sm:px-6 py-3 mb-6 flex items-center justify-between relative bg-[#e3dbc9]/70 shadow-sm">
            {/* Left: Rules / Dispatch button */}
            <button
              onClick={() => { if (onOpenRules) onOpenRules(); }}
              className="px-3 py-1.5 rounded-lg border border-[#181818] bg-[#ded6c4] hover:bg-[#181818] hover:text-[#ded6c4] text-[10px] sm:text-xs font-cinzel font-bold tracking-wider uppercase transition flex items-center gap-1.5 active:scale-95"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Guide & Rules</span>
            </button>

            {/* Center: The Harry Potter Masthead Title */}
            <div className="text-center">
              <h1 className="font-fraktur text-3xl sm:text-5xl text-[#121212] tracking-wider drop-shadow-sm leading-none">
                The Harry Potter
              </h1>
              <p className="text-[9px] sm:text-[11px] tracking-[0.3em] font-cinzel text-[#444] uppercase mt-1">
                The Marauder's Guessr Edition • Vol. 993
              </p>
            </div>

            {/* Right: Sound Mute Toggle */}
            <button
              onClick={toggleSound}
              className="px-3 py-1.5 rounded-lg border border-[#181818] bg-[#ded6c4] hover:bg-[#181818] hover:text-[#ded6c4] text-[10px] sm:text-xs font-cinzel font-bold tracking-wider uppercase transition flex items-center gap-1.5 active:scale-95"
              title={isMuted ? 'Unmute Theme Music' : 'Mute Theme Music'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-700" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-800" />}
              <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Music On'}</span>
            </button>
          </header>

          {/* HERO ARTICLE BOX: DOUBLE BORDER WITH VICTORIAN CORNERS */}
          <div className="border-2 border-[#181818] p-5 sm:p-7 relative bg-[#e3dac8]/70 shadow-sm">
            <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#181818]" />
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#181818]" />
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#181818]" />
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#181818]" />

            {/* Headline + Engraved Woodcut Portrait */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              
              {/* Massive Condensed Headline matching reference */}
              <div className="sm:col-span-7 flex flex-col justify-center">
                <h2 className="font-headline text-5xl sm:text-7xl text-[#121212] leading-[0.88] tracking-tight uppercase">
                  Harry Potter
                </h2>
                <div className="flex items-baseline gap-2 my-1.5">
                  <span className="font-newspaper italic text-2xl sm:text-4xl text-[#181818]">20th</span>
                  <span className="font-headline text-4xl sm:text-6xl text-[#121212] tracking-tight uppercase">
                    Anniversary
                  </span>
                </div>
                <h2 className="font-headline text-5xl sm:text-7xl text-[#121212] leading-[0.88] tracking-tight uppercase">
                  Celebration
                </h2>
              </div>

              {/* Engraved Woodcut Portrait with Sunburst Rays */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="relative border-2 border-[#181818] p-1.5 bg-[#121212] w-full max-w-[210px] shadow-lg">
                  {/* Top Ribbon Tag */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#121212] text-[#e8dfcf] px-2.5 py-0.5 border border-[#444] text-[9px] font-cinzel font-bold tracking-widest uppercase whitespace-nowrap shadow-sm">
                    Prisoner of Azkaban
                  </div>

                  {/* Sunburst radial lines */}
                  <div className="relative overflow-hidden bg-[#0d0d0d] aspect-[4/5] flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <line
                          key={i}
                          x1="50"
                          y1="50"
                          x2={50 + 50 * Math.cos((i * Math.PI * 2) / 32)}
                          y2={50 + 50 * Math.sin((i * Math.PI * 2) / 32)}
                          stroke="#ffd700"
                          strokeWidth="0.75"
                        />
                      ))}
                    </svg>

                    <img
                      src="/newspaper/hp-anniversary-portrait.jpg"
                      alt="Harry Potter"
                      className="relative z-10 w-full h-full object-cover filter grayscale contrast-125 brightness-95"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CALL TO ACTION: "RETURN TO HOGWARTS" + "EXPLORE" STARBURST */}
            <div className="my-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-b border-[#181818]/40 py-5">
              {/* Primary Game CTA Button */}
              <button
                onClick={handleEnterGame}
                disabled={isLaunching}
                className="w-full sm:w-auto flex-1 py-4 px-8 bg-[#121212] hover:bg-[#222] text-[#f7f2e7] font-headline text-3xl sm:text-4xl tracking-widest uppercase transition-all duration-200 shadow-[0_6px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] border-2 border-[#181818] flex items-center justify-center gap-3 active:scale-[0.98] group"
              >
                <span>{isLaunching ? 'WAND FOCUSING...' : 'RETURN TO HOGWARTS'}</span>
                <ArrowRight className="w-6 h-6 text-[#ffd700] group-hover:translate-x-2 transition-transform" />
              </button>

              {/* Scalloped Starburst "EXPLORE" Badge with Pointing Hand */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-3xl text-[#181818] animate-bounce -rotate-12 select-none" style={{ animationDuration: '1.8s' }}>
                  👉
                </span>

                <div 
                  onClick={handleEnterGame}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#121212] text-[#fbf8f0] flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform active:scale-95 border-2 border-dashed border-[#ded6c4]"
                  style={{
                    clipPath: 'polygon(50% 0%, 63% 10%, 78% 5%, 85% 19%, 98% 22%, 97% 37%, 100% 50%, 97% 63%, 98% 78%, 85% 81%, 78% 95%, 63% 90%, 50% 100%, 37% 90%, 22% 95%, 15% 81%, 2% 78%, 3% 63%, 0% 50%, 3% 37%, 2% 22%, 15% 19%, 22% 5%, 37% 10%)',
                  }}
                >
                  <span className="font-headline text-base sm:text-lg tracking-widest uppercase -rotate-6">
                    EXPLORE
                  </span>
                </div>
              </div>
            </div>

            {/* Lead Lore Text */}
            <p className="font-newspaper text-sm sm:text-base text-[#222] leading-relaxed text-center max-w-2xl mx-auto mb-4">
              "I solemnly swear that I am up to no good." Step inside 360° photospheres of Hogwarts Castle, Diagon Alley, and Great Britain. Track your footsteps across the Marauder's Map and cast your guess!
            </p>

            {/* Divider Rule */}
            <div className="flex items-center justify-center gap-3 my-4 text-[#666] text-xs font-fraktur">
              <span className="h-[1px] bg-[#181818]/30 flex-1" />
              <span>— The Marauder's Guessr —</span>
              <span className="h-[1px] bg-[#181818]/30 flex-1" />
            </div>

            {/* STREAMLINED HOUSE & EXPEDITION PICKER */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-cinzel text-xs font-bold tracking-widest text-[#181818] uppercase flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#b37d22]" /> Choose Your House Alliance
                </span>
                <span className="text-[10px] font-sans text-[#555] uppercase tracking-wider">
                  Selected: <strong>{selectedHouse}</strong>
                </span>
              </div>

              {/* 4 Houses */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                {HOUSES.map(h => (
                  <button
                    key={h.id}
                    onClick={() => { setSelectedHouse(h.id); sound.playTick(); }}
                    className={`p-2.5 rounded-lg border-2 text-left transition-all ${
                      selectedHouse === h.id
                        ? `bg-[#181818] text-[#ded6c4] border-[#181818] shadow-md scale-[1.02]`
                        : 'bg-[#e5ddd0] text-[#222] border-[#181818]/30 hover:border-[#181818]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{h.crest}</span>
                      {selectedHouse === h.id && <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />}
                    </div>
                    <p className="font-cinzel font-bold text-xs mt-1.5 uppercase tracking-wider">{h.name}</p>
                    <p className="text-[10px] opacity-75 font-sans leading-tight">{h.motto}</p>
                  </button>
                ))}
              </div>

              {/* Game Mode Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#181818]/20">
                {MODES.map(m => (
                  <button
                    key={m.id}
                    onClick={() => { setSelectedMode(m.id); sound.playTick(); }}
                    className={`text-xs font-cinzel font-bold px-3 py-1.5 rounded-md border transition ${
                      selectedMode === m.id
                        ? 'bg-[#181818] text-[#ffd700] border-[#181818]'
                        : 'bg-[#e5ddd0] text-[#333] border-[#181818]/30 hover:border-[#181818]'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <footer className="mt-5 pt-3 border-t-2 border-[#181818] flex items-center justify-between text-[11px] font-cinzel text-[#555] tracking-wider">
            <p>© The Daily Prophet Archive • Wizarding World</p>
            <p className="italic font-newspaper font-bold text-[#181818]">"Mischief Managed"</p>
          </footer>

        </div>
      </div>
    </div>
  );
};
