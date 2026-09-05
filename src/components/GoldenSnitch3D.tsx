import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface GoldenSnitch3DProps {
  onSnitchCatch?: () => void;
}

export const GoldenSnitch3D: React.FC<GoldenSnitch3DProps> = ({ onSnitchCatch }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [caughtCount, setCaughtCount] = useState<number>(0);
  const [showCatchBanner, setShowCatchBanner] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const snitchGroupRef = useRef<THREE.Group | null>(null);
  const leftWingRef = useRef<THREE.Group | null>(null);
  const rightWingRef = useRef<THREE.Group | null>(null);
  const trailRef = useRef<THREE.Points | null>(null);
  const trailPositionsRef = useRef<Float32Array | null>(null);
  const trailIndexRef = useRef<number>(0);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const reqIdRef = useRef<number | null>(null);
  const isSpinningRef = useRef<boolean>(false);
  const spinProgressRef = useRef<number>(0);

  const handleCatch = useCallback(() => {
    sound.playWandWhoosh();
    setCaughtCount(prev => prev + 1);
    setShowCatchBanner(true);
    isSpinningRef.current = true;
    spinProgressRef.current = 0;

    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#f59e0b', '#fef08a', '#d97706', '#ffffff'],
        shapes: ['circle', 'star'],
        scalar: 1.2,
      });
    } catch (e) {}

    if (onSnitchCatch) {
      onSnitchCatch();
    }

    setTimeout(() => {
      setShowCatchBanner(false);
    }, 4200);
  }, [onSnitchCatch]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Warm lighting for radiant golden metal
    const ambientLight = new THREE.AmbientLight(0xfff3db, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight1.position.set(10, 15, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffdf70, 1.6);
    dirLight2.position.set(-12, -8, 8);
    scene.add(dirLight2);

    const snitchPointLight = new THREE.PointLight(0xffdf55, 2.4, 14);
    scene.add(snitchPointLight);

    // 3. Golden Snitch Group
    const snitchGroup = new THREE.Group();
    scene.add(snitchGroup);
    snitchGroupRef.current = snitchGroup;

    // Main Golden Sphere Body
    const sphereGeo = new THREE.SphereGeometry(0.85, 36, 36);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf5bf18,
      metalness: 0.94,
      roughness: 0.16,
      emissive: 0x4a3200,
      emissiveIntensity: 0.35,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, goldMat);
    snitchGroup.add(sphereMesh);
    sphereMeshRef.current = sphereMesh;

    // Engraved Seam Rings & Runes
    const seamMat = new THREE.MeshStandardMaterial({
      color: 0xc48c08,
      metalness: 0.88,
      roughness: 0.28,
    });
    const equatorRing = new THREE.Mesh(new THREE.TorusGeometry(0.855, 0.02, 16, 64), seamMat);
    snitchGroup.add(equatorRing);

    const meridianRing = new THREE.Mesh(new THREE.TorusGeometry(0.855, 0.02, 16, 64), seamMat);
    meridianRing.rotation.x = Math.PI / 2;
    snitchGroup.add(meridianRing);

    const diagonalRing = new THREE.Mesh(new THREE.TorusGeometry(0.854, 0.015, 16, 64), seamMat);
    diagonalRing.rotation.x = Math.PI / 4;
    diagonalRing.rotation.y = Math.PI / 4;
    snitchGroup.add(diagonalRing);

    // Gossamer Feather Wing Shape
    const createWingShape = () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(-0.6, 0.35, -1.6, 0.75, -2.8, 0.55);
      shape.bezierCurveTo(-3.3, 0.45, -3.4, 0.2, -3.1, -0.05);
      shape.bezierCurveTo(-2.4, -0.3, -1.4, -0.4, -0.6, -0.2);
      shape.bezierCurveTo(-0.3, -0.1, 0, 0, 0, 0);
      return shape;
    };

    const wingGeo = new THREE.ShapeGeometry(createWingShape(), 18);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xfffae8,
      roughness: 0.14,
      metalness: 0.35,
      transparent: true,
      opacity: 0.84,
      side: THREE.DoubleSide,
    });

    // Left Wing Pivot Group
    const leftWingGroup = new THREE.Group();
    leftWingGroup.position.set(-0.65, 0.3, 0);
    const leftWingMesh = new THREE.Mesh(wingGeo, wingMat);
    leftWingMesh.rotation.z = 0.2;
    leftWingGroup.add(leftWingMesh);
    snitchGroup.add(leftWingGroup);
    leftWingRef.current = leftWingGroup;

    // Right Wing Pivot Group (Mirrored)
    const rightWingGroup = new THREE.Group();
    rightWingGroup.position.set(0.65, 0.3, 0);
    const rightWingGeo = wingGeo.clone();
    rightWingGeo.scale(-1, 1, 1);
    const rightWingMesh = new THREE.Mesh(rightWingGeo, wingMat);
    rightWingMesh.rotation.z = -0.2;
    rightWingGroup.add(rightWingMesh);
    snitchGroup.add(rightWingGroup);
    rightWingRef.current = rightWingGroup;

    // 4. Sparkle Particle Trail
    const particleCount = 70;
    const trailPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      trailPositions[i * 3] = 0;
      trailPositions[i * 3 + 1] = 0;
      trailPositions[i * 3 + 2] = 0;
    }

    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 235, 120, 1)');
      grad.addColorStop(0.4, 'rgba(245, 180, 20, 0.7)');
      grad.addColorStop(1, 'rgba(245, 180, 20, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    const particleTexture = new THREE.CanvasTexture(canvas);
    const trailMat = new THREE.PointsMaterial({
      size: 0.75,
      map: particleTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const trailPoints = new THREE.Points(trailGeo, trailMat);
    scene.add(trailPoints);
    trailRef.current = trailPoints;
    trailPositionsRef.current = trailPositions;

    // Mouse Tracking
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosRef.current = { x: nx, y: ny, active: true };
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (!cameraRef.current || !snitchGroupRef.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(new THREE.Vector2(nx, ny), cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(snitchGroupRef.current.children, true);
      if (intersects.length > 0) {
        handleCatch();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handlePointerDown);

    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 5. Animation Loop
    const clock = new THREE.Clock();
    const prevPos = new THREE.Vector3();

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Multi-frequency 3D flight trajectory swooping across the landing page
      const t = elapsed * 0.85;
      const radiusX = 11.5;
      const radiusY = 5.8;
      const radiusZ = 3.2;

      let targetX = Math.sin(t * 0.7) * radiusX + Math.sin(t * 1.7) * 2.2;
      let targetY = Math.cos(t * 0.9) * radiusY + Math.sin(t * 2.1) * 1.3;
      let targetZ = Math.sin(t * 1.3) * radiusZ;

      if (mousePosRef.current.active && cameraRef.current) {
        const mouseWorldX = mousePosRef.current.x * radiusX * 1.1;
        const mouseWorldY = mousePosRef.current.y * radiusY * 1.1;
        const dist = Math.hypot(targetX - mouseWorldX, targetY - mouseWorldY);

        if (dist < 3.2) {
          const angle = Math.atan2(targetY - mouseWorldY, targetX - mouseWorldX);
          targetX += Math.cos(angle) * 3.4;
          targetY += Math.sin(angle) * 3.4;
        }
      }

      const currentPos = snitchGroup.position;
      currentPos.x += (targetX - currentPos.x) * 0.08;
      currentPos.y += (targetY - currentPos.y) * 0.08;
      currentPos.z += (targetZ - currentPos.z) * 0.08;

      snitchPointLight.position.copy(currentPos);

      const velocity = new THREE.Vector3().subVectors(currentPos, prevPos);
      prevPos.copy(currentPos);

      if (isSpinningRef.current) {
        spinProgressRef.current += 0.15;
        snitchGroup.rotation.y += 0.45;
        snitchGroup.rotation.x += 0.25;
        if (spinProgressRef.current > Math.PI * 4) {
          isSpinningRef.current = false;
        }
      } else {
        const speed = velocity.length();
        if (speed > 0.001) {
          const targetRotY = Math.atan2(velocity.x, velocity.z);
          const targetRotX = -velocity.y * 1.8;
          const targetRotZ = -velocity.x * 1.6;

          snitchGroup.rotation.y += (targetRotY - snitchGroup.rotation.y) * 0.1;
          snitchGroup.rotation.x += (targetRotX - snitchGroup.rotation.x) * 0.1;
          snitchGroup.rotation.z += (targetRotZ - snitchGroup.rotation.z) * 0.1;
        }
      }

      // High-Frequency Fluttering Wings
      const flapSpeed = isSpinningRef.current ? 65 : 44;
      const flapAngle = Math.sin(elapsed * flapSpeed) * 0.65;
      const flutterTwist = Math.cos(elapsed * flapSpeed * 0.8) * 0.22;

      if (leftWingRef.current) {
        leftWingRef.current.rotation.y = flapAngle;
        leftWingRef.current.rotation.x = flutterTwist;
      }
      if (rightWingRef.current) {
        rightWingRef.current.rotation.y = -flapAngle;
        rightWingRef.current.rotation.x = -flutterTwist;
      }

      // Update Particle Trail
      if (trailPositionsRef.current && trailRef.current) {
        const idx = trailIndexRef.current;
        trailPositionsRef.current[idx * 3] = currentPos.x + (Math.random() - 0.5) * 0.3;
        trailPositionsRef.current[idx * 3 + 1] = currentPos.y + (Math.random() - 0.5) * 0.3;
        trailPositionsRef.current[idx * 3 + 2] = currentPos.z + (Math.random() - 0.5) * 0.3;

        trailIndexRef.current = (idx + 1) % particleCount;
        trailRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleCatch]);

  return (
    <>
      {/* 3D Three.js Fullscreen Transparent Canvas */}
      <div
        ref={mountRef}
        className="fixed inset-0 z-30 pointer-events-none overflow-hidden"
      />

      {/* Floating Interactive Snitch Radar / Catch Counter Badge */}
      <div className="fixed top-3 right-4 z-40 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={handleCatch}
          className="px-3.5 py-1.5 rounded-full bg-[#1b1509]/95 border border-[#ffd700]/70 text-[#fef08a] hover:bg-[#2e210b] hover:border-[#ffd700] transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)] flex items-center gap-2 text-xs font-cinzel font-bold tracking-wider active:scale-95"
          title="Catch the flying Golden Snitch!"
        >
          <span className="animate-pulse text-sm">⚡</span>
          <span>Snitch in Flight</span>
          {caughtCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-[#ffd700] text-[#1a1200] text-[10px] font-black">
              +{caughtCount * 150} pts
            </span>
          )}
        </button>
      </div>

      {/* Celebratory Catch Notification Banner */}
      {showCatchBanner && (
        <div className="fixed top-16 inset-x-0 mx-auto w-fit z-50 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#181105] via-[#2f220a] to-[#181105] border-2 border-[#ffd700] text-[#fef9c3] shadow-[0_10px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(255,215,0,0.4)] text-center animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
          <p className="font-cinzel text-xs tracking-[0.25em] text-[#eab308] uppercase font-bold">
            ✦ QUIDDITCH VICTORY ✦
          </p>
          <h3 className="font-gothic text-2xl text-[#fff8db] leading-none mt-0.5">
            Golden Snitch Captured!
          </h3>
          <p className="text-xs font-serif text-[#fef08a] mt-1">
            +150 House Points Awarded!
          </p>
        </div>
      )}
    </>
  );
};
