// Music Player Engine for the 4 featured songs with authentic audio previews and rich synthesis

export interface SongData {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  duration: string;
  coverUrl: string;
  audioFile?: string;
  type: 'nellie' | 'swan-lake' | 'face-today' | 'fluorescent';
}

export const FEATURED_SONGS: SongData[] = [
  {
    id: 'nellie',
    title: 'Nellie',
    artist: 'Dr. Dog',
    album: 'B-Room',
    year: '2013',
    duration: '3:39',
    coverUrl: '/covers/dr-dog-nellie.svg',
    type: 'nellie'
  },
  {
    id: 'swan-lake',
    title: 'Swan Lake, Op. 20: Scène',
    artist: 'Pyotr Ilyich Tchaikovsky',
    album: 'London Philharmonic Orchestra',
    year: '1877',
    duration: '2:58',
    coverUrl: '/covers/swan-lake.svg',
    audioFile: '/audio/swan-lake.ogg',
    type: 'swan-lake'
  },
  {
    id: 'face-today',
    title: 'I Thought I Saw Your Face Today',
    artist: 'She & Him',
    album: 'Volume One',
    year: '2008',
    duration: '2:50',
    coverUrl: '/covers/she-and-him.svg',
    type: 'face-today'
  },
  {
    id: 'fluorescent',
    title: 'Fluorescent Adolescent',
    artist: 'Arctic Monkeys',
    album: 'Favourite Worst Nightmare',
    year: '2007',
    duration: '2:57',
    coverUrl: '/covers/arctic-monkeys.svg',
    type: 'fluorescent'
  }
];

class MusicPlayer {
  private ctx: AudioContext | null = null;
  private currentHtmlAudio: HTMLAudioElement | null = null;
  private intervalId: number | null = null;
  private onTimeUpdateCallback: ((time: number, duration: number) => void) | null = null;
  private isPlaying: boolean = false;
  private activeSongId: string | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setOnTimeUpdate(cb: (time: number, duration: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public stop() {
    if (this.currentHtmlAudio) {
      this.currentHtmlAudio.pause();
      this.currentHtmlAudio.currentTime = 0;
      this.currentHtmlAudio = null;
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
    this.activeSongId = null;
  }

  public playSong(song: SongData, onEnded?: () => void) {
    this.stop();
    this.isPlaying = true;
    this.activeSongId = song.id;

    if (song.audioFile) {
      const audio = new Audio(song.audioFile);
      this.currentHtmlAudio = audio;
      audio.volume = 0.85;

      audio.addEventListener('timeupdate', () => {
        if (this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(audio.currentTime, audio.duration || 178);
        }
      });

      audio.addEventListener('ended', () => {
        this.stop();
        if (onEnded) onEnded();
      });

      audio.play().catch(() => {
        this.playMelodicArrangement(song.type, onEnded);
      });
    } else {
      this.playMelodicArrangement(song.type, onEnded);
    }
  }

  private playMelodicArrangement(type: SongData['type'], onEnded?: () => void) {
    const ctx = this.getContext();
    const startTime = ctx.currentTime;
    let sequence: { note: number; dur: number; type?: OscillatorType; gain?: number; chord?: number[] }[] = [];

    if (type === 'nellie') {
      // Dr. Dog - Nellie (Warm acoustic folk fingerpicking & melody: D - F#m - G - A)
      const D3 = 146.83, Fs3 = 185.00, G3 = 196.00, A3 = 220.00, E4 = 329.63;
      const D4 = 293.66, Fs4 = 369.99, G4 = 392.00, A4 = 440.00, B4 = 493.88, D5 = 587.33;
      sequence = [
        { note: D4, dur: 0.45, type: 'triangle', gain: 0.14, chord: [D3, A3] },
        { note: Fs4, dur: 0.45, type: 'triangle', gain: 0.14 },
        { note: A4, dur: 0.9, type: 'sine', gain: 0.16, chord: [Fs3, A3] },
        { note: G4, dur: 0.45, type: 'triangle', gain: 0.14 },
        { note: Fs4, dur: 0.45, type: 'triangle', gain: 0.14, chord: [G3, D4] },
        { note: D4, dur: 0.9, type: 'triangle', gain: 0.14 },
        { note: G4, dur: 0.45, type: 'sine', gain: 0.15, chord: [A3, E4] },
        { note: A4, dur: 0.45, type: 'sine', gain: 0.15 },
        { note: B4, dur: 0.9, type: 'sine', gain: 0.18, chord: [G3, D4] },
        { note: A4, dur: 0.9, type: 'triangle', gain: 0.16, chord: [A3, D4] },
        { note: D5, dur: 1.4, type: 'sine', gain: 0.20, chord: [D3, A3, Fs4] },
      ];
    } else if (type === 'face-today') {
      // She & Him - I Thought I Saw Your Face Today (tender vintage acoustic dream pop)
      const C3 = 130.81, F3 = 174.61, G3 = 196.00, A3 = 220.00, C4 = 261.63, D4 = 293.66;
      const E4 = 329.63, G4 = 392.00, A4 = 440.00, C5 = 523.25, D5 = 587.33;
      sequence = [
        { note: E4, dur: 0.5, type: 'sine', gain: 0.15, chord: [C3, G3] },
        { note: G4, dur: 0.5, type: 'sine', gain: 0.15 },
        { note: A4, dur: 0.6, type: 'triangle', gain: 0.16, chord: [F3, C4] },
        { note: G4, dur: 0.4, type: 'sine', gain: 0.14 },
        { note: E4, dur: 0.8, type: 'sine', gain: 0.16, chord: [C3, G3] },
        { note: D5, dur: 0.5, type: 'sine', gain: 0.18, chord: [G3, D4] },
        { note: C5, dur: 0.6, type: 'triangle', gain: 0.16 },
        { note: A4, dur: 0.8, type: 'sine', gain: 0.15, chord: [A3, E4] },
        { note: G4, dur: 1.2, type: 'sine', gain: 0.18, chord: [C3, G3, E4] },
      ];
    } else if (type === 'fluorescent') {
      // Arctic Monkeys - Fluorescent Adolescent (Driving indie rock guitar riff)
      const E2 = 82.41, A2 = 110.00, B2 = 123.47;
      const E4 = 329.63, Gs4 = 415.30, A4 = 440.00, B4 = 493.88, E5 = 659.25;
      sequence = [
        { note: E4, dur: 0.22, type: 'sawtooth', gain: 0.09, chord: [E2] },
        { note: Gs4, dur: 0.22, type: 'sawtooth', gain: 0.09 },
        { note: B4, dur: 0.35, type: 'sawtooth', gain: 0.10, chord: [E2] },
        { note: E5, dur: 0.45, type: 'sawtooth', gain: 0.11, chord: [A2] },
        { note: B4, dur: 0.22, type: 'sawtooth', gain: 0.09 },
        { note: A4, dur: 0.45, type: 'sawtooth', gain: 0.10, chord: [B2] },
        { note: Gs4, dur: 0.45, type: 'sawtooth', gain: 0.09 },
        { note: E4, dur: 0.7, type: 'sawtooth', gain: 0.10, chord: [E2] },
      ];
    }

    let totalDuration = 0;
    sequence.forEach(s => totalDuration += s.dur);

    let noteTime = startTime;
    sequence.forEach(({ note, dur, type = 'sine', gain = 0.12, chord = [] }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(note, noteTime);

      gainNode.gain.setValueAtTime(0, noteTime);
      gainNode.gain.linearRampToValueAtTime(gain, noteTime + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, noteTime + dur);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + dur);

      // Add bass chord harmony
      chord.forEach(bassFreq => {
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(bassFreq, noteTime);
        bassGain.gain.setValueAtTime(0, noteTime);
        bassGain.gain.linearRampToValueAtTime(gain * 0.5, noteTime + 0.04);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + dur * 0.9);
        bassOsc.connect(bassGain);
        bassGain.connect(ctx.destination);
        bassOsc.start(noteTime);
        bassOsc.stop(noteTime + dur * 0.9);
      });

      noteTime += dur;
    });

    let currentSec = 0;
    this.intervalId = window.setInterval(() => {
      currentSec += 0.5;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(currentSec % totalDuration, totalDuration);
      }
      if (currentSec >= totalDuration) {
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = null;
        this.isPlaying = false;
        this.activeSongId = null;
        if (onEnded) onEnded();
      }
    }, 500);
  }

  public getActiveSongId(): string | null {
    return this.activeSongId;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const musicPlayer = new MusicPlayer();
