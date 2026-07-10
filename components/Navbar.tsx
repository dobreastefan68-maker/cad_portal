"use client";

import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const links = [
  { href: "#technologien", label: "Technologien" },
  { href: "#materialien", label: "Materialien" },
  { href: "#upload-portal", label: "Upload-Portal" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper-raised/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <path d="M15 2 L27 9 L15 16 L3 9 Z" fill="var(--steel)" />
            <path d="M15 16 L27 9 L27 21 L15 28 Z" fill="var(--ink)" />
            <path d="M15 16 L3 9 L3 21 L15 28 Z" fill="var(--copper)" />
          </svg>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            cadportal<span className="text-steel"> DIGITAL Gheorghiu</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono-ui text-[13px] uppercase tracking-wide text-ink-soft transition-colors hover:text-steel"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Phone size={16} className="text-copper" />
          <a href="tel:+4906051927700" className="font-mono-ui text-sm text-ink">
            06051 / 92 77 0
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label="Menü öffnen"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-6 pb-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 font-mono-ui text-sm uppercase tracking-wide text-ink-soft"
            >
              {l.label}
            </a>
          ))}
          <a href="tel:+4906051927700" className="py-2 font-mono-ui text-sm text-steel">
            06051 / 92 77 0
          </a>
        </nav>
      )}
    </header>
  );
}
