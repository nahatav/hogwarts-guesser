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

  const roundLabel =
    gameState.mode === 'owl_streak'
      ? `${gameState.streakCount}`
      : `${gameState.currentRound} / ${gameState.totalRounds}`;

  const roundCaption = gameState.mode === 'owl_streak' ? 'Streak' : 'Round';

  return (
    <header className="fixed top-3 inset-x-4 z-20 flex items-center justify-between pointer-events-none">

      {/* Left: player name + score */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Player name pill */}
        <div className="px-3 py-1.5 bg-[#0d0b08]/90 border border-[#c9a84c]/30 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] flex items-center">
          <span className="font-cinzel text-xs font-semibold text-[#e8dcc8] tracking-wider max-w-[120px] sm:max-w-[160px] truncate">
            {gameState.playerName || 'The Chosen One'}
          </span>
        </div>

        {/* Score pill */}
        <div className="px-3 py-1.5 bg-[#0d0b08]/90 border border-[#c9a84c]/30 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] text-center">
          <p className="text-[9px] font-cinzel font-bold tracking-[0.2em] text-[#7a6a50] uppercase leading-none">Score</p>
          <p className="font-cinzel text-sm font-bold text-[#c9a84c] tracking-wider leading-none mt-0.5">
            {gameState.totalScore.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Center: round indicator */}
      <div className="px-5 py-1.5 bg-[#0d0b08]/90 border border-[#c9a84c]/30 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] text-center pointer-events-auto">
        <p className="text-[9px] font-cinzel font-bold tracking-[0.2em] text-[#7a6a50] uppercase leading-none">
          {roundCaption}
        </p>
        <p className="font-cinzel text-sm font-bold text-[#e8dcc8] tracking-wider leading-none mt-0.5">
          {roundLabel}
        </p>
      </div>

      {/* Right: icon buttons */}
      <div className="flex items-center gap-1.5 pointer-events-auto">
        {/* Rules */}
        <button
          onClick={onOpenRules}
          className="p-2 bg-[#0d0b08]/90 border border-[#c9a84c]/30 text-[#a09278] hover:text-[#e8dcc8] hover:border-[#c9a84c]/60 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] transition-colors duration-150"
          title="Field Guide & Rules"
        >
          <BookOpen className="w-4 h-4" />
        </button>

        {/* Audio */}
        <button
          onClick={toggleSound}
          className="p-2 bg-[#0d0b08]/90 border border-[#c9a84c]/30 text-[#a09278] hover:text-[#e8dcc8] hover:border-[#c9a84c]/60 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] transition-colors duration-150"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Home */}
        <button
          onClick={onNewGame}
          className="px-3.5 py-2 bg-[#0d0b08]/90 border border-[#c9a84c]/30 hover:border-[#c9a84c]/70 text-[#e8dcc8] hover:text-[#c9a84c] backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] font-cinzel text-xs tracking-widest uppercase transition-all duration-150 flex items-center gap-1.5 active:scale-[0.97]"
          title="Return to home"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
      </div>
    </header>
  );
};
