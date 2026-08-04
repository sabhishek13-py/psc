"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Upload, X, Loader2, ImageOff } from "lucide-react";
import type { Laptop } from "@/lib/data";
import { formatINR } from "@/lib/utils";

const CATEGORIES: Laptop["category"][] = ["Ultrabook", "Workstation", "2-in-1", "Creator", "Gaming"];
const GRADES: Laptop["grade"][] = ["A+", "A", "B+", "B"];

export default function InventoryClient({ laptops }: { laptops: Laptop[] }) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    setPhotoPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/laptops", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to add laptop.");
      }
      formRef.current?.reset();
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
      setPhotoPreviews([]);
      setFormOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this laptop from the catalog?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/laptops/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete laptop.");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-1.5 text-[13px] text-bone-faint hover:text-bone transition-colors mb-4">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
            </Link>
            <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">
              Admin dashboard
            </div>
            <h1 className="font-display text-4xl text-bone">Inventory</h1>
          </div>
          <button
            onClick={() => setFormOpen((o) => !o)}
            className="inline-flex items-center gap-2 rounded-lg bg-teal text-ink font-medium px-4 py-2.5 text-sm hover:opacity-90 transition-opacity"
          >
            {formOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {formOpen ? "Cancel" : "Add laptop"}
          </button>
        </div>

        <AnimatePresence>
          {formOpen && (
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
            >
              <div className="rounded-2xl border border-line bg-ink-raised/40 p-6 space-y-6">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-3 block">
                    Photos
                  </label>
                  <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line-soft px-6 py-8 text-center cursor-pointer hover:border-teal/40 transition-colors">
                    <Upload className="h-5 w-5 text-bone-faint" />
                    <span className="text-sm text-bone-dim">Click to upload photos</span>
                    <span className="text-[11px] text-bone-faint">PNG or JPG, multiple allowed</span>
                    <input type="file" name="photos" accept="image/*" multiple className="hidden" onChange={handlePhotoChange} />
                  </label>
                  {photoPreviews.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {photoPreviews.map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={src} alt="" className="h-20 w-20 rounded-lg object-cover border border-line" />
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Field label="Brand" name="brand" required placeholder="Apple" />
                  <Field label="Model" name="model" required placeholder="MacBook Pro 14″ M2 Pro" />
                  <SelectField label="Category" name="category" required options={CATEGORIES} />
                  <Field label="Tagline" name="tagline" required placeholder="Studio-grade power, restored to first-day form." className="sm:col-span-2 lg:col-span-3" />
                  <TextareaField
                    label="Description"
                    name="description"
                    placeholder={"One highlight per line — shown as bullet points on the product page."}
                    className="sm:col-span-2 lg:col-span-3"
                  />

                  <SelectField label="Grade" name="grade" required options={GRADES} />
                  <Field label="Condition score (0-100)" name="conditionScore" type="number" min={0} max={100} required placeholder="96" />
                  <Field label="Warranty (months)" name="warrantyMonths" type="number" min={1} placeholder="12" />

                  <Field label="Price (USD)" name="price" type="number" min={1} required placeholder="1449" />
                  <Field label="Original price (USD)" name="originalPrice" type="number" min={1} required placeholder="1999" />

                  <Field label="CPU" name="cpu" required placeholder="Apple M2 Pro (10-core)" />
                  <Field label="RAM" name="ram" required placeholder="16GB unified" />
                  <Field label="Storage" name="storage" required placeholder="512GB SSD" />
                  <Field label="GPU" name="gpu" placeholder="16-core integrated" />
                  <Field label="Display" name="display" required placeholder="14.2″ Liquid Retina XDR" />
                  <Field label="Battery" name="battery" placeholder="Up to 18 hours" />
                  <Field label="Weight" name="weight" placeholder="1.6 kg" />
                </div>

                <p className="text-[11px] text-bone-faint">
                  Prices are entered in USD and converted to rupees for display, matching the rest of the catalog.
                </p>

                {error && <p className="text-[13px] text-amber-soft">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-bone text-ink font-medium px-5 py-2.5 text-sm hover:bg-amber-soft transition-colors disabled:opacity-50"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Adding…" : "Add to catalog"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="rounded-2xl border border-line overflow-hidden">
          <div className="p-6 border-b border-line flex items-center justify-between">
            <h2 className="font-display text-lg text-bone">Catalog</h2>
            <span className="text-[11px] text-bone-faint font-mono">{laptops.length} laptops</span>
          </div>
          <div className="divide-y divide-line-soft">
            {laptops.map((l) => (
              <div key={l.id} className="flex items-center gap-4 p-4">
                <div className="h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-line bg-ink-raised flex items-center justify-center">
                  {l.photos && l.photos.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={l.photos[0]} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <ImageOff className="h-4 w-4 text-bone-faint" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-bone truncate">{l.brand} {l.model}</div>
                  <div className="text-[12px] text-bone-faint truncate">{l.category} &middot; Grade {l.grade}</div>
                </div>
                <div className="text-[13px] text-teal-soft font-mono shrink-0">{formatINR(l.price)}</div>
                <button
                  onClick={() => handleDelete(l.id)}
                  disabled={deletingId === l.id}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[12px] text-bone-dim hover:text-amber-soft hover:border-amber-soft/40 transition-colors disabled:opacity-50"
                >
                  {deletingId === l.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  min,
  max,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-2 block">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none focus:border-teal/50 transition-colors"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  required,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-2 block">
        {label}
      </label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none focus:border-teal/50 transition-colors"
      >
        <option value="" disabled>Select&hellip;</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-2 block">
        {label}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none focus:border-teal/50 transition-colors resize-none"
      />
    </div>
  );
}
