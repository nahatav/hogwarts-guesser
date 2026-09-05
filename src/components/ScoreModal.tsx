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
          particleCount: 70,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#121212', '#b37d22', '#ffffff'],
        });
      } catch (e) {}
    }
  }, [result.score]);

  const { location, score, distanceMeters, floorDelta, regionMatched } = result;

  return (
    <div className="fixed top-6 left-6 z-30 max-w-md w-full bg-[#ded6c4] border-[3px] border-[#181818] shadow-[0_20px_60px_rgba(0,0,0,0.92)] p-4 sm:p-5 text-[#141414] font-serif animate-in fade-in slide-in-from-top-4 duration-300 relative">
      {/* Corner filigrees */}
      <span className="absolute top-1 left-1.5 text-xs text-[#181818]/60 select-none">❦</span>
      <span className="absolute top-1 right-1.5 text-xs text-[#181818]/60 select-none">❦</span>
      <span className="absolute bottom-1 left-1.5 text-xs text-[#181818]/60 select-none">❦</span>
      <span className="absolute bottom-1 right-1.5 text-xs text-[#181818]/60 select-none">❦</span>

      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#181818] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#b37d22]" />
          <span className="font-cinzel text-xs font-bold tracking-widest uppercase text-[#181818]">
            Round Assessment
          </span>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#181818] text-[#ded6c4] font-cinzel font-bold">
          Round {result.roundNumber}
        </span>
      </div>

      {/* Location Name */}
      <div className="mb-3">
        <h2 className="font-headline text-3xl text-[#121212] tracking-wide leading-tight uppercase">
          {location.name}
        </h2>
        <p className="text-xs font-cinzel text-[#444] mt-0.5 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#b37d22]" />
          <span>{formatRegionName(location.region)} • {location.floorName}</span>
        </p>
      </div>

      {/* Score Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3 bg-[#e8dfcf] p-3 rounded-lg border border-[#181818]/40">
        <div>
          <span className="text-[9px] font-cinzel text-[#555] uppercase tracking-wider block">Score Awarded</span>
          <span className="font-headline text-3xl text-[#121212] tracking-wider">
            +{score.toLocaleString()} <span className="text-xs font-sans text-[#777]">/ 5,000</span>
          </span>
        </div>

        <div>
          <span className="text-[9px] font-cinzel text-[#555] uppercase tracking-wider block">Distance Offset</span>
          <span className="font-headline text-2xl text-[#121212] tracking-wide">
            {regionMatched ? `${distanceMeters}m` : 'Wrong Realm'}
          </span>
          {floorDelta > 0 && (
            <span className="text-[10px] font-cinzel font-bold text-amber-900 block">
              ({floorDelta} floor{floorDelta > 1 ? 's' : ''} off)
            </span>
          )}
        </div>
      </div>

      {/* Lore Snippet */}
      <div className="mb-4 bg-[#e5ddd0] p-3 rounded-lg border-l-4 border-[#181818] text-xs font-newspaper text-[#262626] italic leading-relaxed">
        <div className="flex items-center gap-1.5 font-bold not-italic font-cinzel text-[#181818] mb-1 text-[10px] uppercase tracking-wider">
          <BookOpen className="w-3 h-3 text-[#b37d22]" />
          <span>Hogwarts Archive:</span>
        </div>
        "{location.loreSnippet}"
      </div>

      {/* Solid Black CTA Button matching RETURN TO HOGWARTS */}
      <button
        onClick={onNextRound}
        className="w-full py-3 px-4 bg-[#121212] hover:bg-[#222] text-[#f7f2e7] font-headline text-xl tracking-widest uppercase transition-all duration-200 border-2 border-[#181818] shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
      >
        <span>{isLastRound ? 'View Final O.W.L. Results' : 'Proceed to Next Chamber'}</span>
        <ArrowRight className="w-5 h-5 text-[#ffd700]" />
      </button>
    </div>
  );
};
