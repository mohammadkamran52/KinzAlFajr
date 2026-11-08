// Builds WhatsApp, email and phone links. Reads company.js (phone, whatsapp, email).
import { company } from "@/data/company";

// number defaults to the main WhatsApp; pass company.whatsapp2 for the second one
export function whatsappLink(message = "", number = company.whatsapp) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

export function mailtoLink(subject = "", body = "") {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${company.email}${params.length ? `?${params.join("&")}` : ""}`;
}

// number defaults to the main phone; pass company.phone2 for the second one
export function telLink(number = company.phone) {
  return `tel:${number.replace(/\s+/g, "")}`;
}