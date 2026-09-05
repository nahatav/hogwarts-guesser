const fs = require('fs');

// Generate 4 high-fidelity album cover SVG images with authentic typography, album titles, and vinyl grooves

// 1. Dr. Dog - B-Room (Nellie)
const drDogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#181818"/>
  <rect x="20" y="20" width="460" height="460" fill="#222222" stroke="#ffffff" stroke-width="2"/>
  <!-- Soundwaves and graphic design inspired by B-Room -->
  <circle cx="250" cy="230" r="140" fill="none" stroke="#444444" stroke-width="1.5" stroke-dasharray="4 4"/>
  <circle cx="250" cy="230" r="100" fill="none" stroke="#666666" stroke-width="2"/>
  <circle cx="250" cy="230" r="60" fill="none" stroke="#ffffff" stroke-width="2"/>
  <circle cx="190" cy="230" r="18" fill="#ffffff"/>
  <circle cx="250" cy="230" r="18" fill="#ffffff"/>
  <circle cx="310" cy="230" r="18" fill="#ffffff"/>
  
  <text x="250" y="390" font-family="'Courier New', monospace" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="6">DR. DOG</text>
  <text x="250" y="425" font-family="'Georgia', serif" font-size="20" font-style="italic" fill="#cccccc" text-anchor="middle" letter-spacing="3">B-ROOM • "NELLIE"</text>
  <text x="250" y="450" font-family="sans-serif" font-size="11" fill="#888888" text-anchor="middle" letter-spacing="4">ORIGINAL STUDIO RECORDING</text>
</svg>`;

// 2. Swan Lake - Tchaikovsky
const swanLakeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#0f0f14"/>
  <rect x="25" y="25" width="450" height="450" fill="none" stroke="#d4af37" stroke-width="1.5"/>
  <rect x="35" y="35" width="430" height="430" fill="none" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="3 3"/>
  
  <!-- Classical Swan Motif -->
  <path d="M190 280 C210 210, 260 170, 290 190 C310 205, 300 230, 275 240 C250 250, 240 270, 240 290 L340 290 C340 290, 310 320, 250 320 C190 320, 170 300, 190 280 Z" fill="#ffffff" opacity="0.9"/>
  <circle cx="295" cy="195" r="3" fill="#0f0f14"/>
  
  <text x="250" y="90" font-family="'Cinzel', 'Times New Roman', serif" font-size="14" fill="#d4af37" text-anchor="middle" letter-spacing="6">DEUTSCHE BALLETT ARCHIV</text>
  <text x="250" y="130" font-family="'Cinzel Decorative', 'Georgia', serif" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="4">SWAN LAKE</text>
  <text x="250" y="160" font-family="'Times New Roman', serif" font-size="16" font-style="italic" fill="#cccccc" text-anchor="middle" letter-spacing="2">Op. 20: No. 10 Scène</text>
  <text x="250" y="420" font-family="'Times New Roman', serif" font-size="18" font-weight="600" fill="#ffffff" text-anchor="middle" letter-spacing="3">PYOTR ILYICH TCHAIKOVSKY</text>
  <text x="250" y="445" font-family="'Times New Roman', serif" font-size="12" font-style="italic" fill="#888888" text-anchor="middle">London Philharmonic Orchestra</text>
</svg>`;

// 3. She & Him - Volume One ("I Thought I Saw Your Face Today")
const sheAndHimSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#f4ebd9"/>
  <rect x="25" y="25" width="450" height="450" fill="#fdfbf7" stroke="#332211" stroke-width="2"/>
  
  <!-- Vintage 60s Style Geometric Graphic -->
  <circle cx="250" cy="220" r="110" fill="#e8d5b5" stroke="#332211" stroke-width="2"/>
  <circle cx="220" cy="210" r="60" fill="#2b1a10" opacity="0.85"/>
  <circle cx="280" cy="210" r="60" fill="#8c5828" opacity="0.85"/>
  
  <text x="250" y="95" font-family="'Futura', 'Helvetica', sans-serif" font-size="34" font-weight="900" fill="#221105" text-anchor="middle" letter-spacing="8">SHE &amp; HIM</text>
  <text x="250" y="130" font-family="'Times New Roman', serif" font-size="18" font-style="italic" fill="#553311" text-anchor="middle" letter-spacing="3">VOLUME ONE</text>
  
  <rect x="70" y="360" width="360" height="75" fill="#221105"/>
  <text x="250" y="395" font-family="'Futura', 'Helvetica', sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="3">I THOUGHT I SAW YOUR FACE TODAY</text>
  <text x="250" y="420" font-family="'Times New Roman', serif" font-size="13" font-style="italic" fill="#dfc69f" text-anchor="middle">Zooey Deschanel &amp; M. Ward • 2008</text>
</svg>`;

// 4. Arctic Monkeys - Favourite Worst Nightmare / Fluorescent Adolescent
const arcticMonkeysSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#111111"/>
  <rect x="20" y="20" width="460" height="460" fill="#1a1a1a" stroke="#ffffff" stroke-width="2"/>
  
  <!-- Architectural Silhouette & Neon Night Vibe -->
  <path d="M80 320 L130 260 L180 320 L240 220 L300 320 L360 250 L420 320 L420 370 L80 370 Z" fill="#ffffff" opacity="0.9"/>
  <line x1="80" y1="370" x2="420" y2="370" stroke="#ffffff" stroke-width="3"/>
  <line x1="80" y1="380" x2="420" y2="380" stroke="#888888" stroke-width="1"/>
  
  <text x="250" y="85" font-family="'Impact', 'Arial Black', sans-serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="5">ARCTIC MONKEYS</text>
  <text x="250" y="120" font-family="'Helvetica', sans-serif" font-size="14" font-weight="bold" fill="#aaaaaa" text-anchor="middle" letter-spacing="4">FAVOURITE WORST NIGHTMARE</text>
  
  <text x="250" y="425" font-family="'Impact', 'Arial Black', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle" letter-spacing="3">FLUORESCENT ADOLESCENT</text>
  <text x="250" y="452" font-family="'Courier New', monospace" font-size="12" fill="#aaaaaa" text-anchor="middle" letter-spacing="2">SINGLE RELEASE • 2007</text>
</svg>`;

fs.writeFileSync('public/covers/dr-dog-nellie.svg', drDogSvg);
fs.writeFileSync('public/covers/swan-lake.svg', swanLakeSvg);
fs.writeFileSync('public/covers/she-and-him.svg', sheAndHimSvg);
fs.writeFileSync('public/covers/arctic-monkeys.svg', arcticMonkeysSvg);
console.log('Created all 4 high-res album covers');
