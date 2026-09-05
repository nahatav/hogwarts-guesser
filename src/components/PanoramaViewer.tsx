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
  const meshRef = useRef<THREE.Mesh | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const reqIdRef = useRef<number | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader>(new THREE.TextureLoader());

  // Camera orientation state
  const isUserInteractingRef = useRef<boolean>(false);
  const onPointerDownPointerXRef = useRef<number>(0);
  const onPointerDownPointerYRef = useRef<number>(0);
  const onPointerDownLonRef = useRef<number>(0);
  const onPointerDownLatRef = useRef<number>(0);

  const lonRef = useRef<number>(location.initialYaw || 0);
  const latRef = useRef<number>(location.initialPitch || 0);
  const fovRef = useRef<number>(55); // Start slightly zoomed in

  const [headingDegrees, setHeadingDegrees] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    lonRef.current = location.initialYaw || 0;
    latRef.current = location.initialPitch || 0;
    fovRef.current = 55;
  }, [location]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const applyTexture = (texture: THREE.Texture) => {
    if (!meshRef.current) return;
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
      side: THREE.DoubleSide,
    });

    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.dispose();
    }
    meshRef.current.material = material;
  };

  const loadLocationTexture = (loc: Location3D) => {
    // Strip leading slash if BASE_URL has a trailing slash, or just ensure correct concatenation.
    const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL.slice(0, -1) : import.meta.env.BASE_URL;
    const realImagePath = `${baseUrl}/panoramas/${loc.id}.jpg`;
    textureLoaderRef.current.load(
      realImagePath,
      (loadedTexture) => applyTexture(loadedTexture),
      undefined,
      () => {
        const panoCanvas = generateProceduralPanorama(loc);
        const canvasTexture = new THREE.CanvasTexture(panoCanvas);
        applyTexture(canvasTexture);
      }
    );
  };

  useEffect(() => {
    if (!sceneRef.current || !meshRef.current) return;
    loadLocationTexture(location);
  }, [location]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 2000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Create a curved cylinder segment instead of a full sphere to prevent crazy warping
    // params: radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength
    // 120 degree field of view = Math.PI * (2/3)
    const geometry = new THREE.CylinderGeometry(
      500, 500, 600, 
      64, 1, true, 
      -Math.PI / 3, // Start at -60 deg
      Math.PI * (2/3) // Span 120 deg
    );
    
    const initialMaterial = new THREE.MeshBasicMaterial({
      color: 0x080808,
      side: THREE.DoubleSide,
    });

    const cylinder = new THREE.Mesh(geometry, initialMaterial);
    
    // Scale X to mirror the texture so it renders correctly from inside
    cylinder.scale.x = -1;
    
    scene.add(cylinder);
    meshRef.current = cylinder;

    loadLocationTexture(location);

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      // Clamp panning tightly so we don't look past the edges of the curved screen
      latRef.current = Math.max(-25, Math.min(25, latRef.current));
      lonRef.current = Math.max(-35, Math.min(35, lonRef.current));
      
      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      const targetX = 500 * Math.sin(phi) * Math.sin(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.cos(theta);

      camera.lookAt(targetX, targetY, targetZ);
      
      const normalizedHeading = ((lonRef.current % 360) + 360) % 360;
      setHeadingDegrees(Math.round(normalizedHeading));

      renderer.render(scene, camera);
    };

    animate();

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
    lonRef.current = onPointerDownLonRef.current + deltaX * 0.12;
    latRef.current = onPointerDownLatRef.current - deltaY * 0.12;
  };

  const onPointerUp = () => {
    isUserInteractingRef.current = false;
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!cameraRef.current) return;
    const newFov = Math.max(25, Math.min(80, fovRef.current + e.deltaY * 0.05));
    fovRef.current = newFov;
    cameraRef.current.fov = newFov;
    cameraRef.current.updateProjectionMatrix();
  };

  const zoomIn = useCallback(() => {
    if (!cameraRef.current) return;
    fovRef.current = Math.max(25, fovRef.current - 10);
    cameraRef.current.fov = fovRef.current;
    cameraRef.current.updateProjectionMatrix();
  }, []);

  const zoomOut = useCallback(() => {
    if (!cameraRef.current) return;
    fovRef.current = Math.min(80, fovRef.current + 10);
    cameraRef.current.fov = fovRef.current;
    cameraRef.current.updateProjectionMatrix();
  }, []);

  const resetOrientation = useCallback(() => {
    lonRef.current = location.initialYaw || 0;
    latRef.current = location.initialPitch || 0;
    if (cameraRef.current) {
      fovRef.current = 55;
      cameraRef.current.fov = 55;
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
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Lumos Dark Mode Spotlight */}
      {lumosActive && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${mousePos.x}px ${mousePos.y}px, rgba(255,248,220,0.02) 0%, rgba(8,8,12,0.92) 60%, rgba(0,0,0,0.98) 100%)`,
            boxShadow: `inset 0 0 100px rgba(0,0,0,0.95)`
          }}
        >
          <div 
            className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-[#e8dcc8]/60 blur-[2px] pointer-events-none animate-pulse"
            style={{ left: mousePos.x, top: mousePos.y }}
          />
        </div>
      )}

      {/* Left HUD Controls (Compass + Lumos) */}
      <div className="absolute top-20 left-4 z-20 flex flex-col items-center gap-3">
        <div 
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#0d0b08]/80 border border-[#c9a84c]/30 shadow-[0_4px_16px_rgba(0,0,0,0.7)] backdrop-blur-sm"
          title={`Heading: ${headingDegrees}°`}
        >
          <div 
            className="transition-transform duration-75"
            style={{ transform: `rotate(${-headingDegrees}deg)` }}
          >
            <Compass className="w-6 h-6 text-[#c9a84c]" />
          </div>
        </div>

        {onLumosToggle && (
          <button
            onClick={onLumosToggle}
            className={`flex items-center justify-center w-11 h-11 rounded-full border shadow-[0_4px_16px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-colors duration-150 ${
              lumosActive
                ? 'bg-[#c9a84c]/90 text-black border-[#c9a84c]'
                : 'bg-[#0d0b08]/80 text-[#a09278] border-[#c9a84c]/30 hover:border-[#c9a84c]/60 hover:text-[#e8dcc8]'
            }`}
            title={lumosActive ? 'Nox (Disable)' : 'Lumos (Focus)'}
          >
            <Sparkles className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Right HUD Controls (Zoom + Reset) */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#0d0b08]/80 border border-[#c9a84c]/30 text-[#a09278] hover:text-[#e8dcc8] hover:border-[#c9a84c]/60 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] transition-colors duration-150"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={zoomOut}
          className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#0d0b08]/80 border border-[#c9a84c]/30 text-[#a09278] hover:text-[#e8dcc8] hover:border-[#c9a84c]/60 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] transition-colors duration-150"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetOrientation}
          className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#0d0b08]/80 border border-[#c9a84c]/30 text-[#a09278] hover:text-[#e8dcc8] hover:border-[#c9a84c]/60 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.7)] transition-colors duration-150 mt-1"
          title="Reset Camera View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Subtle Hint */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none hidden sm:block">
        <p className="text-[10px] font-cinzel tracking-widest text-[#a09278] uppercase drop-shadow-md">
          Drag to explore • Scroll to zoom
        </p>
      </div>
    </div>
  );
};
