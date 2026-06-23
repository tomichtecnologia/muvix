import React, { useState } from "react";
import { Coffee, Heart, X } from "lucide-react";
import { toast } from "sonner";
import { COFFEE_AMOUNTS } from "../../data";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";

export default function SupportModal({ open, onClose }) {
  const { lang } = useSite();
  const t = useT(lang);
  const [amount, setAmount] = useState(15);

  if (!open) return null;

  const support = () => {
    toast.success(t.support_modal.thanks, {
      description: `☕ R$${amount} · ${t.simulated}`,
      duration: 3500,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-5"
      data-testid="support-modal"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-3xl border p-8"
        style={{
          borderColor: "var(--neon-border)",
          background: "#0A0A0A",
          boxShadow: "0 0 60px var(--neon-glow)",
        }}
      >
        <button
          data-testid="support-modal-close"
          onClick={onClose}
          className="absolute right-5 top-5 text-zinc-500 hover:text-white"
        >
          <X size={20} />
        </button>

        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: "var(--neon-soft)" }}
        >
          <Coffee size={30} className="neon-text" />
        </div>

        <h3 className="mt-5 text-center font-head text-2xl font-bold text-white">
          {t.support_modal.title}
        </h3>
        <p className="mt-3 text-center text-sm leading-relaxed text-zinc-400">
          {t.support_modal.desc}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {COFFEE_AMOUNTS.map((a) => {
            const sel = amount === a;
            return (
              <button
                key={a}
                data-testid={`coffee-amount-${a}`}
                onClick={() => setAmount(a)}
                className="flex flex-col items-center rounded-xl border py-4 transition-all"
                style={{
                  borderColor: sel ? "var(--neon)" : "rgba(255,255,255,0.1)",
                  background: sel ? "var(--neon-soft)" : "transparent",
                }}
              >
                <Coffee size={18} className={sel ? "neon-text" : "text-zinc-400"} />
                <span className={`mt-1.5 font-head font-bold ${sel ? "neon-text" : "text-white"}`}>
                  R${a}
                </span>
              </button>
            );
          })}
        </div>

        <button
          data-testid="support-confirm-btn"
          onClick={support}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-black transition-transform hover:scale-[1.02]"
          style={{ background: "var(--neon)", boxShadow: "0 0 26px var(--neon-glow)" }}
        >
          <Heart size={18} fill="currentColor" />
          {t.support_modal.button} · R${amount}
        </button>

        <p className="mt-4 text-center font-mono-x text-[10px] uppercase tracking-wider text-zinc-600">
          {t.simulated}
        </p>
      </div>
    </div>
  );
}
