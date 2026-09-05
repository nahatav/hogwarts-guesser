import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-black bg-white text-center text-xs font-hpChapter uppercase tracking-hp-wide text-black">
      <div className="max-w-4xl mx-auto px-4 space-y-2">
        <div>“I solemnly swear that I am up to no good.”</div>
        <p className="font-hpEngraved italic lowercase text-sm text-gray-700">
          written with love, sincere remorse, and infinite devotion for your 21st birthday.
        </p>
        <div className="pt-2 text-[10px] text-gray-500 tracking-widest">
          ✦ CHAPTER XXI • MISCHIEF MANAGED ✦
        </div>
      </div>
    </footer>
  );
};
