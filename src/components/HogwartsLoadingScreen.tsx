import React, { useEffect, useState, useMemo } from 'react';
import { sound } from '../utils/audio';

interface HogwartsLoadingScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

interface Shard {
  id: number;
  clipPath: string;
  left: number;
  top: number;
  width: number;
  height: number;
  explodeX: number;
  explodeY: number;
  explodeZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
}

export const HogwartsLoadingScreen: React.FC<HogwartsLoadingScreenProps> = ({
  onComplete,
}) => {
  // Phase: 'still' (0-500ms) -> 'shake1' (500-1300ms) -> 'shake2' (1300-2000ms) -> 'shake3' (2000-2600ms) -> 'shattered' (2600ms+)
  const [phase, setPhase] = useState<'still' | 'shake1' | 'shake2' | 'shake3' | 'shattered'>('still');

  // Automatic music playback - no buttons
  useEffect(() => {
    sound.playThemeMusic(0.65);

    const unlock = () => {
      sound.playThemeMusic(0.65);
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  // Choreographed timeline:
  // 0 - 500ms: STILL
  // 500ms - 1300ms: Gentle shake starts
  // 1300ms - 2000ms: Medium shake accelerates
  // 2000ms - 2600ms: Violent accelerating earthquake
  // 2600ms: SHATTER BREAK into random shards
  // 3600ms: Complete and reveal underlying game
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('shake1'), 500);
    const t2 = setTimeout(() => setPhase('shake2'), 1300);
    const t3 = setTimeout(() => setPhase('shake3'), 2000);
    const t4 = setTimeout(() => {
      setPhase('shattered');
      sound.playWandWhoosh();
    }, 2600);
    const t5 = setTimeout(() => {
      onComplete();
    }, 3650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  // Generate 28 random jagged shards at varied angles with irregular polygons
  const shards = useMemo<Shard[]>(() => {
    const list: Shard[] = [];
    const cols = 5;
    const rows = 5;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Base box with small overlap so zero gaps exist
        const left = (c / cols) * 100 - 2;
        const top = (r / rows) * 100 - 2;
        const width = (100 / cols) + 4;
        const height = (100 / rows) + 4;

        // Vector from screen center
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const dirX = (centerX - 50) / 50;
        const dirY = (centerY - 50) / 50;

        // Dynamic explosive trajectories
        const explodeX = dirX * 700 + (Math.random() - 0.5) * 400;
        const explodeY = dirY * 700 + (Math.random() - 0.5) * 400;
        const explodeZ = 300 + Math.random() * 600;
        const rotX = (Math.random() - 0.5) * 500;
        const rotY = (Math.random() - 0.5) * 500;
        const rotZ = (Math.random() - 0.5) * 400;
        const scale = 0.4 + Math.random() * 0.4;

        // Irregular jagged polygonal clip paths at random angles
        const p1 = `${Math.floor(Math.random() * 18)}% ${Math.floor(Math.random() * 18)}%`;
        const p2 = `${Math.floor(82 + Math.random() * 18)}% ${Math.floor(Math.random() * 22)}%`;
        const p3 = `${Math.floor(85 + Math.random() * 15)}% ${Math.floor(82 + Math.random() * 18)}%`;
        const p4 = `${Math.floor(Math.random() * 22)}% ${Math.floor(85 + Math.random() * 15)}%`;
        const clipPath = `polygon(${p1}, ${p2}, ${p3}, ${p4})`;

        list.push({
          id: r * cols + c,
          clipPath,
          left,
          top,
          width,
          height,
          explodeX,
          explodeY,
          explodeZ,
          rotX,
          rotY,
          rotZ,
          scale,
        });
      }
    }
    return list;
  }, []);

  // Accelerating shake class
  const getShakeClass = () => {
    if (phase === 'shake1') return 'animate-shake-gentle';
    if (phase === 'shake2') return 'animate-shake-medium';
    if (phase === 'shake3') return 'animate-shake-violent';
    return '';
  };

  return (
    <div 
      className="fixed inset-0 w-screen h-screen z-[100] overflow-hidden select-none pointer-events-none"
      style={{ perspective: '1400px' }}
    >
      {/* PHASE 1 & 2 (0 - 2.6s): Single SEAMLESS image with zero lines/seams, accelerating shake */}
      {phase !== 'shattered' ? (
        <div className={`w-full h-full ${getShakeClass()}`}>
          <img
            src="/images/hogwarts-loading.jpg"
            alt="Hogwarts Castle"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>
      ) : (
        /* PHASE 3 (2.6s+): Breaks into random jagged shards in random angles in 3D */
        <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
          {shards.map((s) => (
            <div
              key={s.id}
              className="absolute overflow-hidden"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.width}%`,
                height: `${s.height}%`,
                clipPath: s.clipPath,
                transformStyle: 'preserve-3d',
                transform: `translate3d(${s.explodeX}px, ${s.explodeY}px, ${s.explodeZ}px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg) rotateZ(${s.rotZ}deg) scale(${s.scale})`,
                opacity: 0,
                transition: 'transform 1.05s cubic-bezier(0.18, 0.95, 0.28, 1), opacity 0.85s ease-out',
                filter: 'drop-shadow(0 0 25px rgba(0,0,0,0.95))',
              }}
            >
              {/* Image correctly aligned inside each shard */}
              <div
                className="absolute"
                style={{
                  left: `-${s.left}vw`,
                  top: `-${s.top}vh`,
                  width: '100vw',
                  height: '100vh',
                  backgroundImage: "url('/images/hogwarts-loading.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Accelerating Shake Keyframes */}
      <style>{`
        @keyframes shakeGentle {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          20% { transform: translate(-2px, 1px) rotate(-0.3deg); }
          40% { transform: translate(2px, -1px) rotate(0.3deg); }
          60% { transform: translate(-1px, -2px) rotate(0.2deg); }
          80% { transform: translate(2px, 2px) rotate(-0.2deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }

        @keyframes shakeMedium {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          20% { transform: translate(-6px, 4px) rotate(-0.9deg); }
          40% { transform: translate(5px, -4px) rotate(0.8deg); }
          60% { transform: translate(-5px, -5px) rotate(0.7deg); }
          80% { transform: translate(6px, 5px) rotate(-0.8deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }

        @keyframes shakeViolent {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          10% { transform: translate(-15px, 9px) rotate(-2.5deg); }
          25% { transform: translate(14px, -11px) rotate(2.3deg); }
          40% { transform: translate(-12px, -12px) rotate(-2deg); }
          55% { transform: translate(16px, 11px) rotate(2.5deg); }
          70% { transform: translate(-15px, 10px) rotate(-2.2deg); }
          85% { transform: translate(16px, -10px) rotate(2.1deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }

        .animate-shake-gentle {
          animation: shakeGentle 0.22s linear infinite;
        }
        .animate-shake-medium {
          animation: shakeMedium 0.13s linear infinite;
        }
        .animate-shake-violent {
          animation: shakeViolent 0.07s linear infinite;
        }
      `}</style>
    </div>
  );
};
