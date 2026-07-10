export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-raised">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-ink-soft sm:flex-row">
        <span>© {new Date().getFullYear()} cadportal DIGITAL</span>
        <span className="font-mono-ui">Rhein-Main-Gebiet · Dentales Fräsen & 3D-Druck</span>
      </div>
    </footer>
  );
}
