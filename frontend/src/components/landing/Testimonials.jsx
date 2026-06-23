import React from "react";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../../data";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";

const Card = ({ tm }) => (
  <div className="glass mx-3 w-[330px] shrink-0 rounded-2xl p-6">
    <div className="flex items-center justify-between">
      <Quote size={22} className="neon-text" />
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className="neon-text" fill="currentColor" />
        ))}
      </div>
    </div>
    <p className="mt-4 text-sm leading-relaxed text-zinc-300">"{tm.text}"</p>
    <div className="mt-5 flex items-center gap-3">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full font-head text-sm font-bold text-black"
        style={{ background: "var(--neon)" }}
      >
        {tm.name.charAt(0)}
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{tm.name}</div>
        <div className="font-mono-x text-[10px] uppercase tracking-wider text-zinc-500">
          {tm.role}
        </div>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const { lang } = useSite();
  const t = useT(lang);
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative z-10 overflow-hidden py-24 lg:py-32" data-testid="testimonials">
      <div className="mx-auto mb-14 max-w-2xl px-5 text-center">
        <span className="font-mono-x text-[11px] uppercase tracking-[0.25em] neon-text">
          {t.testimonials.kicker}
        </span>
        <h2 className="mt-3 font-head text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {t.testimonials.title}
        </h2>
      </div>

      <div className="relative">
        <div className="marquee-track">
          {loop.map((tm, i) => (
            <Card key={i} tm={tm} />
          ))}
        </div>
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent" />
      </div>
    </section>
  );
}
