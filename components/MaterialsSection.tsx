const materials = [
  { name: "Zirkonoxid", spec: "monolithisch & verblendbar" },
  { name: "Kobalt-Chrom", spec: "biokompatibel, hochfest" },
  { name: "Titan Grade 5", spec: "für Abutments & Gerüste" },
  { name: "PMMA", spec: "Langzeitprovisorien" },
  { name: "Wachs", spec: "fräsbar, ausbrennbar" },
  { name: "Biokompatible Resine", spec: "3D-Druck, medizinisch zugelassen" },
];

export default function MaterialsSection() {
  return (
    <section id="materialien" className="border-y border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-copper">
          Materialien
        </p>
        <h2 className="font-display mt-3 max-w-lg text-2xl font-semibold tracking-tight text-ink">
          Zertifizierte Werkstoffe für jede Indikation.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
          {materials.map((m) => (
            <div key={m.name} className="border-l-2 border-line-soft pl-4">
              <div className="text-sm font-medium text-ink">{m.name}</div>
              <div className="font-mono-ui mt-1 text-xs text-ink-soft">{m.spec}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
