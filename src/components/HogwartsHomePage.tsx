import React, { useState, useEffect, useRef } from 'react';
import { GoldenSnitch3D } from './GoldenSnitch3D';
import { sound } from '../utils/audio';
import { Feather, ArrowRight } from 'lucide-react';

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
  const [zoomScale, setZoomScale] = useState<number>(1.20);
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

  // Video starts at 20% zoomed (1.20) and gradually zooms up to 40% (1.40) by the end
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
      // Start already at 1.20 (20% zoomed) and go up to 1.40 (40% zoomed)
      setZoomScale(1.20 + progress * 0.20);
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
      
      {/* PHASE 1: Video (1.25x speed, starts at 20% zoom and goes up to 40% zoom, no skip) */}
      {introPhase === 'video' && (
        <div 
          className="absolute inset-0 w-full h-full z-50 overflow-hidden bg-black"
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
        </div>
      )}

      {/* PHASE 2: Official Ministry of Magic Legal Paper to Sign */}
      {introPhase === 'paper' && (
        <div 
          className="absolute inset-0 z-40 flex items-center justify-center p-2 sm:p-5 overflow-y-auto animate-in fade-in duration-300"
          style={{
            background: 'radial-gradient(circle at center, #1e150f 0%, #0a0705 100%)',
          }}
        >
          <div 
            className="w-full max-w-2xl p-4 sm:p-7 max-h-[94dvh] overflow-y-auto rounded-sm border-2 border-[#5c3a1e] relative shadow-2xl text-[#16110b]"
            style={{
              backgroundColor: '#f4ebd0',
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(120, 80, 40, 0.12) 28px)',
              boxShadow: 'inset 0 0 50px rgba(110, 65, 25, 0.3), 0 25px 70px rgba(0, 0, 0, 0.95)',
            }}
          >
            {/* Decorative inner parchment border */}
            <div className="absolute inset-1.5 border border-[#8b5a2b]/25 pointer-events-none rounded-xs" />

            {/* Top Official Ministry Letterhead (Matching Reference Image) */}
            <div className="relative z-10 text-center mb-1">
              <img
                src={`${import.meta.env.BASE_URL}images/ministry_letterhead.png`}
                alt="The Ministry of Magic"
                className="w-full max-w-sm sm:max-w-md mx-auto object-contain select-none pointer-events-none drop-shadow-xs"
              />
            </div>

            {/* Department Header & Docket Metadata */}
            <div className="text-center pb-2 mb-2 relative z-10 border-b border-[#8b5a2b]/30">
              <p className="font-cinzel text-[8px] sm:text-[9.5px] font-bold text-[#a82424] tracking-[0.22em] uppercase">
                Department of Magical Education • Wizengamot Examinations Board
              </p>
              <h1 className="font-cinzel font-bold text-base sm:text-xl text-[#16110b] tracking-[0.14em] uppercase mt-0.5">
                Cartographic O.W.L. Examination Accord
              </h1>
              <div className="flex items-center justify-center gap-3 mt-1 text-[8px] sm:text-[9px] font-cinzel text-[#614124] uppercase tracking-wider">
                <span>Ref: MoM/OWL-742/1993</span>
                <span>•</span>
                <span className="text-[#a82424] font-bold">Classification: Mandatory</span>
                <span>•</span>
                <span>London, W.C.</span>
              </div>
            </div>

            {/* Preamble */}
            <p className="font-serif italic text-xs sm:text-[13px] text-[#2c1d11] leading-relaxed mb-2.5 border-l-2 border-[#781d1d] pl-2.5 relative z-10">
              "I, the undersigned candidate, having presented myself before the Ministry of Magic Directorate of Cartography, do hereby solemnly covenant and submit to the official statutory regulations set forth hereunder:"
            </p>

            {/* Official Legal Articles / Examination Rules */}
            <div className="space-y-2 mb-3 relative z-10">
              <div 
                className="p-2 border border-[#8b5a2b]/30 rounded-xs shadow-[inset_0_1px_3px_rgba(107,68,35,0.06)]"
                style={{ background: 'rgba(251, 247, 238, 0.88)' }}
              >
                <strong className="font-cinzel text-[10.5px] sm:text-xs font-bold text-[#16110b] uppercase block">
                  § 1. Spherical Reconnaissance (360° Vision)
                </strong>
                <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed mt-0.5">
                  The examinee shall pan, tilt, and zoom through 360-degree panoramas to survey architectural nuances, terrain, and celestial headings across Great Britain.
                </p>
              </div>

              <div 
                className="p-2 border border-[#8b5a2b]/30 rounded-xs shadow-[inset_0_1px_3px_rgba(107,68,35,0.06)]"
                style={{ background: 'rgba(251, 247, 238, 0.88)' }}
              >
                <strong className="font-cinzel text-[10.5px] sm:text-xs font-bold text-[#16110b] uppercase block">
                  § 2. Consultation of the Marauder’s Record
                </strong>
                <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed mt-0.5">
                  Pursuant to Ministerial Waiver, the examinee is authorized to consult the Marauder’s Map to cross-reference overworld realms and interior Hogwarts Castle chambers.
                </p>
              </div>

              <div 
                className="p-2 border border-[#8b5a2b]/30 rounded-xs shadow-[inset_0_1px_3px_rgba(107,68,35,0.06)]"
                style={{ background: 'rgba(251, 247, 238, 0.88)' }}
              >
                <strong className="font-cinzel text-[10.5px] sm:text-xs font-bold text-[#16110b] uppercase block">
                  § 3. Irrevocable Coordinate Affixture
                </strong>
                <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed mt-0.5">
                  A single coordinate pin shall be cast to pinpoint the candidate’s location. Once confirmed with "Cast Guess", the submission is sealed in perpetuity before the Examiners.
                </p>
              </div>

              <div 
                className="p-2 border border-[#8b5a2b]/30 rounded-xs shadow-[inset_0_1px_3px_rgba(107,68,35,0.06)]"
                style={{ background: 'rgba(251, 247, 238, 0.88)' }}
              >
                <strong className="font-cinzel text-[10.5px] sm:text-xs font-bold text-[#16110b] uppercase block">
                  § 4. Standardized Evaluation & Honors
                </strong>
                <p className="text-[10px] sm:text-[11px] text-[#4a3319] font-serif leading-relaxed mt-0.5">
                  The examination comprises five (5) chambers. Candidates are awarded up to 5,000 marks per trial (25,000 aggregate), determining the grade of their O.W.L. Diploma.
                </p>
              </div>

              <div 
                className="p-2 border-2 border-[#781d1d]/40 rounded-xs shadow-[inset_0_1px_3px_rgba(120,29,29,0.08)]"
                style={{ background: 'rgba(253, 245, 240, 0.92)' }}
              >
                <strong className="font-cinzel text-[10.5px] sm:text-xs font-bold text-[#781d1d] uppercase block">
                  § 5. The Seeker's Rite (Mandatory Execution)
                </strong>
                <p className="text-[10px] sm:text-[11px] text-[#541212] font-serif font-semibold leading-relaxed mt-0.5">
                  Pursuant to Educational Decree No. 104: To ratify this accord and activate the examination, the candidate must seize the Golden Snitch.
                </p>
              </div>
            </div>

            {/* Candidate Signature & Execution Block ("Paper I'm Signing") */}
            <div className="my-2.5 p-3 border-2 border-dashed border-[#8b5a2b]/40 bg-[#fdfbf7]/85 rounded-xs relative z-10 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-end">
                {/* Signature Field */}
                <div>
                  <label className="block text-[8.5px] font-cinzel font-bold text-[#614124] uppercase tracking-widest mb-1">
                    Candidate Signature (Inked Name)
                  </label>
                  <div className="relative border-b-2 border-[#16110b] pb-0.5">
                    <Feather className="w-3.5 h-3.5 text-[#784b1e] absolute left-0 bottom-1.5 pointer-events-none" />
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="The Chosen One"
                      maxLength={26}
                      className="w-full pl-6 pr-2 bg-transparent font-serif italic text-base sm:text-lg font-bold text-[#161c2b] focus:outline-none placeholder:text-[#8b6b4a]/60"
                    />
                  </div>
                  <p className="text-[8px] font-cinzel text-[#8b6540] uppercase tracking-widest mt-1">
                    X Sign your candidate name above
                  </p>
                </div>

                {/* Date & Official Stamp */}
                <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                  <div className="text-left sm:text-right">
                    <p className="text-[8px] font-cinzel font-bold text-[#614124] uppercase tracking-widest">
                      Date of Ratification
                    </p>
                    <p className="font-serif italic text-xs font-bold text-[#16110b]">
                      6 September, 1993
                    </p>
                    <p className="text-[8px] font-cinzel text-[#8b6540]">
                      Whitehall, London
                    </p>
                  </div>

                  {/* Circular Red Rubber Stamp */}
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-[#a82424] text-[#a82424] flex flex-col items-center justify-center p-1 transform -rotate-12 select-none shrink-0 shadow-xs">
                    <span className="text-[6px] font-cinzel font-bold tracking-tighter uppercase leading-none text-center">
                      MINISTRY
                    </span>
                    <span className="text-[7px] font-cinzel font-bold tracking-widest uppercase leading-none my-0.5 text-center">
                      ★ O.W.L. ★
                    </span>
                    <span className="text-[6px] font-cinzel font-bold tracking-tighter uppercase leading-none text-center">
                      APPROVED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign & Ratify Button */}
            <button
              onClick={handlePlayClick}
              className="w-full py-3 bg-[#2b1810] hover:bg-[#3e2418] border-2 border-[#5c3a1e] text-[#fbf8f0] font-cinzel font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-150 flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] cursor-pointer mt-2.5 relative z-10"
            >
              <span>Sign Accord & Release Snitch</span>
              <ArrowRight className="w-4 h-4 text-[#e8dcc8]" />
            </button>

            {/* Official Ministry Footer (Matching Reference Image) */}
            <div className="text-center pt-2.5 mt-2 border-t border-[#8b5a2b]/25 relative z-10">
              <p className="font-cinzel text-[8.5px] sm:text-[9.5px] tracking-[0.22em] text-[#a82424] font-bold uppercase">
                IMPORTANT MINISTRY OF MAGIC BUSINESS
              </p>
              <p className="font-cinzel text-[7.5px] sm:text-[8.5px] text-[#4a3319] tracking-wider uppercase mt-0.5">
                The Ministry of Magic, Deep Underground in Central Whitehall, London
              </p>
            </div>
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
