import { useState, useCallback } from 'react';
import type { GameState, PlayerGuess, RoundResult, Location3D } from './types/game';
import { LOCATIONS } from './data/locations';
import { calculateWizardingScore } from './utils/scoring';
import { sound } from './utils/audio';
import { PanoramaViewer } from './components/PanoramaViewer';
import { MaraudersMap } from './components/MaraudersMap';
import { GameHeader } from './components/GameHeader';
import { ScoreModal } from './components/ScoreModal';
import { GameOverModal } from './components/GameOverModal';
import { RulesModal } from './components/RulesModal';
import { HogwartsHomePage } from './components/HogwartsHomePage';

export function App() {
  const [deck, setDeck] = useState<Location3D[]>([]);
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const [playerName, setPlayerName] = useState<string>(() => {
    try {
      return localStorage.getItem('hogwarts_player_name') || 'The Chosen One';
    } catch {
      return 'The Chosen One';
    }
  });

  const handleSetPlayerName = (name: string) => {
    setPlayerName(name);
    try {
      localStorage.setItem('hogwarts_player_name', name);
    } catch {}
  };

  const [gameState, setGameState] = useState<GameState>({
    playerName: playerName,
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

  // Start / Reset Game
  const startNewGame = useCallback(() => {
    const pool = [...LOCATIONS];
    // Shuffle pool
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const initialLocation = shuffled[0] || LOCATIONS[0];

    setDeck(shuffled);
    setLastResult(null);
    setShowLandingPage(false);

    setGameState({
      playerName,
      mode: 'classic_5',
      house: 'Gryffindor',
      currentRound: 1,
      totalRounds: 5,
      totalScore: 0,
      currentLocation: initialLocation,
      roundResults: [],
      isGuessing: true,
      isRoundComplete: false,
      isGameOver: false,
      streakCount: 0,
      lumosActive: false,
      timeRemaining: 0,
    });
  }, [playerName]);

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
    const isOver = gameState.currentRound >= gameState.totalRounds;

    setGameState(prev => ({
      ...prev,
      totalScore: newScore,
      roundResults: newResults,
      isGuessing: false,
      isRoundComplete: true,
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
      lumosActive: false,
    }));
  };

  return (
    <div className="relative w-screen h-screen h-[100dvh] overflow-hidden bg-black font-serif select-none">
      {/* Main Home Page with Cinematic Hogwarts Night, Floating Navbar & Large Hogwarts Guesser Title */}
      {showLandingPage ? (
        <HogwartsHomePage
          playerName={playerName}
          onSetPlayerName={handleSetPlayerName}
          onStartGame={startNewGame}
          onOpenRules={() => setShowRules(true)}
        />
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
              onPlayAgain={startNewGame}
              onChangeHouse={() => setShowLandingPage(true)}
            />
          )}
        </>
      )}

      {/* Field Guide & Rules Modal */}
      <RulesModal
        isOpen={showRules}
        onClose={() => setShowRules(false)}
      />
    </div>
  );
}

export default App;
