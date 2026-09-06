import React, { useEffect } from 'react';
import type { RoundResult } from '../types/game';
import { sound } from '../utils/audio';
import { formatRegionName } from '../utils/scoring';
import { ArrowRight, Compass, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScoreModalProps {
  result: RoundResult;
  isLastRound: boolean;
  onNextRound: () => void;
}

export const ScoreModal: React.FC<ScoreModalProps> = ({
  result,
  isLastRound,
  onNextRound,
}) => {
  useEffect(() => {
    sound.playScoreFanfare(result.score);
    if (result.score >= 4200) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#c9a84c', '#e8dcc8', '#ffffff'],
        });
      } catch (e) {}
    }
  }, [result.score]);

  const { location, score, distanceMeters, regionMatched } = result;

  return (
    <div className="fixed inset-x-2 top-2 sm:inset-x-auto sm:top-5 sm:left-5 z-40 pointer-events-none animate-in fade-in duration-300">
      <div 
        className="w-full sm:w-[380px] p-3.5 sm:p-5 pointer-events-auto rounded-sm border-2 border-[#5c3a1e] relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #faf5e8 0%, #f4ead2 50%, #eadbb6 100%)',
          boxShadow: 'inset 0 0 30px rgba(120, 75, 30, 0.22), 0 20px 50px rgba(0, 0, 0, 0.85)',
          color: '#16110b',
        }}
      >
        {/* Decorative inner parchment border */}
        <div className="absolute inset-1 border border-[#8b5a2b]/25 pointer-events-none rounded-xs" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#8b5a2b]/30 pb-2 mb-2.5 relative z-10">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#781d1d]" />
            <span className="font-cinzel text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#16110b]">
              Round Assessment
            </span>
          </div>
          <span className="text-[9px] px-2 py-0.5 bg-[#ebdcb9] border border-[#784b1e]/40 text-[#4a2e14] font-cinzel font-bold tracking-wider uppercase shadow-xs">
            Round {result.roundNumber}
          </span>
        </div>

        {/* Location Name */}
        <div className="mb-3 relative z-10">
          <h2 className="font-cinzel text-base sm:text-lg font-bold text-[#16110b] tracking-wide leading-tight uppercase truncate">
            {location.name}
          </h2>
          <p className="text-[10px] font-cinzel font-semibold tracking-wider text-[#614124] mt-0.5 flex items-center gap-1 uppercase truncate">
            <Compass className="w-3 h-3 text-[#781d1d] shrink-0" />
            <span className="truncate">{formatRegionName(location.region)} • {location.floorName}</span>
          </p>
        </div>

        {/* Score Grid: Two inset rustic boxes */}
        <div className="grid grid-cols-2 gap-2 mb-3 relative z-10">
          <div 
            className="p-2.5 flex flex-col justify-center rounded-sm border border-[#784b1e]/30 shadow-[inset_0_1px_4px_rgba(107,68,35,0.12)]"
            style={{ background: '#fbf8f0' }}
          >
            <span className="text-[8px] font-cinzel font-bold text-[#6b4724] uppercase tracking-widest mb-0.5">Score</span>
            <span className="font-cinzel text-lg sm:text-xl font-bold text-[#16110b] tracking-wider leading-none">
              +{score.toLocaleString()}
            </span>
            <span className="text-[8px] font-cinzel font-semibold text-[#8b6540] tracking-widest mt-1">/ 5,000</span>
          </div>

          <div 
            className="p-2.5 flex flex-col justify-center rounded-sm border border-[#784b1e]/30 shadow-[inset_0_1px_4px_rgba(107,68,35,0.12)]"
            style={{ background: '#fbf8f0' }}
          >
            <span className="text-[8px] font-cinzel font-bold text-[#6b4724] uppercase tracking-widest mb-0.5">Distance</span>
            <span className="font-cinzel text-sm sm:text-base font-bold text-[#16110b] tracking-wide leading-none truncate">
              {regionMatched ? `${distanceMeters}m off` : 'Wrong Realm'}
            </span>
            <span className="text-[8px] font-cinzel font-bold text-[#781d1d] tracking-widest mt-1 truncate">
              {score >= 4850 ? '✦ Perfect' : score >= 3500 ? 'Close Match' : 'Far Off'}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onNextRound}
          className="w-full py-2 sm:py-2.5 bg-[#2b1810] hover:bg-[#3e2418] text-[#fbf8f0] border border-[#5c3a1e] font-cinzel font-bold text-xs tracking-widest uppercase transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98] shadow-md relative z-10 cursor-pointer"
        >
          <span>{isLastRound ? 'View Final Results' : 'Next Chamber'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#e8dcc8]" />
        </button>
      </div>
    </div>
  );
};
