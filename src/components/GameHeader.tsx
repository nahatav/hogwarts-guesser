import React, { useState } from 'react';
import type { GameState, HogwartsHouse } from '../types/game';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Newspaper } from 'lucide-react';

interface GameHeaderProps {
  gameState: GameState;
  onNewGame: () => void;
  onOpenRules: () => void;
}

const houseCrest: Record<HogwartsHouse, string> = {
  Gryffindor: '🦁',
  Slytherin:  '🐍',
  Ravenclaw:  '🦅',
  Hufflepuff: '🦡',
};

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState, onNewGame, onOpenRules: _onOpenRules }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playTick();
  };

  const crest = houseCrest[gameState.house];
  const roundLabel = gameState.mode === 'owl_streak' ? `${gameState.streakCount} 🔥` : `${gameState.currentRound} / ${gameState.totalRounds}`;

  return (
    <header className="fixed top-3 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
      {/* Left: House Crest + Score in Broadsheet Parchment */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-[#ded6c4] border-2 border-[#181818] shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
        >
          {crest}
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

      {/* Right: Sound Toggle + Front Page Button matching RETURN TO HOGWARTS */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={toggleSound}
          className="p-2 rounded-lg bg-[#ded6c4] border-2 border-[#181818] text-[#121212] hover:bg-[#181818] hover:text-[#ded6c4] transition shadow-md"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-700" /> : <Volume2 className="w-4 h-4 text-emerald-800" />}
        </button>

        <button
          onClick={onNewGame}
          className="px-4 py-2 rounded-lg bg-[#121212] hover:bg-[#222] text-[#f7f2e7] border-2 border-[#181818] shadow-[0_4px_12px_rgba(0,0,0,0.7)] font-headline text-sm tracking-widest uppercase transition flex items-center gap-1.5 active:scale-95"
          title="Return to The Daily Prophet broadsheet"
        >
          <Newspaper className="w-3.5 h-3.5 text-[#ffd700]" />
          <span>Front Page</span>
        </button>
      </div>
    </header>
  );
};
