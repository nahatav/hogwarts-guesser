import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface HogwartsLoadingScreenProps {
  onComplete: () => void;
  durationMs?: number;
  destinationLabel?: string;
}

const LORE_PHRASES = [
  "Summoning the Hogwarts Express from Platform 9 ¾...",
  "Crossing the mist-shrouded Black Lake beneath the crags...",
  "Whispering secrets to the Fat Lady's portrait...",
  "Lighting the floating candles across the Great Hall...",
  "Unfurling enchanted Marauder's Map footprints...",
  "Calibrating Omniculars for 360° wizarding navigation...",
  "I solemnly swear that I am up to no good...",
  "Welcome to Hogwarts Castle."
];

export const HogwartsLoadingScreen: React.FC<HogwartsLoadingScreenProps> = ({
  onComplete,
  durationMs = 4500,
  destinationLabel = "Entering Hogwarts Castle",
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [musicStarted, setMusicStarted] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background Audio: Hedwig's Theme
  useEffect(() => {
    const audio = new Audio('/audio/hedwigs-theme.mp3');
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().then(() => {
        setMusicStarted(true);
      }).catch(() => {
        // Autoplay policy prevented immediate playback until user clicks
        setMusicStarted(false);
      });
    };

    tryPlay();

    const handleUserGesture = () => {
      if (audio.paused) {
        audio.play().then(() => setMusicStarted(true)).catch(() => {});
      }
    };

    window.addEventListener('click', handleUserGesture, { once: true });
    window.addEventListener('keydown', handleUserGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
      audio.pause();
    };
  }, []);

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && audioRef.current.paused) {
      audioRef.current.play().then(() => setMusicStarted(true)).catch(() => {});
    }
  };

  // Progress Bar 0 to 100% Simulation
  useEffect(() => {
    const intervalTime = 40;
    const totalSteps = durationMs / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentPct = Math.min(Math.round((step / totalSteps) * 100), 100);
      setProgress(currentPct);

      // Cycle phrases according to progress
      const phraseStep = Math.min(
        Math.floor((currentPct / 100) * (LORE_PHRASES.length - 1)),
        LORE_PHRASES.length - 1
      );
      setPhraseIndex(phraseStep);

      if (currentPct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [durationMs, onComplete]);

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[100] overflow-hidden select-none flex flex-col justify-between transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Full-screen Hogwarts Castle Painting Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/images/hogwarts-loading.jpg"
          alt="Hogwarts Castle High Above The Mist"
          className="w-full h-full object-cover scale-105 animate-pulse"
          style={{
            animationDuration: '8s',
            filter: 'contrast(1.04) brightness(0.95)',
          }}
        />

        {/* Cinematic Mist / Vignette Gradients */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(6,9,14,0.45) 75%, rgba(4,6,9,0.92) 100%)',
          }}
        />
        <div 
          className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(4,6,9,0.95) 0%, rgba(4,6,9,0.7) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Top Header Bar: Title and Music Control */}
      <header className="relative z-10 w-full px-6 sm:px-10 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#ffd700]/60 bg-[#0b0f14]/80 flex items-center justify-center text-sm shadow-[0_0_12px_rgba(255,215,0,0.3)]">
            🏰
          </div>
          <div>
            <h2 className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] text-[#e8dfcf] uppercase">
              Hogwarts Castle Archive
            </h2>
            <p className="text-[9px] tracking-[0.3em] text-[#9ba8a0] font-sans font-semibold uppercase">
              The Marauder's Guessr • 1993
            </p>
          </div>
        </div>

        {/* Music Indicator / Toggle Pill */}
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ffd700]/40 bg-[#0a0e12]/85 text-[#fef08a] hover:border-[#ffd700] hover:bg-[#121920] transition text-xs font-cinzel tracking-wider shadow-lg backdrop-blur-md active:scale-95"
          title={isMuted ? "Unmute Hedwig's Theme" : "Mute Music"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-red-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
          )}
          <span className="hidden sm:inline text-[11px] font-bold">
            {isMuted ? 'MUSIC MUTED' : (musicStarted ? "HEDWIG'S THEME" : 'CLICK FOR MUSIC')}
          </span>
        </button>
      </header>

      {/* Bottom Area: Wizarding Themed Progress Bar 0 to 100% */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pb-10 sm:pb-14 flex flex-col items-center text-center">
        {/* Destination / Main Loading Headline */}
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#ffd700] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#fef08a] uppercase font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {destinationLabel}
          </span>
          <Sparkles className="w-4 h-4 text-[#ffd700] animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Lore Flavor Text */}
        <p className="font-newspaper italic text-xs sm:text-sm text-[#e6ede8] mb-4 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">
          "{LORE_PHRASES[phraseIndex]}"
        </p>

        {/* The 0-100 Progress Bar Container */}
        <div className="w-full relative">
          {/* Progress Percentage Badge */}
          <div className="flex items-center justify-between mb-1.5 px-1 font-cinzel text-xs font-bold text-[#fef9c3]">
            <span className="tracking-[0.2em] text-[#ffd700]/90 text-[10px] uppercase">
              Magical Attunement
            </span>
            <span className="text-sm sm:text-base tracking-widest text-[#ffd700] font-black drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
              {progress}%
            </span>
          </div>

          {/* Ornate Gold Bordered Progress Bar Track */}
          <div 
            className="w-full h-4 sm:h-5 rounded-full p-0.5 border-2 border-[#ffd700]/70 bg-[#090d12]/90 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.9),inset_0_0_15px_rgba(0,0,0,0.85)] relative overflow-hidden"
            style={{
              boxShadow: '0 0 30px rgba(0,0,0,0.9), 0 0 15px rgba(255,215,0,0.2), inset 0 2px 8px rgba(0,0,0,0.9)',
            }}
          >
            {/* Animated Golden Glowing Fill Bar */}
            <div
              className="h-full rounded-full transition-all duration-150 ease-out relative overflow-hidden"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #946014 0%, #d4a024 35%, #ffd700 70%, #fff6b8 100%)',
                boxShadow: '0 0 16px rgba(255,215,0,0.7)',
              }}
            >
              {/* Shimmer line effect across progress */}
              <div 
                className="absolute inset-0 w-full h-full opacity-60"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shine 2s linear infinite',
                }}
              />
            </div>

            {/* Glowing Spark Tip */}
            {progress > 2 && progress < 99 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-xs"
                style={{ left: `${progress}%` }}
              >
                <span className="text-[#ffffff] drop-shadow-[0_0_8px_#ffd700]">✦</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Subtext */}
        <p className="mt-3 text-[10px] tracking-[0.25em] font-cinzel text-[#8da194] uppercase">
          ✦ I solemnly swear that I am up to no good ✦
        </p>
      </div>
    </div>
  );
};
