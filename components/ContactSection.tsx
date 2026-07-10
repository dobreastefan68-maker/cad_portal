"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="kontakt" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-copper">
            Kontakt
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink">
            Sprechen wir über Ihr Projekt.
          </h2>

          <div className="mt-8 space-y-4 text-sm text-ink-soft">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-steel" />
              <a href="tel:+4906051927700" className="hover:text-steel">06051 / 92 77 0</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-steel" />
              <a href="mailto:info@cadportal-digital.de" className="hover:text-steel">
                info@cadportal-digital.de
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-steel" />
              <span>Rhein-Main-Gebiet</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: an echte Mail-/CRM-Anbindung übergeben, sobald verfügbar.
            setSent(true);
          }}
          className="grid gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono-ui text-xs uppercase tracking-wide text-ink-soft">Name</span>
              <input
                required
                type="text"
                className="border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink outline-none focus:border-steel"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono-ui text-xs uppercase tracking-wide text-ink-soft">Praxis / Labor</span>
              <input
                type="text"
                className="border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink outline-none focus:border-steel"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="font-mono-ui text-xs uppercase tracking-wide text-ink-soft">E-Mail</span>
            <input
              required
              type="email"
              className="border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink outline-none focus:border-steel"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-mono-ui text-xs uppercase tracking-wide text-ink-soft">Nachricht</span>
            <textarea
              rows={4}
              className="border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink outline-none focus:border-steel"
            />
          </label>

          <button
            type="submit"
            disabled={sent}
            className="justify-self-start bg-steel-deep px-6 py-3.5 font-mono-ui text-sm uppercase tracking-wide text-paper-raised transition-colors hover:bg-steel disabled:opacity-60"
          >
            {sent ? "Nachricht gesendet" : "Nachricht senden"}
          </button>
        </form>
      </div>
    </section>
  );
}
