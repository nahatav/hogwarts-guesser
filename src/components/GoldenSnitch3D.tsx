import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface GoldenSnitch3DProps {
  onSnitchCatch?: () => void;
  isIntro?: boolean;
  onIntroComplete?: () => void;
}

export const GoldenSnitch3D: React.FC<GoldenSnitch3DProps> = ({ onSnitchCatch, isIntro, onIntroComplete }) => {
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
  const introCompleteCalledRef = useRef<boolean>(false);
  const isExplodingRef = useRef<boolean>(false);
  const explodeStartRef = useRef<number>(0);

  const handleCatch = useCallback(() => {
    sound.playWandWhoosh();
    setCaughtCount(prev => prev + 1);
    setShowCatchBanner(true);
    isSpinningRef.current = true;
    spinProgressRef.current = 0;

    if (isIntro) {
      isExplodingRef.current = true;
    }

    try {
      confetti({
        particleCount: isIntro ? 150 : 100,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#c9a84c', '#e8dcc8', '#ffffff', '#ffd700'],
        shapes: ['circle'],
        scalar: 1.4,
      });
    } catch {
      // ignore
    }

    if (onSnitchCatch) {
      onSnitchCatch();
    }

    setTimeout(() => {
      setShowCatchBanner(false);
    }, 3000);
  }, [onSnitchCatch, isIntro]);

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
    const ambientLight = new THREE.AmbientLight(0xfff3db, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3.0);
    dirLight1.position.set(10, 15, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffdf70, 2.0);
    dirLight2.position.set(-12, -8, 8);
    scene.add(dirLight2);

    const snitchPointLight = new THREE.PointLight(0xc9a84c, 2.0, 15);
    scene.add(snitchPointLight);

    // 3. Golden Snitch Group
    const snitchGroup = new THREE.Group();
    scene.add(snitchGroup);
    snitchGroupRef.current = snitchGroup;

    // High detail Golden Sphere Body
    const sphereGeo = new THREE.SphereGeometry(0.85, 128, 128); // Increased geometry detail
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      metalness: 1.0,
      roughness: 0.15,
      emissive: 0x221100,
      emissiveIntensity: 0.2,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, goldMat);
    snitchGroup.add(sphereMesh);
    sphereMeshRef.current = sphereMesh;

    // Highly detailed Engraved Seam Rings & Runes
    const seamMat = new THREE.MeshStandardMaterial({
      color: 0x8c734b,
      metalness: 0.9,
      roughness: 0.3,
    });

    const createRing = (radius: number, tube: number, rx: number, ry: number, rz: number) => {
      const geo = new THREE.TorusGeometry(radius, tube, 32, 128);
      const mesh = new THREE.Mesh(geo, seamMat);
      mesh.rotation.set(rx, ry, rz);
      return mesh;
    };

    snitchGroup.add(createRing(0.855, 0.015, 0, 0, 0)); // Equator
    snitchGroup.add(createRing(0.855, 0.015, Math.PI / 2, 0, 0)); // Meridian
    snitchGroup.add(createRing(0.855, 0.01, Math.PI / 4, Math.PI / 4, 0)); // Diagonal 1
    snitchGroup.add(createRing(0.855, 0.01, -Math.PI / 4, Math.PI / 4, 0)); // Diagonal 2
    snitchGroup.add(createRing(0.855, 0.01, Math.PI / 4, -Math.PI / 4, 0)); // Diagonal 3
    snitchGroup.add(createRing(0.855, 0.01, -Math.PI / 4, -Math.PI / 4, 0)); // Diagonal 4

    // Detailed Gossamer Feather Wing Shape
    const createWingShape = () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(-0.5, 0.4, -1.5, 0.8, -3.0, 0.6);
      shape.bezierCurveTo(-3.5, 0.5, -3.8, 0.2, -3.5, -0.1);
      
      // Feathered edge indentations
      shape.bezierCurveTo(-3.0, 0.0, -2.8, -0.2, -2.5, -0.1);
      shape.bezierCurveTo(-2.2, -0.2, -2.0, -0.3, -1.8, -0.15);
      shape.bezierCurveTo(-1.5, -0.3, -1.2, -0.4, -0.8, -0.2);
      
      shape.bezierCurveTo(-0.4, -0.1, -0.2, 0, 0, 0);
      return shape;
    };

    const wingGeo = new THREE.ShapeGeometry(createWingShape(), 32); // High detail curve
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xe8dcc8,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });

    // Left Wing Pivot Group
    const leftWingGroup = new THREE.Group();
    leftWingGroup.position.set(-0.75, 0.35, 0);
    const leftWingMesh = new THREE.Mesh(wingGeo, wingMat);
    leftWingMesh.rotation.z = 0.2;
    leftWingGroup.add(leftWingMesh);
    
    // Add wing veins/ridges
    const veinMat = new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.6 });
    for (let i = 1; i <= 3; i++) {
      const vein = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.005, 2.5), veinMat);
      vein.position.set(-1.2, 0.3 - (i * 0.15), 0.01);
      vein.rotation.z = Math.PI / 2 - (i * 0.1);
      leftWingMesh.add(vein);
    }
    
    snitchGroup.add(leftWingGroup);
    leftWingRef.current = leftWingGroup;

    // Right Wing Pivot Group (Mirrored)
    const rightWingGroup = new THREE.Group();
    rightWingGroup.position.set(0.75, 0.35, 0);
    const rightWingGeo = wingGeo.clone();
    rightWingGeo.scale(-1, 1, 1);
    const rightWingMesh = new THREE.Mesh(rightWingGeo, wingMat);
    rightWingMesh.rotation.z = -0.2;
    
    // Add wing veins/ridges (mirrored)
    for (let i = 1; i <= 3; i++) {
      const vein = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.005, 2.5), veinMat);
      vein.position.set(1.2, 0.3 - (i * 0.15), 0.01);
      vein.rotation.z = -(Math.PI / 2 - (i * 0.1));
      rightWingMesh.add(vein);
    }

    rightWingGroup.add(rightWingMesh);
    snitchGroup.add(rightWingGroup);
    rightWingRef.current = rightWingGroup;

    // 4. Sparkle Particle Trail
    const particleCount = 100;
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
      grad.addColorStop(0, 'rgba(201, 168, 76, 1)');
      grad.addColorStop(0.4, 'rgba(201, 168, 76, 0.6)');
      grad.addColorStop(1, 'rgba(201, 168, 76, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    const particleTexture = new THREE.CanvasTexture(canvas);
    const trailMat = new THREE.PointsMaterial({
      size: 0.6,
      map: particleTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const trailPoints = new THREE.Points(trailGeo, trailMat);
    scene.add(trailPoints);
    trailRef.current = trailPoints;
    trailPositionsRef.current = trailPositions;

    // Invisible generous hitbox for easy tapping on touch & mobile screens
    const hitboxGeo = new THREE.SphereGeometry(2.4, 16, 16);
    const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitboxMesh = new THREE.Mesh(hitboxGeo, hitboxMat);
    snitchGroup.add(hitboxMesh);

    // Mouse & Touch Tracking
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosRef.current = { x: nx, y: ny, active: true };
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!cameraRef.current || !snitchGroupRef.current || isExplodingRef.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(new THREE.Vector2(nx, ny), cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(snitchGroupRef.current.children, true);
      if (intersects.length > 0) {
        handleCatch();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);

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

      // Calculate visible frustum bounds at z = 0 based on camera FOV & aspect ratio
      const aspect = camera.aspect || (window.innerWidth / window.innerHeight);
      const vHalfHeight = 24 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const vHalfWidth = vHalfHeight * aspect;

      // Safe boundaries that keep the snitch body and wings well inside the screen frame
      const maxBoundX = Math.max(2.4, vHalfWidth - 1.8);
      const maxBoundY = Math.max(3.0, vHalfHeight - 2.5);

      const t = elapsed * 0.85;
      const radiusX = maxBoundX * 0.75;
      const radiusY = maxBoundY * 0.75;
      const radiusZ = 2.4;

      let targetX = Math.sin(t * 0.7) * radiusX + Math.sin(t * 1.7) * (radiusX * 0.22);
      let targetY = Math.cos(t * 0.9) * radiusY + Math.sin(t * 2.1) * (radiusY * 0.22);
      let targetZ = Math.sin(t * 1.3) * radiusZ;

      if (mousePosRef.current.active && cameraRef.current) {
        const mouseWorldX = mousePosRef.current.x * maxBoundX;
        const mouseWorldY = mousePosRef.current.y * maxBoundY;
        const dist = Math.hypot(targetX - mouseWorldX, targetY - mouseWorldY);

        if (dist < 2.5) {
          const angle = Math.atan2(targetY - mouseWorldY, targetX - mouseWorldX);
          targetX += Math.cos(angle) * 2.5;
          targetY += Math.sin(angle) * 2.5;
        }
      }

      // Strictly clamp target within frame boundaries
      targetX = Math.max(-maxBoundX, Math.min(maxBoundX, targetX));
      targetY = Math.max(-maxBoundY, Math.min(maxBoundY, targetY));

      const currentPos = snitchGroup.position;

      if (isIntro && isExplodingRef.current) {
        if (explodeStartRef.current === 0) {
          explodeStartRef.current = elapsed;
        }
        const explodeProgress = (elapsed - explodeStartRef.current) / 0.35; // 350ms explosion
        if (explodeProgress < 1.0) {
          const scale = 1 + explodeProgress * 22; // rapid explosion scale
          snitchGroup.scale.set(scale, scale, scale);
          snitchPointLight.intensity = 4 + explodeProgress * 25;
        } else {
          snitchGroup.visible = false;
          if (onIntroComplete && !introCompleteCalledRef.current) {
            introCompleteCalledRef.current = true;
            onIntroComplete();
          }
        }
      } else {
        // Normal continuous flying
        currentPos.x += (targetX - currentPos.x) * 0.08;
        currentPos.y += (targetY - currentPos.y) * 0.08;
        currentPos.z += (targetZ - currentPos.z) * 0.08;

        currentPos.x = Math.max(-maxBoundX, Math.min(maxBoundX, currentPos.x));
        currentPos.y = Math.max(-maxBoundY, Math.min(maxBoundY, currentPos.y));
      }

      snitchPointLight.position.copy(currentPos);

      const velocity = new THREE.Vector3().subVectors(currentPos, prevPos);
      prevPos.copy(currentPos);

      if (isSpinningRef.current && !isIntro) {
        spinProgressRef.current += 0.15;
        snitchGroup.rotation.y += 0.45;
        snitchGroup.rotation.x += 0.25;
        if (spinProgressRef.current > Math.PI * 4) {
          isSpinningRef.current = false;
        }
      } else if (!isExplodingRef.current) {
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
      const flapSpeed = isSpinningRef.current ? 75 : 55;
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
      window.removeEventListener('pointerdown', handlePointerDown);
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

      {/* Clean Catch Notification Banner (Only during normal game, not intro) */}
      {!isIntro && showCatchBanner && (
        <div className="fixed top-16 inset-x-0 mx-auto w-fit z-50 px-8 py-4 bg-[#0d0b08] border border-[#c9a84c]/60 shadow-[0_20px_60px_rgba(0,0,0,0.95)] text-center animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
          <p className="font-cinzel text-[10px] tracking-widest text-[#a09278] uppercase font-bold mb-1">
            Quidditch Victory
          </p>
          <h3 className="font-cinzel text-xl text-[#c9a84c] tracking-widest uppercase leading-none">
            Snitch Captured!
          </h3>
          <p className="text-[10px] font-cinzel tracking-widest text-[#e8dcc8] mt-2 uppercase">
            +{caughtCount * 150} Points
          </p>
        </div>
      )}
    </>
  );
};
