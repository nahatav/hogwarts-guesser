import React, { useState } from 'react';
import type { GameState, HogwartsHouse } from '../types/game';
import { sound } from '../utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

interface GameHeaderProps {
  gameState: GameState;
  onNewGame: () => void;
  onOpenRules: () => void;
}

const houseGlow: Record<HogwartsHouse, string> = {
  Gryffindor: '#e11d48',
  Slytherin:  '#10b981',
  Ravenclaw:  '#0ea5e9',
  Hufflepuff: '#f59e0b',
};

const houseCrest: Record<HogwartsHouse, string> = {
  Gryffindor: '🦁',
  Slytherin:  '🐍',
  Ravenclaw:  '🦅',
  Hufflepuff: '🦡',
};

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState, onNewGame, onOpenRules: _onOpenRules }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playTick();
  };

  const glow = houseGlow[gameState.house];
  const crest = houseCrest[gameState.house];
  const roundLabel = gameState.mode === 'owl_streak' ? `${gameState.streakCount} 🔥` : `${gameState.currentRound} / ${gameState.totalRounds}`;

  return (
    <header className="fixed top-3 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
      {/* Left: crest + score */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-base bg-[#0a100d] border"
          style={{ borderColor: glow + '80', boxShadow: `0 0 10px ${glow}28` }}
        >
          {crest}
        </div>
        <div
          className="px-3 py-1.5 rounded-lg bg-[#06090700] border backdrop-blur-md text-center"
          style={{ borderColor: '#1b2a22', background: 'rgba(6,9,7,0.80)' }}
        >
          <p className="text-[8px] font-cinzel tracking-[0.2em] text-[#5a6d60] uppercase">Score</p>
          <p className="font-cinzel font-bold text-sm text-[#e8f0eb]">{gameState.totalScore.toLocaleString()}</p>
        </div>
      </div>

      {/* Center: round */}
      <div
        className="px-3 py-1.5 rounded-lg backdrop-blur-md text-center pointer-events-auto"
        style={{ background: 'rgba(6,9,7,0.80)', border: '1px solid #1b2a22' }}
      >
        <p className="text-[8px] font-cinzel tracking-[0.2em] text-[#5a6d60] uppercase">{gameState.mode === 'owl_streak' ? 'Streak' : 'Round'}</p>
        <p className="font-cinzel font-bold text-sm text-[#e8f0eb]">{roundLabel}</p>
      </div>

      {/* Right: sound + new game */}
      <div className="flex items-center gap-1.5 pointer-events-auto">
        <button
          onClick={toggleSound}
          className="p-2 rounded-lg backdrop-blur-md transition"
          style={{ background: 'rgba(6,9,7,0.80)', border: '1px solid #1b2a22' }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#6b7e70]" /> : <Volume2 className="w-3.5 h-3.5 text-[#34d399]" />}
        </button>
        <button
          onClick={onNewGame}
          className="px-3 py-1.5 rounded-lg font-cinzel font-bold text-[10px] tracking-wider uppercase transition flex items-center gap-1"
          style={{ background: 'rgba(6,9,7,0.80)', border: `1px solid ${glow}40`, color: glow }}
          title="Return to The Daily Prophet broadsheet"
        >
          <span>Front Page</span>
        </button>
      </div>
    </header>
  );
};
