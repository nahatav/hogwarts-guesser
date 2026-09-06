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
  const mousePosRef = useRef<{ x: number; y: number; active: boolean; isMouse: boolean }>({ x: 0, y: 0, active: false, isMouse: false });
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

    // Procedural High-Resolution Engraved Filigree Bump Texture
    const createSnitchBumpTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 1024, 512);

      // Etched seam lines and concentric circles around wing sockets (x=256 and x=768, y=256)
      ctx.strokeStyle = '#252525';
      ctx.lineWidth = 4;

      // Equator seam band
      ctx.beginPath();
      ctx.moveTo(0, 256);
      ctx.lineTo(1024, 256);
      ctx.stroke();

      // Etched concentric decorative rings around sockets
      [256, 768].forEach(cx => {
        for (let r = 24; r <= 140; r += 20) {
          ctx.lineWidth = r % 40 === 0 ? 3 : 1.5;
          ctx.beginPath();
          ctx.arc(cx, 256, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Radiating notched compass gears
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * 40, 256 + Math.sin(a) * 40);
          ctx.lineTo(cx + Math.cos(a) * 75, 256 + Math.sin(a) * 75);
          ctx.stroke();
        }
      });

      // Etched Art Nouveau filigree swirls across hemispheres
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 8; i++) {
        const sx = i * 128 + 64;
        ctx.beginPath();
        ctx.moveTo(sx, 120);
        ctx.bezierCurveTo(sx + 35, 80, sx + 50, 160, sx + 20, 220);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(sx, 392);
        ctx.bezierCurveTo(sx - 35, 432, sx - 50, 352, sx - 20, 292);
        ctx.stroke();
      }

      // Etched ancient inscription along equator
      ctx.font = 'bold 15px serif';
      ctx.fillStyle = '#222222';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦ I OPEN AT THE CLOSE ✦', 512, 238);
      ctx.fillText('✦ I OPEN AT THE CLOSE ✦', 512, 274);

      const bumpTexture = new THREE.CanvasTexture(canvas);
      bumpTexture.wrapS = THREE.RepeatWrapping;
      bumpTexture.wrapT = THREE.ClampToEdgeWrapping;
      return bumpTexture;
    };

    const bumpMap = createSnitchBumpTexture();

    // High detail Golden Sphere Body
    const sphereGeo = new THREE.SphereGeometry(0.85, 128, 128);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xdeb346,
      metalness: 0.98,
      roughness: 0.18,
      bumpMap: bumpMap || undefined,
      bumpScale: 0.045,
      emissive: 0x301e06,
      emissiveIntensity: 0.15,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, goldMat);
    snitchGroup.add(sphereMesh);
    sphereMeshRef.current = sphereMesh;

    // Engraved Seam Rings in Burnished Bronze
    const seamMat = new THREE.MeshStandardMaterial({
      color: 0x966e35,
      metalness: 0.92,
      roughness: 0.28,
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

    // Mechanical Wing Sockets & Pivot Gimbal
    const socketMat = new THREE.MeshStandardMaterial({
      color: 0x7a5522,
      metalness: 0.95,
      roughness: 0.35,
    });
    const pivotBallMat = new THREE.MeshStandardMaterial({
      color: 0xd8c8a8,
      metalness: 0.95,
      roughness: 0.12,
    });

    const createSocket = (side: 1 | -1) => {
      const socketGroup = new THREE.Group();
      socketGroup.position.set(side * 0.82, 0.28, 0);

      // Bezel collar ring
      const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.024, 24, 48), socketMat);
      bezel.rotation.y = Math.PI / 2;
      socketGroup.add(bezel);

      // Inner stepped cylinder collar
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.08, 32), socketMat);
      collar.rotation.z = Math.PI / 2;
      socketGroup.add(collar);

      // 6 Rivet studs
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const rivet = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), socketMat);
        rivet.position.set(0, Math.cos(angle) * 0.17, Math.sin(angle) * 0.17);
        socketGroup.add(rivet);
      }

      // Ball gimbal pivot
      const pivotBall = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), pivotBallMat);
      socketGroup.add(pivotBall);

      return socketGroup;
    };

    snitchGroup.add(createSocket(-1));
    snitchGroup.add(createSocket(1));

    // Detailed Gossamer Feather Wing Shape
    const createWingShape = () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(-0.6, 0.45, -1.6, 0.85, -3.2, 0.65);
      shape.bezierCurveTo(-3.7, 0.55, -4.0, 0.25, -3.7, -0.08);
      
      // Feathered scalloped edge indentations
      shape.bezierCurveTo(-3.2, 0.02, -2.9, -0.22, -2.6, -0.1);
      shape.bezierCurveTo(-2.3, -0.22, -2.0, -0.32, -1.8, -0.16);
      shape.bezierCurveTo(-1.5, -0.32, -1.2, -0.42, -0.9, -0.2);
      shape.bezierCurveTo(-0.5, -0.25, -0.2, -0.1, 0, 0);
      return shape;
    };

    // Smaller Secondary Covert Feather Shape (Layer 2)
    const createCovertWingShape = () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(-0.4, 0.3, -1.0, 0.55, -1.8, 0.4);
      shape.bezierCurveTo(-2.1, 0.35, -2.2, 0.15, -2.0, -0.05);
      shape.bezierCurveTo(-1.6, -0.15, -1.2, -0.22, -0.7, -0.1);
      shape.bezierCurveTo(-0.3, -0.12, -0.1, -0.05, 0, 0);
      return shape;
    };

    const wingGeo = new THREE.ShapeGeometry(createWingShape(), 48);
    const covertWingGeo = new THREE.ShapeGeometry(createCovertWingShape(), 32);

    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xf5eedc,
      roughness: 0.12,
      metalness: 0.85,
      transparent: true,
      opacity: 0.86,
      side: THREE.DoubleSide,
    });

    const covertMat = new THREE.MeshStandardMaterial({
      color: 0xe8dcc8,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.82,
      side: THREE.DoubleSide,
    });

    // Left Wing Pivot Group
    const leftWingGroup = new THREE.Group();
    leftWingGroup.position.set(-0.82, 0.28, 0);

    // Primary long wing mesh
    const leftWingMesh = new THREE.Mesh(wingGeo, wingMat);
    leftWingMesh.rotation.z = 0.18;
    leftWingGroup.add(leftWingMesh);

    // Secondary overlapping covert wing mesh (mechanical feather layering)
    const leftCovertMesh = new THREE.Mesh(covertWingGeo, covertMat);
    leftCovertMesh.rotation.z = 0.14;
    leftCovertMesh.position.set(0, 0, 0.02);
    leftWingGroup.add(leftCovertMesh);

    // Main curved quill rachis spine
    const spineMat = new THREE.MeshStandardMaterial({ color: 0xb89240, metalness: 0.95, roughness: 0.2 });
    const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.006, 3.4, 16), spineMat);
    spine.position.set(-1.6, 0.32, 0.015);
    spine.rotation.z = Math.PI / 2 - 0.08;
    leftWingMesh.add(spine);

    // 6 Branching structural quill veins
    const veinMat = new THREE.MeshBasicMaterial({ color: 0xb89240, transparent: true, opacity: 0.75 });
    for (let i = 1; i <= 6; i++) {
      const veinLen = 0.6 - (i * 0.06);
      const vein = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.003, veinLen, 8), veinMat);
      vein.position.set(-0.4 - (i * 0.45), 0.28 - (i * 0.1), 0.015);
      vein.rotation.z = Math.PI / 2 - (i * 0.12);
      leftWingMesh.add(vein);
    }
    
    snitchGroup.add(leftWingGroup);
    leftWingRef.current = leftWingGroup;

    // Right Wing Pivot Group (Mirrored)
    const rightWingGroup = new THREE.Group();
    rightWingGroup.position.set(0.82, 0.28, 0);

    const rightWingGeo = wingGeo.clone();
    rightWingGeo.scale(-1, 1, 1);
    const rightWingMesh = new THREE.Mesh(rightWingGeo, wingMat);
    rightWingMesh.rotation.z = -0.18;
    rightWingGroup.add(rightWingMesh);

    const rightCovertGeo = covertWingGeo.clone();
    rightCovertGeo.scale(-1, 1, 1);
    const rightCovertMesh = new THREE.Mesh(rightCovertGeo, covertMat);
    rightCovertMesh.rotation.z = -0.14;
    rightCovertMesh.position.set(0, 0, 0.02);
    rightWingGroup.add(rightCovertMesh);

    // Mirrored spine
    const rightSpine = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.006, 3.4, 16), spineMat);
    rightSpine.position.set(1.6, 0.32, 0.015);
    rightSpine.rotation.z = -(Math.PI / 2 - 0.08);
    rightWingMesh.add(rightSpine);

    // 6 Mirrored branching quill veins
    for (let i = 1; i <= 6; i++) {
      const veinLen = 0.6 - (i * 0.06);
      const vein = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.003, veinLen, 8), veinMat);
      vein.position.set(0.4 + (i * 0.45), 0.28 - (i * 0.1), 0.015);
      vein.rotation.z = -(Math.PI / 2 - (i * 0.12));
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
      // Only track mouse hover evasion - NEVER repel from touch taps on mobile!
      if (e.pointerType === 'touch') return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosRef.current = { x: nx, y: ny, active: true, isMouse: true };
    };

    // Robust Catch Check: Combines 3D raycasting with 2D screen-space pixel proximity
    const tryCatchAtScreenCoord = (clientX: number, clientY: number, tolerancePx: number = 85) => {
      if (!cameraRef.current || !snitchGroupRef.current || isExplodingRef.current) return false;

      // 1. Raycast test
      const nx = (clientX / window.innerWidth) * 2 - 1;
      const ny = -(clientY / window.innerHeight) * 2 + 1;
      raycasterRef.current.setFromCamera(new THREE.Vector2(nx, ny), cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(snitchGroupRef.current.children, true);
      if (intersects.length > 0) {
        handleCatch();
        return true;
      }

      // 2. 2D Screen-space proximity test (crucial for responsive mobile touch catching)
      const snitchPos = new THREE.Vector3();
      snitchGroupRef.current.getWorldPosition(snitchPos);
      const projected = snitchPos.clone().project(cameraRef.current);

      // Verify snitch is in front of camera
      if (projected.z < 1.0) {
        const snitchScreenX = (projected.x * 0.5 + 0.5) * window.innerWidth;
        const snitchScreenY = (-(projected.y * 0.5) + 0.5) * window.innerHeight;
        const dist = Math.hypot(clientX - snitchScreenX, clientY - snitchScreenY);

        if (dist <= tolerancePx) {
          handleCatch();
          return true;
        }
      }

      return false;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const tolerance = e.pointerType === 'touch' ? 95 : 55;
      tryCatchAtScreenCoord(e.clientX, e.clientY, tolerance);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        tryCatchAtScreenCoord(touch.clientX, touch.clientY, 100);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

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
      const isPortrait = aspect < 1.0;
      const vHalfHeight = 24 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const vHalfWidth = vHalfHeight * aspect;

      // In portrait (mobile phones), scale down slightly so the snitch and its wings fit comfortably
      const targetScale = isPortrait ? 0.76 : 1.0;
      if (!isExplodingRef.current) {
        snitchGroup.scale.setScalar(targetScale);
      }

      // Safe boundaries that keep the snitch body and wings well inside the screen frame
      const wingBuffer = isPortrait ? 2.5 : 2.0;
      const maxBoundX = Math.max(1.2, vHalfWidth - wingBuffer);
      const maxBoundY = Math.max(2.8, vHalfHeight - 2.8);

      const t = elapsed * 0.85;
      const radiusX = maxBoundX * 0.75;
      const radiusY = maxBoundY * 0.75;
      const radiusZ = 2.4;

      let targetX = Math.sin(t * 0.7) * radiusX + Math.sin(t * 1.7) * (radiusX * 0.22);
      let targetY = Math.cos(t * 0.9) * radiusY + Math.sin(t * 2.1) * (radiusY * 0.22);
      let targetZ = Math.sin(t * 1.3) * radiusZ;

      // Mouse repulsion ONLY if using an actual mouse pointer (never on touch screens)
      if (mousePosRef.current.active && mousePosRef.current.isMouse && cameraRef.current) {
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
          const scale = targetScale * (1 + explodeProgress * 22); // rapid explosion scale
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
      window.removeEventListener('touchstart', handleTouchStart);
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

      {/* Intro Prompt: Catch the Golden Snitch to Begin */}
      {isIntro && (
        <div 
          className="fixed top-11 sm:top-8 inset-x-0 mx-auto w-fit max-w-[92vw] z-50 px-4 sm:px-6 py-2 sm:py-2.5 rounded-sm border-2 border-[#5c3a1e] text-center animate-in fade-in slide-in-from-top-4 duration-500 pointer-events-none shadow-xl select-none"
          style={{
            background: 'linear-gradient(135deg, #faf5e8 0%, #f4ead2 50%, #eadbb6 100%)',
            boxShadow: 'inset 0 0 20px rgba(120, 75, 30, 0.22), 0 15px 40px rgba(0, 0, 0, 0.85)',
          }}
        >
          <p className="font-cinzel text-[11px] sm:text-sm font-bold tracking-[0.14em] sm:tracking-[0.2em] text-[#16110b] uppercase">
            ✦ Catch the Golden Snitch to Begin ✦
          </p>
          <p className="font-cinzel text-[9px] sm:text-[10px] text-[#781d1d] font-semibold tracking-wider uppercase mt-0.5 sm:hidden">
            Tap the Snitch to Enter Hogwarts
          </p>
        </div>
      )}

      {/* Clean Catch Notification Banner (Only during normal game, not intro) */}
      {!isIntro && showCatchBanner && (
        <div 
          className="fixed top-14 sm:top-16 inset-x-0 mx-auto w-fit max-w-[92vw] z-50 px-5 sm:px-8 py-3 sm:py-4 rounded-sm border-2 border-[#5c3a1e] text-center animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #faf5e8 0%, #f4ead2 50%, #eadbb6 100%)',
            boxShadow: 'inset 0 0 25px rgba(120, 75, 30, 0.22), 0 20px 60px rgba(0, 0, 0, 0.9)',
          }}
        >
          <p className="font-cinzel text-[9px] sm:text-[10px] tracking-widest text-[#614124] uppercase font-bold mb-1">
            Quidditch Victory
          </p>
          <h3 className="font-cinzel font-bold text-lg sm:text-xl text-[#781d1d] tracking-widest uppercase leading-none">
            Snitch Captured!
          </h3>
          <p className="text-[9px] sm:text-[10px] font-cinzel font-bold tracking-widest text-[#16110b] mt-1.5 sm:mt-2 uppercase">
            +{caughtCount * 150} Points
          </p>
        </div>
      )}
    </>
  );
};
