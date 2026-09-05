import React, { useState, useRef, useEffect } from 'react';
import type { WizardRegion, PlayerGuess, RoundResult } from '../types/game';
import { sound } from '../utils/audio';
import { Navigation, Maximize2, Minimize2, ArrowLeft, ZoomIn, Check } from 'lucide-react';

interface MaraudersMapProps {
  isRoundComplete: boolean;
  lastRoundResult: RoundResult | null;
  onGuessSubmit: (guess: PlayerGuess) => void;
  disabled?: boolean;
}

export const MaraudersMap: React.FC<MaraudersMapProps> = ({
  isRoundComplete,
  lastRoundResult,
  onGuessSubmit,
  disabled = false,
}) => {
  const [currentLevel, setCurrentLevel] = useState<'world' | 'castle'>('world');
  const [activeGuess, setActiveGuess] = useState<PlayerGuess | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const mapCanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRoundComplete && lastRoundResult) {
      if (lastRoundResult.location.region === 'castle') {
        setCurrentLevel('castle');
      } else {
        setCurrentLevel('world');
      }
      setIsExpanded(true);
    } else {
      setActiveGuess(null);
    }
  }, [isRoundComplete, lastRoundResult]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRoundComplete || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const normX = Math.round((clickX / rect.width) * 1000);
    const normY = Math.round((clickY / rect.height) * 1000);

    if (currentLevel === 'world') {
      const isHogwartsInset = normX >= 535 && normX <= 725 && normY >= 40 && normY <= 390;
      const isScotlandPin = normX >= 360 && normX <= 440 && normY >= 210 && normY <= 320;
      if (isHogwartsInset || isScotlandPin) {
        sound.playWandWhoosh();
        setCurrentLevel('castle');
        return;
      }
    }

    let region: WizardRegion = 'castle';
    if (currentLevel === 'world') {
      if (normX >= 570 && normX <= 800 && normY >= 580 && normY <= 920) {
        region = 'diagon_alley';
      } else if (normX >= 535 && normX <= 725 && normY >= 40 && normY <= 390) {
        region = 'grounds';
      } else {
        region = 'hogsmeade';
      }
    } else {
      region = 'castle';
    }

    const newGuess: PlayerGuess = {
      region,
      floorLevel: 0,
      x: normX,
      y: normY,
      mapLevel: currentLevel,
    };

    setActiveGuess(newGuess);
    sound.playMapStamp();
  };

  const handleSubmit = () => {
    if (!activeGuess || disabled || isRoundComplete) return;
    sound.playWandWhoosh();
    onGuessSubmit(activeGuess);
  };

  return (
    <div 
      className={`fixed z-30 transition-all duration-300 ease-out shadow-2xl rounded-sm border border-[#c9a84c]/40 bg-[#0d0b08] ${
        isExpanded
          ? 'bottom-3 right-3 w-[96vw] max-w-[1080px] h-[88vh] max-h-[790px]'
          : 'bottom-5 right-5 w-[420px] h-64 hover:w-[480px] hover:h-[310px]'
      }`}
      style={{
        boxShadow: '0 20px 60px rgba(0,0,0,0.95)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#c9a84c]/20 bg-[#0a0806]">
        <div className="flex items-center gap-3">
          {currentLevel === 'castle' ? (
            <button
              onClick={() => {
                setCurrentLevel('world');
                sound.playWandWhoosh();
              }}
              className="px-2 py-1 rounded-sm text-[#a09278] hover:text-[#e8dcc8] hover:bg-[#181410] text-[10px] font-cinzel font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Great Britain Map</span>
            </button>
          ) : (
            <span className="font-cinzel font-bold text-[10px] tracking-widest uppercase text-[#c9a84c] flex items-center gap-1.5 ml-1">
              <span>✦</span> The Wizarding World of Great Britain & Ireland
            </span>
          )}

          {currentLevel === 'castle' && (
            <span className="font-cinzel font-bold text-[10px] tracking-widest uppercase text-[#a09278] hidden sm:inline">
              • Hogwarts Castle Floorplans
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {currentLevel === 'world' && (
            <button
              onClick={() => {
                setCurrentLevel('castle');
                sound.playWandWhoosh();
              }}
              className="px-2 py-1 rounded-sm text-[#a09278] hover:text-[#e8dcc8] hover:bg-[#181410] text-[10px] font-cinzel font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              <ZoomIn className="w-3 h-3" />
              <span>Zoom to Castle</span>
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-sm text-[#a09278] hover:text-[#e8dcc8] hover:bg-[#181410] transition-colors"
            title={isExpanded ? 'Minimize Map' : 'Expand Map'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Map Body */}
      <div className="flex h-[calc(100%-96px)] relative overflow-hidden bg-[#181410]">
        <div
          ref={mapCanvasRef}
          onClick={handleMapClick}
          className="flex-1 relative h-full cursor-crosshair overflow-hidden select-none flex items-center justify-center"
        >
          {currentLevel === 'world' && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/maps/wizarding-world-map.jpg"
                alt="Wizarding World of Great Britain & Ireland"
                className="w-full h-full object-contain pointer-events-none select-none filter contrast-[1.04]"
              />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <rect x="535" y="40" width="190" height="350" fill="transparent"
                  onMouseEnter={() => setHoveredZone('Hogwarts Castle & Scottish Highlands (Click to zoom)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <circle cx="400" cy="265" r="35" fill="transparent"
                  onMouseEnter={() => setHoveredZone('Hogwarts & Hogsmeade Station (Click to zoom)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="570" y="580" width="230" height="340" fill="transparent"
                  onMouseEnter={() => setHoveredZone('London • King’s Cross, Diagon Alley & Ministry')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="805" y="590" width="165" height="350" fill="transparent"
                  onMouseEnter={() => setHoveredZone('The Burrow & Malfoy Manor')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="485" y="330" width="75" height="100" fill="transparent"
                  onMouseEnter={() => setHoveredZone('Azkaban Prison Fortress')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
              </svg>
            </div>
          )}

          {currentLevel === 'castle' && (
            <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-200">
              <img
                src="/maps/hogwarts-castle-map.jpg"
                alt="Hogwarts Castle Floor Map"
                className="w-full h-full object-contain pointer-events-none select-none filter contrast-[1.04]"
              />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <rect x="355" y="40" width="85" height="110" fill="transparent"
                  onMouseEnter={() => setHoveredZone("Potions Classroom")}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="520" y="40" width="95" height="110" fill="transparent"
                  onMouseEnter={() => setHoveredZone('Slytherin Cavern & Chamber of Secrets')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="645" y="40" width="105" height="110" fill="transparent"
                  onMouseEnter={() => setHoveredZone('The Kitchens')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="285" y="160" width="210" height="110" fill="transparent"
                  onMouseEnter={() => setHoveredZone('The Great Hall')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="505" y="160" width="135" height="160" fill="transparent"
                  onMouseEnter={() => setHoveredZone('Entrance Hall & Marble Staircases')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="590" y="285" width="115" height="95" fill="transparent"
                  onMouseEnter={() => setHoveredZone("Hospital Wing")}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="485" y="400" width="110" height="95" fill="transparent"
                  onMouseEnter={() => setHoveredZone('Defense Against the Dark Arts')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="730" y="505" width="140" height="100" fill="transparent"
                  onMouseEnter={() => setHoveredZone('The Forbidden Corridor')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="275" y="610" width="355" height="95" fill="transparent"
                  onMouseEnter={() => setHoveredZone('The Hogwarts Library')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="265" y="720" width="220" height="130" fill="transparent"
                  onMouseEnter={() => setHoveredZone("Prefect's Bathroom")}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <circle cx="578" cy="868" r="60" fill="transparent"
                  onMouseEnter={() => setHoveredZone('Gryffindor Tower')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <rect x="685" y="815" width="60" height="125" fill="transparent"
                  onMouseEnter={() => setHoveredZone('Ravenclaw Tower')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <circle cx="838" cy="872" r="50" fill="transparent"
                  onMouseEnter={() => setHoveredZone('Astronomy Tower')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
                <circle cx="925" cy="872" r="45" fill="transparent"
                  onMouseEnter={() => setHoveredZone("Divination Classroom")}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
              </svg>
            </div>
          )}

          {/* Active Guess Marker */}
          {activeGuess && activeGuess.mapLevel === currentLevel && (
            <div
              className="absolute pointer-events-none transition-transform duration-150 z-20"
              style={{
                left: `${(activeGuess.x / 1000) * 100}%`,
                top: `${(activeGuess.y / 1000) * 100}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#c9a84c] border border-black shadow-sm" />
                <div className="w-[1px] h-3 bg-[#c9a84c]" />
                <span className="mt-1 text-[8px] font-cinzel font-bold text-[#e8dcc8] bg-black/80 px-1.5 py-0.5 rounded-sm border border-[#c9a84c]/30 whitespace-nowrap">
                  Your Guess
                </span>
              </div>
            </div>
          )}

          {/* Reveal Markers */}
          {isRoundComplete && lastRoundResult && (
            <>
              {((currentLevel === 'castle' && lastRoundResult.location.region === 'castle') ||
                (currentLevel === 'world')) && (
                <div
                  className="absolute pointer-events-none z-20"
                  style={{
                    left: currentLevel === 'castle'
                      ? `${(lastRoundResult.location.x / 1000) * 100}%`
                      : `${((lastRoundResult.location.worldX ?? lastRoundResult.location.x) / 1000) * 100}%`,
                    top: currentLevel === 'castle'
                      ? `${(lastRoundResult.location.y / 1000) * 100}%`
                      : `${((lastRoundResult.location.worldY ?? lastRoundResult.location.y) / 1000) * 100}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                >
                  <div className="flex flex-col items-center animate-in zoom-in duration-300">
                    <div className="w-5 h-5 rounded-full bg-[#e8dcc8] border border-black shadow-sm flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <div className="w-[1px] h-3 bg-[#e8dcc8]" />
                    <span className="mt-1 text-[8px] font-cinzel font-bold text-black bg-[#e8dcc8] px-1.5 py-0.5 rounded-sm border border-black whitespace-nowrap">
                      {lastRoundResult.location.name}
                    </span>
                  </div>
                </div>
              )}

              {lastRoundResult.guess && lastRoundResult.guess.mapLevel === currentLevel && (
                <FootprintsTrail
                  startX={(lastRoundResult.guess.x / 1000) * 100}
                  startY={(lastRoundResult.guess.y / 1000) * 100}
                  endX={currentLevel === 'castle'
                    ? (lastRoundResult.location.x / 1000) * 100
                    : ((lastRoundResult.location.worldX ?? lastRoundResult.location.x) / 1000) * 100}
                  endY={currentLevel === 'castle'
                    ? (lastRoundResult.location.y / 1000) * 100
                    : ((lastRoundResult.location.worldY ?? lastRoundResult.location.y) / 1000) * 100}
                />
              )}
            </>
          )}

          {/* Hover Tooltip */}
          {hoveredZone && (
            <div className="absolute top-3 left-3 pointer-events-none bg-black/90 text-[#e8dcc8] px-2.5 py-1 rounded-sm text-[10px] font-cinzel tracking-wider border border-[#c9a84c]/30 z-30 uppercase">
              {hoveredZone}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#0a0806] border-t border-[#c9a84c]/20 px-4 flex items-center justify-between">
        <div className="text-[10px] font-cinzel tracking-widest uppercase text-[#a09278] truncate mr-2">
          {activeGuess ? (
            <span className="text-[#c9a84c]">✦ Ready to cast</span>
          ) : (
            <span>
              {currentLevel === 'world'
                ? 'Drop pin on map • Click inset to zoom'
                : 'Click room to drop pin'}
            </span>
          )}
        </div>

        {!isRoundComplete && (
          <button
            onClick={handleSubmit}
            disabled={!activeGuess || disabled}
            className={`px-6 py-2 rounded-sm font-cinzel text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-2 shrink-0 border ${
              activeGuess && !disabled
                ? 'bg-[#0c0a08] hover:bg-[#181410] text-[#e8dcc8] border-[#c9a84c]/60 hover:border-[#c9a84c] cursor-pointer'
                : 'bg-transparent text-[#5a4f3a] border-[#5a4f3a]/30 cursor-not-allowed'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Cast Guess</span>
          </button>
        )}
      </div>
    </div>
  );
};

// Clean minimal dotted trail instead of emoji footprints
const FootprintsTrail: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}> = ({ startX, startY, endX, endY }) => {
  useEffect(() => {
    sound.playFootsteps();
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-in fade-in duration-500">
      <line
        x1={`${startX}%`}
        y1={`${startY}%`}
        x2={`${endX}%`}
        y2={`${endY}%`}
        stroke="#c9a84c"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        className="opacity-60"
      />
    </svg>
  );
};
