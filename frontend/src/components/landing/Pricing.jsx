import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PLANS } from "../../data";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";

const ICONS = { single: Zap, full: Crown, vip: ShieldCheck };

export default function Pricing() {
  const { lang } = useSite();
  const t = useT(lang);

  const handleBuy = (planKey) => {
    toast(t.simulated, {
      description: t.pricing.plans[planKey].name,
      duration: 3500,
    });
  };

  return (
    <section id="plans" className="relative z-10 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-mono-x text-[11px] uppercase tracking-[0.25em] neon-text">
            {t.pricing.kicker}
          </span>
          <h2 className="mt-3 font-head text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-base text-zinc-400">{t.pricing.desc}</p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => {
            const info = t.pricing.plans[p.key];
            const Icon = ICONS[p.key];
            const off = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
            const popular = p.popular;

            return (
              <motion.div
                key={p.key}
                data-testid={`plan-card-${p.key}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  popular
                    ? "bg-[#0C0C0C]"
                    : "border-white/8 bg-[#0A0A0A]"
                }`}
                style={
                  popular
                    ? {
                        borderColor: "var(--neon)",
                        boxShadow: "0 0 50px var(--neon-glow)",
                      }
                    : {}
                }
              >
                {popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 font-mono-x text-[10px] font-bold uppercase tracking-[0.2em] text-black"
                    style={{ background: "var(--neon)" }}
                    data-testid={`badge-popular-${p.key}`}
                  >
                    {t.pricing.badgePopular}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border"
                    style={{ borderColor: "var(--neon-border)", background: "var(--neon-soft)" }}
                  >
                    <Icon size={20} className="neon-text" />
                  </div>
                  <span
                    className="rounded-full border px-2.5 py-1 font-mono-x text-[10px] font-bold uppercase tracking-wider neon-text"
                    style={{ borderColor: "var(--neon-border)" }}
                  >
                    {off}% {t.pricing.off}
                  </span>
                </div>

                <h3 className="mt-5 font-head text-xl font-bold text-white">{info.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{info.tagline}</p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="font-mono-x text-sm text-zinc-600 line-through">
                    {t.pricing.from} R${p.oldPrice}
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="font-head text-2xl font-bold text-white">R$</span>
                  <span className="font-head text-5xl font-black leading-none text-white">
                    {p.price}
                  </span>
                </div>
                <span className="mt-1 font-mono-x text-[11px] uppercase tracking-wider text-zinc-500">
                  {t.pricing.perCourse}
                </span>

                <ul className="mt-6 flex-1 space-y-3">
                  {info.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <span
                        className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: "var(--neon-soft)" }}
                      >
                        <Check size={13} className="neon-text" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  data-testid={`plan-buy-${p.key}`}
                  onClick={() => handleBuy(p.key)}
                  className={`mt-7 w-full rounded-full px-6 py-3.5 font-semibold transition-all hover:scale-[1.02] ${
                    popular ? "text-black" : "border border-white/15 text-white hover:border-[var(--neon-border)] hover:text-[var(--neon)]"
                  }`}
                  style={
                    popular
                      ? { background: "var(--neon)", boxShadow: "0 0 26px var(--neon-glow)" }
                      : {}
                  }
                >
                  {t.pricing.buy}
                </button>

                <div className="mt-4 flex items-center justify-center gap-1.5 font-mono-x text-[10px] uppercase tracking-wider text-zinc-600">
                  <ShieldCheck size={12} />
                  {t.pricing.guarantee}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
