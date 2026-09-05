import React, { useState } from 'react';
import { GoldenSnitch3D } from './GoldenSnitch3D';
import { sound } from '../utils/audio';

interface HogwartsHomePageProps {
  playerName: string;
  onSetPlayerName: (name: string) => void;
  onStartGame: () => void;
  onOpenRules: () => void;
}

export const HogwartsHomePage: React.FC<HogwartsHomePageProps> = ({
  onStartGame,
}) => {
  const [introPhase, setIntroPhase] = useState<'video' | 'snitch' | 'done'>('video');

  const handlePlayClick = () => {
    sound.playWandWhoosh();
    onStartGame();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#03070a]">
      
      {/* PHASE 1: Video */}
      {introPhase === 'video' && (
        <video
          autoPlay
          muted
          playsInline
          onEnded={() => setIntroPhase('snitch')}
          className="absolute inset-0 w-full h-full object-cover z-50 transform scale-125"
        >
          <source src={`${import.meta.env.BASE_URL}videos/broom_fly.mp4`} type="video/mp4" />
        </video>
      )}

      {/* PHASE 2 & 3: White screen */}
      {(introPhase === 'snitch' || introPhase === 'done') && (
        <div className="absolute inset-0 z-0 bg-white" />
      )}

      {/* Flying Snitch (Handles Phase 2 -> Phase 3 transition) */}
      {introPhase === 'snitch' && (
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <GoldenSnitch3D
            isIntro={true}
            onIntroComplete={() => setIntroPhase('done')}
          />
        </div>
      )}

      {/* PHASE 3: Done (Circle Play Button) */}
      {introPhase === 'done' && (
        <div className="absolute inset-0 z-20 animate-in fade-in zoom-in duration-500 flex items-center justify-center">
          <button
            onClick={handlePlayClick}
            className="w-24 h-24 rounded-full bg-[#c9a84c] hover:bg-[#d4af37] border-4 border-white text-white font-cinzel font-bold text-xl tracking-[0.1em] shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
          >
            PLAY
          </button>
        </div>
      )}
    </div>
  );
};
