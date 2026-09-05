export type WizardRegion = 
  | 'castle' 
  | 'grounds' 
  | 'hogsmeade' 
  | 'diagon_alley' 
  | 'ministry';

export interface Location3D {
  id: string;
  name: string;
  areaName: string;
  region: WizardRegion;
  floorLevel: number; // -2: Deep Dungeons, -1: Dungeons, 0: Ground, 1..7: Floors 1-7, 8: Towers
  floorName: string;
  x: number; // 0 - 1000 coordinate on zoomed-in castle map
  y: number; // 0 - 1000 coordinate on zoomed-in castle map
  worldX?: number; // 0 - 1000 coordinate on Great Britain & Ireland world map
  worldY?: number; // 0 - 1000 coordinate on Great Britain & Ireland world map
  initialYaw: number;
  initialPitch?: number;
  difficulty: 'Year 1 (Easy)' | 'Year 3 (Medium)' | 'Year 5 (Hard)' | 'N.E.W.T. (Master)';
  description: string;
  loreSnippet: string;
  hint: string;
  panoramaType: 'procedural_photosphere' | 'image';
  panoramaTheme: {
    skyColor: string;
    ambientColor: string;
    fogColor: string;
    features: Array<{
      type: 'candles' | 'windows' | 'shelves' | 'fireplace' | 'pillars' | 'trees' | 'statues' | 'shops' | 'vaults' | 'train' | 'orbs' | 'underwater_lake';
      count?: number;
      color?: string;
    }>;
  };
}

export interface PlayerGuess {
  region: WizardRegion;
  floorLevel: number;
  x: number;
  y: number;
  mapLevel?: 'world' | 'castle';
}

export interface RoundResult {
  roundNumber: number;
  location: Location3D;
  guess: PlayerGuess | null;
  score: number;
  distanceMeters: number;
  floorDelta: number;
  regionMatched: boolean;
  timeTakenSeconds: number;
}

export type HogwartsHouse = 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff';

export type GameMode = 'classic_5' | 'castle_only' | 'owl_streak' | 'lumos_challenge';

export interface GameState {
  mode: GameMode;
  house: HogwartsHouse;
  currentRound: number;
  totalRounds: number;
  totalScore: number;
  currentLocation: Location3D;
  roundResults: RoundResult[];
  isGuessing: boolean;
  isRoundComplete: boolean;
  isGameOver: boolean;
  streakCount: number;
  lumosActive: boolean;
  timeRemaining: number;
}
