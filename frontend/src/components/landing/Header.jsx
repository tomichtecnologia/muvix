import React, { useState, useEffect } from "react";
import { Palette, Languages, Coffee, Menu, X } from "lucide-react";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Header({ onSupport }) {
  const { theme, toggleTheme, lang, toggleLang } = useSite();
  const t = useT(lang);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "courses", label: t.nav.courses },
    { id: "plans", label: t.nav.plans },
    { id: "tools", label: t.nav.tools },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];

  const go = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* logo */}
        <button
          data-testid="brand-logo"
          onClick={() => go("hero")}
          className="flex flex-col items-start leading-none"
        >
          <span className="font-head text-lg font-black tracking-tighter text-white">
            MU<span className="neon-text">VIX</span>
          </span>
          <span className="font-mono-x text-[8px] uppercase tracking-[0.28em] text-zinc-500">
            Academia de Músicas
          </span>
        </button>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-${l.id}`}
              onClick={() => go(l.id)}
              className="font-mono-x text-xs uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:text-[var(--neon)]"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* actions */}
        <div className="flex items-center gap-2">
          <button
            data-testid="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === "lime" ? "Lime → Aqua" : "Aqua → Lime"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition-all hover:border-[var(--neon-border)] hover:text-[var(--neon)]"
          >
            <Palette size={16} />
          </button>

          <button
            data-testid="lang-toggle-btn"
            onClick={toggleLang}
            className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 px-3 text-white transition-all hover:border-[var(--neon-border)] hover:text-[var(--neon)]"
          >
            <Languages size={15} />
            <span className="font-mono-x text-xs font-bold uppercase">{lang}</span>
          </button>

          <button
            data-testid="support-header-btn"
            onClick={onSupport}
            className="hidden items-center gap-2 rounded-full bg-[var(--neon)] px-4 py-2 font-semibold text-black transition-all hover:scale-[1.03] sm:flex"
            style={{ boxShadow: "0 0 22px var(--neon-glow)" }}
          >
            <Coffee size={16} />
            <span className="text-sm">{t.support}</span>
          </button>

          <button
            data-testid="mobile-menu-btn"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div data-testid="mobile-menu" className="glass border-t border-white/5 lg:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <button
                key={l.id}
                data-testid={`mobile-nav-${l.id}`}
                onClick={() => go(l.id)}
                className="rounded-xl px-3 py-3 text-left font-mono-x text-sm uppercase tracking-wide text-zinc-300 hover:bg-white/5 hover:text-[var(--neon)]"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { setOpen(false); onSupport(); }}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[var(--neon)] px-4 py-3 font-semibold text-black"
            >
              <Coffee size={16} /> {t.support}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
