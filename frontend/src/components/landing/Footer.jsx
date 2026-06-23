import React from "react";
import { Heart } from "lucide-react";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";

export default function Footer() {
  const { lang } = useSite();
  const t = useT(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5 pt-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 pb-12 md:flex-row md:items-center">
          <div>
            <div className="font-head text-xl font-black tracking-tighter text-white">
              NEON<span className="neon-text">SOM</span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">{t.footer.tagline}</p>
          </div>
          <div className="flex items-center gap-2 font-mono-x text-xs uppercase tracking-wider text-zinc-500">
            {t.footer.built} <Heart size={13} className="neon-text" fill="currentColor" /> NEONSOM
          </div>
        </div>

        {/* giant brand */}
        <div className="select-none pb-6 text-center">
          <h2
            className="font-head font-black leading-none tracking-tighter text-transparent"
            style={{
              fontSize: "clamp(3rem, 16vw, 13rem)",
              WebkitTextStroke: "1px var(--neon-border)",
            }}
          >
            NEONSOM
          </h2>
        </div>

        <div className="border-t border-white/5 py-6 text-center font-mono-x text-[11px] uppercase tracking-wider text-zinc-600">
          © {year} NEONSOM · {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
