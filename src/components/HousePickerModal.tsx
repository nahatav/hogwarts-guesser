import React, { useState } from 'react';
import type { HogwartsHouse, GameMode } from '../types/game';
import { sound } from '../utils/audio';
import { ChamberVaultDoor } from './ChamberVaultDoor';
import { Lock, Volume2, VolumeX, Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface HousePickerModalProps {
  onStartGame: (house: HogwartsHouse, mode: GameMode, wizardName?: string) => void;
  isOpen: boolean;
}

export const HousePickerModal: React.FC<HousePickerModalProps> = ({
  onStartGame,
  isOpen,
}) => {
  const [selectedHouse, setSelectedHouse] = useState<HogwartsHouse>('Slytherin');
  const [selectedMode, setSelectedMode] = useState<GameMode>('classic_5');
  const [wizardName, setWizardName] = useState<string>('');
  const [secretWord, setSecretWord] = useState<string>('');
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);

  if (!isOpen) return null;

  const houseThemes: Record<HogwartsHouse, {
    title: string;
    tag: string;
    crest: string;
    glow: string;
    accent: string;
    border: string;
    badgeBg: string;
  }> = {
    Slytherin: {
      title: 'SLYTHERIN ARCHIVE',
      tag: 'PARSEL ACCESS',
      crest: '🐍',
      glow: '#10b981',
      accent: 'text-emerald-400',
      border: 'border-emerald-500/40',
      badgeBg: 'bg-emerald-950/70',
    },
    Gryffindor: {
      title: 'GRYFFINDOR ARCHIVE',
      tag: 'BRAVERY PORTAL',
      crest: '🦁',
      glow: '#e11d48',
      accent: 'text-amber-400',
      border: 'border-red-500/40',
      badgeBg: 'bg-red-950/70',
    },
    Ravenclaw: {
      title: 'RAVENCLAW ARCHIVE',
      tag: 'DIADEM SANCTUM',
      crest: '🦅',
      glow: '#0ea5e9',
      accent: 'text-cyan-400',
      border: 'border-blue-500/40',
      badgeBg: 'bg-blue-950/70',
    },
    Hufflepuff: {
      title: 'HUFFLEPUFF ARCHIVE',
      tag: 'KITCHEN PASSAGE',
      crest: '🦡',
      glow: '#f59e0b',
      accent: 'text-yellow-400',
      border: 'border-amber-500/40',
      badgeBg: 'bg-amber-950/70',
    },
  };

  const currentTheme = houseThemes[selectedHouse];

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playTick();
  };

  const handleUnseal = () => {
    setIsUnlocking(true);
    sound.playWandWhoosh();
    setTimeout(() => {
      sound.playLumos();
      onStartGame(selectedHouse, selectedMode, wizardName.trim() || 'Heir');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#050709] text-[#e6ede8] font-serif select-none overflow-y-auto cavern-bg animate-in fade-in duration-500">
      {/* Top Header Bar */}
      <header className="w-full flex items-center justify-between px-6 sm:px-12 py-5 border-b border-[#1b2520]/80 backdrop-blur-md bg-[#070b09]/60 z-20">
        {/* Left: House Archive Badge */}
        <div className="flex items-center gap-3.5">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl border transition-all duration-500 shadow-lg"
            style={{
              borderColor: currentTheme.glow,
              backgroundColor: '#0d1612',
              boxShadow: `0 0 15px ${currentTheme.glow}33`
            }}
          >
            {currentTheme.crest}
          </div>
          <div>
            <h2 className="font-cinzel text-sm sm:text-base font-bold tracking-[0.18em] text-[#e8f0eb] uppercase">
              {currentTheme.title}
            </h2>
            <p className="text-[10px] tracking-[0.25em] text-[#718579] uppercase font-sans font-semibold">
              RESTRICTED PASSAGE · EST. 993
            </p>
          </div>
        </div>

        {/* Right: Sound Status Toggle */}
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#23332b] bg-[#0c1410]/70 text-[#9bb0a4] hover:text-[#e8f0eb] hover:border-[#3d594b] transition text-xs tracking-wider font-sans uppercase font-medium"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{isMuted ? 'SOUND IS OFF' : 'SOUND IS ON'}</span>
        </button>
      </header>

      {/* Main 2-Column Hero Portal Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-12 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 z-10 my-auto">
        {/* Left Column: Chamber Serpent Vault Door */}
        <div className="w-full lg:w-1/2 flex items-center justify-center order-2 lg:order-1">
          <ChamberVaultDoor
            glowColor={currentTheme.glow}
            house={selectedHouse}
            isUnlocked={isUnlocking}
          />
        </div>

        {/* Right Column: "Speak, Friend, and enter." Form Panel */}
        <div className="w-full lg:w-1/2 max-w-xl order-1 lg:order-2 flex flex-col justify-center">
          {/* Access Category Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#3a4d42]" />
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#8ea899] uppercase">
              {currentTheme.tag}
            </span>
            <span className="w-6 h-[1px] bg-[#3a4d42]" />
          </div>

          {/* Gothic Headline matching reference image */}
          <h1 className="font-gothic text-5xl sm:text-6xl text-[#f4f7f5] leading-tight tracking-wide mb-3 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            Speak, Friend, <br />
            and enter.
          </h1>

          <p className="text-sm sm:text-base text-[#8a9e93] font-garamond leading-relaxed mb-6 max-w-lg">
            The old door remembers its heirs. Offer your name and the word whispered through stone.
          </p>

          {/* Dark Glass Container with Corner Crosshairs (+) */}
          <div className="relative crosshair-box p-6 sm:p-7 rounded-lg bg-[#0a100d]/80 border border-[#1d2d24] backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col gap-4">
            {/* Field 1: Heir's Name */}
            <div>
              <label className="block text-[10px] font-sans font-bold tracking-[0.2em] text-[#718a7c] uppercase mb-1.5">
                HEIR'S NAME
              </label>
              <input
                type="text"
                value={wizardName}
                onChange={(e) => setWizardName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded bg-[#060b08] border border-[#1f3127] text-[#e8f0eb] placeholder-[#4d6356] text-sm font-sans focus:outline-none focus:border-[#38a169] focus:ring-1 focus:ring-[#38a169] transition"
              />
            </div>

            {/* Field 2: House Alignment Selection */}
            <div>
              <label className="block text-[10px] font-sans font-bold tracking-[0.2em] text-[#718a7c] uppercase mb-1.5">
                HOUSE OF HOGWARTS
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Slytherin', 'Gryffindor', 'Ravenclaw', 'Hufflepuff'] as HogwartsHouse[]).map((house) => {
                  const info = houseThemes[house];
                  const isSelected = selectedHouse === house;
                  return (
                    <button
                      key={house}
                      type="button"
                      onClick={() => {
                        setSelectedHouse(house);
                        sound.playWandWhoosh();
                      }}
                      className={`py-2 px-1 rounded border text-center transition flex flex-col items-center gap-1 ${
                        isSelected
                          ? `bg-[#0e1b15] ${info.border} ring-1 ring-emerald-500/50 text-[#f4f7f5]`
                          : 'bg-[#060a08] border-[#18261e] text-[#6b8275] hover:text-[#a2baa8] hover:border-[#263b2f]'
                      }`}
                    >
                      <span className="text-base">{info.crest}</span>
                      <span className="text-[10px] font-sans font-bold tracking-wider uppercase">
                        {house.slice(0, 4)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 3: Secret Word / Expedition Mode */}
            <div>
              <label className="block text-[10px] font-sans font-bold tracking-[0.2em] text-[#718a7c] uppercase mb-1.5">
                SECRET WORD / EXPEDITION
              </label>
              <div className="relative">
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={secretWord}
                  onChange={(e) => setSecretWord(e.target.value)}
                  placeholder="Whisper it here (e.g. open, mischief)"
                  className="w-full pl-4 pr-10 py-2.5 rounded bg-[#060b08] border border-[#1f3127] text-[#e8f0eb] placeholder-[#4d6356] text-sm font-sans focus:outline-none focus:border-[#38a169] focus:ring-1 focus:ring-[#38a169] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4d6356] hover:text-[#a2baa8] transition"
                >
                  {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Mode Badges */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  { id: 'classic_5', label: 'Classic 5-Round Tour' },
                  { id: 'castle_only', label: 'Hogwarts Castle Only' },
                  { id: 'owl_streak', label: 'O.W.L. Streak' },
                  { id: 'lumos_challenge', label: 'Lumos Night Mode' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedMode(m.id as GameMode);
                      sound.playTick();
                    }}
                    className={`text-[10px] font-sans font-medium px-2 py-1 rounded transition ${
                      selectedMode === m.id
                        ? 'bg-[#183124] text-[#a7f3d0] border border-[#2d5740]'
                        : 'bg-[#060a08] text-[#5b7366] border border-[#15241b] hover:text-[#90a89a]'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Unseal CTA Button */}
            <button
              onClick={handleUnseal}
              disabled={isUnlocking}
              className="w-full mt-2 py-3 rounded bg-gradient-to-r from-[#8a9e93] via-[#cbd5cf] to-[#8a9e93] text-[#060a08] font-sans font-black text-xs sm:text-sm tracking-[0.2em] uppercase transition duration-300 hover:brightness-110 active:scale-[0.99] shadow-[0_0_20px_rgba(138,158,147,0.25)] flex items-center justify-center gap-2 border border-[#d8e2dc]"
            >
              <Lock className="w-4 h-4 text-[#060a08]" />
              <span>{isUnlocking ? 'UNSEALING...' : 'UNSEAL THE ENTRANCE'}</span>
            </button>

            {/* Demo Key footnote */}
            <div className="text-center text-[10px] font-sans text-[#4d6356] tracking-wider">
              Demo key: <span className="text-[#84a390]">heir</span> / <span className="text-[#84a390]">open</span> · Press Enter
            </div>
          </div>

          {/* Bottom Warning Alert */}
          <div className="flex items-center gap-2 mt-4 text-[11px] font-sans text-[#718a7c] tracking-wide">
            <AlertTriangle className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
            <span>A word of caution — the Chamber knows those who do not belong.</span>
          </div>
        </div>
      </main>
    </div>
  );
};
