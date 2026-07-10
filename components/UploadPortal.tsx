"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileBox, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const ACCEPTED_EXTENSIONS = [".stl", ".ply", ".obj", ".zip", ".dcm", ".pdf"];
const MAX_SIZE_MB = 500;

type JobStatus = "wartend" | "wird_uebertragen" | "fertig" | "fehler";

type Job = {
  id: string;
  file: File;
  progress: number;
  status: JobStatus;
  error?: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function statusLabel(status: JobStatus) {
  switch (status) {
    case "wartend":
      return "Bereit zum Fräsen";
    case "wird_uebertragen":
      return "Übertragung läuft";
    case "fertig":
      return "Empfangen";
    case "fehler":
      return "Fehlgeschlagen";
  }
}

function isAccepted(file: File) {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

export default function UploadPortal() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [dragging, setDragging] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback((job: Job) => {
    const formData = new FormData();
    formData.append("file", job.file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const progress = Math.round((e.loaded / e.total) * 100);
      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, progress, status: "wird_uebertragen" } : j))
      );
    };

    xhr.onload = () => {
      const ok = xhr.status >= 200 && xhr.status < 300;
      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id
            ? { ...j, status: ok ? "fertig" : "fehler", progress: 100, error: ok ? undefined : "Server hat die Datei abgelehnt." }
            : j
        )
      );
    };

    xhr.onerror = () => {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id ? { ...j, status: "fehler", error: "Netzwerkfehler beim Upload." } : j
        )
      );
    };

    xhr.send(formData);
  }, []);

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      setGlobalError(null);
      const incoming = Array.from(fileList);

      const rejected = incoming.filter((f) => !isAccepted(f) || f.size > MAX_SIZE_MB * 1024 * 1024);
      if (rejected.length > 0) {
        setGlobalError(
          `${rejected.length} Datei(en) übersprungen — erlaubt sind ${ACCEPTED_EXTENSIONS.join(", ")} bis ${MAX_SIZE_MB} MB.`
        );
      }

      const accepted = incoming.filter((f) => isAccepted(f) && f.size <= MAX_SIZE_MB * 1024 * 1024);
      const newJobs: Job[] = accepted.map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        progress: 0,
        status: "wartend",
      }));

      setJobs((prev) => [...prev, ...newJobs]);
      newJobs.forEach((job) => uploadFile(job));
    },
    [uploadFile]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  return (
    <section id="upload-portal" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 max-w-xl">
        <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-copper">
          Upload-Portal
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink">
          Schicken Sie uns Ihren Datensatz.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          STL, PLY, OBJ oder ZIP direkt aus Ihrer Scan-Software. Wir prüfen
          den Datensatz und melden uns mit einem Angebot.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={`grid-backdrop relative cursor-pointer overflow-hidden border-2 border-dashed p-12 text-center transition-colors ${
          dragging ? "border-steel bg-steel/5" : "border-line-soft bg-paper-raised"
        }`}
      >
        {/* corner calibration brackets — the machine-bay motif */}
        {[
          "top-3 left-3 border-t-2 border-l-2",
          "top-3 right-3 border-t-2 border-r-2",
          "bottom-3 left-3 border-b-2 border-l-2",
          "bottom-3 right-3 border-b-2 border-r-2",
        ].map((pos) => (
          <span
            key={pos}
            className={`pointer-events-none absolute h-5 w-5 border-copper ${pos}`}
          />
        ))}

        {dragging && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-steel">
            <div className="absolute -top-px h-24 w-full bg-gradient-to-b from-steel/40 to-transparent animate-scan-sweep" />
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_EXTENSIONS.join(",")}
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />

        <UploadCloud size={30} className="mx-auto text-steel" />
        <p className="mt-4 font-mono-ui text-sm uppercase tracking-wide text-ink">
          Datei hierher ziehen oder klicken
        </p>
        <p className="mt-2 font-mono-ui text-xs text-ink-soft">
          {ACCEPTED_EXTENSIONS.join(" · ")} — max. {MAX_SIZE_MB} MB
        </p>
      </div>

      {globalError && (
        <p className="mt-3 font-mono-ui text-xs text-copper">{globalError}</p>
      )}

      {jobs.length > 0 && (
        <div className="mt-8 border border-line">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line bg-paper px-4 py-2 font-mono-ui text-[11px] uppercase tracking-wide text-ink-soft">
            <span>Datei</span>
            <span className="hidden sm:block">Größe</span>
            <span>Status</span>
          </div>
          {jobs.map((job) => (
            <div
              key={job.id}
              className="relative grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line-soft px-4 py-3 last:border-b-0"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <FileBox size={16} className="shrink-0 text-steel" />
                <span className="truncate text-sm text-ink">{job.file.name}</span>
              </div>
              <span className="hidden font-mono-ui text-xs text-ink-soft sm:block">
                {formatSize(job.file.size)}
              </span>
              <span className="flex items-center gap-1.5 font-mono-ui text-xs">
                {job.status === "wird_uebertragen" && (
                  <Loader2 size={14} className="animate-spin text-steel" />
                )}
                {job.status === "fertig" && <CheckCircle2 size={14} className="text-mint" />}
                {job.status === "fehler" && <XCircle size={14} className="text-copper" />}
                <span
                  className={
                    job.status === "fehler"
                      ? "text-copper"
                      : job.status === "fertig"
                        ? "text-mint"
                        : "text-ink-soft"
                  }
                >
                  {job.status === "wird_uebertragen" ? `${job.progress}%` : statusLabel(job.status)}
                </span>
              </span>

              {job.status === "wird_uebertragen" && (
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-steel transition-all"
                  style={{ width: `${job.progress}%` }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
