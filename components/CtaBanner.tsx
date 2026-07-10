import { Check } from "lucide-react";

const points = [
  "Persönliche Beratung",
  "Gemeinsame Lösungsfindung",
  "Von Kollege zu Kollege",
];

export default function CtaBanner() {
  return (
    <section className="bg-ink">
      <div className="grid-backdrop relative overflow-hidden">
        <div className="absolute inset-0 bg-ink/90" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight text-paper-raised md:text-3xl">
            Wir designen und drucken für Sie auch gerne Ihr dentales
            Formteil.{" "}
            <a href="#upload-portal" className="text-copper-soft underline underline-offset-4">
              Oder Sie schicken uns Ihren Datensatz.
            </a>
          </h2>

          <div>
            <ul className="space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-paper-raised/90">
                  <Check size={18} className="text-mint" />
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>
            <a
              href="#kontakt"
              className="mt-7 inline-flex items-center bg-steel px-6 py-3.5 font-mono-ui text-sm uppercase tracking-wide text-paper-raised transition-colors hover:bg-steel-deep"
            >
              Jetzt Kontakt aufnehmen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
