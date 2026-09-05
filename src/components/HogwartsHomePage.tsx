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
            className="group relative w-32 h-32 rounded-full bg-[#0c0a08] border-2 border-[#c9a84c] text-[#d4af37] flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.3)] transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span 
              className="font-harry text-5xl tracking-widest leading-none drop-shadow-[0_2px_10px_rgba(201,168,76,0.6)]"
              style={{ paddingTop: '12px', paddingLeft: '8px' }}
            >
              Play
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
