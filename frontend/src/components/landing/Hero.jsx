import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const HERO_IMG =
  "https://images.unsplash.com/photo-1762289581607-fc292299dc87?crop=entropy&cs=srgb&fm=jpg&q=85&w=1100";

export default function Hero() {
  const { lang } = useSite();
  const t = useT(lang);

  const stats = [
    { v: "+2.500", l: t.hero.stat1 },
    { v: "+300", l: t.hero.stat2 },
    { v: "4.9★", l: t.hero.stat3 },
  ];

  return (
    <section id="hero" className="relative z-10 overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: "var(--neon-border)", background: "var(--neon-soft)" }}
            data-testid="hero-tagline"
          >
            <Sparkles size={14} className="neon-text" />
            <span className="font-mono-x text-[11px] uppercase tracking-[0.2em] neon-text">
              {t.hero.tagline}
            </span>
          </div>

          <h1 className="font-head text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl lg:text-6xl">
            {t.hero.title1}{" "}
            <span className="neon-text text-glow">{t.hero.titleHi}</span>
            <br />
            {t.hero.title2}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            {t.hero.desc}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              data-testid="hero-cta-plans"
              onClick={() => scrollTo("plans")}
              className="pulse-ring group inline-flex items-center gap-2 rounded-full bg-[var(--neon)] px-7 py-3.5 font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              {t.hero.ctaPrimary}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              data-testid="hero-cta-courses"
              onClick={() => scrollTo("courses")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-white transition-colors hover:border-[var(--neon-border)] hover:text-[var(--neon)]"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>

          <div className="mt-12 flex gap-8">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="font-head text-2xl font-bold text-white">{s.v}</div>
                <div className="font-mono-x text-[11px] uppercase tracking-wider text-zinc-500">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* image card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
          data-testid="hero-image-card"
        >
          {/* floating mini cards */}
          <div className="float-slow glass absolute -left-6 top-10 z-20 hidden rounded-2xl px-4 py-3 sm:block">
            <div className="flex items-center gap-2">
              <Star size={16} className="neon-text" fill="currentColor" />
              <span className="font-head text-sm font-bold text-white">4.9 / 5.0</span>
            </div>
            <span className="font-mono-x text-[10px] uppercase tracking-wider text-zinc-400">
              {t.hero.stat3}
            </span>
          </div>

          <div className="float-rev glass absolute -right-4 bottom-12 z-20 hidden rounded-2xl px-4 py-3 sm:block">
            <span className="font-head text-lg font-black neon-text">+300</span>
            <p className="font-mono-x text-[10px] uppercase tracking-wider text-zinc-400">
              {t.hero.stat2}
            </p>
          </div>

          <div
            className="relative overflow-hidden rounded-[28px] border"
            style={{ borderColor: "var(--neon-border)", boxShadow: "0 0 60px var(--neon-glow)" }}
          >
            <img
              src={HERO_IMG}
              alt="Musician"
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-mono-x text-[11px] uppercase tracking-[0.2em] neon-text">
                {t.about.kicker}
              </div>
              <div className="font-head text-xl font-bold text-white">
                NEONSOM Studio
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
