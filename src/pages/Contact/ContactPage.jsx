// Contact page: contact details plus a quote form that opens WhatsApp with the message ready.
// Reads company (phone, phone2, whatsapp, whatsapp2...), services and pagesContent.contact. Nothing is sent from this site.
import { useState } from "react";
import { useSearchParams } from "react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { pagesContent } from "@/data/pages";
import { services } from "@/data/services";
import { mailtoLink, telLink, whatsappLink } from "@/utils/contactLinks";
import PageMeta from "@/components/layout/PageMeta";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageHero from "@/components/sections/PageHero";

// Shared class strings for the form fields (all colours are semantic tokens)
const labelClass = "mb-1 block font-semibold text-ink";
const inputClass =
  "block min-h-11 w-full rounded-sm border border-line bg-surface px-3 py-2 text-ink placeholder:text-ink-muted aria-[invalid=true]:border-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const errorClass = "mt-1 text-sm text-danger";
const linkClass =
  "font-semibold text-ink underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Order used to focus the first invalid field
const fieldOrder = ["name", "phone", "email", "service"];

function validate(values) {
  const found = {};
  if (!values.name.trim()) found.name = "Please enter your name.";

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) found.phone = "Please enter your phone number.";
  else if (digits.length < 7) found.phone = "Please enter a valid phone number.";

  if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    found.email = "Please enter a valid email address.";
  }
  if (!values.service) found.service = "Please choose a service.";
  return found;
}

function buildMessage(values) {
  const chosen = services.find((service) => service.id === values.service);
  const lines = [
    `Hello ${company.shortName}, I would like to request a quote.`,
    "",
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
  ];
  if (values.email.trim()) lines.push(`Email: ${values.email.trim()}`);
  lines.push(`Service: ${chosen ? chosen.title : values.service}`);
  if (values.message.trim()) lines.push("", `Message: ${values.message.trim()}`);
  return lines.join("\n");
}

export default function ContactPage() {
  const { title = "", description = "", heading = "", intro = "" } =
    pagesContent.contact ?? {};

  // Preselect the service from ?service=<id>, but only if that id really exists
  const [searchParams] = useSearchParams();
  const requested = searchParams.get("service") ?? "";
  const startService = services.some((service) => service.id === requested)
    ? requested
    : "";

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    service: startService,
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Entries with an empty value are removed by the filter below.
  // The second phone and second WhatsApp are optional.
  const details = [
    { id: "phone", label: "Phone", value: company.phone, href: telLink(company.phone), Icon: Phone },
    {
      id: "phone2",
      label: "Phone 2",
      value: company.phone2,
      href: company.phone2 ? telLink(company.phone2) : "",
      Icon: Phone,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      value: company.whatsapp ? `+${company.whatsapp}` : "",
      href: company.whatsapp ? whatsappLink("", company.whatsapp) : "",
      external: true,
      Icon: MessageCircle,
    },
    {
      id: "whatsapp2",
      label: "WhatsApp 2",
      value: company.whatsapp2 ? `+${company.whatsapp2}` : "",
      href: company.whatsapp2 ? whatsappLink("", company.whatsapp2) : "",
      external: true,
      Icon: MessageCircle,
    },
    { id: "email", label: "Email", value: company.email, href: mailtoLink(), Icon: Mail },
    { id: "address", label: "Address", value: company.address, href: "", Icon: MapPin },
    { id: "hours", label: "Opening hours", value: company.hours, href: "", Icon: Clock },
  ].filter((detail) => detail.value);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstInvalid = fieldOrder.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    // The form always opens the main WhatsApp number
    window.open(
      whatsappLink(buildMessage(values), company.whatsapp),
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <>
      <PageMeta title={title} description={description} />
      <PageHero title={heading} subtitle={intro} />

      <section className="bg-surface py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Details column */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-ink">
                Contact details
              </h2>
              <ul className="mt-6 space-y-5">
                {details.map(({ id, label, value, href, external, Icon }) => (
                  <li key={id} className="flex gap-4">
                    <Icon
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-primary"
                    />
                    <div>
                      <p className="text-sm text-ink-muted">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className={linkClass}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-ink">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {company.mapEmbedUrl && (
                <iframe
                  src={company.mapEmbedUrl}
                  title={`Map showing the location of ${company.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="mt-8 aspect-video w-full border border-line"
                />
              )}
            </div>

            {/* Form column */}
            <div className="border border-line bg-surface-alt p-6 sm:p-8">
              <h2 className="font-heading text-3xl font-bold text-ink">
                Request a quote
              </h2>
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={inputClass}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className={errorClass}>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p id="contact-phone-error" className={errorClass}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Email <span className="font-normal text-ink-muted">(optional)</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={inputClass}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className={errorClass}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-service" className={labelClass}>
                    Service
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={values.service}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={errors.service ? "true" : "false"}
                    aria-describedby={errors.service ? "contact-service-error" : undefined}
                    className={inputClass}
                  >
                    <option value="">Choose a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="contact-service-error" className={errorClass}>
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message <span className="font-normal text-ink-muted">(optional)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <Button type="submit" size="lg">
                    Send on WhatsApp
                  </Button>
                  <p className="mt-3 text-sm text-ink-muted">
                    This opens WhatsApp with your message ready to send.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}