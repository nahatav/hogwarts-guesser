import React, { useState, useEffect, useRef } from 'react';
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
  const [introPhase, setIntroPhase] = useState<'video' | 'snitch'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Immediately start music as video/page mounts
  useEffect(() => {
    sound.playThemeMusic();

    const triggerMusic = () => {
      sound.playThemeMusic();
    };

    window.addEventListener('pointerdown', triggerMusic, { passive: true });
    window.addEventListener('touchstart', triggerMusic, { passive: true });
    window.addEventListener('click', triggerMusic, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', triggerMusic);
      window.removeEventListener('touchstart', triggerMusic);
      window.removeEventListener('click', triggerMusic);
    };
  }, []);

  const handleVideoPlaying = () => {
    sound.playThemeMusic();
  };

  return (
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden select-none bg-white">
      
      {/* PHASE 1: Video */}
      {introPhase === 'video' && (
        <div 
          className="absolute inset-0 w-full h-full cursor-pointer z-50"
          onPointerDown={handleVideoPlaying}
          onTouchStart={handleVideoPlaying}
          onClick={handleVideoPlaying}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onPlay={handleVideoPlaying}
            onPlaying={handleVideoPlaying}
            onLoadedData={handleVideoPlaying}
            onTimeUpdate={() => {
              if (!sound.isThemePlaying()) {
                sound.playThemeMusic();
              }
            }}
            onEnded={() => setIntroPhase('snitch')}
            className="w-full h-full object-cover transform scale-125 pointer-events-auto"
          >
            <source src={`${import.meta.env.BASE_URL}videos/broom_fly.mp4`} type="video/mp4" />
          </video>
        </div>
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
