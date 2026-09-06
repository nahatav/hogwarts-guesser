import React, { useState, useEffect, useRef } from 'react';
import { GoldenSnitch3D } from './GoldenSnitch3D';
import { sound } from '../utils/audio';
import { Award, ArrowRight } from 'lucide-react';

interface HogwartsHomePageProps {
  playerName: string;
  onSetPlayerName: (name: string) => void;
  onStartGame: () => void;
  onOpenRules: () => void;
}

export const HogwartsHomePage: React.FC<HogwartsHomePageProps> = ({
  playerName,
  onSetPlayerName,
  onStartGame,
}) => {
  const [introPhase, setIntroPhase] = useState<'video' | 'paper' | 'snitch'>('video');
  const [candidateName, setCandidateName] = useState<string>(playerName || 'The Chosen One');
  const [zoomScale, setZoomScale] = useState<number>(1.05);
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

  // Ensure 1.25x playback rate when video mounts & plays
  const applyPlaybackSpeed = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.25;
    }
  };

  const handleVideoPlaying = () => {
    sound.playThemeMusic();
    applyPlaybackSpeed();
  };

  // Gradually zoom in as video plays: end scale is 20% more zoomed in than the start (1.05 * 1.20 = 1.26)
  const handleTimeUpdate = () => {
    if (!sound.isThemePlaying()) {
      sound.playThemeMusic();
    }
    if (videoRef.current) {
      if (videoRef.current.playbackRate !== 1.25) {
        videoRef.current.playbackRate = 1.25;
      }
      const duration = videoRef.current.duration || 1;
      const progress = Math.min(Math.max(videoRef.current.currentTime / duration, 0), 1);
      // Gradually zoom in: starts at 1.05, ends at 1.05 * 1.20 = 1.26 (+20%)
      setZoomScale(1.05 * (1 + progress * 0.20));
    }
  };

  const handlePlayClick = () => {
    const finalName = candidateName.trim() || 'The Chosen One';
    onSetPlayerName(finalName);
    sound.playWandWhoosh();
    setIntroPhase('snitch');
  };

  return (
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden select-none bg-black">
      
      {/* PHASE 1: Video (1.25x speed with gradual 20% zoom-in) */}
      {introPhase === 'video' && (
        <div 
          className="absolute inset-0 w-full h-full cursor-pointer z-50 overflow-hidden bg-black"
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
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIntroPhase('paper')}
            className="w-full h-full object-cover pointer-events-auto"
            style={{
              transform: `scale(${zoomScale})`,
              transition: 'transform 0.25s linear',
            }}
          >
            <source src={`${import.meta.env.BASE_URL}videos/broom_fly.mp4`} type="video/mp4" />
          </video>

          {/* Skip button in top right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playWandWhoosh();
              setIntroPhase('paper');
            }}
            className="absolute top-4 right-4 z-50 px-3.5 py-1.5 bg-[#1a120b]/85 hover:bg-[#2b1810] border border-[#c9a84c]/60 text-[#f5eedc] font-cinzel text-[10px] font-bold tracking-widest uppercase rounded-sm cursor-pointer shadow-lg transition-colors"
          >
            Skip Intro ➔
          </button>
        </div>
      )}

      {/* PHASE 2: Rustic White Paper with Game Rules, Name Entry & Play Button */}
      {introPhase === 'paper' && (
        <div 
          className="absolute inset-0 z-40 flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-300"
          style={{
            background: 'radial-gradient(circle at center, #1e1610 0%, #0c0806 100%)',
          }}
        >
          <div 
            className="w-full max-w-lg p-5 sm:p-7 max-h-[92dvh] overflow-y-auto rounded-sm border-2 border-[#5c3a1e] relative shadow-2xl text-[#16110b]"
            style={{
              background: 'linear-gradient(145deg, #fdfbf7 0%, #f6efe2 45%, #ece1cd 100%)',
              boxShadow: 'inset 0 0 35px rgba(120, 75, 30, 0.2), 0 20px 60px rgba(0, 0, 0, 0.95)',
            }}
          >
            {/* Decorative inner parchment border */}
            <div className="absolute inset-1.5 border border-[#8b5a2b]/25 pointer-events-none rounded-xs" />

            {/* Header */}
            <div className="text-center pb-2 mb-2 relative z-10">
              <div className="inline-flex items-center justify-center gap-1.5 mb-1 text-[#781d1d]">
                <Award className="w-3.5 h-3.5" />
                <span className="font-cinzel text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase">
                  Hogwarts School of Witchcraft & Wizardry
                </span>
                <Award className="w-3.5 h-3.5" />
              </div>
              <h1 className="font-cinzel font-bold text-xl sm:text-2xl text-[#16110b] tracking-[0.12em] uppercase leading-tight">
                Cartography O.W.L. Rules
              </h1>
              <p className="text-[9px] sm:text-[10px] font-cinzel text-[#614124] uppercase tracking-widest mt-1">
                Official Ministry of Magic Examination Guide
              </p>
              <div className="w-24 h-[1px] bg-[#8b5a2b]/35 mx-auto mt-2" />
            </div>

            {/* Rules of the Game */}
            <div className="space-y-2.5 my-3 relative z-10">
              <div 
                className="p-2.5 border border-[#784b1e]/30 rounded-xs shadow-[inset_0_1px_3px_rgba(107,68,35,0.08)]"
                style={{ background: '#fbf8f0' }}
              >
                <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#16110b] uppercase block">
                  I. 360° Photosphere Exploration
                </strong>
                <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed mt-0.5">
                  Pan and zoom through 360° panoramas across Hogwarts Castle, Diagon Alley, and wizarding realms to search for architectural clues.
                </p>
              </div>

              <div 
                className="p-2.5 border border-[#784b1e]/30 rounded-xs shadow-[inset_0_1px_3px_rgba(107,68,35,0.08)]"
                style={{ background: '#fbf8f0' }}
              >
                <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#16110b] uppercase block">
                  II. The Marauder’s Map
                </strong>
                <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed mt-0.5">
                  Unfurl the parchment map in the corner. Switch between the Great Britain realm map and Hogwarts interior castle floorplans.
                </p>
              </div>

              <div 
                className="p-2.5 border border-[#784b1e]/30 rounded-xs shadow-[inset_0_1px_3px_rgba(107,68,35,0.08)]"
                style={{ background: '#fbf8f0' }}
              >
                <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#16110b] uppercase block">
                  III. Cast Your Guess
                </strong>
                <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed mt-0.5">
                  Drop your golden pin on the chamber or territory where you believe you stand, then tap "Cast Guess" to seal your answer.
                </p>
              </div>

              <div 
                className="p-2.5 border border-[#784b1e]/30 rounded-xs shadow-[inset_0_1px_3px_rgba(107,68,35,0.08)]"
                style={{ background: '#fbf8f0' }}
              >
                <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#16110b] uppercase block">
                  IV. Examination Diploma
                </strong>
                <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed mt-0.5">
                  Earn up to 5,000 points per chamber across 5 rounds. Achieve high marks for an Outstanding (O) or Exceeds Expectations (E) diploma.
                </p>
              </div>

              <div 
                className="p-2.5 border-2 border-[#781d1d]/40 rounded-xs shadow-[inset_0_1px_3px_rgba(120,29,29,0.08)]"
                style={{ background: '#fdf5f0' }}
              >
                <strong className="font-cinzel text-[11px] sm:text-xs font-bold text-[#781d1d] uppercase block">
                  V. The Seeker's Rite
                </strong>
                <p className="text-[10px] sm:text-[11px] text-[#541212] font-serif font-semibold leading-relaxed mt-0.5">
                  You have to catch the Golden Snitch to commence your game!
                </p>
              </div>
            </div>

            {/* Candidate Name Input */}
            <div className="my-3 pt-2.5 border-t border-[#8b5a2b]/30 relative z-10">
              <label className="block text-[9px] font-cinzel font-bold text-[#614124] uppercase tracking-widest mb-1">
                Candidate Name
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="The Chosen One"
                maxLength={26}
                className="w-full px-3 py-2 bg-[#fbf8f0] border border-[#784b1e]/50 rounded-sm font-cinzel text-xs font-bold text-[#16110b] placeholder:text-[#8b6b4a] focus:outline-none focus:border-[#781d1d] shadow-[inset_0_1px_3px_rgba(107,68,35,0.12)]"
              />
            </div>

            {/* Play Button */}
            <button
              onClick={handlePlayClick}
              className="w-full py-3 bg-[#2b1810] hover:bg-[#3e2418] border-2 border-[#5c3a1e] text-[#fbf8f0] font-cinzel font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-150 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] cursor-pointer mt-3 relative z-10"
            >
              <span>Play & Release Snitch</span>
              <ArrowRight className="w-4 h-4 text-[#e8dcc8]" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3: White Screen with Flying Golden Snitch (Catch to Start) */}
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
