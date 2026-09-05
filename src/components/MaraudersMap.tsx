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
      // If location is in Hogwarts, show castle map.
      // If location is outside Hogwarts, go back to world map ("main page").
      if (lastRoundResult.location.region === 'castle') {
        setCurrentLevel('castle');
      } else {
        setCurrentLevel('world');
      }
    } else {
      // Reset map size, level, and active guess for the new turn
      setIsExpanded(false);
      setActiveGuess(null);
      setCurrentLevel('world');
    }
  }, [isRoundComplete, lastRoundResult]);

  // Compute player guess coordinates on the currently active map level
  const guessOnCurrentLevel = React.useMemo(() => {
    const g = lastRoundResult?.guess || activeGuess;
    if (!g) return null;

    if (currentLevel === 'castle') {
      if (g.mapLevel === 'castle') {
        return { x: g.x, y: g.y };
      } else {
        return { x: 550, y: 205 }; // Default to Entrance Hall in castle
      }
    } else {
      // Current level is 'world'
      if (g.mapLevel === 'world') {
        return { x: g.x, y: g.y };
      } else {
        // Player guessed inside Hogwarts Castle -> pin on Hogwarts on the world map!
        return { x: 600, y: 240 };
      }
    }
  }, [currentLevel, lastRoundResult, activeGuess]);

  // Compute actual location coordinates on the currently active map level
  const actualOnCurrentLevel = React.useMemo(() => {
    if (!lastRoundResult) return null;
    const loc = lastRoundResult.location;

    if (currentLevel === 'castle') {
      if (loc.region === 'castle') {
        return { x: loc.x, y: loc.y, name: loc.name };
      }
      return null;
    } else {
      // Current level is 'world'
      const wx = loc.worldX ?? 600;
      const wy = loc.worldY ?? 240;
      return { x: wx, y: wy, name: loc.name };
    }
  }, [currentLevel, lastRoundResult]);

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
          ? 'inset-2 sm:inset-auto sm:bottom-3 sm:right-3 w-auto sm:w-[96vw] sm:max-w-[1080px] h-auto sm:h-[88vh] sm:max-h-[790px]'
          : 'bottom-2 left-2 right-2 sm:left-auto sm:bottom-5 sm:right-5 w-auto sm:w-[420px] h-[34vh] max-h-[250px] sm:max-h-none sm:h-64 sm:hover:w-[480px] sm:hover:h-[310px]'
      }`}
      style={{
        boxShadow: '0 20px 60px rgba(0,0,0,0.95)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2.5 py-1.5 sm:px-4 sm:py-2 border-b border-[#c9a84c]/20 bg-[#0a0806]">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          {currentLevel === 'castle' ? (
            <button
              onClick={() => {
                setCurrentLevel('world');
                sound.playWandWhoosh();
              }}
              className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm text-[#a09278] hover:text-[#e8dcc8] hover:bg-[#181410] text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider sm:tracking-widest flex items-center gap-1 transition-colors shrink-0"
            >
              <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Great Britain</span>
            </button>
          ) : (
            <span className="font-cinzel font-bold text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase text-[#c9a84c] flex items-center gap-1 ml-0.5 truncate">
              <span>✦</span> <span className="truncate">Wizarding World</span>
            </span>
          )}

          {currentLevel === 'castle' && (
            <span className="font-cinzel font-bold text-[9px] sm:text-[10px] tracking-widest uppercase text-[#a09278] hidden sm:inline">
              • Hogwarts Floorplan
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {currentLevel === 'world' && (
            <button
              onClick={() => {
                setCurrentLevel('castle');
                sound.playWandWhoosh();
              }}
              className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm text-[#a09278] hover:text-[#e8dcc8] hover:bg-[#181410] text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider sm:tracking-widest flex items-center gap-1 transition-colors"
            >
              <ZoomIn className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Hogwarts</span>
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-sm text-[#a09278] hover:text-[#e8dcc8] hover:bg-[#181410] transition-colors"
            title={isExpanded ? 'Minimize Map' : 'Expand Map'}
          >
            {isExpanded ? <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </button>
        </div>
      </div>

      {/* Map Body */}
      <div className="flex h-[calc(100%-72px)] sm:h-[calc(100%-96px)] relative overflow-hidden bg-[#181410] items-center justify-center p-1 sm:p-2">
        <div
          ref={mapCanvasRef}
          onClick={handleMapClick}
          className="relative max-w-full max-h-full flex-shrink-0 cursor-crosshair"
          style={{ display: 'inline-block' }}
        >
          {currentLevel === 'world' && (
            <>
              <img
                src={`${import.meta.env.BASE_URL}maps/wizarding-world-map.jpg`}
                alt="Wizarding World of Great Britain & Ireland"
                className="max-w-full max-h-full object-contain pointer-events-none select-none filter contrast-[1.04]"
                style={{ height: '100%', width: 'auto' }}
              />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <rect x="535" y="40" width="190" height="350" fill="transparent"
                  onMouseEnter={() => setHoveredZone('Hogwarts Castle & Scottish Highlands (Click to zoom)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-[#c9a84c]/10 hover:stroke-[#c9a84c] hover:stroke-1 cursor-pointer transition" />
              </svg>
            </>
          )}

          {currentLevel === 'castle' && (
            <img
              src={`${import.meta.env.BASE_URL}maps/hogwarts-castle-map.jpg`}
              alt="Hogwarts Castle Floor Map"
              className="max-w-full max-h-full object-contain pointer-events-none select-none filter contrast-[1.04] animate-in zoom-in-95 duration-200"
              style={{ height: '100%', width: 'auto' }}
            />
          )}

          {/* Player Guess Marker (Shown during active guess & during result review) */}
          {guessOnCurrentLevel && (
            <div
              className="absolute pointer-events-none transition-transform duration-150 z-20"
              style={{
                left: `${(guessOnCurrentLevel.x / 1000) * 100}%`,
                top: `${(guessOnCurrentLevel.y / 1000) * 100}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#c9a84c] border border-black shadow-md" />
                <div className="w-[1px] h-3 bg-[#c9a84c]" />
                <span className="mt-1 text-[8px] font-cinzel font-bold text-[#e8dcc8] bg-black/90 px-1.5 py-0.5 rounded-sm border border-[#c9a84c]/40 whitespace-nowrap shadow-sm">
                  {isRoundComplete ? 'Your Guess' : 'Selected Pin'}
                </span>
              </div>
            </div>
          )}

          {/* Actual Place Marker & Connecting Trail */}
          {isRoundComplete && actualOnCurrentLevel && (
            <>
              <div
                className="absolute pointer-events-none z-20"
                style={{
                  left: `${(actualOnCurrentLevel.x / 1000) * 100}%`,
                  top: `${(actualOnCurrentLevel.y / 1000) * 100}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="flex flex-col items-center animate-in zoom-in duration-300">
                  <div className="w-5 h-5 rounded-full bg-[#e8dcc8] border border-black shadow-md flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <div className="w-[1px] h-3 bg-[#e8dcc8]" />
                  <span className="mt-1 text-[8px] font-cinzel font-bold text-black bg-[#e8dcc8] px-1.5 py-0.5 rounded-sm border border-black whitespace-nowrap shadow-sm">
                    {actualOnCurrentLevel.name}
                  </span>
                </div>
              </div>

              {guessOnCurrentLevel && (
                <FootprintsTrail
                  startX={(guessOnCurrentLevel.x / 1000) * 100}
                  startY={(guessOnCurrentLevel.y / 1000) * 100}
                  endX={(actualOnCurrentLevel.x / 1000) * 100}
                  endY={(actualOnCurrentLevel.y / 1000) * 100}
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
      <div className="absolute bottom-0 left-0 right-0 h-11 sm:h-14 bg-[#0a0806] border-t border-[#c9a84c]/20 px-2.5 sm:px-4 flex items-center justify-between">
        <div className="text-[9px] sm:text-[10px] font-cinzel tracking-wider sm:tracking-widest uppercase text-[#a09278] truncate mr-2">
          {activeGuess ? (
            <span className="text-[#c9a84c]">✦ Ready to cast</span>
          ) : (
            <span>
              {currentLevel === 'world'
                ? 'Drop pin on map'
                : 'Click room to drop pin'}
            </span>
          )}
        </div>

        {!isRoundComplete && (
          <button
            onClick={handleSubmit}
            disabled={!activeGuess || disabled}
            className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-sm font-cinzel text-[10px] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase transition-colors flex items-center gap-1.5 sm:gap-2 shrink-0 border ${
              activeGuess && !disabled
                ? 'bg-[#0c0a08] hover:bg-[#181410] text-[#e8dcc8] border-[#c9a84c]/60 hover:border-[#c9a84c] cursor-pointer'
                : 'bg-transparent text-[#5a4f3a] border-[#5a4f3a]/30 cursor-not-allowed'
            }`}
          >
            <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
