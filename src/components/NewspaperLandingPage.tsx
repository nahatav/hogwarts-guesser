import React, { useState } from 'react';
import type { HogwartsHouse, GameMode } from '../types/game';
import { sound } from '../utils/audio';
import { GoldenSnitch3D } from './GoldenSnitch3D';
import { 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Menu, 
  Award,
  Globe,
  Share2,
  Bookmark
} from 'lucide-react';

interface NewspaperLandingPageProps {
  onStartGame: (house: HogwartsHouse, mode: GameMode) => void;
  onOpenRules?: () => void;
}

const HOUSES: { id: HogwartsHouse; name: string; crest: string; color: string; border: string; bg: string; motto: string }[] = [
  { id: 'Gryffindor', name: 'Gryffindor', crest: '🦁', color: 'text-amber-800', border: 'border-amber-800', bg: 'bg-amber-100/70', motto: 'Bravery & Chivalry' },
  { id: 'Slytherin',  name: 'Slytherin',  crest: '🐍', color: 'text-emerald-900', border: 'border-emerald-800', bg: 'bg-emerald-100/70', motto: 'Ambition & Cunning' },
  { id: 'Ravenclaw',  name: 'Ravenclaw',  crest: '🦅', color: 'text-blue-900', border: 'border-blue-800', bg: 'bg-blue-100/70', motto: 'Wisdom & Wit' },
  { id: 'Hufflepuff', name: 'Hufflepuff', crest: '🦡', color: 'text-yellow-900', border: 'border-yellow-800', bg: 'bg-yellow-100/70', motto: 'Patience & Loyalty' },
];

const MODES: { id: GameMode; label: string; desc: string }[] = [
  { id: 'classic_5',      label: 'Classic 5-Round',   desc: 'Great Britain & Castle' },
  { id: 'castle_only',    label: 'Castle Only',       desc: 'Hogwarts Chambers' },
  { id: 'owl_streak',     label: 'O.W.L. Streak',     desc: 'Until First Error' },
  { id: 'lumos_challenge', label: 'Lumos Challenge',  desc: 'Night Mode Exploration' },
];

export const NewspaperLandingPage: React.FC<NewspaperLandingPageProps> = ({
  onStartGame,
  onOpenRules,
}) => {
  const [selectedHouse, setSelectedHouse] = useState<HogwartsHouse>('Gryffindor');
  const [selectedMode, setSelectedMode] = useState<GameMode>('classic_5');
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playTick();
  };

  const handleEnterGame = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    sound.playWandWhoosh();
    setTimeout(() => {
      onStartGame(selectedHouse, selectedMode);
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d1114] text-[#141414] font-serif py-6 px-2 sm:px-4 lg:px-8 select-none overflow-x-hidden">
      {/* 3D Flying Quidditch Ball (Golden Snitch) floating in real-time over the page! */}
      <GoldenSnitch3D />

      {/* Main Newspaper Broadsheet Paper Sheet */}
      <div 
        className="max-w-[1240px] mx-auto bg-[#ded6c4] border-[3px] border-[#181818] shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-4 sm:p-7 relative transition-all duration-500"
        style={{
          backgroundImage: 'radial-gradient(#d3c9b4 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Double-line inner border frame */}
        <div className="border border-[#181818]/80 p-2 sm:p-4 relative">
          
          {/* TOP MASTHEAD CONTAINER */}
          <header className="border-2 border-[#181818] rounded-xl px-4 sm:px-6 py-2.5 mb-5 flex items-center justify-between relative bg-[#e3dbc9]/70 shadow-sm">
            {/* Victorian Corner Flourishes */}
            <span className="absolute top-1 left-1.5 text-xs text-[#181818]/60 select-none">❦</span>
            <span className="absolute top-1 right-1.5 text-xs text-[#181818]/60 select-none">❦</span>
            <span className="absolute bottom-1 left-1.5 text-xs text-[#181818]/60 select-none">❦</span>
            <span className="absolute bottom-1 right-1.5 text-xs text-[#181818]/60 select-none">❦</span>

            {/* Left: Circle Hamburger Icon Button */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="w-8 h-8 rounded-full border border-[#181818] flex items-center justify-center hover:bg-[#181818] hover:text-[#ded6c4] transition active:scale-95"
              title="Menu & Guide"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Center: The Harry Potter Masthead Title */}
            <div className="text-center">
              <h1 className="font-fraktur text-3xl sm:text-4xl text-[#121212] tracking-wider drop-shadow-sm leading-none">
                The Harry Potter
              </h1>
              <p className="text-[9px] sm:text-[10px] tracking-[0.3em] font-cinzel text-[#444] uppercase mt-0.5">
                The Marauder's Guessr Edition • Vol. 993 • No. 7
              </p>
            </div>

            {/* Right: By Wizarding & Social / Sound Icons */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs">
              <span className="font-newspaper italic text-[11px] sm:text-xs text-[#333] hidden md:inline">
                By Wizarding
              </span>
              <div className="flex items-center gap-1.5 text-[#222]">
                <button 
                  onClick={toggleSound} 
                  className="p-1 rounded hover:bg-[#181818]/10 transition"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-700" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-800" />}
                </button>
                <Globe className="w-3.5 h-3.5 hover:text-[#b37d22] transition cursor-pointer" />
                <Share2 className="w-3.5 h-3.5 hover:text-[#b37d22] transition cursor-pointer" />
                <Bookmark className="w-3.5 h-3.5 hover:text-[#b37d22] transition cursor-pointer" />
              </div>
            </div>
          </header>

          {/* Quick Drawer if Menu Clicked */}
          {drawerOpen && (
            <div className="mb-4 p-4 rounded-lg bg-[#d5cbba] border border-[#181818] animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-[#181818]/30 pb-2 mb-3">
                <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#181818]">
                  ✦ The Daily Prophet Dispatches
                </span>
                <button 
                  onClick={() => setDrawerOpen(false)} 
                  className="text-xs font-bold font-sans text-[#555] hover:text-black"
                >
                  ✕ Close
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <button 
                  onClick={() => { setDrawerOpen(false); if (onOpenRules) onOpenRules(); }}
                  className="p-2 rounded border border-[#181818]/40 bg-[#ded6c4] hover:bg-[#181818] hover:text-[#ded6c4] transition text-left"
                >
                  <strong>📜 Spellbook Rules</strong>
                  <p className="text-[10px] opacity-80">How to score 5,000 points per round</p>
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); handleEnterGame(); }}
                  className="p-2 rounded border border-[#181818]/40 bg-[#ded6c4] hover:bg-[#181818] hover:text-[#ded6c4] transition text-left"
                >
                  <strong>🏰 Instant Quick Match</strong>
                  <p className="text-[10px] opacity-80">Jump into Hogwarts Castle directly</p>
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); setSelectedMode('owl_streak'); handleEnterGame(); }}
                  className="p-2 rounded border border-[#181818]/40 bg-[#ded6c4] hover:bg-[#181818] hover:text-[#ded6c4] transition text-left"
                >
                  <strong>🔥 O.W.L. Streak Trial</strong>
                  <p className="text-[10px] opacity-80">Test your mastery under pressure</p>
                </button>
              </div>
            </div>
          )}

          {/* MAIN 2-COLUMN BROADSHEET BODY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* LEFT COLUMN: HERO FEATURE STORY (approx 62% width - 7.5 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">

              {/* HERO BOX: DOUBLE BORDER WITH VICTORIAN CORNERS */}
              <div className="border-2 border-[#181818] p-4 sm:p-5 relative bg-[#e3dac8]/60 shadow-sm">
                {/* Decorative Corner Filigrees */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#181818]" />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#181818]" />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#181818]" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#181818]" />

                {/* Top Half: Huge Bold Headline + Harry Potter Woodcut Portrait */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  
                  {/* Left: Huge Condensed Headline matching reference image */}
                  <div className="sm:col-span-7 flex flex-col justify-center">
                    <h2 className="font-headline text-5xl sm:text-6xl text-[#121212] leading-[0.88] tracking-tight uppercase">
                      Harry Potter
                    </h2>
                    <div className="flex items-baseline gap-2 my-1">
                      <span className="font-newspaper italic text-2xl sm:text-3xl text-[#181818]">20th</span>
                      <span className="font-headline text-4xl sm:text-5xl text-[#121212] tracking-tight uppercase">
                        Anniversary
                      </span>
                    </div>
                    <h2 className="font-headline text-5xl sm:text-6xl text-[#121212] leading-[0.88] tracking-tight uppercase">
                      Celebration
                    </h2>
                  </div>

                  {/* Right: Woodcut Engraving Portrait with Radiating Sunburst */}
                  <div className="sm:col-span-5 flex justify-center">
                    <div className="relative border-2 border-[#181818] p-1.5 bg-[#121212] max-w-[210px] shadow-md">
                      {/* Top Ribbon Tag */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#121212] text-[#e8dfcf] px-2.5 py-0.5 border border-[#444] text-[9px] font-cinzel font-bold tracking-widest uppercase whitespace-nowrap shadow-sm">
                        Prisoner of Azkaban
                      </div>

                      {/* Engraved Sunburst Radial Rays SVG */}
                      <div className="relative overflow-hidden bg-[#0d0d0d] aspect-[4/5] flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100">
                          {Array.from({ length: 32 }).map((_, i) => (
                            <line
                              key={i}
                              x1="50"
                              y1="50"
                              x2={50 + 50 * Math.cos((i * Math.PI * 2) / 32)}
                              y2={50 + 50 * Math.sin((i * Math.PI * 2) / 32)}
                              stroke="#ffd700"
                              strokeWidth="0.75"
                            />
                          ))}
                        </svg>

                        {/* Harry Potter Engraving Portrait */}
                        <img
                          src="/newspaper/hp-anniversary-portrait.jpg"
                          alt="Harry Potter 20th Anniversary Portrait"
                          className="relative z-10 w-full h-full object-cover filter grayscale contrast-125 brightness-95"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Action Bar: "RETURN TO HOGWARTS" Button + "EXPLORE" Stamp */}
                <div className="my-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-b border-[#181818]/40 py-4">
                  {/* RETURN TO HOGWARTS Main CTA Button */}
                  <button
                    onClick={handleEnterGame}
                    disabled={isLaunching}
                    className="w-full sm:w-auto flex-1 py-3 px-6 bg-[#121212] hover:bg-[#252525] text-[#f7f2e7] font-headline text-2xl sm:text-3xl tracking-widest uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(180,130,40,0.45)] border border-[#3a3a3a] flex items-center justify-center gap-3 active:scale-[0.98] group"
                  >
                    <span>{isLaunching ? 'WAND FOCUSING...' : 'RETURN TO HOGWARTS'}</span>
                    <ArrowRight className="w-5 h-5 text-[#ffd700] group-hover:translate-x-1.5 transition-transform" />
                  </button>

                  {/* Scalloped / Starburst "EXPLORE" Stamp with Pointing Hand */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Authentic Vintage Pointing Hand Icon ☞ */}
                    <span className="text-2xl text-[#181818] animate-bounce -rotate-12 select-none" style={{ animationDuration: '2s' }}>
                      👉
                    </span>

                    {/* Starburst circular scalloped badge */}
                    <div 
                      onClick={handleEnterGame}
                      className="w-16 h-16 rounded-full bg-[#121212] text-[#fbf8f0] flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform active:scale-95 border-2 border-dashed border-[#ded6c4]"
                      style={{
                        clipPath: 'polygon(50% 0%, 63% 10%, 78% 5%, 85% 19%, 98% 22%, 97% 37%, 100% 50%, 97% 63%, 98% 78%, 85% 81%, 78% 95%, 63% 90%, 50% 100%, 37% 90%, 22% 95%, 15% 81%, 2% 78%, 3% 63%, 0% 50%, 3% 37%, 2% 22%, 15% 19%, 22% 5%, 37% 10%)',
                      }}
                    >
                      <span className="font-headline text-[13px] tracking-widest uppercase -rotate-6">
                        EXPLORE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lead Story Paragraph */}
                <p className="font-newspaper text-xs sm:text-sm text-[#262626] leading-relaxed mb-4 text-justify">
                  Harry Potter & The Philosopher's Stone, The First Film In The Epic Eight-Part Harry Potter Series, Is Reaching Its 20th Anniversary This Year. To Celebrate, Join Us Over The Next Couple Of Months As More Moments Begin To Magically Appear Every Wizarding Wednesday And See If Any Of Your Favourites Pop Up!
                </p>

                {/* Fine Decorative Center Divider Rule */}
                <div className="flex items-center justify-center gap-3 my-2 text-[#666] text-[10px] font-fraktur">
                  <span className="h-[1px] bg-[#181818]/30 flex-1" />
                  <span>— The Harry Potter —</span>
                  <span className="h-[1px] bg-[#181818]/30 flex-1" />
                </div>
              </div>

              {/* HOUSE SELECTION DISPATCH (Seamlessly integrated into the newspaper layout!) */}
              <div className="border border-[#181818] p-3.5 bg-[#d9d0bc]/80 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-cinzel text-[11px] font-bold tracking-widest text-[#181818] uppercase flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#b37d22]" /> Hogwarts House Alliance & Expedition Dispatch
                  </span>
                  <span className="text-[10px] font-sans text-[#555]">Click to Align</span>
                </div>

                {/* 4 Houses */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {HOUSES.map(h => (
                    <button
                      key={h.id}
                      onClick={() => { setSelectedHouse(h.id); sound.playTick(); }}
                      className={`p-2 rounded border text-left transition-all ${
                        selectedHouse === h.id
                          ? `bg-[#181818] text-[#ded6c4] border-[#181818] shadow-md scale-[1.02]`
                          : 'bg-[#e5ddd0] text-[#222] border-[#181818]/40 hover:border-[#181818]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{h.crest}</span>
                        {selectedHouse === h.id && <span className="text-[9px] font-bold uppercase tracking-wider text-[#ffd700]">Chosen</span>}
                      </div>
                      <p className="font-cinzel font-bold text-xs mt-1 uppercase tracking-wider">{h.name}</p>
                      <p className="text-[9px] opacity-75 font-sans leading-tight mt-0.5">{h.motto}</p>
                    </button>
                  ))}
                </div>

                {/* Mode Selector */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#181818]/20">
                  {MODES.map(m => (
                    <button
                      key={m.id}
                      onClick={() => { setSelectedMode(m.id); sound.playTick(); }}
                      className={`text-[10px] font-cinzel font-semibold px-2.5 py-1 rounded transition ${
                        selectedMode === m.id
                          ? 'bg-[#181818] text-[#ffd700]'
                          : 'bg-[#e5ddd0] text-[#444] border border-[#181818]/30 hover:text-black'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* LOWER STORY: "HARRY POTTER RETURNS TO UK" */}
              <div className="border-t-2 border-[#181818] pt-4">
                <h3 className="font-headline text-4xl sm:text-5xl text-[#121212] tracking-tight leading-none uppercase mb-3">
                  Harry Potter Returns To UK
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                  {/* Quidditch Malfoy & Potter Photo */}
                  <div className="sm:col-span-5">
                    <div className="border border-[#181818] p-1 bg-[#181818]">
                      <img
                        src="/newspaper/hp-draco-quidditch.jpg"
                        alt="Harry & Draco Quidditch"
                        className="w-full aspect-[4/5] object-cover filter grayscale contrast-110"
                      />
                    </div>
                  </div>

                  {/* Article with illuminated Drop Cap "T" */}
                  <div className="sm:col-span-7">
                    <p className="font-newspaper text-xs sm:text-sm text-[#262626] leading-relaxed text-justify">
                      <span className="float-left text-4xl font-fraktur leading-none pr-2 pt-1 text-[#121212] font-black">
                        T
                      </span>
                      ake on the Forbidden Forest, uncover rare artefacts, overcome hidden obstacles and work with your Clubmates in this new Club Challenge from Zynga's magical Match-3 mobile game, Harry Potter: Puzzles and Spells. This exciting update is a new, recurring, limited-time event series that invites you and your Club.
                    </p>

                    <button
                      onClick={handleEnterGame}
                      className="mt-4 px-4 py-1.5 border border-[#181818] text-xs font-cinzel font-bold tracking-wider uppercase hover:bg-[#181818] hover:text-[#ded6c4] transition flex items-center gap-1.5"
                    >
                      <span>Learn More</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

                {/* Wide Banner Image of the Golden Trio */}
                <div className="mt-5 border border-[#181818] p-1 bg-[#181818]">
                  <img
                    src="/newspaper/hp-trio-year.jpg"
                    alt="Harry, Ron, and Hermione"
                    className="w-full h-44 object-cover object-top filter grayscale contrast-115 brightness-95"
                  />
                </div>
              </div>

            </div>


            {/* RIGHT COLUMN: SIDEBAR (approx 38% width - 4.5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:border-l-2 lg:border-[#181818] lg:pl-6">

              {/* ARCHED "OUR PRODUCTS" RIBBON BANNER */}
              <div className="relative text-center pt-2">
                <div className="inline-flex items-center justify-center relative">
                  {/* Arched Ribbon Shape */}
                  <div className="bg-[#181818] text-[#f7f2e7] px-8 py-2 rounded-t-full border-2 border-[#181818] shadow-sm">
                    <span className="font-newspaper italic text-base sm:text-lg font-bold">
                      Our products
                    </span>
                  </div>
                </div>

                {/* Ribbon side labels */}
                <div className="flex items-center justify-between px-6 -mt-1 text-[9px] font-cinzel font-bold uppercase tracking-widest text-[#333]">
                  <span>✦ HARRY POTTER</span>
                  <span>BOOK STORE ✦</span>
                </div>

                {/* 3 Product Book Cards in a Row */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#181818]/30">
                  {/* Book 1 */}
                  <div className="border border-[#181818] p-1.5 bg-[#e8dfcf] flex flex-col justify-between text-center">
                    <div className="aspect-[3/4] overflow-hidden bg-black mb-1.5 border border-[#181818]/30">
                      <img src="/newspaper/hp-book1.jpg" alt="Philosopher's Stone" className="w-full h-full object-cover filter grayscale contrast-125" />
                    </div>
                    <p className="text-[9px] font-newspaper font-bold leading-tight truncate">Philosopher's Stone</p>
                    <p className="text-[8px] font-sans text-[#666]">@dailywandshop</p>
                    <p className="text-[9px] font-bold font-sans text-[#181818] mt-0.5">$49.00</p>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      <button onClick={handleEnterGame} className="text-[7px] py-0.5 border border-[#181818] hover:bg-[#181818] hover:text-[#ded6c4]">Details</button>
                      <button onClick={handleEnterGame} className="text-[7px] py-0.5 bg-[#181818] text-[#ded6c4] hover:bg-[#333]">Order</button>
                    </div>
                  </div>

                  {/* Book 2 */}
                  <div className="border border-[#181818] p-1.5 bg-[#e8dfcf] flex flex-col justify-between text-center">
                    <div className="aspect-[3/4] overflow-hidden bg-black mb-1.5 border border-[#181818]/30">
                      <img src="/newspaper/hp-book3.jpg" alt="Deathly Hallows" className="w-full h-full object-cover filter grayscale contrast-125" />
                    </div>
                    <p className="text-[9px] font-newspaper font-bold leading-tight truncate">Deathly Hallows</p>
                    <p className="text-[8px] font-sans text-[#666]">@dailywandshop</p>
                    <p className="text-[9px] font-bold font-sans text-[#181818] mt-0.5">$56.00</p>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      <button onClick={handleEnterGame} className="text-[7px] py-0.5 border border-[#181818] hover:bg-[#181818] hover:text-[#ded6c4]">Details</button>
                      <button onClick={handleEnterGame} className="text-[7px] py-0.5 bg-[#181818] text-[#ded6c4] hover:bg-[#333]">Order</button>
                    </div>
                  </div>

                  {/* Book 3 */}
                  <div className="border border-[#181818] p-1.5 bg-[#e8dfcf] flex flex-col justify-between text-center">
                    <div className="aspect-[3/4] overflow-hidden bg-black mb-1.5 border border-[#181818]/30">
                      <img src="/newspaper/hp-book2.jpg" alt="Chamber of Secrets" className="w-full h-full object-cover filter grayscale contrast-125" />
                    </div>
                    <p className="text-[9px] font-newspaper font-bold leading-tight truncate">Chamber of Secrets</p>
                    <p className="text-[8px] font-sans text-[#666]">@dailywandshop</p>
                    <p className="text-[9px] font-bold font-sans text-[#181818] mt-0.5">$65.00</p>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      <button onClick={handleEnterGame} className="text-[7px] py-0.5 border border-[#181818] hover:bg-[#181818] hover:text-[#ded6c4]">Details</button>
                      <button onClick={handleEnterGame} className="text-[7px] py-0.5 bg-[#181818] text-[#ded6c4] hover:bg-[#333]">Order</button>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-2.5">
                  <button onClick={handleEnterGame} className="text-[9px] font-cinzel font-bold tracking-widest text-[#181818] hover:underline">
                    See More →
                  </button>
                </div>
              </div>

              {/* CARD: "WHERE OUR STORY GOES / PLAY OUR WIZARDING WORLD" */}
              <div className="border-2 border-[#181818] p-3.5 bg-[#ded6c4]">
                <div className="border-b-2 border-[#181818] pb-1.5 mb-2.5">
                  <h4 className="font-headline text-2xl text-[#181818] tracking-wider leading-none">
                    Where Our Story Goes
                  </h4>
                  <p className="font-newspaper italic text-xs text-[#333] mt-0.5">
                    PLAY OUR WIZARDING WORLD.
                  </p>
                </div>

                <div className="border border-[#181818] p-1 bg-[#181818] mb-2.5">
                  <img
                    src="/newspaper/hp-dan-broom.jpg"
                    alt="Daniel Radcliffe with Broom"
                    className="w-full h-40 object-cover object-top filter grayscale contrast-115"
                  />
                </div>

                <p className="font-newspaper text-[11px] text-[#333] leading-relaxed text-justify">
                  Making friends is the best way to rise out of your place in society. Having certain combinations of spells will help you unlock new chambers. This will help even the playing field, and incentivize wizards to work together, and participate in the community.
                </p>

                <button 
                  onClick={handleEnterGame}
                  className="mt-2 text-[10px] font-cinzel font-bold text-[#181818] hover:underline flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <span>→</span>
                </button>
              </div>

              {/* CARD: "THE HOGWARTS AT CHRISTMAS CROSSWORD" */}
              <div className="border-t-2 border-b-2 border-[#181818] py-3.5">
                <h4 className="font-headline text-xl sm:text-2xl text-[#181818] tracking-wide leading-tight mb-2 uppercase">
                  The Hogwarts At Christmas Crossword
                </h4>

                <div className="border border-[#181818] p-1 bg-[#181818] mb-2">
                  <img
                    src="/newspaper/hp-trio-christmas.jpg"
                    alt="Christmas in Great Hall"
                    className="w-full h-32 object-cover filter grayscale contrast-110"
                  />
                </div>

                <p className="font-newspaper text-[11px] text-[#333] leading-relaxed text-justify">
                  We can't think of a more festive place to be than Hogwarts. Try our Christmassy crossword on all the festive events that took place in the castle.
                </p>

                <button 
                  onClick={handleEnterGame}
                  className="mt-2 text-[10px] font-cinzel font-bold text-[#181818] hover:underline flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <span>→</span>
                </button>
              </div>

              {/* CARD: "BEST FILM IN THE YEAR GOES TO HARRY POTTER" */}
              <div>
                <h4 className="font-headline text-xl sm:text-2xl text-[#181818] tracking-wide leading-tight uppercase mb-2">
                  Best Film In The Year Goes To Harry Potter
                </h4>

                <p className="font-newspaper text-[11px] text-[#333] leading-relaxed text-justify">
                  It's getting cold outside — and nobody knows how to rock something knitted and fuzzy like the wizarding community. Please join us in paying homage to these extremely cosy witches and wizards!
                </p>

                <button 
                  onClick={handleEnterGame}
                  className="mt-2 text-[10px] font-cinzel font-bold text-[#181818] hover:underline flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <span>→</span>
                </button>
              </div>

              {/* MASSIVE WOODBLOCK BANNER: "DANIEL BECOME HARRY POTTER" */}
              <div className="border-t-2 border-[#181818] pt-3">
                <p className="font-cinzel text-sm sm:text-base font-black tracking-widest text-[#181818] uppercase">
                  DANIEL 👤 BECOME
                </p>
                <h3 className="font-headline text-5xl sm:text-6xl text-[#121212] tracking-tighter leading-none uppercase select-none">
                  Harry Potter
                </h3>
              </div>

              {/* PRODUCTION STORY */}
              <div className="border-t border-[#181818]/40 pt-2.5">
                <div className="grid grid-cols-12 gap-3 items-start">
                  <div className="col-span-4 bg-[#181818] text-[#ded6c4] px-2 py-1 text-center font-headline text-sm tracking-wider uppercase">
                    Production
                  </div>
                  <div className="col-span-8">
                    <p className="font-newspaper text-[10px] text-[#444] leading-normal text-justify">
                      Filming of the series began at Leavesden Studios, Hertfordshire, England, in September 2000 and ended in December 2010, with post-production on the final film lasting until summer 2011.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* FOOTER TICKER */}
          <footer className="mt-8 pt-3 border-t-2 border-[#181818] flex flex-col sm:flex-row items-center justify-between text-[10px] font-cinzel text-[#555] tracking-wider">
            <p>© Wizarding World Publishing Ltd. • The Marauder's Guessr Archive</p>
            <p className="italic font-newspaper">"Mischief Managed"</p>
          </footer>

        </div>
      </div>
    </div>
  );
};
