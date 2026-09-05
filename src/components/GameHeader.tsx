import React, { useState } from 'react';
import type { GameState } from '../types/game';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Home, BookOpen } from 'lucide-react';

interface GameHeaderProps {
  gameState: GameState;
  onNewGame: () => void;
  onOpenRules: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState, onNewGame, onOpenRules }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playTick();
  };

  const roundLabel = gameState.mode === 'owl_streak' ? `${gameState.streakCount} 🔥` : `${gameState.currentRound} / ${gameState.totalRounds}`;

  return (
    <header className="fixed top-3 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
      {/* Left: Player Name & Score in Broadsheet Parchment */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <div
          className="px-3 py-1.5 rounded-lg bg-[#ded6c4] border-2 border-[#181818] shadow-[0_4px_12px_rgba(0,0,0,0.7)] flex items-center gap-1.5"
          title="Active Explorer"
        >
          <span className="text-sm">⚡</span>
          <span className="font-cinzel text-xs font-bold text-[#181818] tracking-wider max-w-[120px] sm:max-w-[160px] truncate">
            {gameState.playerName || 'The Chosen One'}
          </span>
        </div>

        <div
          className="px-3.5 py-1.5 rounded-lg bg-[#ded6c4] border-2 border-[#181818] shadow-[0_4px_12px_rgba(0,0,0,0.7)] text-center relative"
        >
          <p className="text-[9px] font-cinzel font-bold tracking-[0.2em] text-[#555] uppercase leading-none">Score</p>
          <p className="font-headline text-lg text-[#121212] tracking-wider leading-none mt-0.5">
            {gameState.totalScore.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Center: Round / Streak Indicator in Broadsheet Parchment */}
      <div
        className="px-4 py-1.5 rounded-lg bg-[#ded6c4] border-2 border-[#181818] shadow-[0_4px_12px_rgba(0,0,0,0.7)] text-center pointer-events-auto"
      >
        <p className="text-[9px] font-cinzel font-bold tracking-[0.2em] text-[#555] uppercase leading-none">
          {gameState.mode === 'owl_streak' ? 'Streak' : 'Round'}
        </p>
        <p className="font-headline text-lg text-[#121212] tracking-wider leading-none mt-0.5">
          {roundLabel}
        </p>
      </div>

      {/* Right: Sound Toggle + Rules Guide + Return to Home */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Rules button */}
        <button
          onClick={onOpenRules}
          className="p-2 rounded-lg bg-[#ded6c4] border-2 border-[#181818] text-[#121212] hover:bg-[#181818] hover:text-[#ded6c4] transition shadow-md"
          title="Field Guide & Rules"
        >
          <BookOpen className="w-4 h-4 text-[#b37d22]" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className="p-2 rounded-lg bg-[#ded6c4] border-2 border-[#181818] text-[#121212] hover:bg-[#181818] hover:text-[#ded6c4] transition shadow-md"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-700" /> : <Volume2 className="w-4 h-4 text-emerald-800" />}
        </button>

        {/* Home Button */}
        <button
          onClick={onNewGame}
          className="px-3.5 py-2 rounded-lg bg-[#121212] hover:bg-[#222] text-[#f7f2e7] border-2 border-[#181818] shadow-[0_4px_12px_rgba(0,0,0,0.7)] font-headline text-sm tracking-widest uppercase transition flex items-center gap-1.5 active:scale-95"
          title="Return to Hogwarts Home Screen"
        >
          <Home className="w-3.5 h-3.5 text-[#ffd700]" />
          <span>Home</span>
        </button>
      </div>
    </header>
  );
};
