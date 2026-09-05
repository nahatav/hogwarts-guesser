import React, { useState } from 'react';
import type { GameState, HogwartsHouse } from '../types/game';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Sparkles, HelpCircle, Trophy, Flame } from 'lucide-react';

interface GameHeaderProps {
  gameState: GameState;
  onNewGame: () => void;
  onOpenRules: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  gameState,
  onNewGame,
  onOpenRules,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playTick();
  };

  const getHouseTheme = (house: HogwartsHouse) => {
    switch (house) {
      case 'Gryffindor':
        return {
          title: 'GRYFFINDOR ARCHIVE',
          glow: '#e11d48',
          accent: 'text-amber-400',
          border: 'border-red-500/40',
          badge: 'bg-red-950/80 text-amber-300 border-red-500/40',
          crest: '🦁',
        };
      case 'Slytherin':
        return {
          title: 'SLYTHERIN ARCHIVE',
          glow: '#10b981',
          accent: 'text-emerald-400',
          border: 'border-emerald-500/40',
          badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
          crest: '🐍',
        };
      case 'Ravenclaw':
        return {
          title: 'RAVENCLAW ARCHIVE',
          glow: '#0ea5e9',
          accent: 'text-cyan-400',
          border: 'border-blue-500/40',
          badge: 'bg-blue-950/80 text-cyan-300 border-blue-500/40',
          crest: '🦅',
        };
      case 'Hufflepuff':
        return {
          title: 'HUFFLEPUFF ARCHIVE',
          glow: '#f59e0b',
          accent: 'text-yellow-400',
          border: 'border-amber-500/40',
          badge: 'bg-amber-950/80 text-yellow-300 border-amber-500/40',
          crest: '🦡',
        };
    }
  };

  const houseTheme = getHouseTheme(gameState.house);

  return (
    <header className="fixed top-4 inset-x-6 z-20 flex items-center justify-between pointer-events-none font-sans">
      {/* Left: House Badge & Title */}
      <div className="flex items-center gap-3.5 pointer-events-auto">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg border transition-all duration-500 shadow-lg bg-[#0a100d]"
          style={{
            borderColor: houseTheme.glow,
            boxShadow: `0 0 12px ${houseTheme.glow}33`
          }}
        >
          {houseTheme.crest}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-cinzel font-bold text-xs sm:text-sm tracking-[0.18em] text-[#f4f7f5] uppercase">
              {houseTheme.title}
            </span>
          </div>
          <p className="text-[9px] tracking-[0.22em] text-[#718a7c] uppercase font-semibold">
            RESTRICTED PASSAGE · EST. 993
          </p>
        </div>
      </div>

      {/* Center: Round & Score Tracker */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Round Badge */}
        <div className="px-3.5 py-1.5 rounded-lg bg-[#070b09]/85 border border-[#1b2b22] shadow-xl backdrop-blur-md text-center">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#718a7c] block font-bold">
            {gameState.mode === 'owl_streak' ? 'Streak' : 'Round'}
          </span>
          <span className="font-cinzel font-bold text-sm text-[#e8f0eb]">
            {gameState.mode === 'owl_streak' ? (
              <span className="flex items-center gap-1 text-amber-400">
                <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                {gameState.streakCount}
              </span>
            ) : (
              `${gameState.currentRound} / ${gameState.totalRounds}`
            )}
          </span>
        </div>

        {/* Score Badge */}
        <div className="px-4 py-1.5 rounded-lg bg-[#070b09]/85 border border-[#23382c] shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md text-center">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#34d399] flex items-center justify-center gap-1 font-bold">
            <Trophy className="w-3 h-3 text-[#34d399]" /> Total Points
          </span>
          <span className="font-cinzel font-extrabold text-base text-[#f4f7f5]">
            {gameState.totalScore.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Right: Actions (Rules, Mute, New Game) */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={onOpenRules}
          className="p-2 rounded-lg bg-[#070b09]/80 border border-[#1b2b22] text-[#8ea899] hover:bg-[#121c16] hover:text-[#f4f7f5] hover:border-[#2d4738] transition shadow-md backdrop-blur-md"
          title="Spellbook Rules & Map Guide"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button
          onClick={toggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#070b09]/80 border border-[#1b2b22] text-[#8ea899] hover:bg-[#121c16] hover:text-[#f4f7f5] hover:border-[#2d4738] transition shadow-md backdrop-blur-md text-[10px] tracking-wider uppercase font-semibold"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          <span className="hidden sm:inline">{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
        </button>

        <button
          onClick={onNewGame}
          className="px-3.5 py-1.5 rounded-lg bg-[#0e1813] border border-[#23382c] text-[#d1fae5] hover:bg-[#15251d] hover:border-[#34d399] hover:text-[#ffffff] transition shadow-md backdrop-blur-md text-[10px] tracking-wider uppercase font-bold flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-[#34d399]" />
          <span>New Game</span>
        </button>
      </div>
    </header>
  );
};
