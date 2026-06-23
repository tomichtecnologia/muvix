import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";

const ABOUT_IMG =
  "https://customer-assets.emergentagent.com/job_sound-master-lab/artifacts/458dem7x_WhatsApp%20Image%202026-06-22%20at%2021.43.58%20%282%29.jpeg";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function About() {
  const { lang } = useSite();
  const t = useT(lang);

  return (
    <section id="about" className="relative z-10 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative order-2 lg:order-1"
        >
          <div
            className="relative overflow-hidden rounded-[28px] border"
            style={{ borderColor: "var(--neon-border)", boxShadow: "0 0 50px var(--neon-glow)" }}
            data-testid="about-image"
          >
            <img src={ABOUT_IMG} alt="Musician portrait" className="h-[460px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-transparent" />
          </div>
          <div className="float-slow glass absolute -right-4 top-8 hidden rounded-2xl px-5 py-4 sm:block">
            <div className="font-head text-2xl font-black neon-text">15+</div>
            <div className="font-mono-x text-[10px] uppercase tracking-wider text-zinc-400">
              {lang === "pt" ? "anos de palco" : "years on stage"}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2"
        >
          <span className="font-mono-x text-[11px] uppercase tracking-[0.25em] neon-text">
            {t.about.kicker}
          </span>
          <h2 className="mt-3 font-head text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {t.about.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-400">{t.about.p1}</p>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">{t.about.p2}</p>
          <button
            data-testid="about-cta"
            onClick={() => scrollTo("contact")}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-[var(--neon-border)] hover:text-[var(--neon)]"
          >
            <MessageCircle size={18} />
            {t.about.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
