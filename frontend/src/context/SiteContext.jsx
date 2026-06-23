import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const THEMES = {
  lime: {
    neon: "#C6FF00",
    hover: "#AEE600",
    glow: "rgba(198, 255, 0, 0.4)",
    border: "rgba(198, 255, 0, 0.22)",
    soft: "rgba(198, 255, 0, 0.08)",
  },
  aqua: {
    neon: "#00E5FF",
    hover: "#00C9E0",
    glow: "rgba(0, 229, 255, 0.4)",
    border: "rgba(0, 229, 255, 0.22)",
    soft: "rgba(0, 229, 255, 0.08)",
  },
};

const SiteContext = createContext(null);

export const useSite = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem("nm_theme") || "lime");
  const [lang, setLang] = useState(() => localStorage.getItem("nm_lang") || "pt");

  useEffect(() => {
    const t = THEMES[theme] || THEMES.lime;
    const root = document.documentElement;
    root.style.setProperty("--neon", t.neon);
    root.style.setProperty("--neon-hover", t.hover);
    root.style.setProperty("--neon-glow", t.glow);
    root.style.setProperty("--neon-border", t.border);
    root.style.setProperty("--neon-soft", t.soft);
    localStorage.setItem("nm_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("nm_lang", lang);
  }, [lang]);

  const toggleTheme = useCallback(() => {
    setTheme((p) => (p === "lime" ? "aqua" : "lime"));
  }, []);

  const toggleLang = useCallback(() => {
    setLang((p) => (p === "pt" ? "en" : "pt"));
  }, []);

  return (
    <SiteContext.Provider value={{ theme, setTheme, toggleTheme, lang, setLang, toggleLang }}>
      {children}
    </SiteContext.Provider>
  );
};
