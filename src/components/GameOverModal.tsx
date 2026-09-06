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
      <div 
        className="w-full max-w-xl p-4 sm:p-7 max-h-[88dvh] overflow-y-auto rounded-sm border-2 border-[#5c3a1e] relative overflow-hidden text-[#16110b]"
        style={{
          background: 'linear-gradient(135deg, #faf5e8 0%, #f4ead2 50%, #eadbb6 100%)',
          boxShadow: 'inset 0 0 40px rgba(120, 75, 30, 0.25), 0 25px 70px rgba(0, 0, 0, 0.95)',
        }}
      >
        {/* Decorative inner parchment border */}
        <div className="absolute inset-1.5 border border-[#8b5a2b]/25 pointer-events-none rounded-xs" />

        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 border-b border-[#8b5a2b]/30 pb-3 sm:pb-5 relative z-10">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <Award className="w-3.5 h-3.5 text-[#781d1d]" />
            <span className="text-[9px] sm:text-[10px] text-[#781d1d] font-cinzel font-bold uppercase tracking-[0.2em]">
              Ministry of Magic
            </span>
            <Award className="w-3.5 h-3.5 text-[#781d1d]" />
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-4xl text-[#16110b] tracking-widest uppercase leading-none">
            O.W.L. Report
          </h1>
          <p className="text-[10px] sm:text-[11px] font-cinzel text-[#5c3e21] mt-2 uppercase tracking-widest">
            Cartographic Diploma Conferred upon <span className="text-[#16110b] font-bold underline decoration-[#8b5a2b]/50">{gameState.playerName || 'The Chosen One'}</span>
          </p>
        </div>

        {/* Grade Banner */}
        <div 
          className="p-3.5 sm:p-5 border border-[#784b1e]/40 rounded-sm text-center mb-4 sm:mb-6 shadow-[inset_0_1px_5px_rgba(107,68,35,0.12)] relative z-10"
          style={{ background: '#fbf8f0' }}
        >
          <span className="text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-widest block text-[#6b4724] mb-1">
            Final Result
          </span>
          <span className="font-cinzel font-bold text-2xl sm:text-4xl text-[#781d1d] block tracking-wider uppercase mb-1.5 sm:mb-2">
            {gradeTitle}
          </span>
          <p className="text-[10px] sm:text-[11px] font-serif text-[#4a3319] max-w-md mx-auto leading-relaxed">
            {gradeDesc}
          </p>
        </div>

        {/* Score Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 relative z-10">
          <div 
            className="p-3 sm:p-4 text-center rounded-sm border border-[#784b1e]/30 shadow-[inset_0_1px_4px_rgba(107,68,35,0.1)]"
            style={{ background: '#fbf8f0' }}
          >
            <span className="text-[8px] sm:text-[9px] font-cinzel font-bold uppercase tracking-widest block text-[#6b4724] mb-1">
              Total Score
            </span>
            <span className="font-cinzel font-bold text-xl sm:text-2xl text-[#16110b]">
              {totalScore.toLocaleString()}
            </span>
            <span className="text-[8px] sm:text-[9px] font-cinzel font-semibold text-[#8b6540] tracking-widest block mt-0.5">
              of {maxScore.toLocaleString()}
            </span>
          </div>

          <div 
            className="p-3 sm:p-4 text-center rounded-sm border border-[#784b1e]/30 shadow-[inset_0_1px_4px_rgba(107,68,35,0.1)]"
            style={{ background: '#fbf8f0' }}
          >
            <span className="text-[8px] sm:text-[9px] font-cinzel font-bold uppercase tracking-widest block text-[#6b4724] mb-1">
              Accuracy
            </span>
            <span className="font-cinzel font-bold text-xl sm:text-2xl text-[#16110b]">
              {percentage}%
            </span>
            <span className="text-[8px] sm:text-[9px] font-cinzel font-semibold text-[#8b6540] tracking-widest block mt-0.5">
              Calibration
            </span>
          </div>
        </div>

        {/* Breakdown */}
        <div 
          className="mb-5 sm:mb-8 border border-[#784b1e]/40 p-3 sm:p-4 rounded-sm shadow-[inset_0_1px_4px_rgba(107,68,35,0.1)] relative z-10"
          style={{ background: '#fbf8f0' }}
        >
          <h3 className="text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-widest text-[#4a2e14] mb-2 sm:mb-3 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-[#781d1d]" />
            <span>Chamber Dispatches</span>
          </h3>

          <div className="space-y-2">
            {roundResults.map((r, i) => (
              <div 
                key={i}
                className="flex items-center justify-between py-2 border-b border-[#8b5a2b]/20 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-cinzel font-bold text-[#6b4724] w-4">
                    {r.roundNumber}.
                  </span>
                  <div>
                    <span className="font-cinzel font-bold text-[11px] text-[#16110b] uppercase tracking-wider block">{r.location.name}</span>
                    <span className="text-[9px] font-cinzel font-semibold text-[#6b4724] tracking-widest uppercase mt-0.5 block">
                      {r.regionMatched ? `${r.distanceMeters}m off` : 'Wrong Realm'} {r.floorDelta > 0 && `• ${r.floorDelta} fl`}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-cinzel font-bold text-sm text-[#16110b] block">+{r.score.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 bg-[#2b1810] hover:bg-[#3e2418] border border-[#5c3a1e] text-[#fbf8f0] font-cinzel font-bold text-xs tracking-widest uppercase transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98] shadow-md cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#e8dcc8]" />
            <span>Play Again</span>
          </button>

          <button
            onClick={onChangeHouse}
            className="py-3 px-8 bg-[#ebdcb9] hover:bg-[#dfcca4] text-[#16110b] hover:text-black border border-[#784b1e]/50 font-cinzel font-bold text-xs uppercase tracking-widest transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Home className="w-4 h-4 text-[#4a2e14]" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
