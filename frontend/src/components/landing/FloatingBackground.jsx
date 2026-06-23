import React from "react";

export default function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      {/* glow blobs */}
      <div
        className="float-slow absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full blur-[130px]"
        style={{ background: "var(--neon-soft)" }}
      />
      <div
        className="float-rev absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full blur-[140px]"
        style={{ background: "var(--neon-soft)" }}
      />
      <div className="float-slow absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-white/[0.015] blur-[120px]" />
      {/* tiny floating dots */}
      <div className="float-rev absolute left-[12%] top-[22%] h-2 w-2 rounded-full" style={{ background: "var(--neon)", boxShadow: "0 0 18px var(--neon-glow)" }} />
      <div className="float-slow absolute right-[18%] top-[60%] h-1.5 w-1.5 rounded-full" style={{ background: "var(--neon)", boxShadow: "0 0 14px var(--neon-glow)" }} />
      <div className="float-rev absolute left-[40%] top-[80%] h-1 w-1 rounded-full" style={{ background: "var(--neon)", boxShadow: "0 0 12px var(--neon-glow)" }} />
    </div>
  );
}
