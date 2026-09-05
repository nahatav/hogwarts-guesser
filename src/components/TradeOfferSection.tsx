import React, { useState, useRef } from 'react';
import { siteContent } from '../data/content';
import { Check, ShieldAlert } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface TradeOfferSectionProps {
  onAccept: () => void;
}

const HP_DECLINE_SPELLS = [
  "Decline",
  "Protego! (Spell Blocked) 🛡️",
  "Accio Nope! 🪄",
  "Mischief Denied! 😂",
  "Expelliarmus No! ⚡",
  "Not on Your 21st Birthday! 🎂",
  "Alohomora Won't Unlock This! 🗝️",
  "Avada Ke-Nah-Vra! 💀",
  "Unbreakable Vow In Effect! 📜"
];

export const TradeOfferSection: React.FC<TradeOfferSectionProps> = ({ onAccept }) => {
  const { tradeOffer } = siteContent;
  const [evasionCount, setEvasionCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [declineIndex, setDeclineIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDeclineEvade = () => {
    soundFX.playWhoosh();
    setEvasionCount(prev => prev + 1);
    setDeclineIndex(prev => (prev + 1) % HP_DECLINE_SPELLS.length);

    const maxDistanceX = 140;
    const maxDistanceY = 90;

    const randomX = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * maxDistanceX) + 50);
    const randomY = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * maxDistanceY) + 30);

    setButtonPosition({
      x: randomX,
      y: randomY
    });
  };

  const handleAcceptClick = () => {
    soundFX.playAcceptFanfare();
    onAccept();
  };

  return (
    <section id="trade-offer" className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="font-hpTitle text-2xl sm:text-4xl font-bold tracking-hp-wide uppercase text-black mb-1">
            {tradeOffer.title}
          </h2>
          <p className="font-hpEngraved italic text-xs sm:text-sm text-gray-600">
            {tradeOffer.subtitle}
          </p>
        </div>

        {/* Covenant Parchment Card */}
        <div
          ref={containerRef}
          className="border-2 border-black bg-white p-6 sm:p-10 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* What I Offer */}
            <div className="border border-black p-5 bg-gray-50/50">
              <h3 className="font-hpChapter font-bold text-sm uppercase tracking-wider text-black border-b border-black pb-2 mb-3">
                {tradeOffer.giverTitle}
              </h3>
              <ul className="space-y-3 font-hpBody text-base text-black">
                {tradeOffer.giverItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-bold text-black text-xs mt-1">✦</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You Give */}
            <div className="border border-black p-5 bg-gray-50/50">
              <h3 className="font-hpChapter font-bold text-sm uppercase tracking-wider text-black border-b border-black pb-2 mb-3">
                {tradeOffer.receiverTitle}
              </h3>
              <ul className="space-y-3 font-hpBody text-base text-black">
                {tradeOffer.receiverItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-bold text-black text-xs mt-1">★</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warning Note */}
          <div className="text-center mb-8 font-hpEngraved italic text-xs sm:text-sm text-gray-700 border-t border-b border-black py-2">
            <span>{tradeOffer.warningNote}</span>
            {evasionCount > 0 && (
              <div className="font-hpChapter not-italic text-black font-bold text-xs mt-1">
                ⚡ Spells Dodged: {evasionCount} {evasionCount >= 4 ? "(You cannot escape the vow! 😉)" : ""}
              </div>
            )}
          </div>

          {/* Interactive Button Arena */}
          <div className="relative min-h-[120px] flex items-center justify-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 relative">
              {/* Accept Button */}
              <button
                onClick={handleAcceptClick}
                className="px-8 py-3.5 bg-black hover:bg-gray-800 text-white font-hpChapter font-bold text-sm tracking-wider uppercase border border-black transition-all hover:scale-105 active:scale-95 flex items-center gap-2 z-10 shadow"
              >
                <Check className="w-4 h-4 text-white" />
                <span>Accept Vow & Grant Forgiveness 💖</span>
              </button>

              {/* Runaway Decline Button */}
              <div
                style={{
                  transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                  transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="z-20"
              >
                <button
                  type="button"
                  onMouseEnter={handleDeclineEvade}
                  onTouchStart={handleDeclineEvade}
                  onClick={handleDeclineEvade}
                  className="px-6 py-3.5 bg-white hover:bg-gray-100 text-black font-hpChapter text-xs sm:text-sm border border-black shadow flex items-center gap-2 cursor-not-allowed select-none whitespace-nowrap transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-black" />
                  <span>{HP_DECLINE_SPELLS[declineIndex]}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
