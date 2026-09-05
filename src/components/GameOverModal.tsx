import React, { useEffect } from 'react';
import type { GameState } from '../types/game';
import { sound } from '../utils/audio';
import { RotateCcw, Award, BookOpen, Newspaper } from 'lucide-react';
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

  let gradeTitle = 'T (Troll)';
  let gradeDesc = 'You got lost in the secret corridors and failed your Cartography O.W.L.!';

  if (percentage >= 90) {
    gradeTitle = 'O (Outstanding ⭐)';
    gradeDesc = 'Unparalleled spatial mastery of the Wizarding World! 100 points awarded to your house!';
  } else if (percentage >= 75) {
    gradeTitle = 'E (Exceeds Expectations)';
    gradeDesc = 'Remarkable knowledge of Hogwarts Castle and surrounding wizarding lands!';
  } else if (percentage >= 55) {
    gradeTitle = 'A (Acceptable)';
    gradeDesc = 'You passed your Ordinary Wizarding Level exam, though you still occasionally wander onto the wrong staircase.';
  } else if (percentage >= 35) {
    gradeTitle = 'P (Poor)';
    gradeDesc = 'You need to spend more time studying the Marauder’s Map in the library.';
  } else if (percentage >= 15) {
    gradeTitle = 'D (Dreadful)';
    gradeDesc = 'You ended up in the Forbidden Forest by mistake.';
  }

  useEffect(() => {
    sound.playScoreFanfare(totalScore);
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#ffd700', '#121212', '#d4af37', '#ffffff'],
        });
      } catch (e) {}
    }
  }, [percentage, totalScore]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 select-none">
      <div 
        className="w-full max-w-2xl bg-[#ded6c4] border-[3px] border-[#181818] p-6 sm:p-8 text-[#141414] font-serif shadow-[0_25px_80px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto relative"
      >
        {/* Corner filigrees */}
        <span className="absolute top-1 left-2 text-sm text-[#181818]/70 select-none">❦</span>
        <span className="absolute top-1 right-2 text-sm text-[#181818]/70 select-none">❦</span>
        <span className="absolute bottom-1 left-2 text-sm text-[#181818]/70 select-none">❦</span>
        <span className="absolute bottom-1 right-2 text-sm text-[#181818]/70 select-none">❦</span>

        {/* Header */}
        <div className="text-center mb-5 border-b-2 border-[#181818] pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] text-[#ded6c4] text-xs font-cinzel font-bold uppercase tracking-widest mb-2">
            <Award className="w-4 h-4 text-[#ffd700]" />
            <span>Ministry of Magic Examination Certificate</span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl text-[#121212] tracking-tight uppercase leading-none mt-1">
            O.W.L. Examination Report
          </h1>
          <p className="text-xs font-cinzel text-[#444] mt-1 uppercase tracking-widest">
            Cartographic Diploma Conferred for <strong>{house}</strong>
          </p>
        </div>

        {/* Grade Badge Banner */}
        <div className="p-4 rounded-xl border-2 border-[#181818] bg-[#e5ddd0] text-center mb-5">
          <span className="text-[10px] font-cinzel uppercase tracking-widest block text-[#555] mb-1">Final Result</span>
          <span className="font-headline text-4xl sm:text-5xl text-[#121212] block tracking-wide">
            {gradeTitle}
          </span>
          <p className="text-xs font-newspaper italic text-[#333] mt-1 max-w-md mx-auto">
            "{gradeDesc}"
          </p>
        </div>

        {/* Score Summary Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-3 rounded-xl bg-[#e5ddd0] border border-[#181818]/40 text-center">
            <span className="text-[9px] font-cinzel uppercase tracking-wider block text-[#555]">Total Score</span>
            <span className="font-headline text-3xl text-[#121212]">
              {totalScore.toLocaleString()}
            </span>
            <span className="text-[9px] font-sans text-[#777] block">of {maxScore.toLocaleString()}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#e5ddd0] border border-[#181818]/40 text-center">
            <span className="text-[9px] font-cinzel uppercase tracking-wider block text-[#555]">Accuracy</span>
            <span className="font-headline text-3xl text-[#121212]">
              {percentage}%
            </span>
            <span className="text-[9px] font-sans text-[#777] block">Calibration</span>
          </div>

          <div className="p-3 rounded-xl bg-[#e5ddd0] border border-[#181818]/40 text-center">
            <span className="text-[9px] font-cinzel uppercase tracking-wider block text-[#555]">House Points</span>
            <span className="font-headline text-3xl text-[#b37d22]">
              +{Math.round(totalScore / 50)}
            </span>
            <span className="text-[9px] font-sans text-[#777] block">To {house}</span>
          </div>
        </div>

        {/* Round by Round Breakdown Table */}
        <div className="mb-6 bg-[#e5ddd0] border border-[#181818]/40 rounded-xl p-3.5">
          <h3 className="text-xs font-cinzel font-bold uppercase tracking-widest text-[#181818] mb-2.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#b37d22]" />
            <span>Chamber by Chamber Dispatches</span>
          </h3>

          <div className="space-y-1.5">
            {roundResults.map((r, i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-2 rounded-lg bg-[#ded6c4] border border-[#181818]/20 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#181818] text-[#ded6c4] flex items-center justify-center font-bold text-[10px]">
                    {r.roundNumber}
                  </span>
                  <div>
                    <span className="font-bold text-[#121212] block">{r.location.name}</span>
                    <span className="text-[10px] text-[#666]">
                      {r.regionMatched ? `${r.distanceMeters}m off` : 'Wrong Realm'} {r.floorDelta > 0 && `• ${r.floorDelta} fl`}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-headline text-lg text-[#121212] block">+{r.score.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons matching RETURN TO HOGWARTS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 px-4 bg-[#121212] hover:bg-[#222] text-[#f7f2e7] font-headline text-xl tracking-widest uppercase transition-all duration-200 border-2 border-[#181818] shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4 text-[#ffd700]" />
            <span>Play Again (New Expedition)</span>
          </button>

          <button
            onClick={onChangeHouse}
            className="py-3 px-6 bg-[#ded6c4] hover:bg-[#181818] hover:text-[#ded6c4] text-[#121212] border-2 border-[#181818] font-cinzel font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Newspaper className="w-4 h-4" />
            <span>Front Page</span>
          </button>
        </div>
      </div>
    </div>
  );
};
