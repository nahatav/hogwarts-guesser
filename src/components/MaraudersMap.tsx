import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { WizardRegion, PlayerGuess, RoundResult } from '../types/game';
import { sound } from '../utils/audio';
import { CheckCircle, Navigation, Maximize2, Minimize2, ArrowLeft, ZoomIn } from 'lucide-react';

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
  // Current view level: 'world' (Great Britain & Ireland map) or 'castle' (Zoomed-in Hogwarts floor map)
  const [currentLevel, setCurrentLevel] = useState<'world' | 'castle'>('world');
  const [activeGuess, setActiveGuess] = useState<PlayerGuess | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const mapCanvasRef = useRef<HTMLDivElement>(null);

  // When round completes, automatically switch map view to actual location level to show the reveal
  useEffect(() => {
    if (isRoundComplete && lastRoundResult) {
      if (lastRoundResult.location.region === 'castle') {
        setCurrentLevel('castle');
      } else {
        setCurrentLevel('world');
      }
      setIsExpanded(true); // expand to show footprints
    } else {
      setActiveGuess(null);
    }
  }, [isRoundComplete, lastRoundResult]);

  // Handle map click
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRoundComplete || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert pixel position to normalized 0-1000 coordinate space
    const normX = Math.round((clickX / rect.width) * 1000);
    const normY = Math.round((clickY / rect.height) * 1000);

    // If on world map and player clicks directly on the Hogwarts / Scottish Highlands inset (X: 535-725, Y: 40-390)
    // or Scotland Highlands pin (X: 360-440, Y: 220-310), automatically zoom in to the Castle!
    if (currentLevel === 'world') {
      const isHogwartsInset = normX >= 535 && normX <= 725 && normY >= 40 && normY <= 390;
      const isScotlandPin = normX >= 360 && normX <= 440 && normY >= 210 && normY <= 320;
      if (isHogwartsInset || isScotlandPin) {
        sound.playWandWhoosh();
        setCurrentLevel('castle');
        return;
      }
    }

    // Determine region based on click
    let region: WizardRegion = 'castle';
    if (currentLevel === 'world') {
      if (normX >= 570 && normX <= 800 && normY >= 580 && normY <= 920) {
        region = 'diagon_alley'; // London Inset
      } else if (normX >= 535 && normX <= 725 && normY >= 40 && normY <= 390) {
        region = 'grounds'; // Highlands Inset
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

  // Submit guess
  const handleSubmit = () => {
    if (!activeGuess || disabled || isRoundComplete) return;
    sound.playWandWhoosh();
    onGuessSubmit(activeGuess);
  };

  return (
    <div 
      className={`fixed z-30 transition-all duration-300 ease-out shadow-2xl rounded-2xl border-2 border-[#7a5836] backdrop-blur-md bg-[#231b14] text-[#2b1e10] ${
        isExpanded
          ? 'bottom-3 right-3 w-[96vw] max-w-[1080px] h-[88vh] max-h-[790px]'
          : 'bottom-5 right-5 w-[420px] h-64 hover:w-[480px] hover:h-[310px]'
      }`}
      style={{
        boxShadow: '0 20px 60px rgba(0,0,0,0.92), inset 0 0 40px rgba(115,70,30,0.3)',
      }}
    >
      {/* Parchment Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#8c6b45] bg-[#ebd8bb] rounded-t-2xl shadow-inner">
        <div className="flex items-center gap-2">
          {currentLevel === 'castle' ? (
            <button
              onClick={() => {
                setCurrentLevel('world');
                sound.playWandWhoosh();
              }}
              className="px-2.5 py-1 rounded bg-[#dfcba8] hover:bg-[#cbb38d] text-[#4a260e] text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#8c6b45]/60 transition active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Great Britain Map</span>
            </button>
          ) : (
            <span className="font-serif font-bold text-xs sm:text-sm tracking-wider uppercase text-[#4a260e] flex items-center gap-1.5">
              <span>✦</span> The Wizarding World of Great Britain & Ireland
            </span>
          )}

          {currentLevel === 'castle' && (
            <span className="font-serif font-bold text-xs sm:text-sm tracking-wider uppercase text-[#4a260e] ml-2 hidden sm:inline">
              • Hogwarts Castle Floorplans
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Zoom In to Hogwarts shortcut when on world map */}
          {currentLevel === 'world' && (
            <button
              onClick={() => {
                setCurrentLevel('castle');
                sound.playWandWhoosh();
              }}
              className="px-2.5 py-1 rounded bg-[#5c3214] hover:bg-[#783e16] text-[#f7f0e3] text-[11px] font-serif font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm transition active:scale-95"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Zoom to Hogwarts Castle</span>
            </button>
          )}

          {/* Expand/Collapse Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-[#5c3a21] hover:bg-[#d8c2a3] transition"
            title={isExpanded ? 'Minimize Map' : 'Expand Map'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Map Body */}
      <div className="flex h-[calc(100%-88px)] relative overflow-hidden bg-[#160f0a]">
        <div
          ref={mapCanvasRef}
          onClick={handleMapClick}
          className="flex-1 relative h-full cursor-crosshair overflow-hidden select-none bg-[#120c08] flex items-center justify-center"
        >
          {/* LEVEL 1: THE WIZARDING WORLD OF GREAT BRITAIN & IRELAND MAP */}
          {currentLevel === 'world' && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/maps/wizarding-world-map.jpg"
                alt="Wizarding World of Great Britain & Ireland"
                className="w-full h-full object-contain pointer-events-none select-none filter contrast-[1.04]"
              />

              {/* Interactive Hotspots on the World Map */}
              <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
              >
                {/* 1. Hogwarts Castle & Scottish Highlands Inset Box (Click to Zoom!) */}
                <rect
                  x="535" y="40" width="190" height="350"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('🏰 Hogwarts Castle & Scottish Highlands (CLICK TO ZOOM IN)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-amber-500/20 hover:stroke-amber-400 hover:stroke-2 cursor-pointer transition animate-pulse"
                />

                {/* 2. Scotland Highlands Hogwarts Pin on main UK map */}
                <circle
                  cx="400" cy="265" r="35"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('🏰 Hogwarts & Hogsmeade Station (CLICK TO ZOOM IN)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-amber-500/30 hover:stroke-amber-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* 3. London Inset Box (King's Cross & Platform 9 3/4, Diagon Alley, St. Mungo's) */}
                <rect
                  x="570" y="580" width="230" height="340"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('🏛️ London • King’s Cross, Platform 9¾, Diagon Alley & Ministry')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-emerald-500/20 hover:stroke-emerald-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* 4. The Burrow & Malfoy Manor Inset Box */}
                <rect
                  x="805" y="590" width="165" height="350"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('🧹 The Burrow (Ottery St Catchpole) & Malfoy Manor')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-yellow-500/20 hover:stroke-yellow-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* 5. Azkaban Fortress in the North Sea */}
                <rect
                  x="485" y="330" width="75" height="100"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('⛓️ Azkaban Prison Fortress (North Sea)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-slate-500/30 hover:stroke-slate-400 hover:stroke-2 cursor-pointer transition"
                />
              </svg>
            </div>
          )}

          {/* LEVEL 2: ZOOMED-IN HOGWARTS CASTLE FLOOR-BY-FLOOR CROSS-SECTION MAP */}
          {currentLevel === 'castle' && (
            <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-200">
              <img
                src="/maps/hogwarts-castle-map.jpg"
                alt="Hogwarts Castle Floor Map"
                className="w-full h-full object-contain pointer-events-none select-none filter contrast-[1.04]"
              />

              {/* Interactive Room Overlay on the Zoomed-In Castle Map */}
              <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
              >
                {/* Dungeons: Snape's Potions Classroom */}
                <rect
                  x="355" y="40" width="85" height="110"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone("Potions Classroom (Professor Snape's Dungeon)")}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-emerald-500/25 hover:stroke-emerald-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Dungeons: Collegium Slitherinum (Slytherin Cavern & Chamber) */}
                <rect
                  x="520" y="40" width="95" height="110"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('Collegium Slitherinum (Slytherin Cavern & Chamber of Secrets)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-emerald-500/25 hover:stroke-emerald-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Dungeons: Kitchens & Hufflepuff Entrance */}
                <rect
                  x="645" y="40" width="105" height="110"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('The Kitchens & Hufflepuff Basement Entrance')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-yellow-500/25 hover:stroke-yellow-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Ground Floor: Magna Aula (The Great Hall) */}
                <rect
                  x="285" y="160" width="210" height="110"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('Magna Aula (The Great Hall & High Podium)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-amber-500/25 hover:stroke-amber-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Ground Floor: Entrance Hall & Marble Staircase */}
                <rect
                  x="505" y="160" width="135" height="160"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('Entrance Hall & Marble Grand Staircases')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-amber-500/25 hover:stroke-amber-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* First Floor: Hospital Wing */}
                <rect
                  x="590" y="285" width="115" height="95"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone("Hospital Wing (Madam Pomfrey's Infirmary)")}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-rose-500/25 hover:stroke-rose-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Second Floor: Defense Against the Dark Arts */}
                <rect
                  x="485" y="400" width="110" height="95"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('Defense Against the Dark Arts Classroom')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-indigo-500/25 hover:stroke-indigo-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Third Floor: Forbidden Corridor & Fluffy */}
                <rect
                  x="730" y="505" width="140" height="100"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('The Forbidden Corridor (Fluffy & The Trapdoor)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-red-500/25 hover:stroke-red-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Fourth Floor: Bibliotheca (The Hogwarts Library) */}
                <rect
                  x="275" y="610" width="355" height="95"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('Bibliotheca (The Great Hogwarts Library & Restricted Section)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-amber-500/25 hover:stroke-amber-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Fifth/Sixth Floor: Prefect's Bathroom */}
                <rect
                  x="265" y="720" width="220" height="130"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone("Prefect's Bathroom & Colored Bubbles Pool")}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-cyan-500/25 hover:stroke-cyan-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Seventh Floor: Gryffindor Tower */}
                <circle
                  cx="578" cy="868" r="60"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('Gryffindor Tower (Circular Common Room & Hearth)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-red-600/30 hover:stroke-red-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Towers: Ravenclaw Tower */}
                <rect
                  x="685" y="815" width="60" height="125"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('Ravenclaw Tower (Eagle Door Knocker)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-blue-500/25 hover:stroke-blue-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Towers: Astrology / Astronomy Tower */}
                <circle
                  cx="838" cy="872" r="50"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone('Astrology / Astronomy Tower (Celestial Astrolabe Rampart)')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-cyan-500/30 hover:stroke-cyan-400 hover:stroke-2 cursor-pointer transition"
                />

                {/* Towers: Divination Classroom / High Turrets */}
                <circle
                  cx="925" cy="872" r="45"
                  fill="transparent"
                  onMouseEnter={() => setHoveredZone("Divination Classroom & Dumbledore's High Sanctum")}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="hover:fill-purple-500/30 hover:stroke-purple-400 hover:stroke-2 cursor-pointer transition"
                />
              </svg>
            </div>
          )}

          {/* Active Guess Marker (Golden Snitch Pin) */}
          {activeGuess && activeGuess.mapLevel === currentLevel && (
            <div
              className="absolute -ml-3.5 -mt-7 pointer-events-none transition-transform duration-150 animate-bounce z-20"
              style={{
                left: `${(activeGuess.x / 1000) * 100}%`,
                top: `${(activeGuess.y / 1000) * 100}%`,
              }}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-[#4a260e] shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
                </div>
                <div className="w-1 h-3 bg-[#4a260e]" />
                <span className="text-[9px] font-serif font-bold text-[#4a260e] bg-[#f7f0e3] px-1 rounded shadow border border-[#8c6b45] whitespace-nowrap">
                  Your Guess
                </span>
              </div>
            </div>
          )}

          {/* Post-Round Reveal (Actual Location & Footprint Animation) */}
          {isRoundComplete && lastRoundResult && (
            <>
              {/* Actual Location Marker */}
              {((currentLevel === 'castle' && lastRoundResult.location.region === 'castle') ||
                (currentLevel === 'world')) && (
                <div
                  className="absolute -ml-4 -mt-8 pointer-events-none animate-pulse z-20"
                  style={{
                    left: currentLevel === 'castle'
                      ? `${(lastRoundResult.location.x / 1000) * 100}%`
                      : `${((lastRoundResult.location.worldX ?? lastRoundResult.location.x) / 1000) * 100}%`,
                    top: currentLevel === 'castle'
                      ? `${(lastRoundResult.location.y / 1000) * 100}%`
                      : `${((lastRoundResult.location.worldY ?? lastRoundResult.location.y) / 1000) * 100}%`,
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-green-400 border-2 border-white shadow-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-1 h-3 bg-emerald-800" />
                    <span className="text-[10px] font-serif font-bold text-white bg-emerald-900 px-1.5 py-0.5 rounded shadow border border-emerald-400 whitespace-nowrap">
                      {lastRoundResult.location.name}
                    </span>
                  </div>
                </div>
              )}

              {/* Animated Footprints Trail connecting Guess to True Location */}
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

          {/* Active Hover Tooltip */}
          {hoveredZone && (
            <div className="absolute top-2 left-2 pointer-events-none bg-[#1a1209]/95 text-[#f7f0e3] px-3 py-1 rounded text-xs font-serif shadow-xl border border-[#d4af37]/80 backdrop-blur-sm z-30 flex items-center gap-1.5">
              <span className="text-[#ffd700]">✦</span>
              <span>{hoveredZone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Parchment Footer & Submit Button */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#ead6b6] border-t border-[#8c6b45]/50 px-4 flex items-center justify-between rounded-b-2xl">
        <div className="text-xs font-serif text-[#4a260e] truncate mr-2">
          {activeGuess ? (
            <span>✦ Pin dropped — ready to cast</span>
          ) : (
            <span className="italic text-[#6b4221]">
              {currentLevel === 'world'
                ? 'Click the map to place your guess. Click the Hogwarts inset to zoom in.'
                : 'Click a room on the castle map to drop your pin.'}
            </span>
          )}
        </div>

        {!isRoundComplete && (
          <button
            onClick={handleSubmit}
            disabled={!activeGuess || disabled}
            className={`px-4 py-1.5 rounded-xl font-serif font-bold text-xs tracking-wider uppercase transition shadow-md flex items-center gap-1.5 shrink-0 ${
              activeGuess && !disabled
                ? 'bg-gradient-to-r from-[#7a3e14] to-[#4a2208] text-[#fbf5e8] hover:from-[#944c18] hover:to-[#5e2b0b] border border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.35)] active:scale-95'
                : 'bg-[#d5bf9f] text-[#8c6b45] cursor-not-allowed border border-[#bfa583]'
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

// --- Animated Marauder's Footprints Trail Component ---
const FootprintsTrail: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}> = ({ startX, startY, endX, endY }) => {
  const steps = 8;
  const footstepCoords = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= steps; i++) {
      const t = i / (steps + 1);
      const x = startX + (endX - startX) * t;
      const y = startY + (endY - startY) * t;
      arr.push({ x, y, isRightFoot: i % 2 === 0 });
    }
    return arr;
  }, [startX, startY, endX, endY]);

  useEffect(() => {
    sound.playFootsteps();
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
      <line
        x1={`${startX}%`}
        y1={`${startY}%`}
        x2={`${endX}%`}
        y2={`${endY}%`}
        stroke="#6b3c19"
        strokeWidth="2.5"
        strokeDasharray="6 4"
        className="opacity-90"
      />
      {footstepCoords.map((step, idx) => (
        <text
          key={idx}
          x={`${step.x}%`}
          y={`${step.y}%`}
          fontSize="15"
          fill="#3b1d07"
          className="animate-pulse"
          style={{ animationDelay: `${idx * 140}ms` }}
        >
          🐾
        </text>
      ))}
    </svg>
  );
};
