import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import type { Location3D } from '../types/game';
import { Compass, ZoomIn, ZoomOut, RotateCcw, Sparkles } from 'lucide-react';
import { generateProceduralPanorama } from '../utils/panoramaGenerator';

interface PanoramaViewerProps {
  location: Location3D;
  lumosActive: boolean;
  onLumosToggle?: () => void;
}

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
  location,
  lumosActive,
  onLumosToggle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const reqIdRef = useRef<number | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader>(new THREE.TextureLoader());

  // Camera orientation state (spherical coords)
  const isUserInteractingRef = useRef<boolean>(false);
  const onPointerDownPointerXRef = useRef<number>(0);
  const onPointerDownPointerYRef = useRef<number>(0);
  const onPointerDownLonRef = useRef<number>(0);
  const onPointerDownLatRef = useRef<number>(0);

  const lonRef = useRef<number>(location.initialYaw || 0);
  const latRef = useRef<number>(location.initialPitch || 0);
  const fovRef = useRef<number>(75);

  const [headingDegrees, setHeadingDegrees] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Reset orientation on location change
  useEffect(() => {
    lonRef.current = location.initialYaw || 0;
    latRef.current = location.initialPitch || 0;
    fovRef.current = 75;
  }, [location]);

  // Track mouse for Lumos spotlight
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Helper to apply texture to sphere
  const applyTexture = (texture: THREE.Texture) => {
    if (!sphereMeshRef.current) return;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;

    if (textureRef.current && textureRef.current !== texture) {
      textureRef.current.dispose();
    }
    textureRef.current = texture;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide, // Ensure always visible from inside
    });

    if (sphereMeshRef.current.material instanceof THREE.Material) {
      sphereMeshRef.current.material.dispose();
    }
    sphereMeshRef.current.material = material;
  };

  // Load real high-res online image texture or fallback to procedural canvas
  const loadLocationTexture = (loc: Location3D) => {
    const realImagePath = `/panoramas/${loc.id}.jpg`;

    textureLoaderRef.current.load(
      realImagePath,
      (loadedTexture) => {
        applyTexture(loadedTexture);
      },
      undefined,
      () => {
        // Fallback to procedural generator if image file not loaded
        const panoCanvas = generateProceduralPanorama(loc);
        const canvasTexture = new THREE.CanvasTexture(panoCanvas);
        applyTexture(canvasTexture);
      }
    );
  };

  // Update texture on location change
  useEffect(() => {
    if (!sceneRef.current || !sphereMeshRef.current) return;
    loadLocationTexture(location);
  }, [location]);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Create 360 Sphere Geometry (radius 500)
    const geometry = new THREE.SphereGeometry(500, 64, 32);
    const initialMaterial = new THREE.MeshBasicMaterial({
      color: 0x111111,
      side: THREE.DoubleSide,
    });

    const sphere = new THREE.Mesh(geometry, initialMaterial);
    scene.add(sphere);
    sphereMeshRef.current = sphere;

    // Load initial texture
    loadLocationTexture(location);

    // Animation Loop
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      // Clamp latitude to prevent flipping
      latRef.current = Math.max(-85, Math.min(85, latRef.current));
      
      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      const targetX = 500 * Math.sin(phi) * Math.cos(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(targetX, targetY, targetZ);
      
      // Update heading indicator
      const normalizedHeading = ((lonRef.current % 360) + 360) % 360;
      setHeadingDegrees(Math.round(normalizedHeading));

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      if (textureRef.current) textureRef.current.dispose();
      geometry.dispose();
      initialMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Mouse & Touch Pan Interaction Listeners
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isUserInteractingRef.current = true;
    onPointerDownPointerXRef.current = e.clientX;
    onPointerDownPointerYRef.current = e.clientY;
    onPointerDownLonRef.current = lonRef.current;
    onPointerDownLatRef.current = latRef.current;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isUserInteractingRef.current) return;
    const deltaX = e.clientX - onPointerDownPointerXRef.current;
    const deltaY = e.clientY - onPointerDownPointerYRef.current;
    
    // Smooth camera rotation
    lonRef.current = onPointerDownLonRef.current - deltaX * 0.18;
    latRef.current = onPointerDownLatRef.current + deltaY * 0.18;
  };

  const onPointerUp = () => {
    isUserInteractingRef.current = false;
  };

  // Scroll to Zoom
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!cameraRef.current) return;
    const newFov = Math.max(35, Math.min(100, fovRef.current + e.deltaY * 0.05));
    fovRef.current = newFov;
    cameraRef.current.fov = newFov;
    cameraRef.current.updateProjectionMatrix();
  };

  const zoomIn = useCallback(() => {
    if (!cameraRef.current) return;
    fovRef.current = Math.max(35, fovRef.current - 12);
    cameraRef.current.fov = fovRef.current;
    cameraRef.current.updateProjectionMatrix();
  }, []);

  const zoomOut = useCallback(() => {
    if (!cameraRef.current) return;
    fovRef.current = Math.min(100, fovRef.current + 12);
    cameraRef.current.fov = fovRef.current;
    cameraRef.current.updateProjectionMatrix();
  }, []);

  const resetOrientation = useCallback(() => {
    lonRef.current = location.initialYaw || 0;
    latRef.current = location.initialPitch || 0;
    if (cameraRef.current) {
      fovRef.current = 75;
      cameraRef.current.fov = 75;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [location]);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-black cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onMouseMove={handleMouseMove}
      onWheel={onWheel}
    >
      {/* WebGL Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Lumos Dark Mode Spotlight Overlay */}
      {lumosActive && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${mousePos.x}px ${mousePos.y}px, rgba(255,248,220,0.05) 0%, rgba(10,12,24,0.85) 60%, rgba(0,0,0,0.98) 100%)`,
            boxShadow: `inset 0 0 100px rgba(0,0,0,0.95)`
          }}
        >
          {/* Wand tip glow cursor */}
          <div 
            className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-cyan-200/80 blur-sm pointer-events-none animate-pulse"
            style={{ left: mousePos.x, top: mousePos.y }}
          />
        </div>
      )}

      {/* Floating HUD Controls */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        {/* Magical Compass */}
        <div 
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#1c1815]/85 border border-[#d4af37]/60 shadow-[0_0_15px_rgba(212,175,55,0.25)] backdrop-blur-md"
          title={`Heading: ${headingDegrees}°`}
        >
          <div 
            className="w-full h-full flex items-center justify-center transition-transform duration-75"
            style={{ transform: `rotate(${-headingDegrees}deg)` }}
          >
            <Compass className="w-8 h-8 text-[#d4af37]" />
          </div>
          <span className="absolute -bottom-5 text-[10px] tracking-widest text-[#d4af37] font-serif font-bold uppercase">
            {headingDegrees}°
          </span>
        </div>

        {/* Lumos Spell Toggle Button */}
        {onLumosToggle && (
          <button
            onClick={onLumosToggle}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-serif tracking-wide transition-all backdrop-blur-md shadow-lg ${
              lumosActive
                ? 'bg-[#d4af37]/90 text-black border-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.6)]'
                : 'bg-[#1c1815]/80 text-[#e6d5b8] border-[#8c734b]/60 hover:border-[#d4af37] hover:text-[#d4af37]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-current animate-spin" style={{ animationDuration: '6s' }} />
            <span>{lumosActive ? 'Nox (Disable)' : 'Lumos (Focus)'}</span>
          </button>
        )}
      </div>

      {/* Right Zoom / Reset Controls */}
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="p-2.5 rounded-lg bg-[#1c1815]/85 border border-[#8c734b]/60 text-[#d4af37] hover:bg-[#2e261f] hover:border-[#d4af37] transition shadow-md backdrop-blur-sm"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={zoomOut}
          className="p-2.5 rounded-lg bg-[#1c1815]/85 border border-[#8c734b]/60 text-[#d4af37] hover:bg-[#2e261f] hover:border-[#d4af37] transition shadow-md backdrop-blur-sm"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={resetOrientation}
          className="p-2.5 rounded-lg bg-[#1c1815]/85 border border-[#8c734b]/60 text-[#d4af37] hover:bg-[#2e261f] hover:border-[#d4af37] transition shadow-md backdrop-blur-sm"
          title="Reset Camera View"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Hint / Instructions subtle overlay */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none opacity-70 hover:opacity-100 transition-opacity">
        <p className="text-[12px] font-serif tracking-wider text-[#e6d5b8] bg-[#141210]/80 px-3 py-1.5 rounded-md border border-[#8c734b]/40 backdrop-blur-sm">
          ✦ Click & Drag to look around 360° | Scroll to Zoom
        </p>
      </div>
    </div>
  );
};
