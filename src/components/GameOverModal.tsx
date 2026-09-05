import React, { useEffect } from 'react';
import type { GameState } from '../types/game';
import { sound } from '../utils/audio';
import { RotateCcw, Award, BookOpen, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameOverModalProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onChangeHouse: () => void; // Keeping prop name for compatibility, but acts as go home
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  gameState,
  onPlayAgain,
  onChangeHouse,
}) => {
  const { totalScore, roundResults } = gameState;
  const maxScore = roundResults.length * 5000;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let gradeTitle = 'T (Troll)';
  let gradeDesc = 'You got lost in the secret corridors and failed your Cartography O.W.L.!';

  if (percentage >= 90) {
    gradeTitle = 'O (Outstanding)';
    gradeDesc = 'Unparalleled spatial mastery of the Wizarding World!';
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
          particleCount: 100,
          spread: 80,
          origin: { y: 0.4 },
          colors: ['#c9a84c', '#e8dcc8', '#ffffff'],
        });
      } catch (e) {}
    }
  }, [percentage, totalScore]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-[#0d0b08] border border-[#c9a84c]/40 p-4 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.95)] max-h-[88dvh] overflow-y-auto">
        
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 border-b border-[#c9a84c]/20 pb-3 sm:pb-5">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <Award className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span className="text-[9px] sm:text-[10px] text-[#c9a84c] font-cinzel font-bold uppercase tracking-[0.2em]">
              Ministry of Magic
            </span>
            <Award className="w-3.5 h-3.5 text-[#c9a84c]" />
          </div>
          <h1 className="font-cinzel text-2xl sm:text-4xl text-[#e8dcc8] tracking-widest uppercase leading-none">
            O.W.L. Report
          </h1>
          <p className="text-[10px] sm:text-[11px] font-cinzel text-[#a09278] mt-2 uppercase tracking-widest">
            Cartographic Diploma Conferred upon <span className="text-[#c9a84c]">{gameState.playerName || 'The Chosen One'}</span>
          </p>
        </div>

        {/* Grade Banner */}
        <div className="p-3.5 sm:p-5 border border-[#c9a84c]/30 bg-[#14100c] text-center mb-4 sm:mb-6">
          <span className="text-[9px] sm:text-[10px] font-cinzel uppercase tracking-widest block text-[#a09278] mb-1">Final Result</span>
          <span className="font-cinzel font-bold text-2xl sm:text-4xl text-[#c9a84c] block tracking-wider uppercase mb-1.5 sm:mb-2">
            {gradeTitle}
          </span>
          <p className="text-[10px] sm:text-[11px] font-serif text-[#8a7f6a] max-w-md mx-auto">
            {gradeDesc}
          </p>
        </div>

        {/* Score Stats */}
        <div className="grid grid-cols-2 gap-px bg-[#c9a84c]/20 border border-[#c9a84c]/20 mb-4 sm:mb-6">
          <div className="bg-[#0d0b08] p-3 sm:p-4 text-center">
            <span className="text-[8px] sm:text-[9px] font-cinzel uppercase tracking-widest block text-[#a09278] mb-1">Total Score</span>
            <span className="font-cinzel font-bold text-xl sm:text-2xl text-[#e8dcc8]">
              {totalScore.toLocaleString()}
            </span>
            <span className="text-[8px] sm:text-[9px] font-cinzel text-[#5a4f3a] tracking-widest block mt-0.5">of {maxScore.toLocaleString()}</span>
          </div>

          <div className="bg-[#0d0b08] p-3 sm:p-4 text-center">
            <span className="text-[8px] sm:text-[9px] font-cinzel uppercase tracking-widest block text-[#a09278] mb-1">Accuracy</span>
            <span className="font-cinzel font-bold text-xl sm:text-2xl text-[#e8dcc8]">
              {percentage}%
            </span>
            <span className="text-[8px] sm:text-[9px] font-cinzel text-[#5a4f3a] tracking-widest block mt-0.5">Calibration</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="mb-5 sm:mb-8 border border-[#c9a84c]/20 bg-[#14100c] p-3 sm:p-4">
          <h3 className="text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-widest text-[#c9a84c] mb-2 sm:mb-3 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Chamber Dispatches</span>
          </h3>

          <div className="space-y-2">
            {roundResults.map((r, i) => (
              <div 
                key={i}
                className="flex items-center justify-between py-2 border-b border-[#c9a84c]/10 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-cinzel text-[#a09278] w-4">
                    {r.roundNumber}.
                  </span>
                  <div>
                    <span className="font-cinzel text-[11px] text-[#e8dcc8] uppercase tracking-wider block">{r.location.name}</span>
                    <span className="text-[9px] font-cinzel text-[#7a6a50] tracking-widest uppercase mt-0.5 block">
                      {r.regionMatched ? `${r.distanceMeters}m off` : 'Wrong Realm'} {r.floorDelta > 0 && `• ${r.floorDelta} fl`}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-cinzel text-sm text-[#c9a84c] block">+{r.score.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 bg-[#0c0a08] hover:bg-[#181410] border border-[#c9a84c]/60 hover:border-[#c9a84c] text-[#e8dcc8] font-cinzel font-semibold text-xs tracking-widest uppercase transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4 text-[#c9a84c]" />
            <span>Play Again</span>
          </button>

          <button
            onClick={onChangeHouse}
            className="py-3 px-8 bg-transparent hover:bg-[#181410] text-[#a09278] hover:text-[#e8dcc8] border border-[#5a4f3a] hover:border-[#c9a84c]/50 font-cinzel font-semibold text-xs uppercase tracking-widest transition-all duration-150 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
