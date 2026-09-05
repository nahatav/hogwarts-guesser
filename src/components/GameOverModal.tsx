import React, { useEffect } from 'react';
import type { GameState } from '../types/game';
import { sound } from '../utils/audio';
import { RotateCcw, Award, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameOverModalProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onChangeHouse: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  gameState,
  onPlayAgain,
  onChangeHouse,
}) => {
  const { totalScore, roundResults, house } = gameState;
  const maxScore = roundResults.length * 5000;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Determine Final O.W.L. Grade
  let gradeTitle = 'T (Troll)';
  let gradeDesc = 'You got hopelessly lost in the secret corridors and failed your Geography O.W.L.!';
  let badgeColor = 'bg-red-950 text-red-300 border-red-800';

  if (percentage >= 92) {
    gradeTitle = 'O (Outstanding ⭐)';
    gradeDesc = 'Unparalleled spatial mastery of the Wizarding World! Professor Dumbledore has awarded 100 points to your house!';
    badgeColor = 'bg-amber-950 text-amber-300 border-amber-500 shadow-[0_0_20px_rgba(255,215,0,0.5)]';
  } else if (percentage >= 78) {
    gradeTitle = 'E (Exceeds Expectations)';
    gradeDesc = 'Remarkable knowledge of Hogwarts Castle and surrounding wizarding lands!';
    badgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-500';
  } else if (percentage >= 60) {
    gradeTitle = 'A (Acceptable)';
    gradeDesc = 'You passed your Ordinary Wizarding Level exam, though you still occasionally wander onto the wrong staircase.';
    badgeColor = 'bg-blue-950 text-blue-300 border-blue-500';
  } else if (percentage >= 40) {
    gradeTitle = 'P (Poor)';
    gradeDesc = 'You need to spend more time studying the Marauder’s Map in the library.';
    badgeColor = 'bg-stone-900 text-stone-300 border-stone-600';
  } else if (percentage >= 20) {
    gradeTitle = 'D (Dreadful)';
    gradeDesc = 'You ended up in the Forbidden Forest by mistake. Madame Pomfrey is checking you for Doxy bites.';
    badgeColor = 'bg-red-950 text-red-400 border-red-800';
  }

  useEffect(() => {
    sound.playScoreFanfare(totalScore);
    if (percentage >= 75) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#d4af37', '#ffffff', '#e6d5b8'],
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="w-full max-w-2xl bg-[#1c1815] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-8 text-[#f4ecd8] font-serif shadow-[0_20px_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
        style={{
          backgroundImage: `radial-gradient(circle at top center, rgba(212,175,55,0.12) 0%, transparent 70%)`
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2b2219] border border-[#8c734b]/60 text-xs text-[#d4af37] font-bold uppercase tracking-widest mb-2">
            <Award className="w-4 h-4 text-[#d4af37]" />
            <span>Ministry of Magic Examination Board</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-wide">
            O.W.L. Examination Report
          </h1>
          <p className="text-sm text-[#c4b59d] mt-1">
            Official Spatial & Cartographic Assessment for <strong className="text-amber-400">{house}</strong>
          </p>
        </div>

        {/* Grade Badge Banner */}
        <div className={`p-5 rounded-2xl border-2 text-center mb-6 transition-all ${badgeColor}`}>
          <span className="text-xs uppercase tracking-widest block opacity-80 mb-1">Final Grade Conferred</span>
          <span className="text-3xl sm:text-4xl font-black block tracking-wide">
            {gradeTitle}
          </span>
          <p className="text-xs sm:text-sm mt-2 opacity-90 max-w-md mx-auto italic">
            "{gradeDesc}"
          </p>
        </div>

        {/* Score Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-[#141210] border border-[#8c734b]/40 text-center">
            <span className="text-[11px] text-[#a89980] uppercase tracking-wider block">Total Score</span>
            <span className="text-2xl font-black text-amber-400">
              {totalScore.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#a89980] block">out of {maxScore.toLocaleString()}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#141210] border border-[#8c734b]/40 text-center">
            <span className="text-[11px] text-[#a89980] uppercase tracking-wider block">Accuracy</span>
            <span className="text-2xl font-black text-emerald-400">
              {percentage}%
            </span>
            <span className="text-[10px] text-[#a89980] block">Overall Calibration</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-[#141210] border border-[#8c734b]/40 text-center">
            <span className="text-[11px] text-[#a89980] uppercase tracking-wider block">House Points</span>
            <span className="text-2xl font-black text-yellow-300">
              +{Math.round(totalScore / 50)} pts
            </span>
            <span className="text-[10px] text-[#a89980] block">Awarded to {house}</span>
          </div>
        </div>

        {/* Round by Round Breakdown Table */}
        <div className="mb-6 bg-[#141210] border border-[#8c734b]/40 rounded-2xl p-4 overflow-hidden">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-3 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Round-by-Round Chamber Breakdown</span>
          </h3>

          <div className="space-y-2">
            {roundResults.map((r, i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#1c1815] border border-[#8c734b]/20 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#2e2217] flex items-center justify-center font-bold text-[10px] text-[#d4af37]">
                    {r.roundNumber}
                  </span>
                  <div>
                    <span className="font-bold text-[#f4ecd8] block">{r.location.name}</span>
                    <span className="text-[10px] text-[#a89980]">
                      {r.regionMatched ? `${r.distanceMeters}m off` : 'Wrong Realm'} {r.floorDelta > 0 && `• ${r.floorDelta} floors off`}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-amber-300 block">+{r.score.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-400 font-serif">
                    {r.score >= 4500 ? '⭐ O' : r.score >= 3500 ? 'E' : r.score >= 2000 ? 'A' : 'P'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#d4af37] text-[#1c1815] font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] transition active:scale-[0.98] flex items-center justify-center gap-2 border border-[#fff2b2]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again (New Rounds)</span>
          </button>

          <button
            onClick={onChangeHouse}
            className="py-3.5 px-6 rounded-xl bg-[#2b2219] border border-[#8c734b]/60 text-[#d4af37] hover:bg-[#3d2e20] hover:border-[#d4af37] font-bold text-xs uppercase tracking-wider transition"
          >
            Change House
          </button>
        </div>
      </div>
    </div>
  );
};
