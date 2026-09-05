import React from 'react';
import { X, Compass, Layers, Award, BookOpen, MapPin } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#1c1815] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-7 text-[#f4ecd8] font-serif shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#8c734b]/40 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-lg font-bold text-amber-300 uppercase tracking-wider">
              Spellbook & Guide: How to Play
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#a89980] hover:text-[#f4ecd8] hover:bg-[#2b2219] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-4 text-xs sm:text-sm text-[#e6d5b8] leading-relaxed">
          {/* Step 1 */}
          <div className="flex items-start gap-3 bg-[#141210] p-3 rounded-xl border border-[#8c734b]/30">
            <div className="p-2 rounded-lg bg-[#241c14] text-[#d4af37]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-amber-300 block mb-0.5 font-bold">1. Explore in 360° Photosphere</strong>
              <p className="text-[12px] text-[#c4b59d]">
                Click and drag your mouse or touch screen to look in all directions. Use the scroll wheel to zoom in on potion bottles, house banners, or architecture.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 bg-[#141210] p-3 rounded-xl border border-[#8c734b]/30">
            <div className="p-2 rounded-lg bg-[#241c14] text-[#d4af37]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-amber-300 block mb-0.5 font-bold">2. Navigate the Marauder's Map</strong>
              <p className="text-[12px] text-[#c4b59d]">
                Open the map in the bottom right corner. Switch between regions (Hogwarts Castle, Grounds, Diagon Alley, Hogsmeade, Ministry). If inside the castle, use the <strong>Floor Ladder</strong> to pick the right level (Dungeon to Towers).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 bg-[#141210] p-3 rounded-xl border border-[#8c734b]/30">
            <div className="p-2 rounded-lg bg-[#241c14] text-[#d4af37]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-amber-300 block mb-0.5 font-bold">3. Drop Your Snitch Pin</strong>
              <p className="text-[12px] text-[#c4b59d]">
                Click anywhere on the parchment to drop your guess pin, then click <strong>"Cast Guess"</strong>.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3 bg-[#141210] p-3 rounded-xl border border-[#8c734b]/30">
            <div className="p-2 rounded-lg bg-[#241c14] text-[#d4af37]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-amber-300 block mb-0.5 font-bold">4. Scoring & O.W.L. Grades</strong>
              <p className="text-[12px] text-[#c4b59d]">
                Max score is <strong>5,000 points</strong> per round (25,000 total). Guesses within 10 meters receive a perfect 5,000! Wrong floors or regions incur distance penalties.
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-[#2b2219] border border-[#d4af37] text-amber-300 font-bold uppercase tracking-wider text-xs hover:bg-[#3d2e20] transition"
        >
          "Mischief Managed" (Return to Game)
        </button>
      </div>
    </div>
  );
};
