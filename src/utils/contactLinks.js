// Builds WhatsApp, email and phone links, and lists the contact numbers. Reads company.js
// (phone, phoneLabel, phone2, phone2Label, whatsapp, whatsapp2, email).
import { company } from "@/data/company";

// number defaults to the main WhatsApp; pass company.whatsapp2 for the second one
export function whatsappLink(message = "", number = company.whatsapp) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

export function mailtoLink(email, subject = "", body = "") {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${email}${params.length ? `?${params.join("&")}` : ""}`;
}

// number defaults to the main phone; pass company.phone2 for the second one
export function telLink(number = company.phone) {
  return `tel:${number.replace(/\s+/g, "")}`;
}

// The contact numbers that are filled in, as { id, label, phone, whatsapp, whatsappDisplay }.
// Footer, Contact page and Call to action all use this, so each number is wired in one place.
export function contactNumbers() {
  const digits = (value = "") => value.replace(/\D/g, "");
  const entries = [
    {
      id: "main",
      label: company.phoneLabel || "",
      phone: company.phone || "",
      whatsapp: company.whatsapp || "",
    },
    {
      id: "second",
      label: company.phone2Label || "",
      phone: company.phone2 || "",
      whatsapp: company.whatsapp2 || "",
    },
  ];

  return entries
    .filter((entry) => entry.phone || entry.whatsapp)
    .map((entry) => ({
      ...entry,
      // Show the nicely spaced phone text when the WhatsApp number is the same number
      whatsappDisplay:
        entry.phone && digits(entry.phone) === digits(entry.whatsapp)
          ? entry.phone
          : `+${entry.whatsapp}`,
    }));
}
