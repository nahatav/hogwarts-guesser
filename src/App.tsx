import { useState, useCallback } from 'react';
import type { GameState, HogwartsHouse, GameMode, PlayerGuess, RoundResult, Location3D } from './types/game';
import { LOCATIONS } from './data/locations';
import { calculateWizardingScore } from './utils/scoring';
import { sound } from './utils/audio';
import { PanoramaViewer } from './components/PanoramaViewer';
import { MaraudersMap } from './components/MaraudersMap';
import { GameHeader } from './components/GameHeader';
import { ScoreModal } from './components/ScoreModal';
import { GameOverModal } from './components/GameOverModal';
import { HousePickerModal } from './components/HousePickerModal';
import { RulesModal } from './components/RulesModal';
import { SplashScreen } from './components/SplashScreen';
import { NewspaperLandingPage } from './components/NewspaperLandingPage';

export function App() {
  const [deck, setDeck] = useState<Location3D[]>([]);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
  const [showHousePicker, setShowHousePicker] = useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const [gameState, setGameState] = useState<GameState>({
    mode: 'classic_5',
    house: 'Gryffindor',
    currentRound: 1,
    totalRounds: 5,
    totalScore: 0,
    currentLocation: LOCATIONS[0],
    roundResults: [],
    isGuessing: true,
    isRoundComplete: false,
    isGameOver: false,
    streakCount: 0,
    lumosActive: false,
    timeRemaining: 0,
  });

  // Start / Reset Game with selected House & Mode
  const startNewGame = useCallback((house: HogwartsHouse, mode: GameMode) => {
    let pool = [...LOCATIONS];
    if (mode === 'castle_only') {
      pool = pool.filter(l => l.region === 'castle');
    }

    // Shuffle pool
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const totalRounds = mode === 'owl_streak' ? 99 : 5;
    const initialLocation = shuffled[0] || LOCATIONS[0];

    setDeck(shuffled);
    setLastResult(null);
    setShowHousePicker(false);
    setShowLandingPage(false);

    setGameState({
      mode,
      house,
      currentRound: 1,
      totalRounds,
      totalScore: 0,
      currentLocation: initialLocation,
      roundResults: [],
      isGuessing: true,
      isRoundComplete: false,
      isGameOver: false,
      streakCount: 0,
      lumosActive: mode === 'lumos_challenge',
      timeRemaining: 0,
    });
  }, []);

  // Handle Guess Submission from Marauder's Map
  const handleGuessSubmit = (guess: PlayerGuess) => {
    if (!gameState.isGuessing || gameState.isRoundComplete) return;

    const breakdown = calculateWizardingScore(guess, gameState.currentLocation);
    
    const result: RoundResult = {
      roundNumber: gameState.currentRound,
      location: gameState.currentLocation,
      guess,
      score: breakdown.score,
      distanceMeters: breakdown.distanceMeters,
      floorDelta: breakdown.floorDelta,
      regionMatched: breakdown.regionMatched,
      timeTakenSeconds: 0,
    };

    setLastResult(result);

    const newScore = gameState.totalScore + breakdown.score;
    const newResults = [...gameState.roundResults, result];

    // Streak Mode Check
    let newStreak = gameState.streakCount;
    let isOver = false;

    if (gameState.mode === 'owl_streak') {
      if (breakdown.score >= 3500) {
        newStreak += 1;
      } else {
        isOver = true; // Failed streak
      }
    } else if (gameState.currentRound >= gameState.totalRounds) {
      isOver = true;
    }

    setGameState(prev => ({
      ...prev,
      totalScore: newScore,
      roundResults: newResults,
      isGuessing: false,
      isRoundComplete: true,
      streakCount: newStreak,
      isGameOver: isOver,
    }));
  };

  // Next Round Transition
  const handleNextRound = () => {
    if (gameState.isGameOver) {
      return;
    }

    const nextIndex = gameState.currentRound;
    const nextLocation = deck[nextIndex % deck.length] || LOCATIONS[0];

    sound.playWandWhoosh();
    setLastResult(null);

    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      currentLocation: nextLocation,
      isGuessing: true,
      isRoundComplete: false,
      lumosActive: prev.mode === 'lumos_challenge',
    }));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-serif select-none">
      {/* Splash / Intro Loading Screen */}
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      {/* Retro Newspaper Landing Page ("The Harry Potter" / Daily Prophet) with 3D Flying Quidditch Snitch */}
      {showLandingPage ? (
        <div className="w-full h-full overflow-y-auto">
          <NewspaperLandingPage
            onStartGame={startNewGame}
            onOpenRules={() => setShowRules(true)}
          />
        </div>
      ) : (
        <>
          {/* Top HUD Game Header */}
          <GameHeader
            gameState={gameState}
            onNewGame={() => setShowLandingPage(true)}
            onOpenRules={() => setShowRules(true)}
          />

          {/* Main 360° Photosphere Panorama Viewport */}
          <div className="w-full h-full">
            <PanoramaViewer
              location={gameState.currentLocation}
              lumosActive={gameState.lumosActive}
              onLumosToggle={() => setGameState(prev => ({ ...prev, lumosActive: !prev.lumosActive }))}
            />
          </div>

          {/* Interactive Marauder's Map Drawer */}
          <MaraudersMap
            isRoundComplete={gameState.isRoundComplete}
            lastRoundResult={lastResult}
            onGuessSubmit={handleGuessSubmit}
            disabled={gameState.isRoundComplete || gameState.isGameOver}
          />

          {/* Post-Round Score & Lore Reveal Modal */}
          {gameState.isRoundComplete && lastResult && !gameState.isGameOver && (
            <ScoreModal
              result={lastResult}
              isLastRound={gameState.currentRound >= gameState.totalRounds}
              onNextRound={handleNextRound}
            />
          )}

          {/* Game Over / O.W.L. Final Examination Report Card */}
          {gameState.isGameOver && (
            <GameOverModal
              gameState={gameState}
              onPlayAgain={() => startNewGame(gameState.house, gameState.mode)}
              onChangeHouse={() => setShowLandingPage(true)}
            />
          )}
        </>
      )}

      {/* House Sorting Ceremony & Mode Selector Modal (if triggered manually) */}
      <HousePickerModal
        isOpen={showHousePicker}
        onStartGame={startNewGame}
      />

      {/* Rules & Guide Modal */}
      <RulesModal
        isOpen={showRules}
        onClose={() => setShowRules(false)}
      />
    </div>
  );
}

export default App;
