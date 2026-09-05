import React, { useEffect, useRef } from 'react';
import { sound } from '../utils/audio';

interface HogwartsLoadingScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

interface CanvasShard {
  pts: { x: number; y: number }[];
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  vRot: number;
  rot: number;
  opacity: number;
}

export const HogwartsLoadingScreen: React.FC<HogwartsLoadingScreenProps> = ({
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Auto play theme song immediately
    sound.playThemeMusic(0.7);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isBroken = false;
    let shards: CanvasShard[] = [];

    const img = new Image();
    img.src = '/images/hogwarts-loading.jpg';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create random angular polygonal shards
    const generateShards = (W: number, H: number) => {
      const list: CanvasShard[] = [];
      const cols = 6;
      const rows = 5;

      // Jittered grid vertices
      const grid: { x: number; y: number }[][] = [];
      for (let r = 0; r <= rows; r++) {
        grid[r] = [];
        for (let c = 0; c <= cols; c++) {
          const baseX = (c / cols) * W;
          const baseY = (r / rows) * H;
          // Inner points get randomized jitter for jagged angular pieces
          const isEdge = c === 0 || c === cols || r === 0 || r === rows;
          const jx = isEdge ? baseX : baseX + (Math.random() - 0.5) * (W / cols) * 0.75;
          const jy = isEdge ? baseY : baseY + (Math.random() - 0.5) * (H / rows) * 0.75;
          grid[r].push({ x: jx, y: jy });
        }
      }

      // Cut into triangles at random angles
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p1 = grid[r][c];
          const p2 = grid[r][c + 1];
          const p3 = grid[r + 1][c];
          const p4 = grid[r + 1][c + 1];

          // 2 triangles per quad
          const tri1 = [p1, p2, p3];
          const tri2 = [p2, p4, p3];

          [tri1, tri2].forEach(pts => {
            const cx = (pts[0].x + pts[1].x + pts[2].x) / 3;
            const cy = (pts[0].y + pts[1].y + pts[2].y) / 3;

            const dx = cx - W / 2;
            const dy = cy - H / 2;
            const dist = Math.hypot(dx, dy) || 1;

            const speed = 10 + Math.random() * 20;
            const vx = (dx / dist) * speed + (Math.random() - 0.5) * 8;
            const vy = (dy / dist) * speed + (Math.random() - 0.5) * 8;
            const vRot = (Math.random() - 0.5) * 0.25;

            list.push({
              pts,
              cx,
              cy,
              vx,
              vy,
              vRot,
              rot: 0,
              opacity: 1,
            });
          });
        }
      }

      return list;
    };

    const startTime = performance.now();
    const STILL_MS = 500;
    const SHAKE_END_MS = 2500;
    const TOTAL_MS = 3600;

    const render = (now: number) => {
      const elapsed = now - startTime;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Compute cover dimensions for image
      let drawW = W;
      let drawH = H;
      let drawX = 0;
      let drawY = 0;

      if (img.complete && img.naturalWidth) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const screenRatio = W / H;
        if (screenRatio > imgRatio) {
          drawW = W;
          drawH = W / imgRatio;
          drawY = (H - drawH) / 2;
        } else {
          drawH = H;
          drawW = H * imgRatio;
          drawX = (W - drawW) / 2;
        }
      }

      // PHASE 1 & 2: STILL for 0.5s, then accelerating shake up to 2.5s
      if (elapsed < SHAKE_END_MS) {
        ctx.save();

        if (elapsed > STILL_MS) {
          // Accelerates shake quadratically as it approaches break
          const progress = (elapsed - STILL_MS) / (SHAKE_END_MS - STILL_MS);
          const intensity = Math.pow(progress, 2.5); // accelerating
          const maxOffset = 24 * intensity;
          const maxRot = 0.04 * intensity;

          const ox = (Math.random() - 0.5) * 2 * maxOffset;
          const oy = (Math.random() - 0.5) * 2 * maxOffset;
          const rot = (Math.random() - 0.5) * 2 * maxRot;

          ctx.translate(W / 2 + ox, H / 2 + oy);
          ctx.rotate(rot);
          ctx.translate(-W / 2, -H / 2);
        }

        // Draw solid seamless image with zero lines
        if (img.complete) {
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
        }

        ctx.restore();
      } 
      // PHASE 3: SHATTER BREAK into random shards in random angles!
      else {
        if (!isBroken) {
          isBroken = true;
          shards = generateShards(W, H);
          sound.playWandWhoosh();
        }

        // Draw each shattered shard flying out
        shards.forEach(s => {
          s.cx += s.vx;
          s.cy += s.vy;
          s.vy += 0.4; // subtle gravity
          s.rot += s.vRot;
          s.opacity = Math.max(0, s.opacity - 0.025);

          if (s.opacity <= 0) return;

          ctx.save();
          ctx.globalAlpha = s.opacity;

          // Rotate around shard center
          ctx.translate(s.cx, s.cy);
          ctx.rotate(s.rot);
          ctx.translate(-s.cx, -s.cy);

          ctx.beginPath();
          ctx.moveTo(s.pts[0].x, s.pts[0].y);
          ctx.lineTo(s.pts[1].x, s.pts[1].y);
          ctx.lineTo(s.pts[2].x, s.pts[2].y);
          ctx.closePath();
          ctx.clip();

          if (img.complete) {
            ctx.drawImage(img, drawX, drawY, drawW, drawH);
          }

          // Glowing fracture edge
          ctx.strokeStyle = 'rgba(255, 235, 150, 0.7)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.restore();
        });
      }

      if (elapsed < TOTAL_MS) {
        animId = requestAnimationFrame(render);
      } else {
        onComplete();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] w-screen h-screen pointer-events-none select-none"
    />
  );
};
