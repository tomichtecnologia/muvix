import React, { useState, useEffect } from "react";
import { ArrowUp, Coffee } from "lucide-react";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";

export default function FloatingButtons({ onSupport }) {
  const { lang } = useSite();
  const t = useT(lang);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {/* support floating (always visible) */}
      <button
        data-testid="floating-support-btn"
        onClick={onSupport}
        aria-label={t.support}
        className="pulse-ring flex h-13 w-13 items-center justify-center rounded-full text-black transition-transform hover:scale-110"
        style={{ background: "var(--neon)", height: 52, width: 52, boxShadow: "0 0 24px var(--neon-glow)" }}
      >
        <Coffee size={22} />
      </button>

      {/* back to top */}
      {show && (
        <button
          data-testid="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.backToTop}
          className="glass flex items-center justify-center rounded-full border text-white transition-all hover:text-[var(--neon)]"
          style={{ height: 52, width: 52, borderColor: "var(--neon-border)" }}
        >
          <ArrowUp size={22} />
        </button>
      )}
    </div>
  );
}
