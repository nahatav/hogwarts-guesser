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
        <div 
          className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-sm border border-[#5c3a1e] text-center shadow-[inset_0_0_12px_rgba(120,75,30,0.18),0_6px_16px_rgba(0,0,0,0.6)]"
          style={{
            background: 'linear-gradient(135deg, #faf5e8 0%, #f4ead2 50%, #eadbb6 100%)',
          }}
        >
          <p className="text-[8px] sm:text-[9px] font-cinzel font-bold tracking-[0.2em] text-[#614124] uppercase leading-none">Score</p>
          <p className="font-cinzel text-xs sm:text-sm font-bold text-[#16110b] tracking-wider leading-none mt-0.5">
            {gameState.totalScore.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Center: round indicator */}
      <div className="pointer-events-auto">
        <div 
          className="px-3 py-1 sm:px-5 sm:py-1.5 rounded-sm border border-[#5c3a1e] text-center shadow-[inset_0_0_12px_rgba(120,75,30,0.18),0_6px_16px_rgba(0,0,0,0.6)]"
          style={{
            background: 'linear-gradient(135deg, #faf5e8 0%, #f4ead2 50%, #eadbb6 100%)',
          }}
        >
          <p className="text-[8px] sm:text-[9px] font-cinzel font-bold tracking-[0.2em] text-[#614124] uppercase leading-none">
            {roundCaption}
          </p>
          <p className="font-cinzel text-xs sm:text-sm font-bold text-[#16110b] tracking-wider leading-none mt-0.5">
            {roundLabel}
          </p>
        </div>
      </div>

      {/* Right spacer for centering */}
      <div className="w-[50px] sm:w-[90px]" />
    </header>
  );
};
