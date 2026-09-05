import React from 'react';
import { X, Compass, Layers, Award, BookOpen, MapPin } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-xl bg-[#ded6c4] border-[3px] border-[#181818] p-5 sm:p-7 text-[#141414] font-serif shadow-[0_25px_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto relative">
        {/* Corner filigrees */}
        <span className="absolute top-1 left-2 text-sm text-[#181818]/70 select-none">❦</span>
        <span className="absolute top-1 right-2 text-sm text-[#181818]/70 select-none">❦</span>
        <span className="absolute bottom-1 left-2 text-sm text-[#181818]/70 select-none">❦</span>
        <span className="absolute bottom-1 right-2 text-sm text-[#181818]/70 select-none">❦</span>

        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#181818] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#b37d22]" />
            <h2 className="font-headline text-3xl text-[#121212] tracking-wide uppercase leading-none">
              Field Guide & Rules of Play
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#181818] hover:bg-[#181818] hover:text-[#ded6c4] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-3 text-xs sm:text-sm text-[#222]">
          {/* Step 1 */}
          <div className="flex items-start gap-3 bg-[#e5ddd0] p-3 rounded-lg border border-[#181818]/30">
            <div className="p-2 rounded bg-[#181818] text-[#ded6c4]">
              <Compass className="w-4 h-4 text-[#ffd700]" />
            </div>
            <div>
              <strong className="font-cinzel text-xs font-bold text-[#181818] uppercase tracking-wider block mb-0.5">
                1. Explore in 360° Photosphere
              </strong>
              <p className="text-[12px] text-[#444] font-newspaper leading-relaxed">
                Click and drag your mouse to pan across the scene. Use your scroll wheel to zoom into stained glass, tapestries, and potion tables.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 bg-[#e5ddd0] p-3 rounded-lg border border-[#181818]/30">
            <div className="p-2 rounded bg-[#181818] text-[#ded6c4]">
              <Layers className="w-4 h-4 text-[#ffd700]" />
            </div>
            <div>
              <strong className="font-cinzel text-xs font-bold text-[#181818] uppercase tracking-wider block mb-0.5">
                2. Unfurl the 2-Tier Marauder's Map
              </strong>
              <p className="text-[12px] text-[#444] font-newspaper leading-relaxed">
                Open the map in the bottom right corner. Toggle between the Wizarding World of Great Britain & Ireland and the Hogwarts Castle cross-section map.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 bg-[#e5ddd0] p-3 rounded-lg border border-[#181818]/30">
            <div className="p-2 rounded bg-[#181818] text-[#ded6c4]">
              <MapPin className="w-4 h-4 text-[#ffd700]" />
            </div>
            <div>
              <strong className="font-cinzel text-xs font-bold text-[#181818] uppercase tracking-wider block mb-0.5">
                3. Drop Your Pin & Cast Guess
              </strong>
              <p className="text-[12px] text-[#444] font-newspaper leading-relaxed">
                Click anywhere on the parchment map to drop your golden pin, then click <strong>"Cast Guess"</strong>.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3 bg-[#e5ddd0] p-3 rounded-lg border border-[#181818]/30">
            <div className="p-2 rounded bg-[#181818] text-[#ded6c4]">
              <Award className="w-4 h-4 text-[#ffd700]" />
            </div>
            <div>
              <strong className="font-cinzel text-xs font-bold text-[#181818] uppercase tracking-wider block mb-0.5">
                4. Scoring & O.W.L. Diplomas
              </strong>
              <p className="text-[12px] text-[#444] font-newspaper leading-relaxed">
                Earn up to <strong>5,000 points</strong> per round. Pins within 10 meters receive a perfect 5,000 score. Complete all rounds to earn your O.W.L. diploma!
              </p>
            </div>
          </div>
        </div>

        {/* Solid Black Close Button matching RETURN TO HOGWARTS */}
        <button
          onClick={onClose}
          className="mt-5 w-full py-3 px-4 bg-[#121212] hover:bg-[#222] text-[#f7f2e7] font-headline text-lg tracking-widest uppercase transition-all duration-200 border-2 border-[#181818] shadow-md active:scale-[0.98]"
        >
          "Mischief Managed" — Return to Game
        </button>
      </div>
    </div>
  );
};
