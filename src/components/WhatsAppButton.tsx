import { buildGeneralInquiryUrl, buildProductInquiryUrl } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  productName?: string;
  variant?: "floating" | "inline";
  label?: string;
  className?: string;
}

export function WhatsAppButton({
  productName,
  variant = "inline",
  label = "Inquire on WhatsApp",
  className = "",
}: WhatsAppButtonProps) {
  const href = productName ? buildProductInquiryUrl(productName) : buildGeneralInquiryUrl();

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Inquire on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M16.003 3C9.376 3 4 8.373 4 14.997c0 2.36.681 4.65 1.97 6.62L4 29l7.6-1.94a12.96 12.96 0 0 0 4.4.77h.005C22.624 27.83 28 22.457 28 15.83 28 12.617 26.747 9.6 24.46 7.314A11.93 11.93 0 0 0 16.003 3Zm0 21.83a10.85 10.85 0 0 1-5.534-1.514l-.397-.234-4.51 1.152 1.2-4.4-.258-.41A10.78 10.78 0 0 1 5.99 14.997c0-5.524 4.493-10.014 10.014-10.014a9.93 9.93 0 0 1 7.077 2.93 9.94 9.94 0 0 1 2.928 7.087c0 5.524-4.493 10.83-9.997 10.83Zm5.78-7.86c-.317-.158-1.873-.923-2.163-1.029-.29-.106-.501-.158-.713.158-.211.317-.818 1.029-1.003 1.24-.185.211-.37.237-.687.079-.317-.158-1.337-.493-2.547-1.572-.94-.84-1.575-1.876-1.76-2.193-.185-.317-.02-.488.139-.646.143-.142.317-.37.475-.555.158-.185.211-.317.317-.528.106-.211.053-.396-.026-.555-.079-.158-.713-1.72-.977-2.355-.257-.618-.518-.534-.713-.544l-.607-.011a1.17 1.17 0 0 0-.85.396c-.29.317-1.108 1.082-1.108 2.64 0 1.557 1.135 3.063 1.293 3.274.158.211 2.234 3.412 5.413 4.785.756.326 1.346.521 1.806.667.758.241 1.448.207 1.994.126.609-.091 1.873-.766 2.137-1.506.264-.74.264-1.374.185-1.506-.079-.132-.29-.211-.607-.37Z" />
        </svg>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#1fb858] ${className}`}
    >
      <svg viewBox="0 0 32 32" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M16.003 3C9.376 3 4 8.373 4 14.997c0 2.36.681 4.65 1.97 6.62L4 29l7.6-1.94a12.96 12.96 0 0 0 4.4.77C22.624 27.83 28 22.457 28 15.83 28 12.617 26.747 9.6 24.46 7.314A11.93 11.93 0 0 0 16.003 3Z" />
      </svg>
      {label}
    </a>
  );
}
