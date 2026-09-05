import React from 'react';
import { X, Compass, Layers, Award, BookOpen, MapPin } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0d0b08] border border-[#c9a84c]/40 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#c9a84c]/20 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#c9a84c]" />
            <h2 className="font-cinzel text-xl text-[#e8dcc8] tracking-widest uppercase leading-none">
              Field Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#a09278] hover:text-[#e8dcc8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 border border-[#c9a84c]/10 bg-[#14100c]">
            <div className="mt-1">
              <Compass className="w-4 h-4 text-[#c9a84c]" />
            </div>
            <div>
              <strong className="font-cinzel text-xs font-bold text-[#e8dcc8] uppercase tracking-widest block mb-1">
                1. Explore in 360°
              </strong>
              <p className="text-[11px] text-[#a09278] font-serif leading-relaxed">
                Click and drag your mouse to pan across the scene. Use your scroll wheel or the zoom controls to inspect details.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-[#c9a84c]/10 bg-[#14100c]">
            <div className="mt-1">
              <Layers className="w-4 h-4 text-[#c9a84c]" />
            </div>
            <div>
              <strong className="font-cinzel text-xs font-bold text-[#e8dcc8] uppercase tracking-widest block mb-1">
                2. Unfurl the Map
              </strong>
              <p className="text-[11px] text-[#a09278] font-serif leading-relaxed">
                Open the map in the bottom right. Toggle between the Great Britain overworld map and the Hogwarts Castle cross-section.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-[#c9a84c]/10 bg-[#14100c]">
            <div className="mt-1">
              <MapPin className="w-4 h-4 text-[#c9a84c]" />
            </div>
            <div>
              <strong className="font-cinzel text-xs font-bold text-[#e8dcc8] uppercase tracking-widest block mb-1">
                3. Drop Your Pin
              </strong>
              <p className="text-[11px] text-[#a09278] font-serif leading-relaxed">
                Click anywhere on the parchment map to drop your golden pin, then click "Cast Guess".
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-[#c9a84c]/10 bg-[#14100c]">
            <div className="mt-1">
              <Award className="w-4 h-4 text-[#c9a84c]" />
            </div>
            <div>
              <strong className="font-cinzel text-xs font-bold text-[#e8dcc8] uppercase tracking-widest block mb-1">
                4. Scoring
              </strong>
              <p className="text-[11px] text-[#a09278] font-serif leading-relaxed">
                Earn up to 5,000 points per round. Pins within 10 meters receive a perfect score. Complete all rounds to earn your diploma.
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-[#0c0a08] hover:bg-[#181410] border border-[#c9a84c]/50 hover:border-[#c9a84c] text-[#e8dcc8] font-cinzel font-semibold text-xs tracking-widest uppercase transition-all duration-150 active:scale-[0.98]"
        >
          Return to Game
        </button>
      </div>
    </div>
  );
};
