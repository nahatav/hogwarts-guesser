import { X, Sparkles, Timer, Layers, Award, BookOpen } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
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
        <div className="flex items-center justify-between border-b border-[#8b5a2b]/30 pb-3 mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#781d1d]" />
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#16110b] tracking-widest uppercase leading-none">
              Field Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#614124] hover:text-black transition-colors p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-2.5 sm:space-y-3 relative z-10">
          <div 
            className="flex items-start gap-3 p-2.5 sm:p-3 border border-[#784b1e]/30 rounded-sm shadow-[inset_0_1px_3px_rgba(107,68,35,0.1)]"
            style={{ background: '#fbf8f0' }}
          >
            <div className="mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#781d1d]" />
            </div>
            <div>
              <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#16110b] uppercase tracking-wider block mb-0.5">
                1. Cast Lumos to Illuminate
              </strong>
              <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed">
                The chamber is enveloped in darkness. Tap or drag your finger/mouse across the scene to cast Lumos and illuminate the architecture, artifacts, and clues.
              </p>
            </div>
          </div>

          <div 
            className="flex items-start gap-3 p-2.5 sm:p-3 border border-[#784b1e]/30 rounded-sm shadow-[inset_0_1px_3px_rgba(107,68,35,0.1)]"
            style={{ background: '#fbf8f0' }}
          >
            <div className="mt-0.5">
              <Layers className="w-3.5 h-3.5 text-[#781d1d]" />
            </div>
            <div>
              <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#16110b] uppercase tracking-wider block mb-0.5">
                2. Unfurl the Marauder’s Map
              </strong>
              <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed">
                Open the map in the corner to toggle between the Great Britain overworld realms and the detailed Hogwarts Castle cross-section floorplan.
              </p>
            </div>
          </div>

          <div 
            className="flex items-start gap-3 p-2.5 sm:p-3 border border-[#784b1e]/30 rounded-sm shadow-[inset_0_1px_3px_rgba(107,68,35,0.1)]"
            style={{ background: '#fbf8f0' }}
          >
            <div className="mt-0.5">
              <Timer className="w-3.5 h-3.5 text-[#781d1d]" />
            </div>
            <div>
              <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#16110b] uppercase tracking-wider block mb-0.5">
                3. 30-Second Ministerial Hourglass
              </strong>
              <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed">
                You have 30 seconds per chamber. Drop a pin on the map before time runs out. When the hourglass expires, your placed pin is automatically cast.
              </p>
            </div>
          </div>

          <div 
            className="flex items-start gap-3 p-2.5 sm:p-3 border border-[#784b1e]/30 rounded-sm shadow-[inset_0_1px_3px_rgba(107,68,35,0.1)]"
            style={{ background: '#fbf8f0' }}
          >
            <div className="mt-0.5">
              <Award className="w-3.5 h-3.5 text-[#781d1d]" />
            </div>
            <div>
              <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#16110b] uppercase tracking-wider block mb-0.5">
                4. Standardized Evaluation & Diploma
              </strong>
              <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed">
                Earn up to 5,000 marks per trial based on coordinate accuracy. Complete all five rounds to receive your official O.W.L. diploma.
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onClose}
          className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 bg-[#2b1810] hover:bg-[#3e2418] border border-[#5c3a1e] text-[#fbf8f0] font-cinzel font-bold text-xs tracking-widest uppercase transition-all duration-150 active:scale-[0.98] shadow-md relative z-10 cursor-pointer"
        >
          Return to Game
        </button>
      </div>
    </div>
  );
};
