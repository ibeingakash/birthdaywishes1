/**
 * Audio Engine for Keti's Birthday Journey
 * Supports:
 * 1. Generative Ambient Synthesizer: Ethereal celestial chimes using Web Audio API (zero external network dependency)
 * 2. Sound Effects: Delicate chimes for candle lighting, star clicks, and celebratory fanfares
 * 3. Optional Custom Audio URL fallback when provided by the user in birthdayConfig.ts
 */

import { birthdayConfig } from '../birthdayConfig';

class AudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private ambientTimer: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private listeners: ((playing: boolean) => void)[] = [];

  constructor() {
    // If a custom audio file is defined, preload it
    if (birthdayConfig.music.customAudioUrl) {
      this.customAudio = new Audio(birthdayConfig.music.customAudioUrl);
      this.customAudio.loop = true;
    }
  }

  private async initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {}
    }
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      await this.start();
      return true;
    }
  }

  public async start(): Promise<void> {
    await this.initContext();

    if (this.customAudio && birthdayConfig.music.customAudioUrl) {
      try {
        await this.customAudio.play();
        this.isPlaying = true;
        this.notify();
        return;
      } catch (e) {
        console.warn('Custom audio autoplay restricted or failed, falling back to Web Audio synth', e);
      }
    }

    // Use built-in ambient celestial synth
    this.isPlaying = true;
    this.notify();
    this.startAmbientDrone();
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.ambientTimer) {
      window.clearInterval(this.ambientTimer);
      this.ambientTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.notify();
  }

  private startAmbientDrone() {
    if (this.ambientTimer) {
      window.clearInterval(this.ambientTimer);
    }

    // Play initial gentle welcoming arpeggio
    this.playAmbientArpeggio();

    // Loop soft harmonic chords every 5.5s
    this.ambientTimer = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.playAmbientArpeggio();
    }, 5500);
  }

  private playAmbientArpeggio() {
    if (!this.ctx || this.ctx.state !== 'running') return;

    // Celestial pentatonic frequencies (G# minor / B major pentatonic: B3, D#4, E4, F#4, G#4, B4, D#5)
    const scale = [246.94, 311.13, 329.63, 369.99, 415.3, 493.88, 622.25, 739.99];
    
    // Choose 3 or 4 delicate notes to ripple
    const noteCount = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < noteCount; i++) {
      const freq = scale[Math.floor(Math.random() * scale.length)];
      const delay = i * 0.45 + Math.random() * 0.15;
      this.playTone(freq, 2.8, 0.035, delay);
    }
  }

  public playTone(freq: number, duration: number = 2.0, gainAmount: number = 0.05, delaySeconds: number = 0) {
    this.initContext();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime + delaySeconds;

    // Oscillator 1 (Sine - pure fundamental)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Oscillator 2 (Triangle - warm harmonics)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, now); // slight detune for lush shimmering

    // Gain envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(gainAmount, now + 0.18);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Subtle low-pass filter to keep sound warm and rounded
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  /**
   * Sound effect: When a star wish is opened
   */
  public playStarSparkle() {
    this.initContext();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 1.2, 0.04, idx * 0.08);
    });
  }

  /**
   * Sound effect: When a candle flame is lit
   */
  public playCandleLitSound(candleIndex: number) {
    this.initContext();
    if (!this.ctx) return;
    // Ascending melodic steps for each candle
    const notes = [329.63, 369.99, 415.3, 493.88, 554.37, 659.25]; // E4, F#4, G#4, B4, C#5, E5
    const freq = notes[candleIndex % notes.length];
    this.playTone(freq, 1.8, 0.06, 0);
    this.playTone(freq * 1.5, 1.4, 0.03, 0.08);
  }

  /**
   * Sound effect: Final Birthday fanfare ripple
   */
  public playCelebrationChimes() {
    this.initContext();
    if (!this.ctx) return;
    const chimeArpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.5];
    chimeArpeggio.forEach((note, i) => {
      this.playTone(note, 2.5, 0.05, i * 0.12);
    });
  }
}

export const audioEngine = new AudioManager();
