
export const playSound = (type: 'pop' | 'jump' | 'sparkle' | 'paper' | 'ding') => {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  
  const ctx = new AudioContextClass();
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.value = 0.2;

  const now = ctx.currentTime;

  switch (type) {
    case 'pop': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(now + 0.1);
      break;
    }
    case 'jump': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(now + 0.15);
      break;
    }
    case 'sparkle': {
      const frequencies = [880, 1174, 1318, 1760];
      frequencies.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        const start = now + i * 0.05;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.3);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(start);
        osc.stop(start + 0.3);
      });
      break;
    }
    case 'paper': {
      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      noise.start();
      break;
    }
    case 'ding': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(now + 0.5);
      break;
    }
  }
};

/**
 * Starts a synthesized piano melody inspired by Congfei Wei - Bluestone Alley.
 * Replicates the rapid arpeggios and bright piano timbre using multi-oscillator synthesis.
 */
export const startRomanticMusic = () => {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return () => {};
  
  const ctx = new AudioContextClass();
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.value = 0.25; 

  // Bluestone Alley Motif (Approximate transcription of the iconic intro)
  const melody = [
    // Am section
    659.25, 880.00, 1046.50, 987.77, 880.00, 659.25, 523.25, 493.88,
    659.25, 880.00, 1046.50, 987.77, 880.00, 659.25, 523.25, 493.88,
    // Dm section
    698.46, 880.00, 1174.66, 1046.50, 987.77, 880.00, 698.46, 587.33,
    // G section
    783.99, 987.77, 1174.66, 1046.50, 987.77, 783.99, 587.33, 493.88,
    // Cmaj section
    659.25, 783.99, 1046.50, 987.77, 880.00, 783.99, 659.25, 523.25,
    // G ending
    587.33, 783.99, 987.77, 880.00, 783.99, 587.33, 493.88, 440.00
  ];

  let noteIndex = 0;

  const playPianoNote = (freq: number, time: number) => {
    // Fundamental Body
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = 'triangle';
    bodyOsc.frequency.setValueAtTime(freq, time);
    bodyGain.gain.setValueAtTime(0, time);
    bodyGain.gain.linearRampToValueAtTime(0.35, time + 0.005);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, time + 2.0);
    bodyOsc.connect(bodyGain);
    bodyGain.connect(masterGain);
    bodyOsc.start(time);
    bodyOsc.stop(time + 2.0);

    // Brightness Harmonic
    const shineOsc = ctx.createOscillator();
    const shineGain = ctx.createGain();
    shineOsc.type = 'sine';
    shineOsc.frequency.setValueAtTime(freq * 2.005, time);
    shineGain.gain.setValueAtTime(0, time);
    shineGain.gain.linearRampToValueAtTime(0.12, time + 0.005);
    shineGain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
    shineOsc.connect(shineGain);
    shineGain.connect(masterGain);
    shineOsc.start(time);
    shineOsc.stop(time + 1.2);
  };

  const scheduler = () => {
    const freq = melody[noteIndex];
    const velocity = 0.85 + Math.random() * 0.3;
    masterGain.gain.setTargetAtTime(0.25 * velocity, ctx.currentTime, 0.02);
    playPianoNote(freq, ctx.currentTime);
    noteIndex = (noteIndex + 1) % melody.length;
  };

  const intervalId = window.setInterval(scheduler, 170);

  return () => {
    window.clearInterval(intervalId);
    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    setTimeout(() => {
      if (ctx.state !== 'closed') ctx.close().catch(() => {});
    }, 1600);
  };
};
