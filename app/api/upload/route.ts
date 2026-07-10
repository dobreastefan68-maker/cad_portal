import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

// ---------------------------------------------------------------------------
// Upload-Portal — Empfangs-Endpunkt für Kunden-Datensätze (STL/PLY/OBJ/ZIP …)
//
// Aktueller Stand: Dateien werden lokal unter /uploads abgelegt, damit das
// Frontend end-to-end getestet werden kann, bevor das Kundenportal-Backend
// steht.
//
// TODO(Kundenportal-Backend): Sobald die Datenbank für das Kundenportal
// angebunden ist, hier ersetzen durch:
//   1. Auth-Check (welcher Kunde lädt hoch?)
//   2. Persistieren der Datei in Objektspeicher (S3-kompatibel o. Ä.)
//   3. Anlegen eines Auftrags-Datensatzes (Kunde, Datei-Metadaten, Status)
//   4. Benachrichtigung (E-Mail/Slack) an das Fräs-/Druck-Team
// Die Response-Form (siehe unten) kann dabei gleich bleiben, damit
// UploadPortal.tsx unverändert funktioniert.
// ---------------------------------------------------------------------------

const ACCEPTED_EXTENSIONS = [".stl", ".ply", ".obj", ".zip", ".dcm", ".pdf"];
const MAX_SIZE_BYTES = 200 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Keine Datei übermittelt." }, { status: 400 });
  }

  const extension = path.extname(file.name).toLowerCase();
  if (!ACCEPTED_EXTENSIONS.includes(extension)) {
    return NextResponse.json(
      { error: `Dateityp ${extension} wird nicht unterstützt.` },
      { status: 415 }
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "Datei überschreitet die maximale Größe." }, { status: 413 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, safeName), buffer);

  return NextResponse.json({
    ok: true,
    fileName: file.name,
    storedAs: safeName,
    size: file.size,
    receivedAt: new Date().toISOString(),
  });
}
