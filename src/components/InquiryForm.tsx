"use client";

import { useEffect, useState } from "react";

const OCCASIONS = ["Wedding", "Engagement", "Mehndi", "Formal Event", "Casual", "Other"];
const BUDGETS = [
  "Under PKR 100k",
  "PKR 100k–300k",
  "PKR 300k–500k",
  "PKR 500k+",
  "Open to discussion",
];

interface Props {
  open: boolean;
  onClose: () => void;
  productName?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm({ open, onClose, productName }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    if (!data.get("access_key") && accessKey) data.set("access_key", accessKey);
    data.set("subject", `New inquiry from minzabynj.com${productName ? ` — ${productName}` : ""}`);
    data.set("from_name", "Minza website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.message ?? "Something went wrong. Please try WhatsApp.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try WhatsApp.");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/70 p-4" role="dialog" aria-modal="true" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-cream p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-muted hover:text-charcoal"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="py-12 text-center">
            <h2 className="font-serif text-3xl">Thank you.</h2>
            <p className="mt-4 text-muted">We&apos;ll respond within 48 hours.</p>
            <button type="button" onClick={onClose} className="mt-8 border border-charcoal px-6 py-3 text-sm uppercase tracking-[0.18em] hover:bg-charcoal hover:text-cream">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-3xl">Request via Email</h2>
            <p className="mt-2 text-sm text-muted">
              {productName ? `Inquiry about ${productName}.` : "Tell us about the piece you have in mind."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              {accessKey ? (
                <input type="hidden" name="access_key" value={accessKey} />
              ) : null}
              <input type="hidden" name="product_of_interest" value={productName ?? ""} />
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Country" name="country" required />
                <Field label="Phone / WhatsApp" name="phone" />
              </div>

              {productName && (
                <Field label="Product of interest" name="product_display" defaultValue={productName} readOnly />
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <Select label="Occasion" name="occasion" options={OCCASIONS} />
                <Field label="Event Date" name="event_date" type="date" />
              </div>

              <Textarea label="Size / Measurements" name="measurements" />
              <Textarea label="Customization requests" name="customizations" />
              <Select label="Budget Range" name="budget" options={BUDGETS} />
              <Textarea label="Additional notes" name="notes" />

              {!accessKey && (
                <p className="text-xs text-muted">
                  Form sending isn&apos;t configured yet. Please use WhatsApp for now.
                </p>
              )}

              {status === "error" && (
                <p className="text-sm text-red-700">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting" || !accessKey}
                className="mt-2 bg-charcoal px-8 py-3 text-sm uppercase tracking-[0.18em] text-cream transition-colors hover:bg-sage-deep disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "submitting" ? "Sending…" : "Send inquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full border-b border-beige bg-transparent px-0 py-2 text-sm focus:border-sage-deep focus:outline-none";
const labelClass = "text-sm uppercase tracking-[0.18em] text-muted";

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
  readOnly = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  readOnly?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}{required && " *"}</span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={inputClass}
      />
    </label>
  );
}

function Textarea({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea name={name} rows={3} className={`${inputClass} resize-none`} />
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <select name={name} className={inputClass} defaultValue="">
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
