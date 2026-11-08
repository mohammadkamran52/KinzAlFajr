// Site footer. Reads company, navLinks and services from data/. Contact links come from utils/contactLinks.js.
import { Link } from "react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { navLinks } from "@/data/navigation";
import { services } from "@/data/services";
import { mailtoLink, telLink, whatsappLink } from "@/utils/contactLinks";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const linkClass = `inline-flex min-h-11 py-2 items-center text-ink-muted transition-colors hover:text-primary ${focusRing}`;
const headingClass = "font-heading text-lg font-semibold text-ink";
const rowClass = "flex items-start gap-3";
const iconClass = "mt-3 size-4 shrink-0 text-primary";

// Order of the social links. Only the ones filled in company.social are shown.
const socialNetworks = [
  // { key: "instagram", label: "Instagram" },
  // { key: "facebook", label: "Facebook" },
  // { key: "linkedin", label: "LinkedIn" },
  // { key: "x", label: "X" },
  // { key: "youtube", label: "YouTube" },
];

export default function Footer() {
  const socialLinks = socialNetworks.filter((network) => company.social?.[network.key]);

  return (
    <footer className="border-t border-line bg-surface-alt text-ink">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Brand */}
        <div>
          <Link to="/" className={`inline-flex items-center ${focusRing}`}>
            <Logo className="h-9 w-auto" />
          </Link>
          {company.description && (
            <p className="mt-4 max-w-xs text-ink-muted">{company.description}</p>
          )}
          {socialLinks.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-x-4">
              {socialLinks.map((network) => (
                <li key={network.key}>
                  <a
                    href={company.social[network.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {network.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick links */}
        {navLinks.length > 0 && (
          <div>
            <h2 className={headingClass}>Quick links</h2>
            <ul className="mt-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Services */}
        {services.length > 0 && (
          <div>
            <h2 className={headingClass}>Services</h2>
            <ul className="mt-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={`/services#${service.id}`} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact details */}
        <div>
          <h2 className={headingClass}>Contact</h2>
          <ul className="mt-2">
            {company.phone && (
              <li className={rowClass}>
                <Phone className={iconClass} aria-hidden="true" />
                <a href={telLink()} className={linkClass}>
                  {company.phone}
                </a>
              </li>
            )}
            {company.whatsapp && (
              <li className={rowClass}>
                <MessageCircle className={iconClass} aria-hidden="true" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp UAE
                </a>
              </li>
            )}
            {company.phone2 && (
              <li className={rowClass}>
                <Phone className={iconClass} aria-hidden="true" />
                <a href={telLink()} className={linkClass}>
                  {company.phone2}
                </a>
              </li>
            )}
            {company.whatsapp2 && (
              <li className={rowClass}>
                <MessageCircle className={iconClass} aria-hidden="true" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp IN
                </a>
              </li>
            )}
            {company.email && (
              <li className={rowClass}>
                <Mail className={iconClass} aria-hidden="true" />
                <a href={mailtoLink()} className={`${linkClass} break-all`}>
                  {company.email}
                </a>
              </li>
            )}
            {company.address && (
              <li className={rowClass}>
                <MapPin className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-ink-muted">{company.address}</span>
              </li>
            )}
            {company.hours && (
              <li className={`${rowClass} mt-3`}>
                <Clock className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-ink-muted">{company.hours}</span>
              </li>
            )}
          </ul>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <Container className="py-6 text-sm text-ink-muted">
          &copy; {new Date().getFullYear()} {company.name}
        </Container>
      </div>
    </footer>
  );
}