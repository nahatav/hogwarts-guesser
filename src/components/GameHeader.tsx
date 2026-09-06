import React from 'react';
import type { GameState } from '../types/game';
import { Timer } from 'lucide-react';

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

  const seconds = Math.max(0, gameState.timeRemaining);
  const isCritical = seconds <= 10;
  const formattedTime = `0:${seconds < 10 ? '0' : ''}${seconds}`;

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

      {/* Right: 30-Second Round Countdown Timer */}
      <div className="flex items-center pointer-events-auto">
        <div 
          className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-sm border text-center transition-colors duration-200 ${
            isCritical ? 'border-[#a82424] shadow-[inset_0_0_12px_rgba(168,36,36,0.25),0_6px_16px_rgba(0,0,0,0.7)]' : 'border-[#5c3a1e] shadow-[inset_0_0_12px_rgba(120,75,30,0.18),0_6px_16px_rgba(0,0,0,0.6)]'
          }`}
          style={{
            background: isCritical 
              ? 'linear-gradient(135deg, #fdf2f2 0%, #fde8e8 50%, #fbd5d5 100%)'
              : 'linear-gradient(135deg, #faf5e8 0%, #f4ead2 50%, #eadbb6 100%)',
          }}
        >
          <div className="flex items-center justify-center gap-1 leading-none">
            <Timer className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${isCritical ? 'text-[#a82424] animate-pulse' : 'text-[#614124]'}`} />
            <p className={`text-[8px] sm:text-[9px] font-cinzel font-bold tracking-[0.2em] uppercase leading-none ${isCritical ? 'text-[#a82424]' : 'text-[#614124]'}`}>
              Time
            </p>
          </div>
          <p className={`font-cinzel text-xs sm:text-sm font-bold tracking-wider leading-none mt-0.5 ${isCritical ? 'text-[#a82424] font-black animate-pulse' : 'text-[#16110b]'}`}>
            {formattedTime}
          </p>
        </div>
      </div>
    </header>
  );
};
