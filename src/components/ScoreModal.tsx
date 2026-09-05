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

  const { location, score, distanceMeters, floorDelta, regionMatched } = result;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-sm sm:max-w-md bg-[#0d0b08] border border-[#c9a84c]/40 p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.95)] max-h-[90dvh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#c9a84c]/20 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#e8dcc8]">
              Round Assessment
            </span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 border border-[#c9a84c]/30 text-[#a09278] font-cinzel font-bold tracking-wider uppercase">
            Round {result.roundNumber}
          </span>
        </div>

        {/* Location Name */}
        <div className="mb-4">
          <h2 className="font-cinzel text-lg sm:text-xl text-[#e8dcc8] tracking-wide leading-tight uppercase">
            {location.name}
          </h2>
          <p className="text-[10px] font-cinzel tracking-wider text-[#a09278] mt-1 flex items-center gap-1 uppercase">
            <Compass className="w-3 h-3 text-[#c9a84c]" />
            <span>{formatRegionName(location.region)} • {location.floorName}</span>
          </p>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-2 gap-px bg-[#c9a84c]/20 border border-[#c9a84c]/20 mb-4">
          <div className="bg-[#0d0b08] p-3 flex flex-col justify-center">
            <span className="text-[8px] font-cinzel text-[#a09278] uppercase tracking-widest mb-0.5">Score</span>
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#c9a84c] tracking-wider leading-none">
              +{score.toLocaleString()}
            </span>
            <span className="text-[8px] font-cinzel text-[#5a4f3a] tracking-widest mt-1">/ 5,000</span>
          </div>

          <div className="bg-[#0d0b08] p-3 flex flex-col justify-center">
            <span className="text-[8px] font-cinzel text-[#a09278] uppercase tracking-widest mb-0.5">Distance</span>
            <span className="font-cinzel text-base sm:text-lg text-[#e8dcc8] tracking-wide leading-none">
              {regionMatched ? `${distanceMeters}m` : 'Wrong Realm'}
            </span>
            {floorDelta > 0 && (
              <span className="text-[8px] font-cinzel text-[#a09278] tracking-widest mt-1">
                ({floorDelta} floor{floorDelta > 1 ? 's' : ''} off)
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onNextRound}
          className="w-full py-2.5 sm:py-3 bg-[#0c0a08] hover:bg-[#181410] border border-[#c9a84c]/50 hover:border-[#c9a84c] text-[#e8dcc8] font-cinzel font-semibold text-xs tracking-widest uppercase transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span>{isLastRound ? 'View Final Results' : 'Next Chamber'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#c9a84c]" />
        </button>
      </div>
    </div>
  );
};
