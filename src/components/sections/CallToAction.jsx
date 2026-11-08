// Call-to-action band shown at the bottom of pages. Reads pagesContent.cta (data/pages.js)
// and the contact numbers from company.js (through utils/contactLinks.js).
import { Link } from "react-router";
import { MessageCircle, Phone } from "lucide-react";
import { pagesContent } from "@/data/pages";
import { contactNumbers, telLink, whatsappLink } from "@/utils/contactLinks";
import Container from "@/components/ui/Container";

// The band is solid "primary", so its buttons use the reversed pair (on-primary / primary).
// That keeps them readable in both themes. The focus ring is on-primary because accent is weak on teal.
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2 text-base font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary";
const styles = {
  solid: "bg-on-primary text-primary hover:bg-on-primary/90",
  outline:
    "border border-on-primary text-on-primary hover:bg-on-primary hover:text-primary",
};

// Router link for pages on this site, normal link for WhatsApp.
function BandLink({ to, href, style = "outline", children }) {
  const classes = `${base} ${styles[style]}`;
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  );
}

export default function CallToAction({
  heading = pagesContent?.cta?.heading,
  text = pagesContent?.cta?.text,
  buttonLabel = pagesContent?.cta?.buttonLabel,
  to = "/contact",
}) {
  const numbers = contactNumbers();
  const whatsappNumbers = numbers.filter((number) => number.whatsapp);
  const phoneNumbers = numbers.filter((number) => number.phone);

  if (!heading && !buttonLabel && numbers.length === 0) return null;

  return (
    <section className="border-t border-line bg-primary py-16 text-on-primary lg:py-20">
      <Container>
        {heading ? (
          <h2 className="font-heading text-3xl font-bold md:text-4xl">{heading}</h2>
        ) : null}
        {text ? <p className="mt-3 max-w-[62ch] text-lg">{text}</p> : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {buttonLabel ? (
            <BandLink to={to} style="solid">
              {buttonLabel}
            </BandLink>
          ) : null}
          {whatsappNumbers.map((number) => (
            <BandLink key={number.id} href={whatsappLink("", number.whatsapp)}>
              <MessageCircle className="size-5" aria-hidden="true" />
              {number.label ? `WhatsApp ${number.label}` : "WhatsApp"}
            </BandLink>
          ))}
        </div>

        {phoneNumbers.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-x-6">
            {phoneNumbers.map((number) => (
              <li key={number.id}>
                <a
                  href={telLink(number.phone)}
                  className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {number.label ? `${number.label}: ${number.phone}` : number.phone}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
