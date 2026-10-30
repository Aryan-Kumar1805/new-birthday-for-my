// Romantic Web Audio API synthesizer for background music box & acoustic vibes

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume = 0.35;
  private noteIndex = 0;

  // Romantic acoustic chord melody notes (MIDI frequencies)
  private melodyNotes = [
    // G major, D/F#, Em, C major romantic progression
    { f: 392.0, d: 0.6 }, // G4
    { f: 493.88, d: 0.6 }, // B4
    { f: 587.33, d: 0.8 }, // D5
    { f: 783.99, d: 1.0 }, // G5
    { f: 587.33, d: 0.6 }, // D5
    { f: 493.88, d: 0.6 }, // B4

    { f: 369.99, d: 0.6 }, // F#4
    { f: 440.0, d: 0.6 }, // A4
    { f: 587.33, d: 0.8 }, // D5
    { f: 739.99, d: 1.0 }, // F#5
    { f: 587.33, d: 0.6 }, // D5
    { f: 440.0, d: 0.6 }, // A4

    { f: 329.63, d: 0.6 }, // E4
    { f: 392.0, d: 0.6 }, // G4
    { f: 493.88, d: 0.8 }, // B4
    { f: 659.25, d: 1.0 }, // E5
    { f: 493.88, d: 0.6 }, // B4
    { f: 392.0, d: 0.6 }, // G4

    { f: 261.63, d: 0.6 }, // C4
    { f: 329.63, d: 0.6 }, // E4
    { f: 392.0, d: 0.8 }, // G4
    { f: 523.25, d: 1.0 }, // C5
    { f: 392.0, d: 0.6 }, // G4
    { f: 329.63, d: 0.6 }, // E4
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;

    // Harmonic bell/music box synth with 2 oscillators
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // Upper octave harmonic shimmer

    // Soft envelope
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.5);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration * 1.6);
    osc2.stop(now + duration * 1.6);
  }

  public playCelebrationChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 1.2);
      }, idx * 120);
    });
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const step = () => {
      if (!this.isPlaying) return;
      const note = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
      this.playTone(note.f, note.d);
      this.noteIndex = (this.noteIndex + 1) % this.melodyNotes.length;
      this.timerId = window.setTimeout(step, 550);
    };

    step();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
