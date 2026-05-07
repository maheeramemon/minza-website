export const WHATSAPP_NUMBER = "923218239698";

export function buildProductInquiryUrl(productName: string): string {
  const lines = [
    `Hi Minza! I'd like to inquire about: ${productName}`,
    "",
    "Name:",
    "Country:",
    "Occasion:",
    "Event Date:",
    "Size / Measurements:",
    "Customizations:",
    "Budget Range:",
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function buildGeneralInquiryUrl(): string {
  const text = "Hi Minza! I'd like to learn more about your pieces.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
