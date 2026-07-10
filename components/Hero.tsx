"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

function AxisReadout() {
  const [coords, setCoords] = useState({ x: 128.44, y: 84.22, z: 12.05 });

  useEffect(() => {
    const id = setInterval(() => {
      setCoords({
        x: 60 + Math.random() * 120,
        y: 40 + Math.random() * 90,
        z: 5 + Math.random() * 20,
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-mono-ui text-[11px] uppercase tracking-widest text-ink-soft">
      <div className="mb-1 text-copper">Achsposition</div>
      <div className="grid grid-cols-3 gap-3 text-ink">
        <span>X {coords.x.toFixed(2)}</span>
        <span>Y {coords.y.toFixed(2)}</span>
        <span>Z {coords.z.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line bg-paper-raised">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
        <div>
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-steel">
            Präzisionsfertigung · Rhein-Main
          </p>
          <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
            Von der Scandatei
            <br />
            zum fertigen <span className="text-steel">Zahnersatz.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Fräsen, 3D-Druck und dentale Dienstleistungen für Labore und
            Praxen — persönlich beraten, präzise gefertigt, zuverlässig
            geliefert.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#upload-portal"
              className="inline-flex items-center gap-2 bg-steel-deep px-6 py-3.5 font-mono-ui text-sm uppercase tracking-wide text-paper-raised transition-colors hover:bg-steel"
            >
              Datensatz hochladen
              <ArrowRight size={16} />
            </a>
            <a
              href="#technologien"
              className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3.5 font-mono-ui text-sm uppercase tracking-wide text-ink transition-colors hover:border-steel hover:text-steel"
            >
              Leistungen ansehen
            </a>
          </div>
        </div>

        <div className="relative flex flex-col justify-between border border-line bg-paper p-6">
          <svg
            viewBox="0 0 300 200"
            className="w-full"
            aria-hidden="true"
          >
            <rect x="0.5" y="0.5" width="299" height="199" fill="none" stroke="var(--line)" />
            <path
              d="M20 160 L20 60 L90 60 L90 120 L160 120 L160 40 L220 40 L220 100 L280 100"
              fill="none"
              stroke="var(--steel)"
              strokeWidth="2"
              className="animate-toolpath"
            />
            <circle cx="20" cy="160" r="4" fill="var(--copper)" />
            <circle cx="280" cy="100" r="4" fill="var(--mint)" />
          </svg>
          <AxisReadout />
        </div>
      </div>
    </section>
  );
}
