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
      // Player guessed Hogwarts Castle, but location was outside in the wider world
      const hogwartsWorldX = 625;
      const hogwartsWorldY = 304;
      const targetX = actual.worldX ?? hogwartsWorldX;
      const targetY = actual.worldY ?? hogwartsWorldY;
      const dx = hogwartsWorldX - targetX;
      const dy = hogwartsWorldY - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const distanceMeters = Math.round(dist * 1.5);
      const score = Math.max(0, Math.min(3500, Math.round(5000 * Math.exp(-dist / 100))));

      return {
        score,
        distanceMeters,
        floorDelta: 0,
        regionMatched: false,
        owlGrade: getOwlGrade(score),
        feedback: `You guessed inside Hogwarts Castle, but this location was in ${formatRegionName(actual.region)} (${actual.name})!`,
      };
    }

    // Both guess and actual are inside Hogwarts Castle
    const dx = guess.x - actual.x;
    const dy = guess.y - actual.y;
    const rawDist = Math.sqrt(dx * dx + dy * dy);

    // Preset room tolerance: Each room on the cross-section map has ~50 units radius
    const roomTolerance = 52;
    let score = 0;
    let distanceMeters = 0;

    if (rawDist <= roomTolerance) {
      // Pinpoint hit inside the room!
      score = 5000;
      distanceMeters = Math.round(rawDist * 0.08); // 0m - 4m
    } else {
      const excessDist = rawDist - roomTolerance;
      distanceMeters = Math.max(5, Math.round(excessDist * 0.45));
      score = Math.round(5000 * Math.exp(-excessDist / 60));
    }
    score = Math.max(0, Math.min(5000, score));

    return {
      score,
      distanceMeters,
      floorDelta: 0,
      regionMatched: true,
      owlGrade: getOwlGrade(score),
      feedback: getFeedback(score, actual.name),
    };
  }

  // Case 2: Player guessed on the Great Britain & World Map
  const targetX = actual.worldX ?? (isCastleActual ? 625 : actual.x);
  const targetY = actual.worldY ?? (isCastleActual ? 304 : actual.y);
  const dx = guess.x - targetX;
  const dy = guess.y - targetY;
  const rawDist = Math.sqrt(dx * dx + dy * dy);

  // Preset regional tolerance for landmarks on the overworld map
  const worldTolerance = 35;
  let score = 0;
  let distanceMeters = 0;

  if (rawDist <= worldTolerance) {
    score = isCastleActual ? 4750 : 5000;
    distanceMeters = Math.round(rawDist * 0.2);
  } else {
    const excessDist = rawDist - worldTolerance;
    distanceMeters = Math.max(5, Math.round(excessDist * 1.2));
    score = Math.round(5000 * Math.exp(-excessDist / 90));
  }
  score = Math.max(0, Math.min(5000, score));

  return {
    score,
    distanceMeters,
    floorDelta: 0,
    regionMatched: guess.region === actual.region || (isCastleActual && rawDist < 50),
    owlGrade: getOwlGrade(score),
    feedback: isCastleActual && score >= 4500
      ? `Great job pinpointing Hogwarts on the world map! You can zoom into the castle next time for a perfect 5,000 pt room guess.`
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
