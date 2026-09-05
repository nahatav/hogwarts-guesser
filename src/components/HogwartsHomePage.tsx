import React, { useState } from 'react';
import { GoldenSnitch3D } from './GoldenSnitch3D';

interface HogwartsHomePageProps {
  playerName: string;
  onSetPlayerName: (name: string) => void;
  onStartGame: () => void;
  onOpenRules: () => void;
}

export const HogwartsHomePage: React.FC<HogwartsHomePageProps> = ({
  onStartGame,
}) => {
  const [introPhase, setIntroPhase] = useState<'video' | 'snitch'>('video');

  return (
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden select-none bg-white">
      
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

      {/* PHASE 2: Blank White Screen with Flying Snitch (Hit it to start) */}
      {introPhase === 'snitch' && (
        <div className="absolute inset-0 z-10 pointer-events-auto bg-white cursor-pointer">
          <GoldenSnitch3D
            isIntro={true}
            onIntroComplete={onStartGame}
          />
        </div>
      )}
    </div>
  );
};
