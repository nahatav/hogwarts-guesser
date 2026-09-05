import React, { useState } from 'react';
import type { HogwartsHouse, GameMode } from '../types/game';
import { sound } from '../utils/audio';

interface HousePickerModalProps {
  onStartGame: (house: HogwartsHouse, mode: GameMode) => void;
  isOpen: boolean;
}

const HOUSES: { id: HogwartsHouse; crest: string; color: string; glow: string }[] = [
  { id: 'Gryffindor', crest: '🦁', color: 'text-amber-400', glow: '#e11d48' },
  { id: 'Slytherin',  crest: '🐍', color: 'text-emerald-400', glow: '#10b981' },
  { id: 'Ravenclaw',  crest: '🦅', color: 'text-cyan-400', glow: '#0ea5e9' },
  { id: 'Hufflepuff', crest: '🦡', color: 'text-yellow-400', glow: '#f59e0b' },
];

const MODES: { id: GameMode; label: string; sub: string }[] = [
  { id: 'classic_5',      label: 'Classic',     sub: '5 rounds' },
  { id: 'castle_only',    label: 'Castle Only',  sub: 'Hogwarts' },
  { id: 'owl_streak',     label: 'O.W.L. Streak', sub: 'Until you fail' },
  { id: 'lumos_challenge', label: 'Lumos',       sub: 'Night mode' },
];

export const HousePickerModal: React.FC<HousePickerModalProps> = ({ onStartGame, isOpen }) => {
  const [selectedHouse, setSelectedHouse] = useState<HogwartsHouse>('Gryffindor');
  const [selectedMode, setSelectedMode] = useState<GameMode>('classic_5');
  const [entering, setEntering] = useState(false);

  if (!isOpen) return null;

  const house = HOUSES.find(h => h.id === selectedHouse)!;

  const handleEnter = () => {
    if (entering) return;
    setEntering(true);
    sound.playWandWhoosh();
    setTimeout(() => {
      onStartGame(selectedHouse, selectedMode);
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030405]/95 backdrop-blur-sm"
      style={{ animation: 'fadeIn 0.4s ease-out' }}
    >
      {/* Subtle glow behind card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${house.glow}14 0%, transparent 70%)`, transition: 'background 0.5s ease' }}
      />

      <div
        className="relative w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
        style={{
          background: '#0c0f0d',
          border: `1px solid ${house.glow}33`,
          boxShadow: `0 0 60px ${house.glow}18, 0 24px 64px rgba(0,0,0,0.85)`,
          transition: entering ? 'opacity 450ms, transform 450ms' : 'border-color 0.4s, box-shadow 0.4s',
          opacity: entering ? 0 : 1,
          transform: entering ? 'scale(0.97)' : 'scale(1)',
        }}
      >
        {/* Map image header */}
        <div className="relative h-36 overflow-hidden">
          <img
            src="/maps/wizarding-world-map.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(0.4) contrast(1.1) brightness(0.55)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, #0c0f0d 100%)' }} />
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <p className="font-cinzel text-[10px] tracking-[0.3em] text-[#7a6640] uppercase">I solemnly swear</p>
            <h1 className="font-gothic text-2xl text-[#e8dcc4]" style={{ textShadow: '0 0 20px rgba(200,160,60,0.5)' }}>
              The Marauder's Guessr
            </h1>
          </div>
        </div>

        {/* Form body */}
        <div className="px-6 pb-6 pt-4 flex flex-col gap-5">
          {/* House picker */}
          <div>
            <p className="text-[10px] font-cinzel tracking-[0.25em] text-[#5a6b5e] uppercase mb-2.5">Your House</p>
            <div className="grid grid-cols-4 gap-2">
              {HOUSES.map(h => (
                <button
                  key={h.id}
                  onClick={() => { setSelectedHouse(h.id); sound.playTick(); }}
                  className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg transition-all duration-200"
                  style={{
                    background: selectedHouse === h.id ? `${h.glow}18` : 'transparent',
                    border: `1px solid ${selectedHouse === h.id ? h.glow + '60' : '#1d2920'}`,
                    boxShadow: selectedHouse === h.id ? `0 0 12px ${h.glow}22` : 'none',
                  }}
                >
                  <span className="text-xl">{h.crest}</span>
                  <span className={`text-[9px] font-cinzel tracking-wider uppercase ${selectedHouse === h.id ? h.color : 'text-[#4a5c50]'}`}>
                    {h.id.slice(0, 4)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mode picker */}
          <div>
            <p className="text-[10px] font-cinzel tracking-[0.25em] text-[#5a6b5e] uppercase mb-2.5">Game Mode</p>
            <div className="grid grid-cols-2 gap-2">
              {MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setSelectedMode(m.id); sound.playTick(); }}
                  className="text-left px-3 py-2 rounded-lg transition-all duration-200"
                  style={{
                    background: selectedMode === m.id ? `${house.glow}18` : '#080c0a',
                    border: `1px solid ${selectedMode === m.id ? house.glow + '50' : '#1a2420'}`,
                  }}
                >
                  <p className={`text-xs font-cinzel font-bold tracking-wide ${selectedMode === m.id ? house.color : 'text-[#9ab0a0]'}`}>
                    {m.label}
                  </p>
                  <p className="text-[10px] text-[#4a5c50] font-sans mt-0.5">{m.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleEnter}
            disabled={entering}
            className="w-full py-3 rounded-xl font-cinzel font-bold text-sm tracking-[0.15em] uppercase transition-all duration-200 active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${house.glow}cc, ${house.glow}88)`,
              color: '#fff',
              boxShadow: `0 4px 24px ${house.glow}30`,
              border: `1px solid ${house.glow}60`,
            }}
          >
            {entering ? 'Entering...' : 'Enter the Wizarding World'}
          </button>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(0.96) } to { opacity:1; transform:scale(1) } }`}</style>
    </div>
  );
};
