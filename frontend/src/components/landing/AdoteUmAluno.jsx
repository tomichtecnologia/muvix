import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Gift, Users, GraduationCap, ArrowUpRight, Heart } from "lucide-react";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";
import { CONTACT } from "../../data";

const STEP_ICONS = [Gift, Users, GraduationCap];

const wa = (msg) => `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(msg)}`;

export default function AdoteUmAluno() {
  const { lang } = useSite();
  const t = useT(lang);
  const a = t.adote;

  return (
    <section id="adote" className="relative z-10 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono-x text-[11px] uppercase tracking-[0.22em] neon-text"
            style={{ borderColor: "var(--neon-border)" }}>
            <HeartHandshake size={14} /> {a.kicker}
          </span>
          <h2 className="mt-5 font-head text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {a.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">{a.desc}</p>
        </motion.div>

        {/* como funciona */}
        <div className="mb-12 grid gap-5 sm:grid-cols-3">
          {a.steps.map((s, i) => {
            const Icon = STEP_ICONS[i] || Gift;
            return (
              <motion.div
                key={i}
                data-testid={`adote-step-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="glass relative rounded-2xl border border-white/8 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{ borderColor: "var(--neon-border)", background: "var(--neon-soft)" }}>
                  <Icon size={22} className="neon-text" />
                </div>
                <span className="absolute right-5 top-5 font-head text-3xl font-black text-white/8">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-head text-lg font-bold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.d}</p>
              </motion.div>
            );
          })}
        </div>

        {/* dois lados: apadrinhar / pedir bolsa */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* apadrinhar (destaque) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border p-8"
            style={{ borderColor: "var(--neon-border)", background: "var(--neon-soft)", boxShadow: "0 0 40px var(--neon-glow)" }}
          >
            <HeartHandshake size={120} className="pointer-events-none absolute -right-6 -top-6 text-[var(--neon)] opacity-[0.08]" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl text-black"
              style={{ background: "var(--neon)" }}>
              <Heart size={22} fill="currentColor" />
            </div>
            <h3 className="mt-5 font-head text-2xl font-bold text-white">{a.sponsorTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{a.sponsorDesc}</p>
            <a
              href={wa("Olá! Quero apadrinhar um aluno na Muvix (Adote um Aluno). Como funciona?")}
              target="_blank"
              rel="noreferrer"
              data-testid="adote-sponsor-cta"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-black transition-transform hover:scale-[1.03]"
              style={{ background: "var(--neon)", boxShadow: "0 0 24px var(--neon-glow)" }}
            >
              {a.sponsorCta} <ArrowUpRight size={18} />
            </a>
          </motion.div>

          {/* pedir bolsa */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.02] p-8"
          >
            <GraduationCap size={120} className="pointer-events-none absolute -right-6 -top-6 text-white opacity-[0.05]" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 text-white">
              <GraduationCap size={22} />
            </div>
            <h3 className="mt-5 font-head text-2xl font-bold text-white">{a.scholarTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{a.scholarDesc}</p>
            <a
              href={wa("Olá! Tenho muita vontade de aprender música mas não tenho condições agora. Gostaria de pedir uma bolsa (Adote um Aluno).")}
              target="_blank"
              rel="noreferrer"
              data-testid="adote-scholar-cta"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition-colors hover:border-[var(--neon-border)] hover:text-[var(--neon)]"
            >
              {a.scholarCta} <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </div>

        {/* frase de impacto */}
        <p className="mt-10 text-center font-mono-x text-xs uppercase tracking-[0.18em] text-zinc-500">
          {a.impact}
        </p>
      </div>
    </section>
  );
}
