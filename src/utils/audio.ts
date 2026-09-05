// Web Audio API Procedural Sound Synthesizer for Magical Wizarding Audio

class WizardSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
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

    // Deep parchment thud + high snitch sparkle
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

    // Golden sparkle
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
      ? [523.25, 659.25, 783.99, 1046.50] // Major chord (C5, E5, G5, C6)
      : score >= 2000
      ? [440, 554.37, 659.25] // A major
      : [330, 311.13, 293.66]; // Dissonant minor / drop

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

  // Legacy compatibility helpers
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
