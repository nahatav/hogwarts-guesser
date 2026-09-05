import React, { useState } from 'react';
import { GoldenSnitch3D } from './GoldenSnitch3D';
import { sound } from '../utils/audio';
import { Play, Volume2, VolumeX, BookOpen, Wand2, X, Check } from 'lucide-react';

interface HogwartsHomePageProps {
  playerName: string;
  onSetPlayerName: (name: string) => void;
  onStartGame: () => void;
  onOpenRules: () => void;
}

export const HogwartsHomePage: React.FC<HogwartsHomePageProps> = ({
  playerName,
  onSetPlayerName,
  onStartGame,
  onOpenRules,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(playerName);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playTick();
  };

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = tempName.trim() || 'The Chosen One';
    onSetPlayerName(clean);
    setIsEditingName(false);
    sound.playWandWhoosh();
  };

  const handlePlayClick = () => {
    sound.playWandWhoosh();
    onStartGame();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#03070a]">
      {/* Background Image: Hogwarts Castle at Night with Moon & Teal Mystical Atmosphere */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-100"
        style={{
          backgroundImage: `url('/images/hogwarts-loading.jpg')`,
          filter: 'brightness(0.92) contrast(1.08)',
        }}
      />

      {/* Atmospheric Vignette & Gradients matching the reference image */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(13, 44, 53, 0.2) 0%, rgba(3, 10, 14, 0.75) 75%, rgba(1, 4, 7, 0.95) 100%),
            linear-gradient(to bottom, rgba(3, 10, 14, 0.8) 0%, transparent 20%, transparent 65%, rgba(2, 6, 9, 0.95) 100%)
          `
        }}
      />

      {/* 3D Flying Quidditch Golden Snitch in the Night Sky */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <GoldenSnitch3D />
      </div>

      {/* TOP HEADER NAVIGATION BAR */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 sm:px-10 py-5 pointer-events-none">
        {/* Top Left: Glowing Teal Hogwarts Crest Shield */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div 
            className="relative flex items-center justify-center w-11 h-13 py-2 px-3 rounded-b-xl border border-teal-400/40 bg-[#081820]/80 backdrop-blur-md shadow-[0_0_20px_rgba(45,212,191,0.35)]"
            title="Hogwarts School of Witchcraft and Wizardry"
          >
            <div className="text-center">
              <span className="block text-[8px] font-cinzel font-bold text-teal-300 tracking-wider uppercase leading-none">
                Potterverse
              </span>
              <span className="text-sm leading-tight">⚡</span>
              <span className="block text-[7px] font-cinzel text-teal-400/80 uppercase leading-none mt-0.5">
                University
              </span>
            </div>
          </div>
        </div>

        {/* Top Center: Glassmorphism Pill Navbar ("Home" and "Play") matching reference image */}
        <nav className="pointer-events-auto flex items-center gap-8 px-8 py-2.5 rounded-full bg-[#09151c]/75 border border-teal-500/35 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.85),0_0_15px_rgba(45,212,191,0.2)]">
          {/* Home Tab (Active with golden snitch wings icon underneath) */}
          <div className="relative flex flex-col items-center cursor-default">
            <span className="font-cinzel text-sm sm:text-base font-bold text-teal-100 tracking-wider">
              Home
            </span>
            {/* Golden Snitch icon with tiny wings below active Home label */}
            <div className="flex items-center gap-0.5 mt-0.5">
              <span className="text-[9px] text-amber-400/90 -rotate-12">🪽</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span>
              <span className="text-[9px] text-amber-400/90 rotate-12">🪽</span>
            </div>
          </div>

          {/* Play Tab (Clickable CTA into game) */}
          <button
            onClick={handlePlayClick}
            className="group relative flex items-center gap-2 font-cinzel text-sm sm:text-base font-semibold text-teal-300/80 hover:text-teal-100 tracking-wider transition-all duration-200 active:scale-95"
            title="Embark on the 360° Hogwarts Exploration"
          >
            <Play className="w-3.5 h-3.5 text-teal-400 group-hover:text-teal-200 transition-transform group-hover:translate-x-0.5" />
            <span>Play</span>
          </button>

          {/* Rules / Guide */}
          <button
            onClick={onOpenRules}
            className="text-xs font-cinzel text-teal-300/60 hover:text-teal-200 transition tracking-wider flex items-center gap-1 ml-2"
            title="Field Guide & Rules of Play"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Ambient Music Toggle */}
          <button
            onClick={handleToggleSound}
            className="text-teal-300/60 hover:text-teal-200 transition p-1"
            title={isMuted ? 'Unmute Hedwig’s Theme' : 'Mute Music'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400/80" /> : <Volume2 className="w-4 h-4 text-teal-300" />}
          </button>
        </nav>

        {/* Top Right: "Enter Your Name" / "Set Name" matching reference image */}
        <div className="pointer-events-auto flex items-center">
          <button
            onClick={() => {
              setTempName(playerName);
              setIsEditingName(true);
              sound.playTick();
            }}
            className="group relative px-4 py-1.5 rounded-lg transition-all duration-200"
            title="Set Your Wizarding Name"
          >
            <span className="font-cinzel text-sm sm:text-base font-medium text-teal-300 group-hover:text-teal-100 tracking-wider transition block">
              {playerName && playerName !== 'The Chosen One' ? playerName : 'Enter Your Name'}
            </span>
            {/* Cyan glowing underline matching screenshot */}
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-teal-400 to-transparent mt-1 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
          </button>
        </div>
      </header>

      {/* BOTTOM CENTER: "Hogwarts Guesser" Title in iconic Harry Potter font matching reference image */}
      <div className="absolute bottom-12 sm:bottom-16 inset-x-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        {/* Large Iconic Harry Potter Font Title */}
        <h1 
          className="font-harry text-6xl sm:text-8xl md:text-9xl tracking-wider select-none transform hover:scale-[1.01] transition-transform duration-500 text-center uppercase"
          style={{
            color: '#84e4e2',
            textShadow: `
              0 0 12px rgba(114, 219, 217, 0.9),
              0 0 35px rgba(56, 189, 178, 0.7),
              0 0 70px rgba(13, 148, 136, 0.5),
              2px 4px 15px rgba(0, 0, 0, 0.95)
            `,
            letterSpacing: '0.08em',
          }}
        >
          Hogwarts Guesser
        </h1>

        {/* Subtitle / Prompt */}
        <div className="mt-3 flex items-center gap-3">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-teal-400/60" />
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-teal-200/75 uppercase font-medium">
            360° Panoramic Realm Geoguesser
          </p>
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-teal-400/60" />
        </div>

        {/* Bottom Play CTA pill button */}
        <div className="mt-6 pointer-events-auto">
          <button
            onClick={handlePlayClick}
            className="px-8 py-3 rounded-full bg-[#0a1820]/90 hover:bg-[#0f2430] border border-teal-400/50 hover:border-teal-300 text-teal-100 font-cinzel font-bold text-sm sm:text-base tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(45,212,191,0.35)] hover:shadow-[0_0_35px_rgba(45,212,191,0.6)] transition-all duration-300 flex items-center gap-3 active:scale-95"
          >
            <Wand2 className="w-4 h-4 text-amber-300" />
            <span>Cast Off & Play</span>
          </button>
        </div>
      </div>

      {/* MODAL: Set Wizard Player Name */}
      {isEditingName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
          <div className="w-full max-w-md rounded-2xl bg-[#09151d] border-2 border-teal-500/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(45,212,191,0.2)] text-teal-100 relative">
            <button
              onClick={() => setIsEditingName(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-teal-400/60 hover:text-teal-200 hover:bg-teal-900/30 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-teal-300">
              <Wand2 className="w-5 h-5 text-amber-300" />
              <h3 className="font-cinzel text-lg font-bold tracking-wider uppercase">
                Identify Thyself, Wizard
              </h3>
            </div>
            <p className="text-xs text-teal-300/70 font-serif mb-5">
              Enter your name to sign your official Ministry Cartography Examination diploma.
            </p>

            <form onSubmit={handleSaveName} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="e.g. Harry Potter"
                  maxLength={30}
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-lg bg-[#050c11] border border-teal-500/50 text-teal-100 placeholder-teal-600/50 font-cinzel text-sm focus:outline-none focus:border-teal-300 focus:ring-1 focus:ring-teal-300 shadow-inner"
                />
              </div>

              {/* Quick Preset Names */}
              <div>
                <span className="text-[10px] font-cinzel uppercase text-teal-400/60 block mb-1.5 tracking-wider">
                  Or pick a known wizard:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Harry Potter', 'Hermione Granger', 'Ron Weasley', 'Albus Dumbledore', 'Luna Lovegood'].map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setTempName(name)}
                      className="px-2.5 py-1 rounded bg-[#0e212c] hover:bg-[#143040] border border-teal-500/20 text-[11px] font-cinzel text-teal-200 transition"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-teal-900/50">
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="px-4 py-2 rounded-lg text-xs font-cinzel text-teal-400/80 hover:text-teal-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-black font-cinzel font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirm Name</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
