"use client";

import { useState } from "react";
import { InquiryForm } from "./InquiryForm";

export function InquiryButton({
  productName,
  label = "Request via Email",
  className = "",
}: {
  productName?: string;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center border border-sage-deep px-6 py-3 text-sm font-medium tracking-wide text-sage-deep transition-colors hover:bg-sage-deep hover:text-cream ${className}`}
      >
        {label}
      </button>
      <InquiryForm open={open} onClose={() => setOpen(false)} productName={productName} />
    </>
  );
}
