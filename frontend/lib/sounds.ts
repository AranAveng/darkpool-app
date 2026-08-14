"use client";

function playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.15) {
  try {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  } catch (err) {
    console.error("Audio playback failed:", err);
  }
}

export function playClickSound() {
  playTone(600, 0.08, "sine", 0.1);
}

export function playSuccessSound() {
  playTone(523, 0.12, "sine", 0.15);
  setTimeout(() => playTone(659, 0.12, "sine", 0.15), 100);
  setTimeout(() => playTone(784, 0.15, "sine", 0.15), 200);
}

export function playErrorSound() {
  playTone(300, 0.2, "sawtooth", 0.1);
}

export function playConnectSound() {
  playTone(440, 0.1, "sine", 0.12);
  setTimeout(() => playTone(554, 0.15, "sine", 0.12), 90);
}