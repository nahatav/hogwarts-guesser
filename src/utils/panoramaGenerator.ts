import type { Location3D } from '../types/game';

// High-Fidelity Procedural 360 Equirectangular Panorama Canvas Synthesizer
export function generateProceduralPanorama(location: Location3D): HTMLCanvasElement {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const { theme, name, region } = {
    theme: location.panoramaTheme,
    name: location.name,
    region: location.region,
  };

  // 1. Base Gradient Sky / Ceiling to Floor
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, theme.skyColor || '#120d24');
  bgGrad.addColorStop(0.3, theme.fogColor || '#2b1b17');
  bgGrad.addColorStop(0.5, theme.ambientColor || '#d4af37');
  bgGrad.addColorStop(0.7, theme.fogColor || '#2b1b17');
  bgGrad.addColorStop(1, '#050403');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Gothic Stone Brick Wall Layer (Horizon band: height*0.25 to height*0.7)
  const wallTop = height * 0.22;
  const wallBottom = height * 0.68;
  const wallHeight = wallBottom - wallTop;

  const wallGrad = ctx.createLinearGradient(0, wallTop, 0, wallBottom);
  wallGrad.addColorStop(0, '#241c16');
  wallGrad.addColorStop(0.5, '#3d3025');
  wallGrad.addColorStop(1, '#1c1510');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, wallTop, width, wallHeight);

  // Stone brick texture seams
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.lineWidth = 1.5;
  const brickH = 28;
  const brickW = 60;
  for (let y = wallTop; y < wallBottom; y += brickH) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();

    const rowOffset = (Math.floor((y - wallTop) / brickH) % 2) * (brickW / 2);
    for (let x = rowOffset; x < width; x += brickW) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + brickH);
      ctx.stroke();
    }
  }

  // 3. Vaulted Gothic Arches & Ceiling Beams
  ctx.strokeStyle = '#18120d';
  ctx.lineWidth = 8;
  const archSegments = 8;
  for (let i = 0; i < archSegments; i++) {
    const startX = (i / archSegments) * width;
    const midX = startX + width / (archSegments * 2);
    const endX = startX + width / archSegments;

    ctx.beginPath();
    ctx.moveTo(startX, wallTop);
    ctx.quadraticCurveTo(midX, height * 0.05, endX, wallTop);
    ctx.stroke();

    // Arch highlight
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX + 2, wallTop);
    ctx.quadraticCurveTo(midX, height * 0.05 + 4, endX - 2, wallTop);
    ctx.stroke();
    ctx.strokeStyle = '#18120d';
    ctx.lineWidth = 8;
  }

  // 4. Starry Enchanted Ceiling (Great Hall, Ravenclaw, Astronomy Tower)
  if (location.id === 'great-hall' || location.id === 'ravenclaw-tower' || location.id === 'astronomy-tower') {
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 500; i++) {
      const sx = Math.random() * width;
      const sy = Math.random() * (height * 0.35);
      const r = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255,255,255,0.95)' : 'rgba(160,210,255,0.7)';
      ctx.fill();
    }
  }

  // 5. Architectural Pillars & Columns
  const pillarFeature = theme.features.find(f => f.type === 'pillars');
  const pCount = pillarFeature?.count || (region === 'castle' ? 10 : 6);
  const pColor = pillarFeature?.color || '#2d241c';

  for (let i = 0; i < pCount; i++) {
    const px = (i / pCount) * width + (width / (pCount * 2));
    const pw = 50;

    // Pillar Body
    ctx.fillStyle = pColor;
    ctx.fillRect(px - pw / 2, wallTop - 20, pw, wallHeight + 40);

    // Pillar Shading / 3D Specular Gradient
    const colGrad = ctx.createLinearGradient(px - pw / 2, 0, px + pw / 2, 0);
    colGrad.addColorStop(0, 'rgba(0,0,0,0.7)');
    colGrad.addColorStop(0.4, 'rgba(255,255,255,0.2)');
    colGrad.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = colGrad;
    ctx.fillRect(px - pw / 2, wallTop - 20, pw, wallHeight + 40);

    // Wall Torch / Sconce on Pillars
    const torchY = wallTop + wallHeight * 0.35;
    const torchGlow = ctx.createRadialGradient(px, torchY, 2, px, torchY, 55);
    torchGlow.addColorStop(0, '#ffffff');
    torchGlow.addColorStop(0.2, '#ffcc00');
    torchGlow.addColorStop(0.6, 'rgba(255, 100, 0, 0.4)');
    torchGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = torchGlow;
    ctx.beginPath();
    ctx.arc(px, torchY, 55, 0, Math.PI * 2);
    ctx.fill();

    // Sconce iron bracket
    ctx.fillStyle = '#0f0c0a';
    ctx.fillRect(px - 4, torchY + 6, 8, 18);
  }

  // 6. Stained Glass Windows / Underwater Black Lake Arches
  const winFeature = theme.features.find(f => f.type === 'windows' || f.type === 'underwater_lake');
  const wCount = winFeature?.count || 6;
  const wColor = winFeature?.color || '#5c8ca8';

  for (let i = 0; i < wCount; i++) {
    const wx = (i / wCount) * width + (width / (wCount * 2)) + (width / (wCount * 4));
    const ww = 110;
    const wy = wallTop + 15;
    const wh = wallHeight * 0.65;

    // Window Light Radial Glow
    const winGrad = ctx.createRadialGradient(wx, wy + wh / 2, 10, wx, wy + wh / 2, ww);
    winGrad.addColorStop(0, '#ffffff');
    winGrad.addColorStop(0.4, wColor);
    winGrad.addColorStop(0.8, 'rgba(10,20,30,0.6)');
    winGrad.addColorStop(1, 'rgba(0,0,0,0.9)');
    ctx.fillStyle = winGrad;

    // Gothic Window Arch Shape
    ctx.beginPath();
    ctx.moveTo(wx - ww / 2, wy + wh);
    ctx.lineTo(wx - ww / 2, wy + wh * 0.35);
    ctx.quadraticCurveTo(wx, wy - 30, wx + ww / 2, wy + wh * 0.35);
    ctx.lineTo(wx + ww / 2, wy + wh);
    ctx.closePath();
    ctx.fill();

    // Stone tracery frame
    ctx.strokeStyle = '#14100c';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Stained glass mullions
    ctx.beginPath();
    ctx.moveTo(wx, wy - 10);
    ctx.lineTo(wx, wy + wh);
    ctx.moveTo(wx - ww / 2, wy + wh * 0.5);
    ctx.lineTo(wx + ww / 2, wy + wh * 0.5);
    ctx.stroke();
  }

  // 7. Fireplaces & Roaring Hearth
  const fireFeature = theme.features.find(f => f.type === 'fireplace');
  if (fireFeature) {
    const fCount = fireFeature.count || 1;
    const fColor = fireFeature.color || '#ff5500';

    for (let i = 0; i < fCount; i++) {
      const fx = (i / fCount) * width + width * 0.3;
      const fy = wallBottom - 60;

      // Stone hearth mantle
      ctx.fillStyle = '#14100c';
      ctx.fillRect(fx - 90, fy - 70, 180, 130);

      // Fireplace cavity
      ctx.fillStyle = '#050302';
      ctx.fillRect(fx - 70, fy - 40, 140, 100);

      // Fire glow
      const fireGlow = ctx.createRadialGradient(fx, fy + 15, 5, fx, fy + 15, 140);
      fireGlow.addColorStop(0, '#ffffff');
      fireGlow.addColorStop(0.2, '#ffdd44');
      fireGlow.addColorStop(0.5, fColor);
      fireGlow.addColorStop(0.8, 'rgba(255, 69, 0, 0.25)');
      fireGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fireGlow;
      ctx.beginPath();
      ctx.arc(fx, fy + 15, 140, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 8. Floating Candles (Overhead)
  const candleFeature = theme.features.find(f => f.type === 'candles');
  if (candleFeature) {
    const candleCount = candleFeature.count || 60;
    const cColor = candleFeature.color || '#ffea88';

    for (let i = 0; i < candleCount; i++) {
      const cx = (i / candleCount) * width + (Math.sin(i * 11) * 50);
      const cy = height * 0.16 + (Math.cos(i * 7) * (height * 0.12));

      // Golden Flame Glow
      const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 24);
      glow.addColorStop(0, '#ffffff');
      glow.addColorStop(0.3, cColor);
      glow.addColorStop(0.7, 'rgba(255, 180, 0, 0.4)');
      glow.addColorStop(1, 'rgba(255, 140, 0, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.fill();

      // Wax cylinder
      ctx.fillStyle = '#fffff0';
      ctx.fillRect(cx - 2, cy + 4, 4, 18);
    }
  }

  // 9. Prophecy Orbs (Department of Mysteries)
  const orbFeature = theme.features.find(f => f.type === 'orbs');
  if (orbFeature) {
    const orbCount = orbFeature.count || 140;
    for (let i = 0; i < orbCount; i++) {
      const ox = (i / orbCount) * width + ((i % 6) * 10);
      const row = Math.floor(i / 18);
      const oy = wallTop + (row * 32) + (Math.sin(i) * 6);

      const orbGlow = ctx.createRadialGradient(ox, oy, 1, ox, oy, 16);
      orbGlow.addColorStop(0, '#ffffff');
      orbGlow.addColorStop(0.3, '#00f5ff');
      orbGlow.addColorStop(0.7, 'rgba(0, 245, 255, 0.4)');
      orbGlow.addColorStop(1, 'rgba(0, 245, 255, 0)');
      ctx.fillStyle = orbGlow;
      ctx.beginPath();
      ctx.arc(ox, oy, 16, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 10. Bookshelves / Potion Shelves (Library / Potions / Shops)
  const shelfFeature = theme.features.find(f => f.type === 'shelves' || f.type === 'shops');
  if (shelfFeature) {
    const sCount = shelfFeature.count || 16;
    for (let i = 0; i < sCount; i++) {
      const sx = (i / sCount) * width + 10;
      const sy = wallTop + 30;
      const sw = width / sCount - 20;
      const sh = wallHeight * 0.7;

      ctx.fillStyle = '#3a2414';
      ctx.fillRect(sx, sy, sw, sh);

      // Books & Potion flasks
      for (let row = 0; row < 4; row++) {
        const ry = sy + (row * (sh / 4));
        ctx.fillStyle = '#1c1007';
        ctx.fillRect(sx, ry + (sh / 4) - 5, sw, 5);

        for (let b = 0; b < 7; b++) {
          const bx = sx + 5 + (b * (sw / 7.5));
          const colors = ['#8b0000', '#191970', '#006400', '#d4af37', '#4b0082', '#b8860b'];
          ctx.fillStyle = colors[(i + row + b) % colors.length];
          ctx.fillRect(bx, ry + 4, (sw / 8) - 2, (sh / 4) - 9);
        }
      }
    }
  }

  // 11. Floor Perspective & Flagstone Grid
  const floorTop = wallBottom;
  const floorGrad = ctx.createLinearGradient(0, floorTop, 0, height);
  floorGrad.addColorStop(0, '#2b231c');
  floorGrad.addColorStop(0.4, '#17120e');
  floorGrad.addColorStop(1, '#080605');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorTop, width, height - floorTop);

  // Perspective floor flagstone lines
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x < width; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, floorTop);
    ctx.lineTo(x * 1.5 - width * 0.25, height);
    ctx.stroke();
  }

  for (let y = floorTop; y < height; y += (y - floorTop) * 0.4 + 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 12. Elegant In-Universe Location Label Embedded on Floor Nadir
  ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
  ctx.font = 'bold 26px serif';
  ctx.textAlign = 'center';
  ctx.fillText(`✦ ${name.toUpperCase()} ✦`, width / 2, height - 40);
  ctx.font = 'italic 16px serif';
  ctx.fillStyle = 'rgba(230, 213, 184, 0.45)';
  ctx.fillText(`${location.areaName} • ${location.floorName}`, width / 2, height - 18);

  return canvas;
}
