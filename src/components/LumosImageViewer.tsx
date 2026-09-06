import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Location3D } from '../types/game';
import { sound } from '../utils/audio';

interface LumosImageViewerProps {
  location: Location3D;
}

export const LumosImageViewer: React.FC<LumosImageViewerProps> = ({ location }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track Lumos light position (in pixels relative to container)
  const [lightPos, setLightPos] = useState<{ x: number; y: number }>(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
  }));
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Initialize position at screen center upon location change
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setLightPos({
        x: rect.width / 2,
        y: rect.height / 2,
      });
    }
  }, [location.id]);

  const updateLightFromEvent = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    setLightPos({ x, y });

    if (!hasInteracted) {
      setHasInteracted(true);
      sound.playWandWhoosh();
    }
  }, [hasInteracted]);

  // Pointer / Mouse events
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    updateLightFromEvent(e.clientX, e.clientY);
    setIsHovering(true);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    updateLightFromEvent(e.clientX, e.clientY);
    setIsHovering(true);
  };

  // Touch events for ultra-fast mobile responsiveness
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      updateLightFromEvent(touch.clientX, touch.clientY);
      setIsHovering(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      updateLightFromEvent(touch.clientX, touch.clientY);
      setIsHovering(true);
    }
  };

  // Image source path
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL;
  const imageSrc = `${baseUrl}/panoramas/${location.id}.jpg`;

  // Lumos mask radius (slightly more generous on mobile touch)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const beamRadius = isMobile ? 220 : 260;
  const coreRadius = isMobile ? 90 : 110;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      className="relative w-full h-full overflow-hidden select-none cursor-crosshair touch-none bg-[#050302]"
    >
      {/* 1. Base Layer: Heavily darkened, shadowy ambient room */}
      <img
        src={imageSrc}
        alt={location.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none filter brightness-[0.14] contrast-[1.1] saturate-[0.7]"
      />

      {/* 2. Darkness Vignette Layer */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* 3. Lumos Light Beam Layer: Full color image revealed inside the light circle */}
      <div
        className="absolute inset-0 pointer-events-none select-none transition-[opacity] duration-150"
        style={{
          maskImage: `radial-gradient(circle ${beamRadius}px at ${lightPos.x}px ${lightPos.y}px, black 0%, rgba(0,0,0,0.95) ${coreRadius}px, rgba(0,0,0,0.3) ${beamRadius * 0.75}px, transparent ${beamRadius}px)`,
          WebkitMaskImage: `radial-gradient(circle ${beamRadius}px at ${lightPos.x}px ${lightPos.y}px, black 0%, rgba(0,0,0,0.95) ${coreRadius}px, rgba(0,0,0,0.3) ${beamRadius * 0.75}px, transparent ${beamRadius}px)`,
        }}
      >
        <img
          src={imageSrc}
          alt={location.name}
          className="w-full h-full object-cover filter brightness-[1.08] contrast-[1.05] saturate-[1.15]"
        />
      </div>

      {/* 4. Radiant Warm Magical Aura & Beam Bloom */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: `radial-gradient(circle ${beamRadius * 1.1}px at ${lightPos.x}px ${lightPos.y}px, rgba(255, 240, 195, 0.28) 0%, rgba(255, 218, 120, 0.14) ${coreRadius}px, rgba(212, 160, 60, 0.05) ${beamRadius * 0.7}px, transparent ${beamRadius * 1.1}px)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* 5. Lumos Wand Tip Spark & Magical Point Light */}
      <div
        className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full pointer-events-none transition-transform duration-75"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          background: 'radial-gradient(circle at center, #ffffff 0%, #fff4c2 35%, rgba(255, 215, 0, 0.4) 65%, transparent 100%)',
          boxShadow: '0 0 16px 4px rgba(255, 235, 160, 0.8), 0 0 35px 10px rgba(212, 175, 55, 0.45)',
          transform: isHovering ? 'scale(1.15)' : 'scale(1)',
        }}
      />

      {/* 6. Subtle Initial Hint Badge (Fades away once candidate taps/casts Lumos) */}
      {!hasInteracted && (
        <div 
          className="absolute bottom-24 sm:bottom-20 inset-x-0 mx-auto w-fit z-20 px-5 py-2 rounded-sm border border-[#8b5a2b]/60 text-center animate-pulse pointer-events-none shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(250, 245, 232, 0.94) 0%, rgba(234, 219, 182, 0.94) 100%)',
            boxShadow: 'inset 0 0 15px rgba(120, 75, 30, 0.2), 0 10px 30px rgba(0, 0, 0, 0.8)',
          }}
        >
          <p className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#16110b] uppercase">
            ✦ Cast Lumos • Tap or Drag to Illuminate ✦
          </p>
        </div>
      )}
    </div>
  );
};
