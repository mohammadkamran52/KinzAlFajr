// Site footer. Reads company, navLinks and services from data/. Contact links come from utils/contactLinks.js.
import { Fragment } from "react";
import { Link } from "react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { navLinks } from "@/data/navigation";
import { services } from "@/data/services";
import { contactNumbers, mailtoLink, telLink, whatsappLink } from "@/utils/contactLinks";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { 
  FaInstagram, 
  FaFacebookF, 
  FaXTwitter, 
  FaYoutube, 
  FaLinkedinIn 
} from "react-icons/fa6";

const getSocialIcon = (key) => {
  switch (key.toLowerCase()) {
    case 'instagram': return <FaInstagram />;
    case 'facebook': return <FaFacebookF />;
    case 'twitter':
    case 'x': return <FaXTwitter />;
    case 'youtube': return <FaYoutube />;
    case 'linkedin': return <FaLinkedinIn />;
    default: return null;
  }
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const linkClass = `inline-flex min-h-11 py-2 items-center text-ink-muted transition-colors hover:text-primary ${focusRing}`;
const headingClass = "font-heading text-lg font-semibold text-ink";
const rowClass = "flex flex-col";
const iconClass = "mt-3 size-8 shrink-0 text-primary";

// Order of the social links. Only the ones filled in company.social are shown.
const socialNetworks = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "x", label: "X" },
  { key: "youtube", label: "YouTube" },
];

export default function Footer() {
  const socialLinks = socialNetworks.filter((network) => company.social?.[network.key]);
  const numbers = contactNumbers();
  const fullAddress = [company.address, company.city, company.country]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="border-t border-line bg-surface-alt text-ink">
      <Container className="items-start grid gap-6 py-8 sm:grid-cols-4 lg:grid-cols-4">
        
        {/* Brand */}
        <div className="col-span-1 items-start">
          <Link to="/" className={`inline-flex items-center ${focusRing}`}>
            <Logo className="h-9 w-auto" />
          </Link>
          {company.description && (
            <p className="mt-3 max-w-xs text-ink-muted">{company.description}</p>
          )}
        </div>
        {/* <div col-span-1>
        <h2 className={headingClass}>Follow us</h2>
          {socialLinks.length > 0 && (
            <ul className={`mt-1 ${rowClass} gap-x-4`}>
              {socialLinks.map((network) => (
                <li key={network.key}>
                  <a
                    href={company.social[network.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} ${iconClass}`}
                  >
                    {getSocialIcon(network.key)}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div> */}

        {/* Quick links */}
        {navLinks.length > 0 && (
          <div className="items-start col-span-1 ml-10">
            <h2 className={headingClass}>Quick links</h2>
            <ul className="mt-1">
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
        {/* {services.length > 0 && (
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
        )} */}

        {/* Contact details */}
        <div className="col-span-2 items-start">
          <div className="flex flex-col grid sm:grid-rows-2 lg:grid-rows-2">
            <div className="row-span-1">
              <h2 className={headingClass}>Contact</h2>
              <ul className="grid justify-start items-start w-full py-8 gap-4 grid-cols-6 lg:grid-cols-6">
                {numbers.map((number) => (
                  <Fragment key={number.id}>
                    {number.phone && (
                      <li className={`${rowClass} flex items-start`}>
                        <a 
                          href={telLink(number.phone)}
                          className={`${linkClass} group flex flex-col items-center gap-3`}
                        >
                          <Phone className={iconClass} aria-hidden="true" />
                          <span className="flex flex-col items-center text-center">
                            Call us...
                            <span className="hidden group-hover:block">
                              {number.label ? `${number.label}` : number.phone}
                            </span>
                          </span>
                        </a>
                      </li>
                    )}
                    {number.whatsapp && (
                      <li className={`${rowClass} flex items-start`}>
                        <a
                          href={whatsappLink("", number.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${linkClass} group flex flex-col items-center gap-3`}
                        >
                          <MessageCircle className={iconClass} aria-hidden="true" />
                          <span className="flex flex-col items-center text-center">
                            WhatsApp us...
                            <span className="hidden group-hover:block">
                              {number.label ? `${number.label}` : "WhatsApp"}
                            </span>
                          </span>
                        </a>
                      </li>
                    )}
                  </Fragment>
                ))}

                {company.email && (
                  <li className={`${rowClass} flex items-start`}>
                    <a 
                      href={mailtoLink(company.email)} 
                      className={`${linkClass} group flex flex-col items-center gap-3 break-all`}
                    >
                      <Mail className={iconClass} aria-hidden="true" />
                      <span className="flex flex-col items-center text-center">
                        Mail us...
                      </span>
                    </a>
                  </li>
                )}

                {fullAddress && (
                  <li className={`${rowClass} flex items-start`}>
                    <a 
                      className={`${linkClass} group flex flex-col items-center gap-3`}
                    >
                      <MapPin className={iconClass} aria-hidden="true" />
                      <span className="flex flex-col items-center text-center">
                        Locate us...
                      </span>
                    </a>
                  </li>
                )}
                {/* {company.hours && (
                  <li className={`${rowClass} mt-3`}>
                    <Clock className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-ink-muted">{company.hours}</span>
                  </li>
                )} */}
              </ul>
            </div>
            <div className="row-span-1">
              <h2 className={headingClass}>Follow us</h2>
              {socialLinks.length > 0 && (
                <ul className={`flex justify-between px-2 py-8 mx-2 items-center w-full ${iconClass}`}>
                  {socialLinks.map((network) => (
                    <li key={network.key}>
                      <a
                        href={company.social[network.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${linkClass} ${iconClass} text-3xl`}
                      >
                        {getSocialIcon(network.key)}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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