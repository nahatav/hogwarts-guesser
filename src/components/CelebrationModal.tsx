import React, { useEffect } from 'react';
import { siteContent } from '../data/content';
import confetti from 'canvas-confetti';
import { X, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ isOpen, onClose }) => {
  const { tradeOffer } = siteContent;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#000000', '#333333', '#666666', '#999999', '#ffffff', '#d4af37']
    });
  };

  useEffect(() => {
    if (isOpen) {
      triggerConfetti();
      const interval = setInterval(() => {
        triggerConfetti();
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs book-fade-in">
      <div className="relative w-full max-w-lg bg-white border-2 border-black p-6 sm:p-10 text-center shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-black hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Crest */}
        <div className="w-16 h-16 mx-auto border-2 border-black flex items-center justify-center text-black text-2xl font-hpChapter font-bold mb-4">
          ⚡21
        </div>

        <h2 className="font-hpTitle text-xl sm:text-3xl font-bold tracking-hp-wide uppercase text-black mb-3">
          {tradeOffer.celebrationTitle}
        </h2>

        <p className="font-hpBody text-black text-lg sm:text-xl leading-relaxed mb-6">
          {tradeOffer.celebrationText}
        </p>

        <div className="border border-dashed border-black p-4 mb-6">
          <p className="font-hpEngraved italic text-lg sm:text-xl text-black">
            {tradeOffer.celebrationPostscript}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              triggerConfetti();
              soundFX.playSparkle();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-hpChapter text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cast More Confetti! ✨</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-gray-100 text-black font-hpChapter text-xs uppercase tracking-wider border border-black transition-all"
          >
            Mischief Managed
          </button>
        </div>
      </div>
    </div>
  );
};
