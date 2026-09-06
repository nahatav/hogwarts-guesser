import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState, PlayerGuess, RoundResult, Location3D } from './types/game';
import { LOCATIONS } from './data/locations';
import { calculateWizardingScore } from './utils/scoring';
import { sound } from './utils/audio';
import { LumosImageViewer } from './components/LumosImageViewer';
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
  const [pendingGuess, setPendingGuess] = useState<PlayerGuess | null>(null);
  const pendingGuessRef = useRef<PlayerGuess | null>(null);

  useEffect(() => {
    pendingGuessRef.current = pendingGuess;
  }, [pendingGuess]);

  useEffect(() => {
    sound.playThemeMusic();
  }, []);

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
    timeRemaining: 30,
  });

  const handleGuessSubmit = useCallback((guess: PlayerGuess | null) => {
    setGameState(prev => {
      if (!prev.isGuessing || prev.isRoundComplete) return prev;

      const timeTaken = Math.max(0, 30 - prev.timeRemaining);
      const breakdown = calculateWizardingScore(guess, prev.currentLocation);
      
      const result: RoundResult = {
        roundNumber: prev.currentRound,
        location: prev.currentLocation,
        guess,
        score: breakdown.score,
        distanceMeters: breakdown.distanceMeters,
        floorDelta: breakdown.floorDelta,
        regionMatched: breakdown.regionMatched,
        timeTakenSeconds: timeTaken,
      };

      setLastResult(result);
      setPendingGuess(null);
      pendingGuessRef.current = null;

      const newScore = prev.totalScore + breakdown.score;
      const newResults = [...prev.roundResults, result];
      const isOver = prev.currentRound >= prev.totalRounds;

      return {
        ...prev,
        totalScore: newScore,
        roundResults: newResults,
        isGuessing: false,
        isRoundComplete: true,
        isGameOver: isOver,
      };
    });
  }, []);

  useEffect(() => {
    if (showLandingPage || !gameState.isGuessing || gameState.isRoundComplete) {
      return;
    }

    const interval = setInterval(() => {
      setGameState(prev => {
        if (!prev.isGuessing || prev.isRoundComplete) return prev;
        const nextTime = prev.timeRemaining - 1;

        if (nextTime <= 0) {
          clearInterval(interval);
          setTimeout(() => {
            const currentPin = pendingGuessRef.current;
            handleGuessSubmit(currentPin);
          }, 0);
          return { ...prev, timeRemaining: 0 };
        }

        return { ...prev, timeRemaining: nextTime };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showLandingPage, gameState.isGuessing, gameState.isRoundComplete, gameState.currentRound, handleGuessSubmit]);

  const startNewGame = useCallback(() => {
    const pool = [...LOCATIONS];
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const initialLocation = shuffled[0] || LOCATIONS[0];

    setDeck(shuffled);
    setLastResult(null);
    setPendingGuess(null);
    pendingGuessRef.current = null;
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
      timeRemaining: 30,
    });
  }, [playerName]);

  const handleNextRound = () => {
    if (gameState.isGameOver) {
      return;
    }

    const nextIndex = gameState.currentRound;
    const nextLocation = deck[nextIndex % deck.length] || LOCATIONS[0];

    sound.playWandWhoosh();
    setLastResult(null);
    setPendingGuess(null);
    pendingGuessRef.current = null;

    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      currentLocation: nextLocation,
      isGuessing: true,
      isRoundComplete: false,
      lumosActive: false,
      timeRemaining: 30,
    }));
  };

  return (
    <div className="relative w-screen h-screen h-[100dvh] overflow-hidden bg-black font-serif select-none">
      {showLandingPage ? (
        <HogwartsHomePage
          playerName={playerName}
          onSetPlayerName={handleSetPlayerName}
          onStartGame={startNewGame}
          onOpenRules={() => setShowRules(true)}
        />
      ) : (
        <>
          <GameHeader
            gameState={gameState}
            onNewGame={() => setShowLandingPage(true)}
            onOpenRules={() => setShowRules(true)}
          />

          <div className="w-full h-full">
            <LumosImageViewer
              location={gameState.currentLocation}
            />
          </div>

          <MaraudersMap
            isRoundComplete={gameState.isRoundComplete}
            lastRoundResult={lastResult}
            onGuessSubmit={handleGuessSubmit}
            onPendingGuessChange={setPendingGuess}
            disabled={gameState.isRoundComplete || gameState.isGameOver}
          />

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
