import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Instagram, Youtube, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useSite } from "../../context/SiteContext";
import { useT } from "../../i18n";
import { CONTACT } from "../../data";

export default function Contact() {
  const { lang } = useSite();
  const t = useT(lang);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    toast.success(t.contact.sent);
    setForm({ name: "", email: "", message: "" });
  };

  const socials = [
    { icon: Instagram, label: "Instagram", href: CONTACT.instagram },
    { icon: Youtube, label: "YouTube", href: CONTACT.youtube },
    { icon: MessageCircle, label: "WhatsApp", href: CONTACT.whatsapp },
    { icon: Send, label: "Telegram", href: CONTACT.telegram },
    { icon: Mail, label: "Email", href: `mailto:${CONTACT.email}` },
  ];

  return (
    <section id="contact" className="relative z-10 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 sm:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="font-mono-x text-[11px] uppercase tracking-[0.25em] neon-text">
                {t.contact.kicker}
              </span>
              <h2 className="mt-3 font-head text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {t.contact.title}
              </h2>
              <p className="mt-4 text-base text-zinc-400">{t.contact.desc}</p>

              <div className="mt-8 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`social-${s.label.toLowerCase()}`}
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 text-white transition-all hover:border-[var(--neon-border)] hover:text-[var(--neon)]"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4" data-testid="contact-form">
              <input
                data-testid="contact-name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t.contact.name}
                className="w-full rounded-xl border border-white/12 bg-white/[0.02] px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-[var(--neon)]"
              />
              <input
                data-testid="contact-email"
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t.contact.email}
                className="w-full rounded-xl border border-white/12 bg-white/[0.02] px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-[var(--neon)]"
              />
              <textarea
                data-testid="contact-message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t.contact.message}
                className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.02] px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-[var(--neon)]"
              />
              <button
                data-testid="contact-submit"
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-black transition-transform hover:scale-[1.02]"
                style={{ background: "var(--neon)", boxShadow: "0 0 24px var(--neon-glow)" }}
              >
                <Send size={18} />
                {t.contact.send}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
