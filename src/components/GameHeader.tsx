import React from 'react';
import type { GameState } from '../types/game';

interface GameHeaderProps {
  gameState: GameState;
  onNewGame: () => void;
  onOpenRules: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {

  const roundLabel =
    gameState.mode === 'owl_streak'
      ? `${gameState.streakCount}`
      : `${gameState.currentRound} / ${gameState.totalRounds}`;

  const roundCaption = gameState.mode === 'owl_streak' ? 'Streak' : 'Round';

  return (
    <header className="fixed top-2 sm:top-3 inset-x-2 sm:inset-x-4 z-20 flex items-center justify-between pointer-events-none">

      {/* Left: Score only */}
      <div className="flex items-center pointer-events-auto">
        <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#0d0b08]/90 border border-[#c9a84c]/30 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] text-center">
          <p className="text-[8px] sm:text-[9px] font-cinzel font-bold tracking-[0.2em] text-[#7a6a50] uppercase leading-none">Score</p>
          <p className="font-cinzel text-xs sm:text-sm font-bold text-[#c9a84c] tracking-wider leading-none mt-0.5">
            {gameState.totalScore.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Center: round indicator */}
      <div className="pointer-events-auto">
        <div className="px-3 py-1 sm:px-5 sm:py-1.5 bg-[#0d0b08]/90 border border-[#c9a84c]/30 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] text-center">
          <p className="text-[8px] sm:text-[9px] font-cinzel font-bold tracking-[0.2em] text-[#7a6a50] uppercase leading-none">
            {roundCaption}
          </p>
          <p className="font-cinzel text-xs sm:text-sm font-bold text-[#e8dcc8] tracking-wider leading-none mt-0.5">
            {roundLabel}
          </p>
        </div>
      </div>

      {/* Right spacer for centering */}
      <div className="w-[50px] sm:w-[90px]" />
    </header>
  );
};
