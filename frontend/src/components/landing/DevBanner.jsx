import React from "react";
import { Hammer } from "lucide-react";
import { useSite } from "../../context/SiteContext";

const TEXT = {
  pt: "Site em desenvolvimento — estamos construindo algo incrível pra você. Em breve, novidades!",
  en: "Site under development — we're building something amazing for you. Stay tuned!",
};

export default function DevBanner() {
  const { lang } = useSite();
  const msg = TEXT[lang] || TEXT.pt;

  return (
    <div
      data-testid="dev-banner"
      className="banner-blink fixed top-0 left-0 right-0 z-[60] flex h-9 items-center justify-center gap-2 bg-[var(--neon)] px-4 text-center"
      style={{ boxShadow: "0 0 22px var(--neon-glow)" }}
    >
      <Hammer size={13} className="shrink-0 text-black" />
      <span className="font-mono-x text-[10px] font-bold uppercase tracking-[0.18em] text-black sm:text-[11px]">
        {msg}
      </span>
    </div>
  );
}
