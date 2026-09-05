import React from 'react';
import { X, Compass, Layers, Award, BookOpen, MapPin } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0d0b08] border border-[#c9a84c]/40 p-4 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.95)] max-h-[88dvh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#c9a84c]/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#c9a84c]" />
            <h2 className="font-cinzel text-lg sm:text-xl text-[#e8dcc8] tracking-widest uppercase leading-none">
              Field Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#a09278] hover:text-[#e8dcc8] transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 border border-[#c9a84c]/10 bg-[#14100c]">
            <div className="mt-0.5">
              <Compass className="w-3.5 h-3.5 text-[#c9a84c]" />
            </div>
            <div>
              <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#e8dcc8] uppercase tracking-wider block mb-0.5">
                1. Explore in 360°
              </strong>
              <p className="text-[10px] sm:text-[11px] text-[#a09278] font-serif leading-relaxed">
                Click and drag (or swipe) to pan across the scene. Use your scroll wheel to look up and down, or pinch to zoom.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 border border-[#c9a84c]/10 bg-[#14100c]">
            <div className="mt-0.5">
              <Layers className="w-3.5 h-3.5 text-[#c9a84c]" />
            </div>
            <div>
              <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#e8dcc8] uppercase tracking-wider block mb-0.5">
                2. Unfurl the Map
              </strong>
              <p className="text-[10px] sm:text-[11px] text-[#a09278] font-serif leading-relaxed">
                Open the map in the bottom corner. Toggle between the Great Britain overworld map and the Hogwarts Castle floorplan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 border border-[#c9a84c]/10 bg-[#14100c]">
            <div className="mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#c9a84c]" />
            </div>
            <div>
              <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#e8dcc8] uppercase tracking-wider block mb-0.5">
                3. Drop Your Pin
              </strong>
              <p className="text-[10px] sm:text-[11px] text-[#a09278] font-serif leading-relaxed">
                Tap anywhere on the parchment map to drop your golden pin, then click "Cast Guess".
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 border border-[#c9a84c]/10 bg-[#14100c]">
            <div className="mt-0.5">
              <Award className="w-3.5 h-3.5 text-[#c9a84c]" />
            </div>
            <div>
              <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#e8dcc8] uppercase tracking-wider block mb-0.5">
                4. Scoring
              </strong>
              <p className="text-[10px] sm:text-[11px] text-[#a09278] font-serif leading-relaxed">
                Earn up to 5,000 points per round. Closer guesses earn higher grades. Complete all rounds to earn your O.W.L. diploma.
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onClose}
          className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 bg-[#0c0a08] hover:bg-[#181410] border border-[#c9a84c]/50 hover:border-[#c9a84c] text-[#e8dcc8] font-cinzel font-semibold text-xs tracking-widest uppercase transition-all duration-150 active:scale-[0.98]"
        >
          Return to Game
        </button>
      </div>
    </div>
  );
};
