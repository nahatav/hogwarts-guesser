import React, { useEffect } from 'react';
import type { RoundResult } from '../types/game';
import { sound } from '../utils/audio';
import { formatRegionName } from '../utils/scoring';
import { ArrowRight, Compass, Award, BookOpen } from 'lucide-react';
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
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[#0d0b08] border border-[#c9a84c]/40 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95)]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#c9a84c]/20 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#c9a84c]" />
            <span className="font-cinzel text-xs font-semibold tracking-widest uppercase text-[#e8dcc8]">
              Round Assessment
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 border border-[#c9a84c]/30 text-[#a09278] font-cinzel font-bold tracking-widest uppercase">
            Round {result.roundNumber}
          </span>
        </div>

        {/* Location Name */}
        <div className="mb-6">
          <h2 className="font-cinzel text-2xl text-[#e8dcc8] tracking-wide leading-tight uppercase">
            {location.name}
          </h2>
          <p className="text-[11px] font-cinzel tracking-widest text-[#a09278] mt-1.5 flex items-center gap-1.5 uppercase">
            <Compass className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>{formatRegionName(location.region)} • {location.floorName}</span>
          </p>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-2 gap-px bg-[#c9a84c]/20 border border-[#c9a84c]/20 mb-6">
          <div className="bg-[#0d0b08] p-4 flex flex-col justify-center">
            <span className="text-[9px] font-cinzel text-[#a09278] uppercase tracking-widest mb-1">Score Awarded</span>
            <span className="font-cinzel text-2xl font-bold text-[#c9a84c] tracking-wider">
              +{score.toLocaleString()}
            </span>
            <span className="text-[9px] font-cinzel text-[#5a4f3a] tracking-widest mt-0.5">/ 5,000</span>
          </div>

          <div className="bg-[#0d0b08] p-4 flex flex-col justify-center">
            <span className="text-[9px] font-cinzel text-[#a09278] uppercase tracking-widest mb-1">Distance Offset</span>
            <span className="font-cinzel text-xl text-[#e8dcc8] tracking-wide">
              {regionMatched ? `${distanceMeters}m` : 'Wrong Realm'}
            </span>
            {floorDelta > 0 && (
              <span className="text-[9px] font-cinzel text-[#a09278] tracking-widest mt-0.5">
                ({floorDelta} floor{floorDelta > 1 ? 's' : ''} off)
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onNextRound}
          className="w-full py-3 bg-[#0c0a08] hover:bg-[#181410] border border-[#c9a84c]/50 hover:border-[#c9a84c] text-[#e8dcc8] font-cinzel font-semibold text-xs tracking-widest uppercase transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span>{isLastRound ? 'View Final Results' : 'Next Chamber'}</span>
          <ArrowRight className="w-4 h-4 text-[#c9a84c]" />
        </button>
      </div>
    </div>
  );
};
