// Web Audio API Procedural Sound Synthesizer & Background Music Engine

const getThemeAudioUrl = () => {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}audio/hedwigs-theme.mp3`;
};

class WizardSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private bgAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const domAudio = (typeof document !== 'undefined') 
          ? (document.getElementById('harry-potter-theme') as HTMLAudioElement) 
          : null;
        this.bgAudio = domAudio || new Audio(getThemeAudioUrl());
        this.bgAudio.loop = true;
        this.bgAudio.preload = 'auto';
        this.bgAudio.volume = 0.7;
        this.playThemeMusic().catch(() => {});
      } catch (e) {}

      // Unlock on any user gesture or interaction instantly
      const unlockAudio = () => {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        this.playThemeMusic().catch(() => {});
      };

      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('pointerdown', unlockAudio, { passive: true });
      window.addEventListener('pointerup', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
      window.addEventListener('touchend', unlockAudio, { passive: true });
      window.addEventListener('wheel', unlockAudio, { passive: true });
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private getBgAudio(): HTMLAudioElement | null {
    if (typeof document === 'undefined') return null;
    if (!this.bgAudio) {
      this.bgAudio = document.getElementById('harry-potter-theme') as HTMLAudioElement;
      if (!this.bgAudio) {
        this.bgAudio = new Audio(getThemeAudioUrl());
        this.bgAudio.loop = true;
        this.bgAudio.preload = 'auto';
      }
    }
    return this.bgAudio;
  }

  // --- Background Theme Music (Hedwig's Theme) ---
  public playThemeMusic(volume: number = 0.7): Promise<boolean> {
    if (typeof window === 'undefined') return Promise.resolve(false);
    const audio = this.getBgAudio();
    if (!audio) return Promise.resolve(false);

    audio.volume = volume;
    audio.muted = this.isMuted;
    if (this.isMuted) return Promise.resolve(false);

    if (!audio.paused && !audio.ended && audio.currentTime > 0) {
      this.isMusicPlaying = true;
      return Promise.resolve(true);
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      return playPromise
        .then(() => {
          this.isMusicPlaying = true;
          return true;
        })
        .catch(() => {
          this.isMusicPlaying = false;
          return false;
        });
    }
    return Promise.resolve(false);
  }

  public pauseThemeMusic() {
    const audio = this.getBgAudio();
    if (audio) {
      audio.pause();
      this.isMusicPlaying = false;
    }
  }

  public isThemePlaying(): boolean {
    const audio = this.getBgAudio();
    return !!(audio && !audio.paused && !audio.muted) || this.isMusicPlaying;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    const audio = this.getBgAudio();
    if (audio) {
      audio.muted = muted;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    const audio = this.getBgAudio();
    if (audio) {
      audio.muted = this.isMuted;
      if (!this.isMuted && audio.paused) {
        audio.play().then(() => {
          this.isMusicPlaying = true;
        }).catch(() => {});
      }
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Wand Whoosh / Spell Cast
  public playWandWhoosh() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.35);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.36);
  }

  // Lumos Spell Bell Chime
  public playLumos() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    [587.33, 880, 1174.66, 1760].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.04);

      gain.gain.setValueAtTime(0.15 / (i + 1), ctx.currentTime + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8 + i * 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.04);
      osc.stop(ctx.currentTime + 0.9 + i * 0.1);
    });
  }

  // Marauder's Map Guess Placement Stamp
  public playMapStamp() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);

    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkle.type = 'sine';
    sparkle.frequency.setValueAtTime(1320, ctx.currentTime + 0.05);
    sparkleGain.gain.setValueAtTime(0.1, ctx.currentTime + 0.05);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    sparkle.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);

    sparkle.start(ctx.currentTime + 0.05);
    sparkle.stop(ctx.currentTime + 0.36);
  }

  // Animated Walking Footprints
  public playFootsteps() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    for (let step = 0; step < 5; step++) {
      const startTime = ctx.currentTime + step * 0.14;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 + (step % 2) * 30, startTime);
      osc.frequency.exponentialRampToValueAtTime(50, startTime + 0.08);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.09);
    }
  }

  // Score Reveal Fanfare
  public playScoreFanfare(score: number) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = score >= 4000 
      ? [523.25, 659.25, 783.99, 1046.50]
      : score >= 2000
      ? [440, 554.37, 659.25]
      : [330, 311.13, 293.66];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.65);
    });
  }

  // Clock Countdown Ticking
  public playTick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(900, ctx.currentTime);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  }

  // Legacy helpers
  public playHover() { this.playTick(); }
  public playClick() { this.playWandWhoosh(); }
  public playWhoosh() { this.playWandWhoosh(); }
  public playSparkle() { this.playLumos(); }
  public playAcceptFanfare() { this.playScoreFanfare(5000); }
  public playVinylDrop() { this.playMapStamp(); }
  public playCelebration() { this.playScoreFanfare(5000); }
}

export const sound = new WizardSoundEngine();
export const soundFX = sound;
