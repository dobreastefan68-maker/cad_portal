"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Category = {
  title: string;
  icon: React.ReactNode;
  items: { label: string; detail: string }[];
};

const categories: Category[] = [
  {
    title: "Fräsen",
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <circle cx="17" cy="17" r="15.5" stroke="var(--steel)" strokeWidth="1.5" />
        <path d="M17 8 L17 20 M13 20 L21 20 M15 24 L19 24" stroke="var(--steel)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    items: [
      { label: "Direkt verschraubt", detail: "Implantatgetragene Suprakonstruktionen mit passiver Passung, gefräst nach Ihrem digitalen Abdruck." },
      { label: "Individuelle Abutments", detail: "Titan- und Zirkon-Abutments, patientenindividuell gefertigt." },
      { label: "CoCr Sekundärteile", detail: "Sekundärteile aus Kobalt-Chrom für kombinierten Zahnersatz." },
      { label: "CAD-CAM Stege", detail: "Hochpräzise gefräste Stegkonstruktionen für herausnehmbaren Zahnersatz." },
      { label: "Schienen", detail: "Funktions- und Aufbissschienen aus fräsbarem PMMA." },
      { label: "Kronen und Brücken", detail: "Vollanatomisch oder als Gerüst gefräst, in allen gängigen Materialien." },
    ],
  },
  {
    title: "3D-Druck",
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <path d="M9 11 L17 6 L25 11 L25 23 L17 28 L9 23 Z" stroke="var(--steel)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 11 L17 16 L25 11 M17 16 L17 28" stroke="var(--steel)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { label: "Modellguss", detail: "Gedruckte Modellguss-Gerüste, feingliedrig und passgenau." },
      { label: "Löffel / Bissrahmen", detail: "Individuelle Abformlöffel und Bissrahmen nach Scandaten." },
      { label: "LZP-Langzeitprovisorien", detail: "Langzeitprovisorien aus biokompatiblem Kunststoff." },
      { label: "Schienen", detail: "Gedruckte Schienen mit hoher Detailtreue und Passgenauigkeit." },
      { label: "Modelle", detail: "Situationsmodelle und Sägemodelle in gedruckter Präzision." },
    ],
  },
  {
    title: "Dentale Dienstleistungen",
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <path
          d="M17 6c-3.5 0-6 2.6-6 6.2 0 3.4 1.4 6.4 2 9.6.4 2 .6 4.7 2 4.7 1.6 0 1.4-4 2-6 .6 2 .4 6 2 6 1.4 0 1.6-2.7 2-4.7.6-3.2 2-6.2 2-9.6 0-3.6-2.5-6.2-6-6.2Z"
          stroke="var(--steel)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    items: [
      { label: "Elektrolytisches Polieren", detail: "Gleichmäßige, hochglänzende Oberflächen bei CoCr-Gerüsten." },
      { label: "Laserschweißen", detail: "Präzises Laserschweißen für Reparaturen und Erweiterungen." },
      { label: "Plasmaschweißen", detail: "Stabile Verbindungen für großvolumige Konstruktionen." },
      { label: "Funkenerosion", detail: "Erodierte Passungen für spannungsfreien Sitz von Sekundärteilen." },
      { label: "Tellerfliehkraft Politur", detail: "Effiziente Politur für gleichbleibende Oberflächenqualität in Serie." },
    ],
  },
];

function AccordionItem({ label, detail }: { label: string; detail: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line-soft last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3.5 text-left"
      >
        <span className="text-sm font-medium text-ink">{label}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-steel transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-ink-soft">{detail}</p>
      )}
    </div>
  );
}

export default function TechnologiesSection() {
  return (
    <section id="technologien" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-xl">
        <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-copper">
          Unsere Technologien
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink">
          Drei Fertigungswege, ein Anspruch.
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {categories.map((cat) => (
          <div key={cat.title}>
            <div className="mb-5 flex items-center gap-3">
              {cat.icon}
              <h3 className="font-display text-lg font-semibold text-ink">{cat.title}</h3>
            </div>
            <div className="border-t border-line-soft">
              {cat.items.map((item) => (
                <AccordionItem key={item.label} label={item.label} detail={item.detail} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
