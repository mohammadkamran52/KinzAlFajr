// Builds WhatsApp, email and phone links. Reads company.whatsapp, company.email, company.phone.
import { company } from "@/data/company";

// Returns "" when the number is not provided yet, so callers can hide the link.
export function whatsappLink(message = "") {
  const number = (company.whatsapp || "").replace(/\D/g, "");
  if (!number) return "";
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(subject = "", body = "") {
  if (!company.email) return "";
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${company.email}${params.length ? `?${params.join("&")}` : ""}`;
}

export function telLink() {
  const phone = (company.phone || "").replace(/\s+/g, "");
  return phone ? `tel:${phone}` : "";
}