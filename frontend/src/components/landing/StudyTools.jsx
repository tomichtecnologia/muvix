import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Minus, Plus, Volume2 } from "lucide-react";
import { TUNER_NOTES } from "../../data";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";

const getCtx = (ref) => {
  if (!ref.current) {
    const AC = window.AudioContext || window.webkitAudioContext;
    ref.current = new AC();
  }
  if (ref.current.state === "suspended") ref.current.resume();
  return ref.current;
};

function Metronome({ t }) {
  const [bpm, setBpm] = useState(100);
  const [running, setRunning] = useState(false);
  const [beats] = useState(4);
  const [active, setActive] = useState(-1);
  const ctxRef = useRef(null);
  const timerRef = useRef(null);
  const beatRef = useRef(0);

  const click = useCallback((accent) => {
    const ctx = getCtx(ctxRef);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = accent ? 1500 : 900;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
    setActive(-1);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const start = useCallback(() => {
    getCtx(ctxRef);
    beatRef.current = 0;
    setRunning(true);
    const tick = () => {
      const b = beatRef.current % beats;
      setActive(b);
      click(b === 0);
      beatRef.current += 1;
    };
    tick();
    timerRef.current = setInterval(tick, (60 / bpm) * 1000);
  }, [bpm, beats, click]);

  // restart interval when bpm changes while running
  useEffect(() => {
    if (running) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        const b = beatRef.current % beats;
        setActive(b);
        click(b === 0);
        beatRef.current += 1;
      }, (60 / bpm) * 1000);
    }
    return () => {};
  }, [bpm, running, beats, click]);

  useEffect(() => () => timerRef.current && clearInterval(timerRef.current), []);

  return (
    <div className="glass flex flex-col rounded-2xl p-7" data-testid="metronome-tool">
      <div className="flex items-center justify-between">
        <h3 className="font-head text-lg font-bold text-white">{t.tools.metronome.name}</h3>
        <span className="font-mono-x text-[10px] uppercase tracking-wider text-zinc-500">
          {beats}/4
        </span>
      </div>

      {/* beat dots */}
      <div className="mt-6 flex justify-center gap-3">
        {Array.from({ length: beats }).map((_, i) => (
          <div
            key={i}
            className={`h-4 w-4 rounded-full transition-colors ${active === i ? "beat-on" : ""}`}
            style={{
              background: active === i ? "var(--neon)" : "rgba(255,255,255,0.12)",
              boxShadow: active === i ? "0 0 16px var(--neon-glow)" : "none",
            }}
          />
        ))}
      </div>

      {/* bpm display */}
      <div className="mt-6 text-center">
        <div className="font-head text-5xl font-black text-white" data-testid="metronome-bpm">
          {bpm}
        </div>
        <div className="font-mono-x text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          {t.tools.metronome.bpm}
        </div>
      </div>

      <input
        type="range"
        min={40}
        max={220}
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        data-testid="metronome-slider"
        className="mt-5 w-full accent-[var(--neon)]"
      />

      <div className="mt-5 flex items-center gap-3">
        <button
          data-testid="metronome-minus"
          onClick={() => setBpm((b) => Math.max(40, b - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white hover:border-[var(--neon-border)] hover:text-[var(--neon)]"
        >
          <Minus size={16} />
        </button>

        <button
          data-testid="metronome-toggle"
          onClick={() => (running ? stop() : start())}
          className="flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 font-semibold text-black"
          style={{ background: "var(--neon)", boxShadow: "0 0 22px var(--neon-glow)" }}
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? t.tools.metronome.stop : t.tools.metronome.start}
        </button>

        <button
          data-testid="metronome-plus"
          onClick={() => setBpm((b) => Math.min(220, b + 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white hover:border-[var(--neon-border)] hover:text-[var(--neon)]"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

function Tuner({ t }) {
  const ctxRef = useRef(null);
  const nodeRef = useRef(null);
  const [playing, setPlaying] = useState(null);

  const stopTone = useCallback(() => {
    if (nodeRef.current) {
      try {
        nodeRef.current.osc.stop();
      } catch (e) {}
      nodeRef.current = null;
    }
    setPlaying(null);
  }, []);

  const playTone = useCallback(
    (freq, label) => {
      const ctx = getCtx(ctxRef);
      stopTone();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      nodeRef.current = { osc, gain };
      setPlaying(label);
      // auto stop after 2s
      gain.gain.setValueAtTime(0.25, ctx.currentTime + 1.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2);
      osc.stop(ctx.currentTime + 2.05);
      setTimeout(() => setPlaying((p) => (p === label ? null : p)), 2000);
    },
    [stopTone]
  );

  useEffect(() => () => stopTone(), [stopTone]);

  return (
    <div className="glass flex flex-col rounded-2xl p-7" data-testid="tuner-tool">
      <div className="flex items-center justify-between">
        <h3 className="font-head text-lg font-bold text-white">{t.tools.tuner.name}</h3>
        <Volume2 size={18} className="text-zinc-500" />
      </div>
      <p className="mt-2 text-sm text-zinc-400">{t.tools.tuner.desc}</p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {TUNER_NOTES.map((n) => {
          const on = playing === n.label;
          return (
            <button
              key={n.label}
              data-testid={`tuner-note-${n.label}`}
              onClick={() => (on ? stopTone() : playTone(n.freq, n.label))}
              className="flex flex-col items-center justify-center rounded-xl border py-5 transition-all"
              style={{
                borderColor: on ? "var(--neon)" : "rgba(255,255,255,0.1)",
                background: on ? "var(--neon-soft)" : "rgba(255,255,255,0.02)",
                boxShadow: on ? "0 0 24px var(--neon-glow)" : "none",
              }}
            >
              <span
                className={`font-head text-2xl font-black ${on ? "neon-text" : "text-white"}`}
              >
                {n.note}
              </span>
              <span className="font-mono-x text-[10px] uppercase tracking-wider text-zinc-500">
                {n.label} · {n.freq}Hz
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-5 font-mono-x text-[10px] uppercase tracking-wider text-zinc-600">
        {t.tools.tuner.play} ↑
      </p>
    </div>
  );
}

export default function StudyTools() {
  const { lang } = useSite();
  const t = useT(lang);
  return (
    <section id="tools" className="relative z-10 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-mono-x text-[11px] uppercase tracking-[0.25em] neon-text">
            {t.tools.kicker}
          </span>
          <h2 className="mt-3 font-head text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {t.tools.title}
          </h2>
          <p className="mt-4 text-base text-zinc-400">{t.tools.desc}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <Metronome t={t} />
          <Tuner t={t} />
        </motion.div>
      </div>
    </section>
  );
}
