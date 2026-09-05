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
    if (result.score >= 4500) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#d4af37', '#8b0000', '#006400'],
      });
    }
  }, [result.score]);

  const { location, score, distanceMeters, floorDelta, regionMatched } = result;

  return (
    <div className="fixed top-6 left-6 z-30 max-w-md w-full bg-[#1c1815]/95 border-2 border-[#d4af37]/80 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl p-5 text-[#f4ecd8] font-serif animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Decorative Gold Header */}
      <div className="flex items-center justify-between border-b border-[#8c734b]/40 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#d4af37]" />
          <span className="text-xs font-bold tracking-widest uppercase text-[#d4af37]">
            Round Assessment
          </span>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-[#3d2a1a] text-amber-300 font-bold border border-[#8c734b]/60">
          Round {result.roundNumber}
        </span>
      </div>

      {/* Location Name & Region Reveal */}
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-amber-300 tracking-wide leading-tight">
          {location.name}
        </h2>
        <p className="text-xs text-[#c4b59d] mt-0.5 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{formatRegionName(location.region)} • {location.floorName}</span>
        </p>
      </div>

      {/* Score & Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 bg-[#141210]/80 p-3 rounded-xl border border-[#8c734b]/40">
        <div>
          <span className="text-[10px] text-[#a89980] uppercase tracking-wider block">Round Score</span>
          <span className="text-2xl font-extrabold text-yellow-400">
            +{score.toLocaleString()} <span className="text-xs text-[#a89980] font-normal">/ 5,000</span>
          </span>
        </div>

        <div>
          <span className="text-[10px] text-[#a89980] uppercase tracking-wider block">Distance Offset</span>
          <span className="text-lg font-bold text-[#f4ecd8]">
            {regionMatched ? `${distanceMeters} meters` : 'Wrong Realm'}
          </span>
          {floorDelta > 0 && (
            <span className="text-[10px] text-amber-400 block">
              ({floorDelta} floor{floorDelta > 1 ? 's' : ''} off)
            </span>
          )}
        </div>
      </div>

      {/* Lore Snippet */}
      <div className="mb-4 bg-[#261f19]/80 p-3 rounded-xl border-l-4 border-[#d4af37] text-xs text-[#e6d5b8] italic">
        <div className="flex items-center gap-1.5 font-bold not-italic text-amber-400 mb-1 text-[11px]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Hogwarts Archives:</span>
        </div>
        "{location.loreSnippet}"
      </div>

      {/* Next Round Action Button */}
      <button
        onClick={onNextRound}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#d4af37] text-[#1c1815] font-serif font-black text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] transition active:scale-[0.98] flex items-center justify-center gap-2 border border-[#fff2b2]"
      >
        <span>{isLastRound ? 'View Final O.W.L. Results' : 'Proceed to Next Chamber'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
