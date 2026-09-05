import React, { useState } from 'react';

interface ChamberVaultDoorProps {
  glowColor?: string; // emerald green, ruby crimson, sapphire cyan, amber gold
  house?: string;
  isUnlocked?: boolean;
}

export const ChamberVaultDoor: React.FC<ChamberVaultDoorProps> = ({
  glowColor = '#10b981',
  isUnlocked = false,
}) => {
  const [rotation, setRotation] = useState<number>(0);

  const handleHover = () => {
    setRotation(prev => prev + 15);
  };

  return (
    <div 
      className="relative flex items-center justify-center cursor-pointer select-none group"
      onMouseEnter={handleHover}
    >
      {/* Cavern Emerald Backlight Halo */}
      <div 
        className="absolute w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000 animate-pulse pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(5,46,32,0.4) 60%, transparent 85%)`
        }}
      />

      {/* Outer Cavern Stone Wall Ring */}
      <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full p-2.5 bg-gradient-to-br from-[#1a231f] via-[#0d1411] to-[#080d0b] border border-[#23352c] shadow-[0_0_50px_rgba(0,0,0,0.95)]">
        {/* Glowing Rim Inset Seam */}
        <div 
          className="w-full h-full rounded-full p-2 flex items-center justify-center transition-all duration-700 shadow-inner"
          style={{
            boxShadow: `inset 0 0 35px ${glowColor}55, 0 0 25px ${glowColor}44`
          }}
        >
          {/* Main Rotating Vault Door Face */}
          <div 
            className="relative w-full h-full rounded-full overflow-hidden transition-all duration-700 ease-out"
            style={{
              transform: `rotate(${rotation + (isUnlocked ? 90 : 0)}deg) scale(${isUnlocked ? 1.05 : 1})`,
              background: 'radial-gradient(circle at 35% 35%, #4a453b 0%, #2a251e 45%, #15120e 100%)',
              border: '4px solid #3d3529',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.9)'
            }}
          >
            {/* SVG Ornate 7 Serpents & Bronze Rivets Mechanism */}
            <svg 
              className="w-full h-full" 
              viewBox="0 0 500 500" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Bronze texture gradient */}
                <radialGradient id="bronzeGrad" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#7a705e" />
                  <stop offset="50%" stopColor="#4d4436" />
                  <stop offset="100%" stopColor="#252019" />
                </radialGradient>
                <linearGradient id="snakeSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8c826e" />
                  <stop offset="50%" stopColor="#574f3e" />
                  <stop offset="100%" stopColor="#2b261e" />
                </linearGradient>
                <filter id="serpentShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.9" />
                </filter>
              </defs>

              {/* Concentric Bronze Armor Plates */}
              <circle cx="250" cy="250" r="230" fill="none" stroke="#252019" strokeWidth="6" />
              <circle cx="250" cy="250" r="215" fill="none" stroke="#5c5240" strokeWidth="2" strokeDasharray="12 6" />
              <circle cx="250" cy="250" r="175" fill="none" stroke="#332c22" strokeWidth="5" />
              <circle cx="250" cy="250" r="130" fill="none" stroke="#5c5240" strokeWidth="1.5" strokeDasharray="6 4" />

              {/* Perimeter Iron Rivets */}
              {[...Array(24)].map((_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const x = 250 + 222 * Math.cos(rad);
                const y = 250 + 222 * Math.sin(rad);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="4" fill="#6e634e" stroke="#15120e" strokeWidth="1" />
                    <circle cx={x - 1} cy={y - 1} r="1" fill="#a89a7e" />
                  </g>
                );
              })}

              {/* 7 Serpents Mechanism radiating from the center */}
              <g filter="url(#serpentShadow)">
                {/* Center Hub Housing */}
                <ellipse cx="140" cy="250" rx="35" ry="45" fill="url(#bronzeGrad)" stroke="#1a1612" strokeWidth="3" />

                {/* Serpent 1: Top arch */}
                <path
                  d="M 140,220 C 180,140 240,120 280,140 C 310,155 315,180 340,185"
                  fill="none" stroke="url(#snakeSkin)" strokeWidth="18" strokeLinecap="round"
                />
                {/* Serpent 1 Head */}
                <polygon points="340,185 365,175 375,195 348,200" fill="#7a705e" stroke="#1a1612" strokeWidth="2" />
                <circle cx="360" cy="185" r="2" fill={glowColor} />

                {/* Serpent 2: Top-right diagonal */}
                <path
                  d="M 150,230 C 220,180 290,170 340,210 C 370,235 385,240 410,230"
                  fill="none" stroke="url(#snakeSkin)" strokeWidth="17" strokeLinecap="round"
                />
                <polygon points="410,230 435,225 440,245 415,250" fill="#7a705e" stroke="#1a1612" strokeWidth="2" />
                <circle cx="430" cy="235" r="2" fill={glowColor} />

                {/* Serpent 3: Center direct horizontal */}
                <path
                  d="M 160,250 C 240,245 320,255 380,250 C 410,248 425,252 445,250"
                  fill="none" stroke="url(#snakeSkin)" strokeWidth="16" strokeLinecap="round"
                />
                <polygon points="445,250 470,245 470,265 445,260" fill="#7a705e" stroke="#1a1612" strokeWidth="2" />
                <circle cx="460" cy="252" r="2" fill={glowColor} />

                {/* Serpent 4: Bottom-right diagonal */}
                <path
                  d="M 150,270 C 220,320 290,330 340,290 C 370,265 385,260 410,270"
                  fill="none" stroke="url(#snakeSkin)" strokeWidth="17" strokeLinecap="round"
                />
                <polygon points="410,270 435,275 440,255 415,250" fill="#7a705e" stroke="#1a1612" strokeWidth="2" />
                <circle cx="430" cy="265" r="2" fill={glowColor} />

                {/* Serpent 5: Bottom arch */}
                <path
                  d="M 140,280 C 180,360 240,380 280,360 C 310,345 315,320 340,315"
                  fill="none" stroke="url(#snakeSkin)" strokeWidth="18" strokeLinecap="round"
                />
                <polygon points="340,315 365,325 375,305 348,300" fill="#7a705e" stroke="#1a1612" strokeWidth="2" />
                <circle cx="360" cy="315" r="2" fill={glowColor} />

                {/* Serpent 6: Upper sweeping coil */}
                <path
                  d="M 130,235 C 160,190 200,180 230,210 C 255,235 260,250 280,240"
                  fill="none" stroke="url(#snakeSkin)" strokeWidth="14" strokeLinecap="round"
                />
                <polygon points="280,240 300,235 305,250 285,255" fill="#6e634e" stroke="#1a1612" strokeWidth="1.5" />

                {/* Serpent 7: Lower sweeping coil */}
                <path
                  d="M 130,265 C 160,310 200,320 230,290 C 255,265 260,250 280,260"
                  fill="none" stroke="url(#snakeSkin)" strokeWidth="14" strokeLinecap="round"
                />
                <polygon points="280,260 300,265 305,250 285,245" fill="#6e634e" stroke="#1a1612" strokeWidth="1.5" />
              </g>

              {/* Runic Inscriptions along perimeter */}
              <text x="250" y="80" textAnchor="middle" fill="#3a3224" fontSize="14" fontFamily="serif" letterSpacing="4">
                ᛋ ᛚ ᚣ ᛏ ᚺ ᛖ ᚱ ᛁ ᚾ
              </text>
              <text x="250" y="435" textAnchor="middle" fill="#3a3224" fontSize="14" fontFamily="serif" letterSpacing="4">
                ᛈ ᚨ ᚱ ᛋ ᛖ ᛚ ᛏ ᛟ ᚾ ᚷ ᚢ ᛖ
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
