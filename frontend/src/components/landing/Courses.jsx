import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Guitar, Music, Piano, Drum } from "lucide-react";
import { COURSES } from "../../data";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";

const ICONS = { Guitar, Music, Piano, Drum };
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const SectionHead = ({ kicker, title, desc }) => (
  <div className="mx-auto mb-14 max-w-2xl text-center">
    <span className="font-mono-x text-[11px] uppercase tracking-[0.25em] neon-text">{kicker}</span>
    <h2 className="mt-3 font-head text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
      {title}
    </h2>
    {desc && <p className="mt-4 text-base text-zinc-400">{desc}</p>}
  </div>
);

export default function Courses() {
  const { lang } = useSite();
  const t = useT(lang);

  return (
    <section id="courses" className="relative z-10 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead kicker={t.courses.kicker} title={t.courses.title} desc={t.courses.desc} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => {
            const Icon = ICONS[c.icon] || Music;
            const info = t.courses.items[c.key];
            const featured = i === 0;
            return (
              <motion.article
                key={c.key}
                data-testid={`course-card-${c.key}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0A0A0A] transition-all duration-300 hover:-translate-y-2 ${
                  featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-1" : ""
                }`}
                style={{ transition: "transform .3s, border-color .3s, box-shadow .3s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--neon-border)";
                  e.currentTarget.style.boxShadow = "0 0 34px var(--neon-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={c.image}
                    alt={info.name}
                    className="kenburns h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                  <div
                    className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-md"
                    style={{ borderColor: "var(--neon-border)", background: "rgba(0,0,0,0.5)" }}
                  >
                    <Icon size={20} className="neon-text" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-head text-xl font-bold text-white">{info.name}</h3>
                    <span className="font-mono-x text-[11px] uppercase tracking-wider text-zinc-500">
                      {c.lessons} {t.courses.lessons}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{info.desc}</p>
                  <div className="mt-4 font-mono-x text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    {t.courses.level}
                  </div>

                  <button
                    data-testid={`course-cta-${c.key}`}
                    onClick={() => scrollTo("plans")}
                    className="mt-5 inline-flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-[var(--neon)]"
                  >
                    {t.courses.cta}
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
