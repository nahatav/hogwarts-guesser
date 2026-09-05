import type { Location3D, PlayerGuess, WizardRegion } from '../types/game';

export interface ScoreBreakdown {
  score: number;
  distanceMeters: number;
  floorDelta: number;
  regionMatched: boolean;
  owlGrade: string;
  feedback: string;
}

export function calculateWizardingScore(
  guess: PlayerGuess | null,
  actual: Location3D
): ScoreBreakdown {
  if (!guess) {
    return {
      score: 0,
      distanceMeters: 9999,
      floorDelta: 0,
      regionMatched: false,
      owlGrade: 'T (Troll)',
      feedback: 'Time expired without making a guess! Even Neville’s toad made it further than this.',
    };
  }

  const isCastleActual = actual.region === 'castle';

  // Case 1: Player guessed inside the zoomed-in castle map
  if (guess.mapLevel === 'castle') {
    if (!isCastleActual) {
      return {
        score: 0,
        distanceMeters: 5000,
        floorDelta: 0,
        regionMatched: false,
        owlGrade: 'D (Dreadful)',
        feedback: `You searched inside Hogwarts Castle, but this scene was actually in ${formatRegionName(actual.region)} (${actual.name})!`,
      };
    }

    const dx = guess.x - actual.x;
    const dy = guess.y - actual.y;
    const dist2DMeters = Math.sqrt(dx * dx + dy * dy) * 0.35;
    const floorDelta = Math.abs(guess.floorLevel - actual.floorLevel);
    const totalEffectiveDistance = dist2DMeters + (floorDelta * 28);

    const tolerance = 15;
    let score = 0;
    if (totalEffectiveDistance <= tolerance) {
      score = 5000;
    } else {
      score = Math.round(5000 * Math.exp(-(totalEffectiveDistance - tolerance) / 60));
    }
    score = Math.max(0, Math.min(5000, score));

    return {
      score,
      distanceMeters: Math.round(totalEffectiveDistance),
      floorDelta,
      regionMatched: true,
      owlGrade: getOwlGrade(score),
      feedback: getFeedback(score, actual.name),
    };
  }

  // Case 2: Player guessed on the Great Britain & World Map
  const targetX = actual.worldX ?? actual.x;
  const targetY = actual.worldY ?? actual.y;
  const dx = guess.x - targetX;
  const dy = guess.y - targetY;
  const dist2DMeters = Math.sqrt(dx * dx + dy * dy) * 1.2;

  let score = 0;
  if (dist2DMeters <= 25) {
    // If it's a castle location and they clicked the castle inset on the world map
    score = isCastleActual ? 4650 : 5000;
  } else {
    score = Math.round(5000 * Math.exp(-dist2DMeters / 120));
  }
  score = Math.max(0, Math.min(5000, score));

  return {
    score,
    distanceMeters: Math.round(dist2DMeters),
    floorDelta: 0,
    regionMatched: guess.region === actual.region || (isCastleActual && dist2DMeters < 50),
    owlGrade: getOwlGrade(score),
    feedback: isCastleActual && score > 4000
      ? `Great instinct finding Hogwarts on the world map! Zoom in to the castle for a perfect 5,000 pt room guess.`
      : getFeedback(score, actual.name),
  };
}

function getOwlGrade(score: number): string {
  if (score >= 4850) return 'O (Outstanding ⭐)';
  if (score >= 3800) return 'E (Exceeds Expectations)';
  if (score >= 2800) return 'A (Acceptable)';
  if (score >= 1800) return 'P (Poor)';
  if (score >= 800) return 'D (Dreadful)';
  return 'T (Troll)';
}

function getFeedback(score: number, locationName: string): string {
  if (score >= 4850) return `Pinpoint accuracy! You landed directly inside ${locationName}.`;
  if (score >= 3800) return `Splendid work! You were very close to ${locationName}.`;
  if (score >= 2800) return `Fair attempt! You recognized the general territory of ${locationName}.`;
  if (score >= 1800) return `A bit astray. ${locationName} was some distance away.`;
  return `Completely lost in the floo network! ${locationName} was far from your guess.`;
}

export function formatRegionName(region: WizardRegion): string {
  switch (region) {
    case 'castle': return 'Hogwarts Castle';
    case 'grounds': return 'Hogwarts Grounds';
    case 'diagon_alley': return 'Diagon Alley';
    case 'hogsmeade': return 'Hogsmeade Village';
    case 'ministry': return 'Ministry of Magic';
    default: return 'Wizarding World';
  }
}

export function formatFloorName(level: number): string {
  if (level === -2) return 'Deep Dungeons (B2)';
  if (level === -1) return 'Dungeons (B1)';
  if (level === 0) return 'Ground Floor (G)';
  if (level === 8) return 'High Towers';
  return `Floor ${level}`;
}
